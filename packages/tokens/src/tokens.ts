import { TokenSystem, DesignToken } from './types';

export const defaultTokens: TokenSystem = {
  colors: {
    name: 'colors',
    tokens: [
      { name: 'primary-50', value: '#eff6ff', type: 'color', category: 'primary' },
      { name: 'primary-100', value: '#dbeafe', type: 'color', category: 'primary' },
      { name: 'primary-500', value: '#3b82f6', type: 'color', category: 'primary' },
      { name: 'primary-600', value: '#2563eb', type: 'color', category: 'primary' },
      { name: 'primary-900', value: '#1e3a8a', type: 'color', category: 'primary' },
      { name: 'secondary-50', value: '#f8fafc', type: 'color', category: 'secondary' },
      { name: 'secondary-100', value: '#f1f5f9', type: 'color', category: 'secondary' },
      { name: 'secondary-500', value: '#64748b', type: 'color', category: 'secondary' },
      { name: 'secondary-900', value: '#0f172a', type: 'color', category: 'secondary' },
      { name: 'success-500', value: '#10b981', type: 'color', category: 'success' },
      { name: 'warning-500', value: '#f59e0b', type: 'color', category: 'warning' },
      { name: 'error-500', value: '#ef4444', type: 'color', category: 'error' },
      { name: 'white', value: '#ffffff', type: 'color', category: 'neutral' },
      { name: 'black', value: '#000000', type: 'color', category: 'neutral' },
    ]
  },
  spacing: {
    name: 'spacing',
    tokens: [
      { name: 'xs', value: '0.25rem', type: 'spacing', category: 'size' },
      { name: 'sm', value: '0.5rem', type: 'spacing', category: 'size' },
      { name: 'md', value: '1rem', type: 'spacing', category: 'size' },
      { name: 'lg', value: '1.5rem', type: 'spacing', category: 'size' },
      { name: 'xl', value: '2rem', type: 'spacing', category: 'size' },
      { name: '2xl', value: '3rem', type: 'spacing', category: 'size' },
      { name: '3xl', value: '4rem', type: 'spacing', category: 'size' },
    ]
  },
  typography: {
    name: 'typography',
    tokens: [
      { name: 'font-family-base', value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", type: 'typography', category: 'font' },
      { name: 'font-family-mono', value: "'JetBrains Mono', 'Fira Code', monospace", type: 'typography', category: 'font' },
      { name: 'font-size-xs', value: '0.75rem', type: 'typography', category: 'size' },
      { name: 'font-size-sm', value: '0.875rem', type: 'typography', category: 'size' },
      { name: 'font-size-base', value: '1rem', type: 'typography', category: 'size' },
      { name: 'font-size-lg', value: '1.125rem', type: 'typography', category: 'size' },
      { name: 'font-size-xl', value: '1.25rem', type: 'typography', category: 'size' },
      { name: 'font-size-2xl', value: '1.5rem', type: 'typography', category: 'size' },
      { name: 'font-size-3xl', value: '1.875rem', type: 'typography', category: 'size' },
      { name: 'font-size-4xl', value: '2.25rem', type: 'typography', category: 'size' },
      { name: 'font-weight-normal', value: '400', type: 'typography', category: 'weight' },
      { name: 'font-weight-medium', value: '500', type: 'typography', category: 'weight' },
      { name: 'font-weight-semibold', value: '600', type: 'typography', category: 'weight' },
      { name: 'font-weight-bold', value: '700', type: 'typography', category: 'weight' },
      { name: 'line-height-tight', value: '1.25', type: 'typography', category: 'line-height' },
      { name: 'line-height-normal', value: '1.5', type: 'typography', category: 'line-height' },
      { name: 'line-height-relaxed', value: '1.75', type: 'typography', category: 'line-height' },
    ]
  },
  borders: {
    name: 'borders',
    tokens: [
      { name: 'border-width-thin', value: '1px', type: 'border', category: 'width' },
      { name: 'border-width-medium', value: '2px', type: 'border', category: 'width' },
      { name: 'border-width-thick', value: '3px', type: 'border', category: 'width' },
      { name: 'border-radius-sm', value: '0.25rem', type: 'border', category: 'radius' },
      { name: 'border-radius-md', value: '0.375rem', type: 'border', category: 'radius' },
      { name: 'border-radius-lg', value: '0.5rem', type: 'border', category: 'radius' },
      { name: 'border-radius-xl', value: '0.75rem', type: 'border', category: 'radius' },
      { name: 'border-radius-full', value: '9999px', type: 'border', category: 'radius' },
    ]
  },
  shadows: {
    name: 'shadows',
    tokens: [
      { name: 'shadow-sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', type: 'shadow', category: 'elevation' },
      { name: 'shadow-md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', type: 'shadow', category: 'elevation' },
      { name: 'shadow-lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', type: 'shadow', category: 'elevation' },
      { name: 'shadow-xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', type: 'shadow', category: 'elevation' },
    ]
  },
  breakpoints: {
    name: 'breakpoints',
    tokens: [
      { name: 'sm', value: '640px', type: 'breakpoint', category: 'responsive' },
      { name: 'md', value: '768px', type: 'breakpoint', category: 'responsive' },
      { name: 'lg', value: '1024px', type: 'breakpoint', category: 'responsive' },
      { name: 'xl', value: '1280px', type: 'breakpoint', category: 'responsive' },
      { name: '2xl', value: '1536px', type: 'breakpoint', category: 'responsive' },
    ]
  }
};

export function getTokenValue(tokenName: string): string | number | undefined {
  for (const group of Object.values(defaultTokens)) {
    const token = group.tokens.find(t => t.name === tokenName);
    if (token) return token.value;
  }
  return undefined;
}

export function getTokensByType(type: string): DesignToken[] {
  const tokens: DesignToken[] = [];
  for (const group of Object.values(defaultTokens)) {
    tokens.push(...group.tokens.filter(t => t.type === type));
  }
  return tokens;
}