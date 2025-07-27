import { Router } from 'express';
import { APIResponse, HealthCheck } from '../types';

const router = Router();

// GET /api/v1/health - Get detailed health information
router.get('/', (req, res) => {
  try {
    const health: HealthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime() * 1000, // Convert to milliseconds
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        percentage: (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100,
      },
      components: {
        total: 0, // TODO: Get from registry
        registered: 0, // TODO: Get from registry
        active: 0, // TODO: Get from registry
      },
    };
    
    const response: APIResponse<HealthCheck> = {
      success: true,
      data: health,
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to get health information',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// GET /api/v1/health/ready - Readiness probe
router.get('/ready', (req, res) => {
  try {
    // TODO: Check if all required services are ready
    const isReady = true;
    
    if (!isReady) {
      const response: APIResponse = {
        success: false,
        error: 'Service not ready',
        message: 'The service is not ready to handle requests',
      };
      return res.status(503).json(response);
    }
    
    const response: APIResponse = {
      success: true,
      message: 'Service is ready',
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to check readiness',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// GET /api/v1/health/live - Liveness probe
router.get('/live', (req, res) => {
  try {
    // TODO: Check if the service is alive and responsive
    const isAlive = true;
    
    if (!isAlive) {
      const response: APIResponse = {
        success: false,
        error: 'Service not alive',
        message: 'The service is not responding',
      };
      return res.status(503).json(response);
    }
    
    const response: APIResponse = {
      success: true,
      message: 'Service is alive',
    };
    
    res.json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to check liveness',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

export { router as healthRoutes };