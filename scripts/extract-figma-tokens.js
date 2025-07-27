#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

class FigmaTokenExtractor {
  constructor(config) {
    this.config = config;
    this.tokens = [];
  }

  async extractTokens() {
    try {
      console.log('🔍 Extracting tokens from Figma...');
      
      const fileData = await this.getFigmaFile();
      const tokens = this.parseFigmaNodes(fileData.document);
      
      await this.saveTokens(tokens);
      
      console.log(`✅ Successfully extracted ${tokens.length} tokens`);
      return tokens;
    } catch (error) {
      console.error('❌ Error extracting tokens:', error.message);
      throw error;
    }
  }

  async getFigmaFile() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.figma.com',
        path: `/v1/files/${this.config.figmaFileKey}`,
        method: 'GET',
        headers: {
          'X-Figma-Token': this.config.figmaAccessToken,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`Figma API error: ${res.statusCode} - ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  parseFigmaNodes(node, parentName = '') {
    const tokens = [];
    
    if (node.type === 'RECTANGLE' || node.type === 'ELLIPSE') {
      // Extract color tokens
      if (node.fills && node.fills.length > 0) {
        const fill = node.fills[0];
        if (fill.type === 'SOLID') {
          const color = this.rgbToHex(fill.color);
          const tokenName = this.generateTokenName(node.name, parentName, 'color');
          
          tokens.push({
            name: tokenName,
            value: color,
            type: 'color',
            category: this.determineColorCategory(color),
            description: node.description || '',
            fileKey: this.config.figmaFileKey,
            nodeId: node.id
          });
        }
      }
    }
    
    if (node.type === 'TEXT') {
      // Extract typography tokens
      if (node.style) {
        const tokenName = this.generateTokenName(node.name, parentName, 'typography');
        
        tokens.push({
          name: `${tokenName}-font-size`,
          value: `${node.style.fontSize}px`,
          type: 'typography',
          category: 'size',
          description: `Font size from ${node.name}`,
          fileKey: this.config.figmaFileKey,
          nodeId: node.id
        });
        
        tokens.push({
          name: `${tokenName}-font-weight`,
          value: node.style.fontWeight.toString(),
          type: 'typography',
          category: 'weight',
          description: `Font weight from ${node.name}`,
          fileKey: this.config.figmaFileKey,
          nodeId: node.id
        });
      }
    }
    
    // Recursively parse children
    if (node.children) {
      for (const child of node.children) {
        tokens.push(...this.parseFigmaNodes(child, node.name));
      }
    }
    
    return tokens;
  }

  generateTokenName(nodeName, parentName, type) {
    const cleanName = nodeName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const prefix = parentName ? `${parentName}-` : '';
    return `${prefix}${cleanName}`;
  }

  rgbToHex(color) {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  determineColorCategory(color) {
    // Simple heuristic to determine color category
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    if (r === g && g === b) {
      return 'neutral';
    }
    
    if (r > g && r > b) return 'error';
    if (g > r && g > b) return 'success';
    if (b > r && b > g) return 'primary';
    
    return 'secondary';
  }

  async saveTokens(tokens) {
    const outputDir = path.dirname(this.config.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const tokenData = {
      extractedAt: new Date().toISOString(),
      figmaFileKey: this.config.figmaFileKey,
      tokens: tokens
    };

    fs.writeFileSync(this.config.outputPath, JSON.stringify(tokenData, null, 2));
    
    // Also generate TypeScript types
    const tsContent = this.generateTypeScriptTypes(tokens);
    const tsPath = this.config.outputPath.replace('.json', '.ts');
    fs.writeFileSync(tsPath, tsContent);
  }

  generateTypeScriptTypes(tokens) {
    let content = '// Auto-generated from Figma tokens\n\n';
    content += 'export const figmaTokens = {\n';
    
    const groupedTokens = this.groupTokensByType(tokens);
    
    for (const [type, typeTokens] of Object.entries(groupedTokens)) {
      content += `  ${type}: {\n`;
      for (const token of typeTokens) {
        content += `    '${token.name}': '${token.value}',\n`;
      }
      content += '  },\n';
    }
    
    content += '} as const;\n\n';
    content += 'export type FigmaTokenName = keyof typeof figmaTokens;\n';
    
    return content;
  }

  groupTokensByType(tokens) {
    const grouped = {};
    for (const token of tokens) {
      if (!grouped[token.type]) {
        grouped[token.type] = [];
      }
      grouped[token.type].push(token);
    }
    return grouped;
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: node extract-figma-tokens.js <figma-file-key> <figma-access-token> <output-path>');
    process.exit(1);
  }
  
  const [figmaFileKey, figmaAccessToken, outputPath] = args;
  
  const config = {
    figmaFileKey,
    figmaAccessToken,
    outputPath,
    tokenTypes: ['color', 'typography', 'spacing', 'border', 'shadow']
  };
  
  const extractor = new FigmaTokenExtractor(config);
  extractor.extractTokens()
    .then(() => {
      console.log('🎉 Token extraction completed successfully!');
    })
    .catch((error) => {
      console.error('💥 Token extraction failed:', error.message);
      process.exit(1);
    });
}

module.exports = FigmaTokenExtractor;