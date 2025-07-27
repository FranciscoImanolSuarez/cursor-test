// Universal Component System - Framework Agnostic
// Similar to React Native's approach for web frameworks

export interface UniversalProps {
  [key: string]: any;
}

export interface UniversalStyle {
  [key: string]: any;
}

export interface UniversalEvent {
  type: string;
  target?: any;
  [key: string]: any;
}

export interface UniversalComponentConfig {
  name: string;
  props: UniversalProps;
  style?: UniversalStyle;
  children?: UniversalNode[];
  events?: Record<string, (event: UniversalEvent, props: UniversalProps) => void>;
  lifecycle?: {
    onMount?: (props: UniversalProps) => void;
    onUnmount?: () => void;
    onUpdate?: (props: UniversalProps) => void;
  };
}

export type UniversalNode = UniversalComponentConfig | string | number | null | undefined;

// Universal Component Class
export class UniversalComponent {
  private config: UniversalComponentConfig;
  private framework: string;

  constructor(config: UniversalComponentConfig, framework: string = 'web') {
    this.config = config;
    this.framework = framework;
  }

  // Universal render method - same for all frameworks
  render(props: UniversalProps = {}): UniversalNode {
    const mergedProps = { ...this.config.props, ...props };
    
    return {
      name: this.config.name,
      props: mergedProps,
      style: { ...this.config.style, ...mergedProps.style },
      children: this.config.children || mergedProps.children,
      events: this.config.events,
      lifecycle: this.config.lifecycle,
    };
  }

  // Universal event handler
  handleEvent(eventType: string, event: UniversalEvent, props: UniversalProps) {
    const handler = this.config.events?.[eventType];
    if (handler) {
      handler(event, props);
    }
  }

  // Universal lifecycle methods
  mount(props: UniversalProps) {
    this.config.lifecycle?.onMount?.(props);
  }

  unmount() {
    this.config.lifecycle?.onUnmount?.();
  }

  update(props: UniversalProps) {
    this.config.lifecycle?.onUpdate?.(props);
  }

  // Get component configuration
  getConfig(): UniversalComponentConfig {
    return this.config;
  }

  // Get framework
  getFramework(): string {
    return this.framework;
  }
}

// Universal Component Registry
export class UniversalComponentRegistry {
  private static instance: UniversalComponentRegistry;
  private components: Map<string, UniversalComponent> = new Map();

  static getInstance(): UniversalComponentRegistry {
    if (!UniversalComponentRegistry.instance) {
      UniversalComponentRegistry.instance = new UniversalComponentRegistry();
    }
    return UniversalComponentRegistry.instance;
  }

  register(name: string, component: UniversalComponent): void {
    this.components.set(name, component);
  }

  get(name: string): UniversalComponent | undefined {
    return this.components.get(name);
  }

  getAll(): Map<string, UniversalComponent> {
    return this.components;
  }

  unregister(name: string): void {
    this.components.delete(name);
  }
}

// Universal Renderer Interface
export interface UniversalRenderer {
  render(node: UniversalNode, container: any): any;
  unmount(instance: any): void;
  update(instance: any, node: UniversalNode): void;
}

// Framework-specific renderers
export class ReactRenderer implements UniversalRenderer {
  render(node: UniversalNode, container: any): any {
    // This would be implemented by the React adapter
    // The actual implementation depends on the framework
    return null;
  }

  unmount(instance: any): void {
    // React-specific unmounting
  }

  update(instance: any, node: UniversalNode): void {
    // React-specific updating
  }
}

export class VueRenderer implements UniversalRenderer {
  render(node: UniversalNode, container: any): any {
    // Vue-specific rendering
    return null;
  }

  unmount(instance: any): void {
    // Vue-specific unmounting
  }

  update(instance: any, node: UniversalNode): void {
    // Vue-specific updating
  }
}

export class AngularRenderer implements UniversalRenderer {
  render(node: UniversalNode, container: any): any {
    // Angular-specific rendering
    return null;
  }

  unmount(instance: any): void {
    // Angular-specific unmounting
  }

  update(instance: any, node: UniversalNode): void {
    // Angular-specific updating
  }
}

export class SvelteRenderer implements UniversalRenderer {
  render(node: UniversalNode, container: any): any {
    // Svelte-specific rendering
    return null;
  }

  unmount(instance: any): void {
    // Svelte-specific unmounting
  }

  update(instance: any, node: UniversalNode): void {
    // Svelte-specific updating
  }
}

export class VanillaRenderer implements UniversalRenderer {
  render(node: UniversalNode, container: any): any {
    // Vanilla JS rendering
    return null;
  }

  unmount(instance: any): void {
    // Vanilla JS unmounting
  }

  update(instance: any, node: UniversalNode): void {
    // Vanilla JS updating
  }
}

// Universal Component Factory
export function createUniversalComponent(config: UniversalComponentConfig): UniversalComponent {
  return new UniversalComponent(config);
}

// Pre-built Universal Components
export const UniversalButton = createUniversalComponent({
  name: 'Button',
  props: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    border: '1px solid transparent',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  events: {
    click: (event, props) => {
      if (!props.disabled && !props.loading) {
        console.log('Button clicked!', props);
      }
    },
  },
  lifecycle: {
    onMount: (props) => {
      console.log('Button mounted with props:', props);
    },
    onUnmount: () => {
      console.log('Button unmounted');
    },
  },
});

export const UniversalInput = createUniversalComponent({
  name: 'Input',
  props: {
    type: 'text',
    placeholder: '',
    value: '',
    disabled: false,
    required: false,
    error: false,
    label: '',
    helperText: '',
  },
  style: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: '#374151',
    backgroundColor: 'white',
    transition: 'border-color 0.2s ease-in-out',
  },
  events: {
    input: (event, props) => {
      console.log('Input value:', event.target?.value);
    },
    focus: (event, props) => {
      console.log('Input focused');
    },
    blur: (event, props) => {
      console.log('Input blurred');
    },
  },
  lifecycle: {
    onMount: (props) => {
      console.log('Input mounted with props:', props);
    },
  },
});

export const UniversalCard = createUniversalComponent({
  name: 'Card',
  props: {
    variant: 'default',
    padding: 'md',
    shadow: 'md',
  },
  style: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  lifecycle: {
    onMount: (props) => {
      console.log('Card mounted with props:', props);
    },
  },
});

export const UniversalModal = createUniversalComponent({
  name: 'Modal',
  props: {
    isOpen: false,
    title: '',
    size: 'md',
  },
  style: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  events: {
    close: (event, props) => {
      console.log('Modal closed');
    },
  },
  lifecycle: {
    onMount: (props) => {
      console.log('Modal mounted with props:', props);
    },
  },
});

// Export all components
export const UniversalComponents = {
  Button: UniversalButton,
  Input: UniversalInput,
  Card: UniversalCard,
  Modal: UniversalModal,
};