import { Router } from 'express';
import { z } from 'zod';
import { APIResponse, ThemeConfig } from '../types';

const router = Router();

// Validation schemas
const ThemeConfigSchema = z.object({
  name: z.string().min(1),
  tokens: z.record(z.any()),
  variables: z.record(z.string()),
});

// GET /api/v1/themes - Get all themes
router.get('/', (req, res) => {
  try {
    // TODO: Get themes from registry
    const themes: ThemeConfig[] = [];
    
    const response: APIResponse<ThemeConfig[]> = {
      success: true,
      data: themes,
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to get themes',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// GET /api/v1/themes/:name - Get specific theme
router.get('/:name', (req, res) => {
  try {
    const { name } = req.params;
    
    // TODO: Get theme from registry
    const theme: ThemeConfig | null = null;
    
    if (!theme) {
      const response: APIResponse = {
        success: false,
        error: 'Theme not found',
        message: `Theme ${name} not found`,
      };
      return res.status(404).json(response);
    }
    
    const response: APIResponse<ThemeConfig> = {
      success: true,
      data: theme,
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to get theme',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// POST /api/v1/themes - Create new theme
router.post('/', (req, res) => {
  try {
    const validatedData = ThemeConfigSchema.parse(req.body);
    
    // TODO: Create theme in registry
    const theme: ThemeConfig = {
      ...validatedData,
    };
    
    const response: APIResponse<ThemeConfig> = {
      success: true,
      data: theme,
      message: 'Theme created successfully',
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
      error: 'Failed to create theme',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// PUT /api/v1/themes/:name - Update theme
router.put('/:name', (req, res) => {
  try {
    const { name } = req.params;
    const validatedData = ThemeConfigSchema.partial().parse(req.body);
    
    // TODO: Update theme in registry
    const theme: ThemeConfig | null = null;
    
    if (!theme) {
      const response: APIResponse = {
        success: false,
        error: 'Theme not found',
        message: `Theme ${name} not found`,
      };
      return res.status(404).json(response);
    }
    
    const response: APIResponse<ThemeConfig> = {
      success: true,
      data: theme,
      message: 'Theme updated successfully',
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
      error: 'Failed to update theme',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// DELETE /api/v1/themes/:name - Delete theme
router.delete('/:name', (req, res) => {
  try {
    const { name } = req.params;
    
    // TODO: Delete theme from registry
    const deleted = true; // Replace with actual deletion logic
    
    if (!deleted) {
      const response: APIResponse = {
        success: false,
        error: 'Theme not found',
        message: `Theme ${name} not found`,
      };
      return res.status(404).json(response);
    }
    
    const response: APIResponse = {
      success: true,
      message: 'Theme deleted successfully',
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to delete theme',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

export { router as themeRoutes };