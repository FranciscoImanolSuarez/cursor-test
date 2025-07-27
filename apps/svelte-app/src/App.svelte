<script lang="ts">
  import { onMount } from 'svelte';
  import { islandManager } from '@uds/islands';
  import { ButtonComponent, InputComponent } from '@uds/core/components/BaseComponent';

  // Register components for islands
  const SvelteButton = ButtonComponent.toSvelte().component;
  const SvelteInput = InputComponent.toSvelte().component;

  // Register components in the island manager
  islandManager.register('SvelteButton', SvelteButton, {
    framework: 'svelte',
    ssr: true,
    hydrate: true,
    priority: 'high',
  });

  islandManager.register('SvelteInput', SvelteInput, {
    framework: 'svelte',
    ssr: true,
    hydrate: true,
    priority: 'normal',
  });

  // Initialize islands after component mounts
  onMount(async () => {
    try {
      // Create islands
      const buttonIsland = islandManager.createIsland({
        id: 'svelte-button',
        component: 'SvelteButton',
        props: {
          variant: 'primary',
          size: 'lg',
          children: 'Svelte Island Button',
        },
        hydrate: true,
        priority: 'high',
      });

      const inputIsland = islandManager.createIsland({
        id: 'svelte-input',
        component: 'SvelteInput',
        props: {
          type: 'email',
          placeholder: 'Enter your email',
          label: 'Email',
        },
        hydrate: true,
        priority: 'normal',
      });

      // Mount islands
      await islandManager.mountIsland(buttonIsland);
      await islandManager.mountIsland(inputIsland);

      console.log('Svelte islands initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Svelte islands:', error);
    }
  });
</script>

<div class="app">
  <header class="app-header">
    <h1>Svelte App with Universal Design System</h1>
    <p>This app demonstrates Svelte components and islands working together</p>
  </header>

  <main class="app-main">
    <section class="component-section">
      <h2>Native Svelte Components</h2>
      <div class="component-grid">
        <div class="component-demo">
          <h3>Button Component</h3>
          <uds-button variant="primary" size="lg">
            Primary Button
          </uds-button>
          <uds-button variant="secondary" size="md">
            Secondary Button
          </uds-button>
          <uds-button variant="outline" size="sm">
            Outline Button
          </uds-button>
        </div>

        <div class="component-demo">
          <h3>Input Component</h3>
          <uds-input
            label="Username"
            placeholder="Enter your username"
            required
          />
          <uds-input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            helper-text="We'll never share your email"
          />
        </div>
      </div>
    </section>

    <section class="island-section">
      <h2>Svelte Islands</h2>
      <p>These components are rendered as islands and can be hydrated independently</p>
      
      <div class="island-grid">
        <div class="island-container">
          <h3>Button Island</h3>
          <div id="island-svelte-button" class="island-placeholder">
            Loading Svelte Button Island...
          </div>
        </div>

        <div class="island-container">
          <h3>Input Island</h3>
          <div id="island-svelte-input" class="island-placeholder">
            Loading Svelte Input Island...
          </div>
        </div>
      </div>
    </section>

    <section class="mixed-section">
      <h2>Mixed Framework Islands</h2>
      <p>This section contains islands from different frameworks</p>
      
      <div class="mixed-grid">
        <div class="island-container">
          <h3>React Island</h3>
          <div id="island-react-button" class="island-placeholder">
            React Button Island
          </div>
        </div>

        <div class="island-container">
          <h3>Vue Island</h3>
          <div id="island-vue-input" class="island-placeholder">
            Vue Input Island
          </div>
        </div>

        <div class="island-container">
          <h3>Angular Island</h3>
          <div id="island-angular-card" class="island-placeholder">
            Angular Card Island
          </div>
        </div>

        <div class="island-container">
          <h3>Vanilla JS Island</h3>
          <div id="island-vanilla-counter" class="island-placeholder">
            Vanilla Counter Island
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="app-footer">
    <p>Universal Design System - Svelte Example</p>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    text-align: center;
  }

  .app-header h1 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .app-header p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .app-main {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .component-section,
  .island-section,
  .mixed-section {
    margin-bottom: 3rem;
  }

  .component-section h2,
  .island-section h2,
  .mixed-section h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  .component-grid,
  .island-grid,
  .mixed-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .component-demo,
  .island-container {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e1e5e9;
  }

  .component-demo h3,
  .island-container h3 {
    margin: 0 0 1rem 0;
    color: #555;
    font-size: 1.2rem;
  }

  .island-placeholder {
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 6px;
    padding: 2rem;
    text-align: center;
    color: #6c757d;
    font-style: italic;
  }

  .app-footer {
    background: #f8f9fa;
    padding: 1.5rem;
    text-align: center;
    color: #6c757d;
    border-top: 1px solid #e9ecef;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .app-header h1 {
      font-size: 2rem;
    }
    
    .app-main {
      padding: 1rem;
    }
    
    .component-grid,
    .island-grid,
    .mixed-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>