import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { z } from 'zod';
import { IslandProvider, useIslands } from '@uds/islands';
import { 
  APIResponse, 
  IslandRequest, 
  IslandResponse, 
  APIConfig,
  HealthCheck,
  Metrics 
} from './types';
import { islandRoutes } from './routes/islands';
import { componentRoutes } from './routes/components';
import { themeRoutes } from './routes/themes';
import { localizationRoutes } from './routes/localization';
import { healthRoutes } from './routes/health';
import { metricsRoutes } from './routes/metrics';

export class UDSAPI {
  private app: express.Application;
  private config: APIConfig;
  private metrics: Metrics;
  private startTime: number;

  constructor(config: Partial<APIConfig> = {}) {
    this.config = {
      port: 3000,
      host: 'localhost',
      cors: {
        origin: '*',
        credentials: false,
      },
      rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      },
      compression: true,
      helmet: true,
      morgan: true,
      ...config,
    };

    this.metrics = {
      requests: {
        total: 0,
        successful: 0,
        failed: 0,
        averageResponseTime: 0,
      },
      islands: {
        total: 0,
        hydrated: 0,
        rendered: 0,
      },
      errors: {
        total: 0,
        byType: {},
      },
    };

    this.startTime = Date.now();
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware() {
    // Security middleware
    if (this.config.helmet) {
      this.app.use(helmet());
    }

    // CORS
    this.app.use(cors(this.config.cors));

    // Compression
    if (this.config.compression) {
      this.app.use(compression());
    }

    // Logging
    if (this.config.morgan) {
      this.app.use(morgan('combined'));
    }

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Metrics middleware
    this.app.use((req, res, next) => {
      const start = Date.now();
      this.metrics.requests.total++;

      res.on('finish', () => {
        const duration = Date.now() - start;
        this.metrics.requests.averageResponseTime = 
          (this.metrics.requests.averageResponseTime + duration) / 2;

        if (res.statusCode >= 200 && res.statusCode < 400) {
          this.metrics.requests.successful++;
        } else {
          this.metrics.requests.failed++;
        }
      });

      next();
    });
  }

  private setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      const health: HealthCheck = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: Date.now() - this.startTime,
        memory: {
          used: process.memoryUsage().heapUsed,
          total: process.memoryUsage().heapTotal,
          percentage: (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100,
        },
        components: {
          total: this.metrics.islands.total,
          registered: 0, // TODO: Get from registry
          active: this.metrics.islands.rendered,
        },
      };

      res.json({
        success: true,
        data: health,
      });
    });

    // API routes
    this.app.use('/api/v1/islands', islandRoutes);
    this.app.use('/api/v1/components', componentRoutes);
    this.app.use('/api/v1/themes', themeRoutes);
    this.app.use('/api/v1/localization', localizationRoutes);
    this.app.use('/api/v1/health', healthRoutes);
    this.app.use('/api/v1/metrics', metricsRoutes);

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Universal Design System API',
        version: '1.0.0',
        endpoints: {
          health: '/health',
          islands: '/api/v1/islands',
          components: '/api/v1/components',
          themes: '/api/v1/themes',
          localization: '/api/v1/localization',
          metrics: '/api/v1/metrics',
        },
      });
    });
  }

  private setupErrorHandling() {
    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `The endpoint ${req.method} ${req.path} does not exist`,
      });
    });

    // Global error handler
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('API Error:', err);
      
      this.metrics.errors.total++;
      const errorType = err.constructor.name;
      this.metrics.errors.byType[errorType] = (this.metrics.errors.byType[errorType] || 0) + 1;

      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
      });
    });
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(this.config.port, this.config.host, () => {
        console.log(`🚀 UDS API server running on http://${this.config.host}:${this.config.port}`);
        resolve();
      });
    });
  }

  public getMetrics(): Metrics {
    return { ...this.metrics };
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// Start server if this file is run directly
if (require.main === module) {
  const api = new UDSAPI();
  api.start().catch(console.error);
}