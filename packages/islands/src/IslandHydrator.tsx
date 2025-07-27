import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Island, IslandRegistry, IslandHydratorProps } from './types';
import { IslandRenderer } from './IslandRenderer';

export function IslandHydrator({ 
  islands, 
  registry, 
  onHydrationComplete, 
  onError 
}: IslandHydratorProps) {
  const hydrationRefs = useRef<Map<string, Root>>(new Map());
  const hydratedIslands = useRef<Set<string>>(new Set());

  useEffect(() => {
    const hydrateIslands = async () => {
      const islandsToHydrate = islands.filter(island => 
        island.hydrate && 
        !hydratedIslands.current.has(island.id) &&
        registry[island.component]?.hydrate
      );

      if (islandsToHydrate.length === 0) {
        onHydrationComplete?.();
        return;
      }

      // Sort by priority
      const sortedIslands = islandsToHydrate.sort((a, b) => {
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        const aPriority = priorityOrder[a.priority || 'normal'];
        const bPriority = priorityOrder[b.priority || 'normal'];
        return bPriority - aPriority;
      });

      for (const island of sortedIslands) {
        try {
          await hydrateIsland(island);
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Hydration failed');
          onError?.(err, island);
        }
      }

      onHydrationComplete?.();
    };

    hydrateIslands();
  }, [islands, registry, onHydrationComplete, onError]);

  const hydrateIsland = async (island: Island) => {
    const container = document.getElementById(`island-${island.id}`);
    if (!container) {
      throw new Error(`Container not found for island: ${island.id}`);
    }

    // Create React root if it doesn't exist
    let root = hydrationRefs.current.get(island.id);
    if (!root) {
      root = createRoot(container);
      hydrationRefs.current.set(island.id, root);
    }

    // Render the component
    root.render(
      <IslandRenderer
        island={island}
        registry={registry}
        onError={onError}
        onLoad={() => {
          hydratedIslands.current.add(island.id);
        }}
      />
    );
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      hydrationRefs.current.forEach((root) => {
        root.unmount();
      });
      hydrationRefs.current.clear();
      hydratedIslands.current.clear();
    };
  }, []);

  return null;
}

// Helper function to create island containers
export function createIslandContainer(id: string): HTMLElement {
  const container = document.createElement('div');
  container.id = `island-${id}`;
  container.setAttribute('data-island', id);
  return container;
}

// Helper function to inject island containers into the DOM
export function injectIslandContainers(islands: Island[]): void {
  islands.forEach(island => {
    if (island.hydrate) {
      const container = createIslandContainer(island.id);
      document.body.appendChild(container);
    }
  });
}

// Helper function to remove island containers from the DOM
export function removeIslandContainers(islandIds: string[]): void {
  islandIds.forEach(id => {
    const container = document.getElementById(`island-${id}`);
    if (container) {
      container.remove();
    }
  });
}