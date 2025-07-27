import React, { useEffect, useState } from 'react';
import { Island, IslandRegistry, IslandRendererProps } from './types';

export function IslandRenderer({ island, registry, onError, onLoad }: IslandRendererProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const componentInfo = registry[island.component];
        if (!componentInfo) {
          throw new Error(`Component "${island.component}" not found in registry`);
        }

        setComponent(() => componentInfo.component);
        onLoad?.(island);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error, island);
      } finally {
        setIsLoading(false);
      }
    };

    loadComponent();
  }, [island.component, registry, island, onError, onLoad]);

  if (isLoading) {
    return island.fallback || <div>Loading...</div>;
  }

  if (error) {
    return island.fallback || <div>Error: {error.message}</div>;
  }

  if (!Component) {
    return island.fallback || <div>Component not found: {island.component}</div>;
  }

  return (
    <ErrorBoundary onError={(error) => onError?.(error, island)}>
      <Component {...island.props} />
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}