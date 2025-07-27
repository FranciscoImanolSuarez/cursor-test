import { ReactNode } from 'react';

export interface Island {
  id: string;
  component: string;
  props?: Record<string, any>;
  hydrate?: boolean;
  priority?: 'high' | 'normal' | 'low';
  fallback?: ReactNode;
  errorBoundary?: boolean;
  ssr?: boolean;
}

export interface IslandRegistry {
  [componentName: string]: {
    component: React.ComponentType<any>;
    ssr?: boolean;
    hydrate?: boolean;
    priority?: 'high' | 'normal' | 'low';
  };
}

export interface IslandContext {
  islands: Island[];
  registry: IslandRegistry;
  addIsland: (island: Island) => void;
  removeIsland: (id: string) => void;
  updateIsland: (id: string, updates: Partial<Island>) => void;
  getIsland: (id: string) => Island | undefined;
  getAllIslands: () => Island[];
}

export interface IslandRendererProps {
  island: Island;
  registry: IslandRegistry;
  onError?: (error: Error, island: Island) => void;
  onLoad?: (island: Island) => void;
}

export interface IslandHydratorProps {
  islands: Island[];
  registry: IslandRegistry;
  onHydrationComplete?: () => void;
  onError?: (error: Error, island: Island) => void;
}

export interface IslandManager {
  register: (name: string, component: React.ComponentType<any>, options?: {
    ssr?: boolean;
    hydrate?: boolean;
    priority?: 'high' | 'normal' | 'low';
  }) => void;
  unregister: (name: string) => void;
  render: (islands: Island[]) => ReactNode;
  hydrate: (islands: Island[]) => Promise<void>;
  serialize: (islands: Island[]) => string;
  deserialize: (data: string) => Island[];
}

export interface IslandConfig {
  autoHydrate?: boolean;
  hydrationDelay?: number;
  errorBoundary?: boolean;
  fallbackComponent?: React.ComponentType<any>;
  onError?: (error: Error, island: Island) => void;
  onLoad?: (island: Island) => void;
  onHydrationComplete?: () => void;
}