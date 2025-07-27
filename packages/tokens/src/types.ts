export interface DesignToken {
  name: string;
  value: string | number;
  type: 'color' | 'spacing' | 'typography' | 'border' | 'shadow' | 'breakpoint';
  category: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface TokenGroup {
  name: string;
  tokens: DesignToken[];
}

export interface TokenSystem {
  colors: TokenGroup;
  spacing: TokenGroup;
  typography: TokenGroup;
  borders: TokenGroup;
  shadows: TokenGroup;
  breakpoints: TokenGroup;
}

export interface FigmaToken {
  name: string;
  value: string | number;
  type: string;
  description?: string;
  fileKey: string;
  nodeId: string;
}

export interface TokenExtractionConfig {
  figmaFileKey: string;
  figmaAccessToken: string;
  outputPath: string;
  tokenTypes: string[];
}