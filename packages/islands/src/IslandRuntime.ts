export interface IslandRuntime {
  id: string;
  component: string;
  props: Record<string, any>;
  hydrate: boolean;
  priority: 'high' | 'normal' | 'low';
  framework: 'react' | 'vue' | 'angular' | 'svelte' | 'vanilla';
  container: HTMLElement;
  instance?: any;
  mounted: boolean;
}

export interface IslandRegistry {
  [componentName: string]: {
    framework: 'react' | 'vue' | 'angular' | 'svelte' | 'vanilla';
    component: any;
    ssr?: boolean;
    hydrate?: boolean;
    priority?: 'high' | 'normal' | 'low';
  };
}

export interface IslandManager {
  register: (name: string, component: any, options: {
    framework: 'react' | 'vue' | 'angular' | 'svelte' | 'vanilla';
    ssr?: boolean;
    hydrate?: boolean;
    priority?: 'high' | 'normal' | 'low';
  }) => void;
  unregister: (name: string) => void;
  createIsland: (config: {
    id: string;
    component: string;
    props?: Record<string, any>;
    hydrate?: boolean;
    priority?: 'high' | 'normal' | 'low';
  }) => IslandRuntime;
  mountIsland: (island: IslandRuntime) => Promise<void>;
  unmountIsland: (island: IslandRuntime) => void;
  hydrateIsland: (island: IslandRuntime) => Promise<void>;
  serializeIsland: (island: IslandRuntime) => string;
  deserializeIsland: (data: string) => IslandRuntime;
}

export class UniversalIslandManager implements IslandManager {
  private registry: IslandRegistry = {};
  private islands: Map<string, IslandRuntime> = new Map();
  private frameworkAdapters: Map<string, FrameworkAdapter> = new Map();

  constructor() {
    this.initializeFrameworkAdapters();
  }

  private initializeFrameworkAdapters() {
    // Register framework adapters
    this.frameworkAdapters.set('react', new ReactAdapter());
    this.frameworkAdapters.set('vue', new VueAdapter());
    this.frameworkAdapters.set('angular', new AngularAdapter());
    this.frameworkAdapters.set('svelte', new SvelteAdapter());
    this.frameworkAdapters.set('vanilla', new VanillaAdapter());
  }

  register(name: string, component: any, options: {
    framework: 'react' | 'vue' | 'angular' | 'svelte' | 'vanilla';
    ssr?: boolean;
    hydrate?: boolean;
    priority?: 'high' | 'normal' | 'low';
  }) {
    this.registry[name] = {
      framework: options.framework,
      component,
      ssr: options.ssr ?? true,
      hydrate: options.hydrate ?? true,
      priority: options.priority ?? 'normal',
    };
  }

  unregister(name: string) {
    delete this.registry[name];
  }

  createIsland(config: {
    id: string;
    component: string;
    props?: Record<string, any>;
    hydrate?: boolean;
    priority?: 'high' | 'normal' | 'low';
  }): IslandRuntime {
    const componentInfo = this.registry[config.component];
    if (!componentInfo) {
      throw new Error(`Component "${config.component}" not found in registry`);
    }

    const container = document.getElementById(`island-${config.id}`);
    if (!container) {
      throw new Error(`Container not found for island: ${config.id}`);
    }

    const island: IslandRuntime = {
      id: config.id,
      component: config.component,
      props: config.props || {},
      hydrate: config.hydrate ?? componentInfo.hydrate,
      priority: config.priority ?? componentInfo.priority,
      framework: componentInfo.framework,
      container,
      mounted: false,
    };

    this.islands.set(config.id, island);
    return island;
  }

  async mountIsland(island: IslandRuntime): Promise<void> {
    const adapter = this.frameworkAdapters.get(island.framework);
    if (!adapter) {
      throw new Error(`Framework adapter not found for: ${island.framework}`);
    }

    const componentInfo = this.registry[island.component];
    if (!componentInfo) {
      throw new Error(`Component "${island.component}" not found`);
    }

    try {
      island.instance = await adapter.mount(componentInfo.component, island.container, island.props);
      island.mounted = true;
    } catch (error) {
      console.error(`Failed to mount island ${island.id}:`, error);
      throw error;
    }
  }

  unmountIsland(island: IslandRuntime): void {
    if (!island.mounted) return;

    const adapter = this.frameworkAdapters.get(island.framework);
    if (adapter && island.instance) {
      adapter.unmount(island.instance, island.container);
      island.instance = undefined;
      island.mounted = false;
    }
  }

  async hydrateIsland(island: IslandRuntime): Promise<void> {
    if (!island.hydrate) return;

    const adapter = this.frameworkAdapters.get(island.framework);
    if (!adapter) {
      throw new Error(`Framework adapter not found for: ${island.framework}`);
    }

    try {
      await adapter.hydrate(island.instance, island.container, island.props);
    } catch (error) {
      console.error(`Failed to hydrate island ${island.id}:`, error);
      throw error;
    }
  }

  serializeIsland(island: IslandRuntime): string {
    return JSON.stringify({
      id: island.id,
      component: island.component,
      props: island.props,
      hydrate: island.hydrate,
      priority: island.priority,
      framework: island.framework,
    });
  }

  deserializeIsland(data: string): IslandRuntime {
    const parsed = JSON.parse(data);
    return this.createIsland(parsed);
  }

  getIsland(id: string): IslandRuntime | undefined {
    return this.islands.get(id);
  }

  getAllIslands(): IslandRuntime[] {
    return Array.from(this.islands.values());
  }

  getIslandsByPriority(priority: 'high' | 'normal' | 'low'): IslandRuntime[] {
    return this.getAllIslands().filter(island => island.priority === priority);
  }
}

// Framework Adapters
interface FrameworkAdapter {
  mount(component: any, container: HTMLElement, props: Record<string, any>): Promise<any>;
  unmount(instance: any, container: HTMLElement): void;
  hydrate(instance: any, container: HTMLElement, props: Record<string, any>): Promise<void>;
}

class ReactAdapter implements FrameworkAdapter {
  async mount(component: any, container: HTMLElement, props: Record<string, any>): Promise<any> {
    // Dynamic import for React
    const React = await import('react');
    const ReactDOM = await import('react-dom/client');
    
    const root = ReactDOM.createRoot(container);
    const element = React.createElement(component, props);
    root.render(element);
    
    return root;
  }

  unmount(instance: any, container: HTMLElement): void {
    if (instance && typeof instance.unmount === 'function') {
      instance.unmount();
    }
  }

  async hydrate(instance: any, container: HTMLElement, props: Record<string, any>): Promise<void> {
    // React hydration is handled automatically by ReactDOM.createRoot
    // This method can be used for additional hydration logic if needed
  }
}

class VueAdapter implements FrameworkAdapter {
  async mount(component: any, container: HTMLElement, props: Record<string, any>): Promise<any> {
    // Dynamic import for Vue
    const { createApp } = await import('vue');
    
    const app = createApp(component, props);
    const instance = app.mount(container);
    
    return { app, instance };
  }

  unmount(instance: any, container: HTMLElement): void {
    if (instance && instance.app && typeof instance.app.unmount === 'function') {
      instance.app.unmount();
    }
  }

  async hydrate(instance: any, container: HTMLElement, props: Record<string, any>): Promise<void> {
    // Vue hydration is handled automatically by createApp
  }
}

class AngularAdapter implements FrameworkAdapter {
  async mount(component: any, container: HTMLElement, props: Record<string, any>): Promise<any> {
    // Dynamic import for Angular
    const { Component, Input, forwardRef } = await import('@angular/core');
    const { createComponent } = await import('@angular/core');
    
    // Create a dynamic component factory
    const dynamicComponent = Component({
      selector: 'uds-dynamic-component',
      template: `<ng-container *ngComponentOutlet="component; inputs: props"></ng-container>`,
    })(class DynamicComponent {
      component = component;
      props = props;
    });
    
    const instance = createComponent(dynamicComponent, { environmentInjector: null });
    container.appendChild(instance.location.nativeElement);
    
    return instance;
  }

  unmount(instance: any, container: HTMLElement): void {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
  }

  async hydrate(instance: any, container: HTMLElement, props: Record<string, any>): Promise<void> {
    // Angular hydration is handled automatically
  }
}

class SvelteAdapter implements FrameworkAdapter {
  async mount(component: any, container: HTMLElement, props: Record<string, any>): Promise<any> {
    // Dynamic import for Svelte
    const { mount } = await import('svelte');
    
    const instance = mount(component, {
      target: container,
      props,
    });
    
    return instance;
  }

  unmount(instance: any, container: HTMLElement): void {
    if (instance && typeof instance.$destroy === 'function') {
      instance.$destroy();
    }
  }

  async hydrate(instance: any, container: HTMLElement, props: Record<string, any>): Promise<void> {
    // Svelte hydration is handled automatically by mount
  }
}

class VanillaAdapter implements FrameworkAdapter {
  async mount(component: any, container: HTMLElement, props: Record<string, any>): Promise<any> {
    // For vanilla JS components, we expect a function that returns HTML or DOM element
    if (typeof component === 'function') {
      const result = component(props);
      
      if (typeof result === 'string') {
        container.innerHTML = result;
      } else if (result instanceof HTMLElement) {
        container.appendChild(result);
      } else if (result && typeof result.render === 'function') {
        result.render(container);
      }
      
      return result;
    }
    
    throw new Error('Vanilla component must be a function');
  }

  unmount(instance: any, container: HTMLElement): void {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    } else {
      container.innerHTML = '';
    }
  }

  async hydrate(instance: any, container: HTMLElement, props: Record<string, any>): Promise<void> {
    if (instance && typeof instance.hydrate === 'function') {
      instance.hydrate(container, props);
    }
  }
}

// Global instance
export const islandManager = new UniversalIslandManager();