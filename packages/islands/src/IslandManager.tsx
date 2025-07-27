import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Island, IslandRegistry, IslandContext as IslandContextType, IslandConfig } from './types';
import { IslandRenderer } from './IslandRenderer';
import { IslandHydrator } from './IslandHydrator';

const IslandContext = createContext<IslandContextType | null>(null);

export function useIslands() {
  const context = useContext(IslandContext);
  if (!context) {
    throw new Error('useIslands must be used within an IslandProvider');
  }
  return context;
}

interface IslandProviderProps {
  children: ReactNode;
  config?: IslandConfig;
}

export function IslandProvider({ children, config = {} }: IslandProviderProps) {
  const [islands, setIslands] = useState<Island[]>([]);
  const [registry, setRegistry] = useState<IslandRegistry>({});

  const addIsland = useCallback((island: Island) => {
    setIslands(prev => [...prev, island]);
  }, []);

  const removeIsland = useCallback((id: string) => {
    setIslands(prev => prev.filter(island => island.id !== id));
  }, []);

  const updateIsland = useCallback((id: string, updates: Partial<Island>) => {
    setIslands(prev => prev.map(island => 
      island.id === id ? { ...island, ...updates } : island
    ));
  }, []);

  const getIsland = useCallback((id: string) => {
    return islands.find(island => island.id === id);
  }, [islands]);

  const getAllIslands = useCallback(() => {
    return islands;
  }, [islands]);

  const register = useCallback((name: string, component: React.ComponentType<any>, options = {}) => {
    setRegistry(prev => ({
      ...prev,
      [name]: {
        component,
        ssr: true,
        hydrate: true,
        priority: 'normal',
        ...options,
      },
    }));
  }, []);

  const unregister = useCallback((name: string) => {
    setRegistry(prev => {
      const newRegistry = { ...prev };
      delete newRegistry[name];
      return newRegistry;
    });
  }, []);

  const contextValue: IslandContextType = {
    islands,
    registry,
    addIsland,
    removeIsland,
    updateIsland,
    getIsland,
    getAllIslands,
  };

  return (
    <IslandContext.Provider value={contextValue}>
      {children}
      {config.autoHydrate && (
        <IslandHydrator
          islands={islands}
          registry={registry}
          onHydrationComplete={config.onHydrationComplete}
          onError={config.onError}
        />
      )}
    </IslandContext.Provider>
  );
}

export function IslandRenderer({ islands, registry, onError, onLoad }: {
  islands: Island[];
  registry: IslandRegistry;
  onError?: (error: Error, island: Island) => void;
  onLoad?: (island: Island) => void;
}) {
  return (
    <>
      {islands.map((island) => (
        <IslandRenderer
          key={island.id}
          island={island}
          registry={registry}
          onError={onError}
          onLoad={onLoad}
        />
      ))}
    </>
  );
}

export function IslandComponent({ island, registry, onError, onLoad }: {
  island: Island;
  registry: IslandRegistry;
  onError?: (error: Error, island: Island) => void;
  onLoad?: (island: Island) => void;
}) {
  const Component = registry[island.component]?.component;

  if (!Component) {
    const error = new Error(`Component "${island.component}" not found in registry`);
    onError?.(error, island);
    return island.fallback || <div>Component not found: {island.component}</div>;
  }

  React.useEffect(() => {
    onLoad?.(island);
  }, [island, onLoad]);

  return (
    <ErrorBoundary onError={(error) => onError?.(error, island)}>
      <Component {...island.props} />
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
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