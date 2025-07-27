import { Component, OnInit } from '@angular/core';
import { islandManager } from '@uds/islands';
import { ButtonComponent, InputComponent } from '@uds/core/components/BaseComponent';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <header class="app-header">
        <h1>Angular App with Universal Design System</h1>
        <p>This app demonstrates Angular components and islands working together</p>
      </header>

      <main class="app-main">
        <section class="component-section">
          <h2>Native Angular Components</h2>
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
                required>
              </uds-input>
              <uds-input
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
                helper-text="We'll never share your email">
              </uds-input>
            </div>
          </div>
        </section>

        <section class="island-section">
          <h2>Angular Islands</h2>
          <p>These components are rendered as islands and can be hydrated independently</p>
          
          <div class="island-grid">
            <div class="island-container">
              <h3>Button Island</h3>
              <div id="island-angular-button" class="island-placeholder">
                Loading Angular Button Island...
              </div>
            </div>

            <div class="island-container">
              <h3>Input Island</h3>
              <div id="island-angular-input" class="island-placeholder">
                Loading Angular Input Island...
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
              <h3>Svelte Island</h3>
              <div id="island-svelte-card" class="island-placeholder">
                Svelte Card Island
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
        <p>Universal Design System - Angular Example</p>
      </footer>
    </div>
  `,
  styles: [`
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
  `]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.initializeIslands();
  }

  private async initializeIslands() {
    try {
      // Register components for islands
      const AngularButton = ButtonComponent.toAngular().component;
      const AngularInput = InputComponent.toAngular().component;

      // Register components in the island manager
      islandManager.register('AngularButton', AngularButton, {
        framework: 'angular',
        ssr: true,
        hydrate: true,
        priority: 'high',
      });

      islandManager.register('AngularInput', AngularInput, {
        framework: 'angular',
        ssr: true,
        hydrate: true,
        priority: 'normal',
      });

      // Create islands
      const buttonIsland = islandManager.createIsland({
        id: 'angular-button',
        component: 'AngularButton',
        props: {
          variant: 'primary',
          size: 'lg',
          children: 'Angular Island Button',
        },
        hydrate: true,
        priority: 'high',
      });

      const inputIsland = islandManager.createIsland({
        id: 'angular-input',
        component: 'AngularInput',
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

      console.log('Angular islands initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Angular islands:', error);
    }
  }
}