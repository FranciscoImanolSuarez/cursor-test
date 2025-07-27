// React Adapter - Compiles Universal Components to React
import React from 'react';
import { UniversalNode, UniversalProps, UniversalEvent } from '../UniversalComponent';

// Convert universal node to React element
export function universalToReact(node: UniversalNode): React.ReactElement | null {
  if (!node || typeof node === 'string' || typeof node === 'number') {
    return node as React.ReactElement;
  }

  if (typeof node === 'object' && node !== null) {
    const { name, props, children, style, events } = node as any;

    // Handle universal components
    if (name === 'Button') {
      return React.createElement(UniversalButtonComponent, {
        ...props,
        style,
        ...mapEvents(events),
      }, children);
    }

    if (name === 'Input') {
      return React.createElement(UniversalInputComponent, {
        ...props,
        style,
        ...mapEvents(events),
      }, children);
    }

    if (name === 'Card') {
      return React.createElement(UniversalCardComponent, {
        ...props,
        style,
        ...mapEvents(events),
      }, children);
    }

    if (name === 'Modal') {
      return React.createElement(UniversalModalComponent, {
        ...props,
        style,
        ...mapEvents(events),
      }, children);
    }

    // Handle regular HTML elements
    return React.createElement(name, {
      ...props,
      style,
      ...mapEvents(events),
    }, children);
  }

  return null;
}

// Map universal events to React events
function mapEvents(events: Record<string, Function> | undefined): Record<string, Function> {
  if (!events) return {};

  const reactEvents: Record<string, Function> = {};
  
  Object.entries(events).forEach(([eventName, handler]) => {
    const reactEventName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
    reactEvents[reactEventName] = (event: any) => {
      const universalEvent: UniversalEvent = {
        type: eventName,
        target: event.target,
        ...event,
      };
      handler(universalEvent, {});
    };
  });

  return reactEvents;
}

// Universal Button Component for React
const UniversalButtonComponent: React.FC<UniversalProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  fullWidth = false,
  children,
  style,
  onClick,
  ...props 
}) => {
  const baseClass = 'uds-button';
  const variantClass = `uds-button--${variant}`;
  const sizeClass = `uds-button--${size}`;
  const widthClass = fullWidth ? 'uds-button--full-width' : '';
  const loadingClass = loading ? 'uds-button--loading' : '';

  const className = [baseClass, variantClass, sizeClass, widthClass, loadingClass]
    .filter(Boolean)
    .join(' ');

  return React.createElement('button', {
    className,
    disabled: disabled || loading,
    style,
    onClick,
    ...props,
  }, children);
};

// Universal Input Component for React
const UniversalInputComponent: React.FC<UniversalProps> = ({ 
  type = 'text',
  placeholder = '',
  value = '',
  disabled = false,
  required = false,
  error = false,
  label = '',
  helperText = '',
  style,
  onChange,
  onFocus,
  onBlur,
  ...props 
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  const baseClass = 'uds-input';
  const errorClass = error ? 'uds-input--error' : '';

  const className = [baseClass, errorClass].filter(Boolean).join(' ');

  return React.createElement('div', { className: 'uds-input-container' },
    label && React.createElement('label', { 
      htmlFor: inputId, 
      className: 'uds-input-label' 
    }, label),
    React.createElement('input', {
      id: inputId,
      type,
      placeholder,
      value,
      disabled,
      required,
      className,
      style,
      onChange,
      onFocus,
      onBlur,
      ...props,
    }),
    helperText && React.createElement('div', { 
      className: 'uds-input-helper' 
    }, helperText)
  );
};

// Universal Card Component for React
const UniversalCardComponent: React.FC<UniversalProps> = ({ 
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  children,
  style,
  ...props 
}) => {
  const baseClass = 'uds-card';
  const variantClass = `uds-card--${variant}`;
  const paddingClass = `uds-card--padding-${padding}`;
  const shadowClass = `uds-card--shadow-${shadow}`;

  const className = [baseClass, variantClass, paddingClass, shadowClass]
    .filter(Boolean)
    .join(' ');

  return React.createElement('div', {
    className,
    style,
    ...props,
  }, children);
};

// Universal Modal Component for React
const UniversalModalComponent: React.FC<UniversalProps> = ({ 
  isOpen = false,
  title = '',
  size = 'md',
  children,
  style,
  onClose,
  ...props 
}) => {
  if (!isOpen) return null;

  const baseClass = 'uds-modal';
  const sizeClass = `uds-modal--${size}`;

  const className = [baseClass, sizeClass].filter(Boolean).join(' ');

  return React.createElement('div', {
    className: 'uds-modal-overlay',
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
    onClick: onClose,
  },
    React.createElement('div', {
      className,
      style,
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
      ...props,
    },
      title && React.createElement('h2', { className: 'uds-modal-title' }, title),
      React.createElement('div', { className: 'uds-modal-content' }, children)
    )
  );
};

// Universal Hooks for React
export function useUniversalState<T>(initialValue: T, key: string): [T, (value: T) => void] {
  return React.useState<T>(initialValue);
}

export function useUniversalEffect(effect: React.EffectCallback, dependencies: React.DependencyList, key: string): void {
  React.useEffect(effect, dependencies);
}

export function useUniversalRef<T>(initialValue: T, key: string): React.MutableRefObject<T> {
  return React.useRef<T>(initialValue);
}

export function useUniversalCallback<T extends (...args: any[]) => any>(
  callback: T, 
  dependencies: React.DependencyList, 
  key: string
): T {
  return React.useCallback(callback, dependencies);
}

export function useUniversalMemo<T>(
  factory: () => T, 
  dependencies: React.DependencyList, 
  key: string
): T {
  return React.useMemo(factory, dependencies);
}

// Universal StyleSheet for React
export const UniversalStyleSheet = {
  create: (styles: Record<string, any>): Record<string, any> => styles,
  flatten: (style: any): any => style,
};

// Universal Platform for React
export const UniversalPlatform = {
  isWeb: () => typeof window !== 'undefined',
  isReact: () => true,
  isVue: () => false,
  isAngular: () => false,
  isSvelte: () => false,
  getPlatform: () => 'react',
};

// Universal Storage for React
export const UniversalStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
  clear: async (): Promise<void> => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  },
};

// Universal Network for React
export const UniversalNetwork = {
  fetch: async (url: string, options: RequestInit = {}): Promise<Response> => {
    return fetch(url, options);
  },
  get: async (url: string, headers: Record<string, string> = {}): Promise<Response> => {
    return fetch(url, { method: 'GET', headers });
  },
  post: async (url: string, data: any, headers: Record<string, string> = {}): Promise<Response> => {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(data),
    });
  },
  put: async (url: string, data: any, headers: Record<string, string> = {}): Promise<Response> => {
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(data),
    });
  },
  delete: async (url: string, headers: Record<string, string> = {}): Promise<Response> => {
    return fetch(url, { method: 'DELETE', headers });
  },
};

// Export React adapter
export const ReactAdapter = {
  universalToReact,
  useUniversalState,
  useUniversalEffect,
  useUniversalRef,
  useUniversalCallback,
  useUniversalMemo,
  UniversalStyleSheet,
  UniversalPlatform,
  UniversalStorage,
  UniversalNetwork,
};