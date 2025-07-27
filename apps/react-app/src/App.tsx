import React, { useEffect } from 'react';
import { Button, Input } from '@uds/core';
import { islandManager } from '@uds/islands';
import { ButtonComponent, InputComponent } from '@uds/core/components/BaseComponent';
import './App.css';

// Register components for islands
const ReactButton = ButtonComponent.toReact().component;
const ReactInput = InputComponent.toReact().component;

// Register components in the island manager
islandManager.register('ReactButton', ReactButton, {
  framework: 'react',
  ssr: true,
  hydrate: true,
  priority: 'high',
});

islandManager.register('ReactInput', ReactInput, {
  framework: 'react',
  ssr: true,
  hydrate: true,
  priority: 'normal',
});

function App() {
  useEffect(() => {
    // Initialize islands after component mounts
    initializeIslands();
  }, []);

  const initializeIslands = async () => {
    try {
      // Create islands
      const buttonIsland = islandManager.createIsland({
        id: 'react-button',
        component: 'ReactButton',
        props: {
          variant: 'primary',
          size: 'lg',
          children: 'React Island Button',
        },
        hydrate: true,
        priority: 'high',
      });

      const inputIsland = islandManager.createIsland({
        id: 'react-input',
        component: 'ReactInput',
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

      console.log('React islands initialized successfully');
    } catch (error) {
      console.error('Failed to initialize React islands:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React App with Universal Design System</h1>
        <p>This app demonstrates React components and islands working together</p>
      </header>

      <main className="app-main">
        <section className="component-section">
          <h2>Native React Components</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Button Component</h3>
              <Button variant="primary" size="lg">
                Primary Button
              </Button>
              <Button variant="secondary" size="md">
                Secondary Button
              </Button>
              <Button variant="outline" size="sm">
                Outline Button
              </Button>
            </div>

            <div className="component-demo">
              <h3>Input Component</h3>
              <Input
                label="Username"
                placeholder="Enter your username"
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
                helperText="We'll never share your email"
              />
            </div>
          </div>
        </section>

        <section className="island-section">
          <h2>React Islands</h2>
          <p>These components are rendered as islands and can be hydrated independently</p>
          
          <div className="island-grid">
            <div className="island-container">
              <h3>Button Island</h3>
              <div id="island-react-button" className="island-placeholder">
                Loading React Button Island...
              </div>
            </div>

            <div className="island-container">
              <h3>Input Island</h3>
              <div id="island-react-input" className="island-placeholder">
                Loading React Input Island...
              </div>
            </div>
          </div>
        </section>

        <section className="mixed-section">
          <h2>Mixed Framework Islands</h2>
          <p>This section will contain islands from different frameworks</p>
          
          <div className="mixed-grid">
            <div className="island-container">
              <h3>Vue Island (Coming Soon)</h3>
              <div id="island-vue-button" className="island-placeholder">
                Vue Button Island
              </div>
            </div>

            <div className="island-container">
              <h3>Angular Island (Coming Soon)</h3>
              <div id="island-angular-input" className="island-placeholder">
                Angular Input Island
              </div>
            </div>

            <div className="island-container">
              <h3>Svelte Island (Coming Soon)</h3>
              <div id="island-svelte-card" className="island-placeholder">
                Svelte Card Island
              </div>
            </div>

            <div className="island-container">
              <h3>Vanilla JS Island</h3>
              <div id="island-vanilla-counter" className="island-placeholder">
                Vanilla Counter Island
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Universal Design System - React Example</p>
      </footer>
    </div>
  );
}

export default App;