// Base component interface that works across all frameworks
export interface BaseComponentConfig {
  name: string;
  framework: 'react' | 'vue' | 'angular' | 'svelte' | 'vanilla';
  props: Record<string, any>;
  styles: Record<string, any>;
  events: Record<string, Function>;
  lifecycle?: {
    onMount?: Function;
    onUnmount?: Function;
    onUpdate?: Function;
  };
}

// Universal component factory
export class UniversalComponent {
  private config: BaseComponentConfig;

  constructor(config: BaseComponentConfig) {
    this.config = config;
  }

  // Generate React component
  toReact() {
    const { name, props, styles, events, lifecycle } = this.config;
    
    return {
      name,
      component: (componentProps: any) => {
        const React = require('react');
        const [state, setState] = React.useState({});
        
        React.useEffect(() => {
          lifecycle?.onMount?.(componentProps);
          return () => lifecycle?.onUnmount?.();
        }, []);
        
        React.useEffect(() => {
          lifecycle?.onUpdate?.(componentProps);
        }, [componentProps]);
        
        const handleEvent = (eventName: string, ...args: any[]) => {
          events[eventName]?.(...args);
        };
        
        return React.createElement('div', {
          className: this.generateClassName(styles),
          ...this.mapProps(props, componentProps),
          ...this.mapEvents(events, handleEvent),
        });
      }
    };
  }

  // Generate Vue component
  toVue() {
    const { name, props, styles, events, lifecycle } = this.config;
    
    return {
      name,
      component: {
        name,
        props: Object.keys(props),
        template: this.generateVueTemplate(),
        data() {
          return { state: {} };
        },
        mounted() {
          lifecycle?.onMount?.(this.$props);
        },
        unmounted() {
          lifecycle?.onUnmount?.();
        },
        updated() {
          lifecycle?.onUpdate?.(this.$props);
        },
        methods: {
          ...this.mapVueEvents(events),
        },
      }
    };
  }

  // Generate Angular component
  toAngular() {
    const { name, props, styles, events, lifecycle } = this.config;
    
    return {
      name,
      component: {
        selector: `uds-${name.toLowerCase()}`,
        template: this.generateAngularTemplate(),
        inputs: Object.keys(props),
        outputs: Object.keys(events).map(event => `${event}Change`),
        styles: [this.generateAngularStyles(styles)],
        lifecycle: {
          ngOnInit() {
            lifecycle?.onMount?.(this);
          },
          ngOnDestroy() {
            lifecycle?.onUnmount?.();
          },
          ngOnChanges() {
            lifecycle?.onUpdate?.(this);
          },
        },
        methods: this.mapAngularEvents(events),
      }
    };
  }

  // Generate Svelte component
  toSvelte() {
    const { name, props, styles, events, lifecycle } = this.config;
    
    return {
      name,
      component: {
        name,
        props: Object.keys(props),
        template: this.generateSvelteTemplate(),
        script: this.generateSvelteScript(events, lifecycle),
        styles: this.generateSvelteStyles(styles),
      }
    };
  }

  // Generate Vanilla JS component
  toVanilla() {
    const { name, props, styles, events, lifecycle } = this.config;
    
    return {
      name,
      component: (componentProps: any) => {
        const element = document.createElement('div');
        element.className = this.generateClassName(styles);
        
        // Apply props
        Object.entries(props).forEach(([key, value]) => {
          if (componentProps[key] !== undefined) {
            element.setAttribute(key, componentProps[key]);
          } else {
            element.setAttribute(key, value);
          }
        });
        
        // Add event listeners
        Object.entries(events).forEach(([eventName, handler]) => {
          element.addEventListener(eventName, (e) => handler(e, componentProps));
        });
        
        // Lifecycle
        lifecycle?.onMount?.(componentProps);
        
        return {
          element,
          destroy: () => {
            lifecycle?.onUnmount?.();
            element.remove();
          },
          update: (newProps: any) => {
            lifecycle?.onUpdate?.(newProps);
          },
        };
      }
    };
  }

  private generateClassName(styles: Record<string, any>): string {
    return Object.entries(styles)
      .map(([key, value]) => `${key}-${value}`)
      .join(' ');
  }

  private mapProps(props: Record<string, any>, componentProps: any): Record<string, any> {
    const mappedProps: Record<string, any> = {};
    
    Object.entries(props).forEach(([key, defaultValue]) => {
      mappedProps[key] = componentProps[key] !== undefined ? componentProps[key] : defaultValue;
    });
    
    return mappedProps;
  }

  private mapEvents(events: Record<string, Function>, handler: Function): Record<string, Function> {
    const mappedEvents: Record<string, Function> = {};
    
    Object.keys(events).forEach(eventName => {
      mappedEvents[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = handler.bind(null, eventName);
    });
    
    return mappedEvents;
  }

  private generateVueTemplate(): string {
    return `<div class="${this.generateClassName(this.config.styles)}">
      <slot></slot>
    </div>`;
  }

  private mapVueEvents(events: Record<string, Function>): Record<string, Function> {
    const mappedEvents: Record<string, Function> = {};
    
    Object.entries(events).forEach(([eventName, handler]) => {
      mappedEvents[`handle${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = handler;
    });
    
    return mappedEvents;
  }

  private generateAngularTemplate(): string {
    return `<div class="${this.generateClassName(this.config.styles)}">
      <ng-content></ng-content>
    </div>`;
  }

  private generateAngularStyles(styles: Record<string, any>): string {
    return Object.entries(styles)
      .map(([key, value]) => `.${key}-${value} { /* styles */ }`)
      .join('\n');
  }

  private mapAngularEvents(events: Record<string, Function>): Record<string, Function> {
    const mappedEvents: Record<string, Function> = {};
    
    Object.entries(events).forEach(([eventName, handler]) => {
      mappedEvents[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = handler;
    });
    
    return mappedEvents;
  }

  private generateSvelteTemplate(): string {
    return `<div class="${this.generateClassName(this.config.styles)}">
      <slot></slot>
    </div>`;
  }

  private generateSvelteScript(events: Record<string, Function>, lifecycle?: any): string {
    const eventHandlers = Object.entries(events)
      .map(([eventName, handler]) => `const handle${eventName.charAt(0).toUpperCase() + eventName.slice(1)} = ${handler.toString()};`)
      .join('\n');
    
    return `
      import { onMount, onDestroy, afterUpdate } from 'svelte';
      
      ${eventHandlers}
      
      onMount(() => {
        ${lifecycle?.onMount ? lifecycle.onMount.toString() : ''}
      });
      
      onDestroy(() => {
        ${lifecycle?.onUnmount ? lifecycle.onUnmount.toString() : ''}
      });
      
      afterUpdate(() => {
        ${lifecycle?.onUpdate ? lifecycle.onUpdate.toString() : ''}
      });
    `;
  }

  private generateSvelteStyles(styles: Record<string, any>): string {
    return Object.entries(styles)
      .map(([key, value]) => `.${key}-${value} { /* styles */ }`)
      .join('\n');
  }
}

// Component factory function
export function createUniversalComponent(config: BaseComponentConfig): UniversalComponent {
  return new UniversalComponent(config);
}

// Pre-built components
export const ButtonComponent = createUniversalComponent({
  name: 'Button',
  framework: 'react',
  props: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  styles: {
    button: 'uds-button',
    variant: 'primary',
    size: 'md',
  },
  events: {
    click: (event: Event, props: any) => {
      if (!props.disabled && !props.loading) {
        console.log('Button clicked');
      }
    },
  },
  lifecycle: {
    onMount: (props: any) => {
      console.log('Button mounted with props:', props);
    },
    onUnmount: () => {
      console.log('Button unmounted');
    },
  },
});

export const InputComponent = createUniversalComponent({
  name: 'Input',
  framework: 'react',
  props: {
    type: 'text',
    placeholder: '',
    value: '',
    disabled: false,
    required: false,
    error: false,
  },
  styles: {
    input: 'uds-input',
    type: 'text',
  },
  events: {
    input: (event: Event, props: any) => {
      const target = event.target as HTMLInputElement;
      console.log('Input value:', target.value);
    },
    focus: (event: Event, props: any) => {
      console.log('Input focused');
    },
    blur: (event: Event, props: any) => {
      console.log('Input blurred');
    },
  },
  lifecycle: {
    onMount: (props: any) => {
      console.log('Input mounted with props:', props);
    },
  },
});