import { Router } from 'express';
import { z } from 'zod';
import { APIResponse, IslandRequest, IslandResponse } from '../types';

const router = Router();

// Validation schemas
const IslandRequestSchema = z.object({
  id: z.string().min(1),
  component: z.string().min(1),
  props: z.record(z.any()).optional(),
  hydrate: z.boolean().optional(),
  priority: z.enum(['high', 'normal', 'low']).optional(),
  ssr: z.boolean().optional(),
});

const IslandBatchRequestSchema = z.object({
  islands: z.array(IslandRequestSchema),
});

// GET /api/v1/islands - Get all islands
router.get('/', (req, res) => {
  try {
    // TODO: Get islands from registry
    const islands: IslandResponse[] = [];
    
    const response: APIResponse<IslandResponse[]> = {
      success: true,
      data: islands,
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to get islands',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// GET /api/v1/islands/:id - Get specific island
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Get island from registry
    const island: IslandResponse | null = null;
    
    if (!island) {
      const response: APIResponse = {
        success: false,
        error: 'Island not found',
        message: `Island with id ${id} not found`,
      };
      return res.status(404).json(response);
    }
    
    const response: APIResponse<IslandResponse> = {
      success: true,
      data: island,
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to get island',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// POST /api/v1/islands - Create new island
router.post('/', (req, res) => {
  try {
    const validatedData = IslandRequestSchema.parse(req.body);
    
    // TODO: Create island in registry
    const island: IslandResponse = {
      id: validatedData.id,
      html: `<div id="island-${validatedData.id}" data-component="${validatedData.component}"></div>`,
      props: validatedData.props || {},
      metadata: {
        component: validatedData.component,
        hydrate: validatedData.hydrate || false,
        priority: validatedData.priority || 'normal',
        ssr: validatedData.ssr || false,
        timestamp: new Date().toISOString(),
      },
    };
    
    const response: APIResponse<IslandResponse> = {
      success: true,
      data: island,
      message: 'Island created successfully',
    };
    
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: APIResponse = {
        success: false,
        error: 'Validation error',
        message: error.errors.map(e => e.message).join(', '),
      };
      return res.status(400).json(response);
    }
    
    const response: APIResponse = {
      success: false,
      error: 'Failed to create island',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// POST /api/v1/islands/batch - Create multiple islands
router.post('/batch', (req, res) => {
  try {
    const validatedData = IslandBatchRequestSchema.parse(req.body);
    
    // TODO: Create islands in registry
    const islands: IslandResponse[] = validatedData.islands.map(island => ({
      id: island.id,
      html: `<div id="island-${island.id}" data-component="${island.component}"></div>`,
      props: island.props || {},
      metadata: {
        component: island.component,
        hydrate: island.hydrate || false,
        priority: island.priority || 'normal',
        ssr: island.ssr || false,
        timestamp: new Date().toISOString(),
      },
    }));
    
    const response: APIResponse<IslandResponse[]> = {
      success: true,
      data: islands,
      message: `${islands.length} islands created successfully`,
    };
    
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: APIResponse = {
        success: false,
        error: 'Validation error',
        message: error.errors.map(e => e.message).join(', '),
      };
      return res.status(400).json(response);
    }
    
    const response: APIResponse = {
      success: false,
      error: 'Failed to create islands',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// PUT /api/v1/islands/:id - Update island
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = IslandRequestSchema.partial().parse(req.body);
    
    // TODO: Update island in registry
    const island: IslandResponse | null = null;
    
    if (!island) {
      const response: APIResponse = {
        success: false,
        error: 'Island not found',
        message: `Island with id ${id} not found`,
      };
      return res.status(404).json(response);
    }
    
    const response: APIResponse<IslandResponse> = {
      success: true,
      data: island,
      message: 'Island updated successfully',
    };
    
    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: APIResponse = {
        success: false,
        error: 'Validation error',
        message: error.errors.map(e => e.message).join(', '),
      };
      return res.status(400).json(response);
    }
    
    const response: APIResponse = {
      success: false,
      error: 'Failed to update island',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// DELETE /api/v1/islands/:id - Delete island
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Delete island from registry
    const deleted = true; // Replace with actual deletion logic
    
    if (!deleted) {
      const response: APIResponse = {
        success: false,
        error: 'Island not found',
        message: `Island with id ${id} not found`,
      };
      return res.status(404).json(response);
    }
    
    const response: APIResponse = {
      success: true,
      message: 'Island deleted successfully',
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to delete island',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// POST /api/v1/islands/:id/hydrate - Hydrate specific island
router.post('/:id/hydrate', (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Hydrate island
    const hydrated = true; // Replace with actual hydration logic
    
    if (!hydrated) {
      const response: APIResponse = {
        success: false,
        error: 'Island not found',
        message: `Island with id ${id} not found`,
      };
      return res.status(404).json(response);
    }
    
    const response: APIResponse = {
      success: true,
      message: 'Island hydrated successfully',
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to hydrate island',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// POST /api/v1/islands/hydrate - Hydrate all islands
router.post('/hydrate', (req, res) => {
  try {
    // TODO: Hydrate all islands
    const hydratedCount = 0; // Replace with actual hydration logic
    
    const response: APIResponse = {
      success: true,
      data: { hydratedCount },
      message: `${hydratedCount} islands hydrated successfully`,
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to hydrate islands',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

export { router as islandRoutes };