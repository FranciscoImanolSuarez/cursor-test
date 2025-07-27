#!/usr/bin/env node

/**
 * Demo script showing how to use framework-agnostic islands
 * This script demonstrates how the same island can work across different frameworks
 */

import { islandManager } from '../packages/islands/src/IslandRuntime.js';
import { ButtonComponent, InputComponent } from '../packages/core/src/components/BaseComponent.js';

// Create a simple HTML page to demonstrate islands
const createDemoPage = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Universal Design System - Island Demo</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 2rem;
      background: #f8f9fa;
    }
    .demo-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .island-section {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      margin: 1rem 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .island-placeholder {
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 6px;
      padding: 2rem;
      text-align: center;
      color: #6c757d;
      font-style: italic;
      margin: 1rem 0;
    }
    .framework-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    .framework-card {
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 1rem;
    }
    .framework-card h3 {
      margin: 0 0 0.5rem 0;
      color: #495057;
    }
    .controls {
      background: #e9ecef;
      padding: 1rem;
      border-radius: 6px;
      margin: 1rem 0;
    }
    .controls button {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin: 0.25rem;
    }
    .controls button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div class="demo-container">
    <h1>Universal Design System - Island Architecture Demo</h1>
    <p>This demo shows how the same components can be rendered as islands across different frameworks.</p>
    
    <div class="controls">
      <h3>Island Controls</h3>
      <button onclick="mountAllIslands()">Mount All Islands</button>
      <button onclick="unmountAllIslands()">Unmount All Islands</button>
      <button onclick="hydrateAllIslands()">Hydrate All Islands</button>
      <button onclick="showIslandInfo()">Show Island Info</button>
    </div>

    <div class="island-section">
      <h2>React Islands</h2>
      <div class="framework-grid">
        <div class="framework-card">
          <h3>Button Island</h3>
          <div id="island-react-button" class="island-placeholder">
            React Button Island (High Priority)
          </div>
        </div>
        <div class="framework-card">
          <h3>Input Island</h3>
          <div id="island-react-input" class="island-placeholder">
            React Input Island (Normal Priority)
          </div>
        </div>
      </div>
    </div>

    <div class="island-section">
      <h2>Vue Islands</h2>
      <div class="framework-grid">
        <div class="framework-card">
          <h3>Button Island</h3>
          <div id="island-vue-button" class="island-placeholder">
            Vue Button Island (High Priority)
          </div>
        </div>
        <div class="framework-card">
          <h3>Input Island</h3>
          <div id="island-vue-input" class="island-placeholder">
            Vue Input Island (Normal Priority)
          </div>
        </div>
      </div>
    </div>

    <div class="island-section">
      <h2>Angular Islands</h2>
      <div class="framework-grid">
        <div class="framework-card">
          <h3>Button Island</h3>
          <div id="island-angular-button" class="island-placeholder">
            Angular Button Island (High Priority)
          </div>
        </div>
        <div class="framework-card">
          <h3>Input Island</h3>
          <div id="island-angular-input" class="island-placeholder">
            Angular Input Island (Normal Priority)
          </div>
        </div>
      </div>
    </div>

    <div class="island-section">
      <h2>Svelte Islands</h2>
      <div class="framework-grid">
        <div class="framework-card">
          <h3>Button Island</h3>
          <div id="island-svelte-button" class="island-placeholder">
            Svelte Button Island (High Priority)
          </div>
        </div>
        <div class="framework-card">
          <h3>Input Island</h3>
          <div id="island-svelte-input" class="island-placeholder">
            Svelte Input Island (Normal Priority)
          </div>
        </div>
      </div>
    </div>

    <div class="island-section">
      <h2>Vanilla JS Islands</h2>
      <div class="framework-grid">
        <div class="framework-card">
          <h3>Button Island</h3>
          <div id="island-vanilla-button" class="island-placeholder">
            Vanilla Button Island (High Priority)
          </div>
        </div>
        <div class="framework-card">
          <h3>Input Island</h3>
          <div id="island-vanilla-input" class="island-placeholder">
            Vanilla Input Island (Normal Priority)
          </div>
        </div>
        <div class="framework-card">
          <h3>Counter Island</h3>
          <div id="island-vanilla-counter" class="island-placeholder">
            Vanilla Counter Island (Low Priority)
          </div>
        </div>
      </div>
    </div>
  </div>

  <script type="module">
    // This will be replaced with the actual island initialization code
    console.log('Island demo page loaded');
  </script>
</body>
</html>
  `;
};

// Initialize islands for all frameworks
const initializeIslands = async () => {
  console.log('🚀 Initializing Universal Design System Islands...\n');

  try {
    // Register components for each framework
    const frameworks = ['react', 'vue', 'angular', 'svelte', 'vanilla'];
    
    for (const framework of frameworks) {
      console.log(`📦 Registering ${framework} components...`);
      
      // Register Button component
      const ButtonComponent = createUniversalComponent({
        name: 'Button',
        framework,
        props: {
          variant: 'primary',
          size: 'md',
          disabled: false,
          loading: false,
          fullWidth: false,
        },
        styles: {
          button: 'uds-button',
          variant: 'primary',
          size: 'md',
        },
        events: {
          click: (event, props) => {
            console.log(`${framework} button clicked!`, props);
          },
        },
        lifecycle: {
          onMount: (props) => {
            console.log(`${framework} button mounted with props:`, props);
          },
        },
      });

      // Register Input component
      const InputComponent = createUniversalComponent({
        name: 'Input',
        framework,
        props: {
          type: 'text',
          placeholder: '',
          value: '',
          disabled: false,
          required: false,
          error: false,
        },
        styles: {
          input: 'uds-input',
          type: 'text',
        },
        events: {
          input: (event, props) => {
            console.log(`${framework} input value:`, event.target.value);
          },
          focus: (event, props) => {
            console.log(`${framework} input focused`);
          },
        },
        lifecycle: {
          onMount: (props) => {
            console.log(`${framework} input mounted with props:`, props);
          },
        },
      });

      // Register components in island manager
      islandManager.register(`${framework}Button`, ButtonComponent[`to${framework.charAt(0).toUpperCase() + framework.slice(1)}`]().component, {
        framework,
        ssr: true,
        hydrate: true,
        priority: 'high',
      });

      islandManager.register(`${framework}Input`, InputComponent[`to${framework.charAt(0).toUpperCase() + framework.slice(1)}`]().component, {
        framework,
        ssr: true,
        hydrate: true,
        priority: 'normal',
      });

      // Register vanilla counter for vanilla framework
      if (framework === 'vanilla') {
        const VanillaCounter = (props) => {
          const container = document.createElement('div');
          container.className = 'uds-counter';
          
          const display = document.createElement('div');
          display.className = 'uds-counter-display';
          display.textContent = props.initialValue || 0;
          
          const incrementBtn = document.createElement('button');
          incrementBtn.className = 'uds-button uds-button--primary uds-button--sm';
          incrementBtn.textContent = '+';
          
          const decrementBtn = document.createElement('button');
          decrementBtn.className = 'uds-button uds-button--secondary uds-button--sm';
          decrementBtn.textContent = '-';
          
          let count = props.initialValue || 0;
          
          incrementBtn.addEventListener('click', () => {
            count++;
            display.textContent = count;
            if (props.onChange) props.onChange(count);
          });
          
          decrementBtn.addEventListener('click', () => {
            count--;
            display.textContent = count;
            if (props.onChange) props.onChange(count);
          });
          
          container.appendChild(display);
          container.appendChild(incrementBtn);
          container.appendChild(decrementBtn);
          
          return container;
        };

        islandManager.register('VanillaCounter', VanillaCounter, {
          framework: 'vanilla',
          ssr: true,
          hydrate: true,
          priority: 'low',
        });
      }
    }

    console.log('✅ All components registered successfully!\n');

    // Create islands for each framework
    const islands = [];

    for (const framework of frameworks) {
      console.log(`🏝️ Creating ${framework} islands...`);
      
      // Button island
      const buttonIsland = islandManager.createIsland({
        id: `${framework}-button`,
        component: `${framework}Button`,
        props: {
          variant: 'primary',
          size: 'lg',
          children: `${framework.charAt(0).toUpperCase() + framework.slice(1)} Island Button`,
        },
        hydrate: true,
        priority: 'high',
      });

      // Input island
      const inputIsland = islandManager.createIsland({
        id: `${framework}-input`,
        component: `${framework}Input`,
        props: {
          type: 'email',
          placeholder: `Enter your ${framework} email`,
          label: `${framework.charAt(0).toUpperCase() + framework.slice(1)} Email`,
          helperText: `This is a ${framework} input component`,
        },
        hydrate: true,
        priority: 'normal',
      });

      islands.push(buttonIsland, inputIsland);

      // Add counter island for vanilla
      if (framework === 'vanilla') {
        const counterIsland = islandManager.createIsland({
          id: 'vanilla-counter',
          component: 'VanillaCounter',
          props: {
            initialValue: 0,
            onChange: (value) => console.log('Vanilla counter value:', value),
          },
          hydrate: true,
          priority: 'low',
        });
        islands.push(counterIsland);
      }
    }

    console.log('✅ All islands created successfully!\n');

    // Mount islands by priority
    console.log('🚀 Mounting islands by priority...');
    
    const highPriorityIslands = islands.filter(island => island.priority === 'high');
    const normalPriorityIslands = islands.filter(island => island.priority === 'normal');
    const lowPriorityIslands = islands.filter(island => island.priority === 'low');

    // Mount high priority islands first
    for (const island of highPriorityIslands) {
      await islandManager.mountIsland(island);
      console.log(`✅ Mounted ${island.id} (${island.framework})`);
    }

    // Mount normal priority islands
    for (const island of normalPriorityIslands) {
      await islandManager.mountIsland(island);
      console.log(`✅ Mounted ${island.id} (${island.framework})`);
    }

    // Mount low priority islands
    for (const island of lowPriorityIslands) {
      await islandManager.mountIsland(island);
      console.log(`✅ Mounted ${island.id} (${island.framework})`);
    }

    console.log('\n🎉 All islands mounted successfully!');
    console.log('\n📊 Island Statistics:');
    console.log(`   Total Islands: ${islands.length}`);
    console.log(`   High Priority: ${highPriorityIslands.length}`);
    console.log(`   Normal Priority: ${normalPriorityIslands.length}`);
    console.log(`   Low Priority: ${lowPriorityIslands.length}`);
    console.log(`   Frameworks: ${[...new Set(islands.map(island => island.framework))].join(', ')}`);

    return islands;

  } catch (error) {
    console.error('❌ Failed to initialize islands:', error);
    throw error;
  }
};

// Demo functions for the HTML page
const demoFunctions = `
// Demo functions for the HTML page
window.mountAllIslands = async () => {
  console.log('Mounting all islands...');
  // Implementation would go here
};

window.unmountAllIslands = () => {
  console.log('Unmounting all islands...');
  // Implementation would go here
};

window.hydrateAllIslands = async () => {
  console.log('Hydrating all islands...');
  // Implementation would go here
};

window.showIslandInfo = () => {
  console.log('Showing island information...');
  // Implementation would go here
};
`;

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🎯 Universal Design System - Island Architecture Demo\n');
  
  // Create demo page
  const demoPage = createDemoPage();
  
  // Write demo page to file
  const fs = await import('fs');
  const path = await import('path');
  
  const demoPath = path.join(process.cwd(), 'demo-islands.html');
  fs.writeFileSync(demoPath, demoPage);
  
  console.log(`📄 Demo page created: ${demoPath}`);
  console.log('🌐 Open demo-islands.html in your browser to see the islands in action!\n');
  
  // Initialize islands (this would normally happen in the browser)
  console.log('💡 Note: Island initialization happens in the browser environment');
  console.log('   The actual mounting and hydration requires a DOM environment.\n');
  
  console.log('🔧 Available commands:');
  console.log('   npm run dev:react-app    - Start React app with islands');
  console.log('   npm run dev:vue-app      - Start Vue app with islands');
  console.log('   npm run dev:angular-app  - Start Angular app with islands');
  console.log('   npm run dev:svelte-app   - Start Svelte app with islands');
  console.log('   npm run dev:vanilla-app  - Start Vanilla HTML app with islands');
}