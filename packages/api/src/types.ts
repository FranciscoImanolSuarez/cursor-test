import { Island } from '@uds/islands';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IslandRequest {
  id: string;
  component: string;
  props?: Record<string, any>;
  hydrate?: boolean;
  priority?: 'high' | 'normal' | 'low';
  ssr?: boolean;
}

export interface IslandResponse {
  id: string;
  html: string;
  props: Record<string, any>;
  metadata: {
    component: string;
    hydrate: boolean;
    priority: string;
    ssr: boolean;
    timestamp: string;
  };
}

export interface ComponentRegistry {
  name: string;
  version: string;
  dependencies: string[];
  metadata: Record<string, any>;
}

export interface ThemeConfig {
  name: string;
  tokens: Record<string, any>;
  variables: Record<string, string>;
}

export interface LocalizationConfig {
  locale: string;
  translations: Record<string, any>;
  fallback: string;
}

export interface APIConfig {
  port: number;
  host: string;
  cors: {
    origin: string | string[];
    credentials: boolean;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
  compression: boolean;
  helmet: boolean;
  morgan: boolean;
}

export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  components: {
    total: number;
    registered: number;
    active: number;
  };
}

export interface Metrics {
  requests: {
    total: number;
    successful: number;
    failed: number;
    averageResponseTime: number;
  };
  islands: {
    total: number;
    hydrated: number;
    rendered: number;
  };
  errors: {
    total: number;
    byType: Record<string, number>;
  };
}