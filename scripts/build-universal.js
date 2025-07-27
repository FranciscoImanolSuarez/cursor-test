#!/usr/bin/env node

/**
 * Universal Build Script
 * Compiles universal code to different frameworks
 * Similar to React Native's build process
 */

import { UniversalBuildSystem } from '../packages/core/src/UniversalRenderer.js';
import { UniversalAppRegistry } from '../packages/core/src/UniversalRenderer.js';
import { ReactAdapter } from '../packages/core/src/adapters/ReactAdapter.js';
import fs from 'fs';
import path from 'path';

class UniversalBuilder {
  constructor() {
    this.targetFrameworks = ['react', 'vue', 'angular', 'svelte', 'vanilla'];
    this.buildDir = path.join(process.cwd(), 'dist');
  }

  async buildAll() {
    console.log('🚀 Building Universal Design System for all frameworks...\n');

    // Create build directory
    if (!fs.existsSync(this.buildDir)) {
      fs.mkdirSync(this.buildDir, { recursive: true });
    }

    for (const framework of this.targetFrameworks) {
      await this.buildForFramework(framework);
    }

    console.log('\n✅ All builds completed successfully!');
    console.log('\n📁 Build outputs:');
    this.targetFrameworks.forEach(framework => {
      console.log(`   - ${framework}: dist/${framework}/`);
    });
  }

  async buildForFramework(framework) {
    console.log(`🔨 Building for ${framework}...`);

    // Set target framework
    UniversalBuildSystem.setTargetFramework(framework);

    // Create framework-specific build directory
    const frameworkBuildDir = path.join(this.buildDir, framework);
    if (!fs.existsSync(frameworkBuildDir)) {
      fs.mkdirSync(frameworkBuildDir, { recursive: true });
    }

    try {
      switch (framework) {
        case 'react':
          await this.buildReact(frameworkBuildDir);
          break;
        case 'vue':
          await this.buildVue(frameworkBuildDir);
          break;
        case 'angular':
          await this.buildAngular(frameworkBuildDir);
          break;
        case 'svelte':
          await this.buildSvelte(frameworkBuildDir);
          break;
        case 'vanilla':
          await this.buildVanilla(frameworkBuildDir);
          break;
        default:
          throw new Error(`Unknown framework: ${framework}`);
      }

      console.log(`✅ ${framework} build completed`);
    } catch (error) {
      console.error(`❌ ${framework} build failed:`, error.message);
    }
  }

  async buildReact(buildDir) {
    // Copy React-specific files
    const reactFiles = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'index.html',
    ];

    for (const file of reactFiles) {
      const sourcePath = path.join(process.cwd(), 'apps/react-app', file);
      const destPath = path.join(buildDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    }

    // Create React entry point
    const reactEntry = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactAdapter } from '@uds/core/adapters/ReactAdapter';
import { UniversalAppRegistry } from '@uds/core/UniversalRenderer';
import UniversalAppComponent from './src/App';

// Set up React adapter
const app = UniversalAppRegistry.getComponent('UniversalApp');
if (app) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(ReactAdapter.universalToReact(app));
}
`;

    fs.writeFileSync(path.join(buildDir, 'src/main.tsx'), reactEntry);

    // Copy universal app
    const universalAppPath = path.join(process.cwd(), 'apps/universal-app/src/App.ts');
    const destAppPath = path.join(buildDir, 'src/App.ts');
    
    if (fs.existsSync(universalAppPath)) {
      fs.copyFileSync(universalAppPath, destAppPath);
    }

    // Create React-specific styles
    const reactStyles = `
/* React-specific styles */
.uds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.uds-button--primary {
  background-color: #3b82f6;
  color: white;
}

.uds-button--secondary {
  background-color: #6b7280;
  color: white;
}

.uds-button--outline {
  background-color: transparent;
  border-color: #3b82f6;
  color: #3b82f6;
}

.uds-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.uds-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.uds-modal {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
}
`;

    fs.writeFileSync(path.join(buildDir, 'src/styles.css'), reactStyles);
  }

  async buildVue(buildDir) {
    // Copy Vue-specific files
    const vueFiles = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'index.html',
    ];

    for (const file of vueFiles) {
      const sourcePath = path.join(process.cwd(), 'apps/vue-app', file);
      const destPath = path.join(buildDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    }

    // Create Vue entry point
    const vueEntry = `
import { createApp } from 'vue';
import { UniversalAppRegistry } from '@uds/core/UniversalRenderer';
import UniversalAppComponent from './src/App';

// Set up Vue adapter
const app = UniversalAppRegistry.getComponent('UniversalApp');
if (app) {
  const vueApp = createApp(UniversalAppComponent);
  vueApp.mount('#app');
}
`;

    fs.writeFileSync(path.join(buildDir, 'src/main.ts'), vueEntry);

    // Copy universal app
    const universalAppPath = path.join(process.cwd(), 'apps/universal-app/src/App.ts');
    const destAppPath = path.join(buildDir, 'src/App.ts');
    
    if (fs.existsSync(universalAppPath)) {
      fs.copyFileSync(universalAppPath, destAppPath);
    }
  }

  async buildAngular(buildDir) {
    // Copy Angular-specific files
    const angularFiles = [
      'package.json',
      'tsconfig.json',
      'angular.json',
    ];

    for (const file of angularFiles) {
      const sourcePath = path.join(process.cwd(), 'apps/angular-app', file);
      const destPath = path.join(buildDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    }

    // Create Angular entry point
    const angularEntry = `
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UniversalAppRegistry } from '@uds/core/UniversalRenderer';
import UniversalAppComponent from './src/App';

// Set up Angular adapter
const app = UniversalAppRegistry.getComponent('UniversalApp');
if (app) {
  platformBrowserDynamic().bootstrapModule(UniversalAppComponent);
}
`;

    fs.writeFileSync(path.join(buildDir, 'src/main.ts'), angularEntry);

    // Copy universal app
    const universalAppPath = path.join(process.cwd(), 'apps/universal-app/src/App.ts');
    const destAppPath = path.join(buildDir, 'src/App.ts');
    
    if (fs.existsSync(universalAppPath)) {
      fs.copyFileSync(universalAppPath, destAppPath);
    }
  }

  async buildSvelte(buildDir) {
    // Copy Svelte-specific files
    const svelteFiles = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'index.html',
    ];

    for (const file of svelteFiles) {
      const sourcePath = path.join(process.cwd(), 'apps/svelte-app', file);
      const destPath = path.join(buildDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    }

    // Create Svelte entry point
    const svelteEntry = `
import { UniversalAppRegistry } from '@uds/core/UniversalRenderer';
import UniversalAppComponent from './src/App.svelte';

// Set up Svelte adapter
const app = UniversalAppRegistry.getComponent('UniversalApp');
if (app) {
  new UniversalAppComponent({
    target: document.getElementById('app'),
  });
}
`;

    fs.writeFileSync(path.join(buildDir, 'src/main.ts'), svelteEntry);

    // Copy universal app
    const universalAppPath = path.join(process.cwd(), 'apps/universal-app/src/App.ts');
    const destAppPath = path.join(buildDir, 'src/App.svelte');
    
    if (fs.existsSync(universalAppPath)) {
      fs.copyFileSync(universalAppPath, destAppPath);
    }
  }

  async buildVanilla(buildDir) {
    // Create vanilla HTML entry point
    const vanillaEntry = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Universal Design System - Vanilla</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
  
  <script type="module">
    import { UniversalAppRegistry } from '@uds/core/UniversalRenderer';
    import UniversalAppComponent from './src/App.js';

    // Set up vanilla adapter
    const app = UniversalAppRegistry.getComponent('UniversalApp');
    if (app) {
      const container = document.getElementById('app');
      UniversalAppRegistry.runApplication('UniversalApp', container);
    }
  </script>
</body>
</html>
`;

    fs.writeFileSync(path.join(buildDir, 'index.html'), vanillaEntry);

    // Copy universal app
    const universalAppPath = path.join(process.cwd(), 'apps/universal-app/src/App.ts');
    const destAppPath = path.join(buildDir, 'src/App.js');
    
    if (fs.existsSync(universalAppPath)) {
      fs.copyFileSync(universalAppPath, destAppPath);
    }

    // Copy vanilla styles
    const vanillaStylesPath = path.join(process.cwd(), 'apps/vanilla-app/styles.css');
    const destStylesPath = path.join(buildDir, 'styles.css');
    
    if (fs.existsSync(vanillaStylesPath)) {
      fs.copyFileSync(vanillaStylesPath, destStylesPath);
    }
  }

  async buildPackage() {
    console.log('📦 Building universal package...');

    const packageDir = path.join(this.buildDir, 'package');
    if (!fs.existsSync(packageDir)) {
      fs.mkdirSync(packageDir, { recursive: true });
    }

    // Copy core package
    const corePackagePath = path.join(process.cwd(), 'packages/core');
    const destCorePath = path.join(packageDir, 'core');
    
    if (fs.existsSync(corePackagePath)) {
      this.copyDirectory(corePackagePath, destCorePath);
    }

    // Copy tokens package
    const tokensPackagePath = path.join(process.cwd(), 'packages/tokens');
    const destTokensPath = path.join(packageDir, 'tokens');
    
    if (fs.existsSync(tokensPackagePath)) {
      this.copyDirectory(tokensPackagePath, destTokensPath);
    }

    // Create universal package.json
    const packageJson = {
      name: '@uds/universal',
      version: '1.0.0',
      description: 'Universal Design System - Single codebase for all frameworks',
      main: 'core/src/index.js',
      types: 'core/src/index.d.ts',
      scripts: {
        build: 'node scripts/build-universal.js',
        'build:react': 'node scripts/build-universal.js react',
        'build:vue': 'node scripts/build-universal.js vue',
        'build:angular': 'node scripts/build-universal.js angular',
        'build:svelte': 'node scripts/build-universal.js svelte',
        'build:vanilla': 'node scripts/build-universal.js vanilla',
      },
      keywords: ['design-system', 'universal', 'react', 'vue', 'angular', 'svelte'],
      author: 'Universal Design System Team',
      license: 'MIT',
    };

    fs.writeFileSync(
      path.join(packageDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    console.log('✅ Universal package built');
  }

  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const builder = new UniversalBuilder();
  
  const targetFramework = process.argv[2];
  
  if (targetFramework) {
    if (builder.targetFrameworks.includes(targetFramework)) {
      console.log(`🚀 Building for ${targetFramework} only...\n`);
      builder.buildForFramework(targetFramework);
    } else {
      console.error(`❌ Unknown framework: ${targetFramework}`);
      console.log(`Available frameworks: ${builder.targetFrameworks.join(', ')}`);
      process.exit(1);
    }
  } else {
    builder.buildAll();
  }
}