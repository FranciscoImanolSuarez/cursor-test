# Universal Design System - Examples & Usage Guide

This guide demonstrates how to use the Universal Design System across different frameworks with framework-agnostic islands.

## 🎯 Overview

The Universal Design System provides:
- **Framework-agnostic islands** that work with React, Vue, Angular, Svelte, and Vanilla HTML
- **Single base code** that compiles to multiple frameworks
- **100% accessibility** compliance
- **Native i18n support**
- **Design token system** extractable from Figma
- **Island architecture** for selective hydration

## 🚀 Quick Start

### Installation
```bash
npm install
npm run build
```

### Run Examples
```bash
# React App
npm run dev:react-app

# Vue App
npm run dev:vue-app

# Angular App
npm run dev:angular-app

# Svelte App
npm run dev:svelte-app

# Vanilla HTML App
npm run dev:vanilla-app

# Island Demo
npm run demo-islands
```

## 📱 Framework Examples

### 1. React Application (`apps/react-app/`)

**Features:**
- React components with TypeScript
- Island architecture integration
- Mixed framework islands
- i18n support

**Usage:**
```tsx
import React from 'react';
import { Button, Input } from '@uds/core';
import { islandManager } from '@uds/islands';

function App() {
  useEffect(() => {
    // Register React components as islands
    islandManager.register('ReactButton', Button, {
      framework: 'react',
      ssr: true,
      hydrate: true,
      priority: 'high',
    });

    // Create and mount islands
    const buttonIsland = islandManager.createIsland({
      id: 'react-button',
      component: 'ReactButton',
      props: { variant: 'primary', size: 'lg' },
      hydrate: true,
      priority: 'high',
    });

    islandManager.mountIsland(buttonIsland);
  }, []);

  return (
    <div>
      <Button variant="primary">Native React Button</Button>
      <div id="island-react-button">Island will be mounted here</div>
    </div>
  );
}
```

### 2. Vue Application (`apps/vue-app/`)

**Features:**
- Vue 3 with Composition API
- Island architecture integration
- Mixed framework islands
- Scoped styling

**Usage:**
```vue
<template>
  <div class="app">
    <uds-button variant="primary">Native Vue Button</uds-button>
    <div id="island-vue-button">Island will be mounted here</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { islandManager } from '@uds/islands';

onMounted(async () => {
  // Register Vue components as islands
  islandManager.register('VueButton', ButtonComponent, {
    framework: 'vue',
    ssr: true,
    hydrate: true,
    priority: 'high',
  });

  // Create and mount islands
  const buttonIsland = islandManager.createIsland({
    id: 'vue-button',
    component: 'VueButton',
    props: { variant: 'primary', size: 'lg' },
    hydrate: true,
    priority: 'high',
  });

  await islandManager.mountIsland(buttonIsland);
});
</script>
```

### 3. Angular Application (`apps/angular-app/`)

**Features:**
- Angular 16+ with TypeScript
- Island architecture integration
- Mixed framework islands
- Component lifecycle management

**Usage:**
```typescript
import { Component, OnInit } from '@angular/core';
import { islandManager } from '@uds/islands';

@Component({
  selector: 'app-root',
  template: `
    <uds-button variant="primary">Native Angular Button</uds-button>
    <div id="island-angular-button">Island will be mounted here</div>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Register Angular components as islands
    islandManager.register('AngularButton', ButtonComponent, {
      framework: 'angular',
      ssr: true,
      hydrate: true,
      priority: 'high',
    });

    // Create and mount islands
    const buttonIsland = islandManager.createIsland({
      id: 'angular-button',
      component: 'AngularButton',
      props: { variant: 'primary', size: 'lg' },
      hydrate: true,
      priority: 'high',
    });

    islandManager.mountIsland(buttonIsland);
  }
}
```

### 4. Svelte Application (`apps/svelte-app/`)

**Features:**
- Svelte 4 with TypeScript
- Island architecture integration
- Mixed framework islands
- Reactive components

**Usage:**
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { islandManager } from '@uds/islands';

  onMount(async () => {
    // Register Svelte components as islands
    islandManager.register('SvelteButton', ButtonComponent, {
      framework: 'svelte',
      ssr: true,
      hydrate: true,
      priority: 'high',
    });

    // Create and mount islands
    const buttonIsland = islandManager.createIsland({
      id: 'svelte-button',
      component: 'SvelteButton',
      props: { variant: 'primary', size: 'lg' },
      hydrate: true,
      priority: 'high',
    });

    await islandManager.mountIsland(buttonIsland);
  });
</script>

<uds-button variant="primary">Native Svelte Button</uds-button>
<div id="island-svelte-button">Island will be mounted here</div>
```

### 5. Vanilla HTML Application (`apps/vanilla-app/`)

**Features:**
- Pure HTML/CSS/JavaScript
- Island architecture integration
- Mixed framework islands
- No build step required

**Usage:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Vanilla HTML App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <button class="uds-button uds-button--primary">Native Vanilla Button</button>
  <div id="island-vanilla-button">Island will be mounted here</div>

  <script type="module">
    import { islandManager } from '@uds/islands';

    // Create vanilla components
    const VanillaButton = (props) => {
      const button = document.createElement('button');
      button.className = `uds-button uds-button--${props.variant}`;
      button.textContent = props.children;
      return button;
    };

    // Register vanilla components as islands
    islandManager.register('VanillaButton', VanillaButton, {
      framework: 'vanilla',
      ssr: true,
      hydrate: true,
      priority: 'high',
    });

    // Create and mount islands
    const buttonIsland = islandManager.createIsland({
      id: 'vanilla-button',
      component: 'VanillaButton',
      props: { variant: 'primary', children: 'Vanilla Island Button' },
      hydrate: true,
      priority: 'high',
    });

    islandManager.mountIsland(buttonIsland);
  </script>
</body>
</html>
```

## 🏝️ Island Architecture

### Framework-Agnostic Islands

The island architecture allows you to use components from any framework within any other framework:

```javascript
// Register components from different frameworks
islandManager.register('ReactButton', ReactButton, { framework: 'react' });
islandManager.register('VueInput', VueInput, { framework: 'vue' });
islandManager.register('AngularCard', AngularCard, { framework: 'angular' });
islandManager.register('SvelteModal', SvelteModal, { framework: 'svelte' });
islandManager.register('VanillaCounter', VanillaCounter, { framework: 'vanilla' });

// Use them in any framework
const reactButtonIsland = islandManager.createIsland({
  id: 'react-button',
  component: 'ReactButton',
  props: { variant: 'primary' },
  hydrate: true,
  priority: 'high',
});

const vueInputIsland = islandManager.createIsland({
  id: 'vue-input',
  component: 'VueInput',
  props: { placeholder: 'Enter text' },
  hydrate: true,
  priority: 'normal',
});

// Mount islands
await islandManager.mountIsland(reactButtonIsland);
await islandManager.mountIsland(vueInputIsland);
```

### Island Priorities

Islands are mounted in order of priority:

1. **High Priority** - Critical UI elements (buttons, forms)
2. **Normal Priority** - Standard components (inputs, cards)
3. **Low Priority** - Non-critical components (counters, tooltips)

```javascript
// High priority - mounts first
const buttonIsland = islandManager.createIsland({
  id: 'button',
  component: 'Button',
  priority: 'high',
});

// Normal priority - mounts second
const inputIsland = islandManager.createIsland({
  id: 'input',
  component: 'Input',
  priority: 'normal',
});

// Low priority - mounts last
const counterIsland = islandManager.createIsland({
  id: 'counter',
  component: 'Counter',
  priority: 'low',
});
```

## 🎨 Universal Components

### Creating Framework-Agnostic Components

```typescript
import { createUniversalComponent } from '@uds/core/components/BaseComponent';

const ButtonComponent = createUniversalComponent({
  name: 'Button',
  framework: 'react', // Base framework
  props: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
  styles: {
    button: 'uds-button',
    variant: 'primary',
    size: 'md',
  },
  events: {
    click: (event, props) => {
      console.log('Button clicked!', props);
    },
  },
  lifecycle: {
    onMount: (props) => {
      console.log('Button mounted with props:', props);
    },
    onUnmount: () => {
      console.log('Button unmounted');
    },
  },
});

// Generate for different frameworks
const ReactButton = ButtonComponent.toReact().component;
const VueButton = ButtonComponent.toVue().component;
const AngularButton = ButtonComponent.toAngular().component;
const SvelteButton = ButtonComponent.toSvelte().component;
const VanillaButton = ButtonComponent.toVanilla().component;
```

### Using Universal Components

```javascript
// Register for all frameworks
islandManager.register('UniversalButton', ReactButton, { framework: 'react' });
islandManager.register('UniversalButton', VueButton, { framework: 'vue' });
islandManager.register('UniversalButton', AngularButton, { framework: 'angular' });
islandManager.register('UniversalButton', SvelteButton, { framework: 'svelte' });
islandManager.register('UniversalButton', VanillaButton, { framework: 'vanilla' });

// Use the same component across frameworks
const buttonIsland = islandManager.createIsland({
  id: 'universal-button',
  component: 'UniversalButton',
  props: { variant: 'primary', size: 'lg' },
  hydrate: true,
  priority: 'high',
});
```

## 🌐 Internationalization (i18n)

### Setting up i18n

```typescript
import { setupI18n, addTranslation, changeLanguage } from '@uds/core/i18n';

// Setup i18n
setupI18n();

// Add translations
addTranslation('en', {
  button: {
    primary: 'Primary Button',
    secondary: 'Secondary Button',
  },
  input: {
    placeholder: 'Enter text',
    label: 'Input Label',
  },
});

addTranslation('es', {
  button: {
    primary: 'Botón Principal',
    secondary: 'Botón Secundario',
  },
  input: {
    placeholder: 'Ingrese texto',
    label: 'Etiqueta de Entrada',
  },
});

// Change language
changeLanguage('es');
```

### Using i18n in Components

```typescript
// React
import { useTranslation } from 'react-i18next';

function Button({ variant }) {
  const { t } = useTranslation();
  return <button>{t(`button.${variant}`)}</button>;
}

// Vue
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n();
    return { t };
  },
  template: '<button>{{ t("button.primary") }}</button>',
};

// Angular
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: '<button>{{ "button.primary" | translate }}</button>',
})
export class ButtonComponent {
  constructor(private translate: TranslateService) {}
}

// Svelte
<script>
  import { t } from '@uds/core/i18n';
</script>

<button>{t('button.primary')}</button>
```

## 🎨 Design Tokens

### Extracting Tokens from Figma

```bash
# Extract tokens from Figma
npm run extract-tokens <figma-file-key> <figma-access-token> ./tokens/figma-tokens.json
```

### Using Design Tokens

```typescript
import { getTokenValue, defaultTokens } from '@uds/tokens';

// Get token value
const primaryColor = getTokenValue('colors.primary.500');
const spacing = getTokenValue('spacing.md');

// Use in components
const buttonStyle = {
  backgroundColor: primaryColor,
  padding: spacing,
};
```

### CSS Variables

```css
/* Tokens are available as CSS variables */
.button {
  background-color: var(--uds-color-primary-500);
  padding: var(--uds-spacing-md);
  border-radius: var(--uds-border-radius-md);
  font-size: var(--uds-typography-body-md);
}
```

## 🔧 Development

### Adding New Components

```bash
# Generate a new component
npm run generate-components Card

# Generate for specific framework
npm run generate-components Modal vue
npm run generate-components Tabs angular
npm run generate-components Accordion svelte
```

### Building for Production

```bash
# Build all packages
npm run build

# Build specific app
cd apps/react-app && npm run build
cd apps/vue-app && npm run build
cd apps/angular-app && npm run build
cd apps/svelte-app && npm run build
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/core && npm run test
```

## 📚 API Reference

### Island Manager

```typescript
// Register component
islandManager.register(name, component, options);

// Create island
const island = islandManager.createIsland(config);

// Mount island
await islandManager.mountIsland(island);

// Unmount island
islandManager.unmountIsland(island);

// Hydrate island
await islandManager.hydrateIsland(island);

// Get island info
const island = islandManager.getIsland(id);
const allIslands = islandManager.getAllIslands();
const highPriorityIslands = islandManager.getIslandsByPriority('high');
```

### Universal Component

```typescript
// Create universal component
const component = createUniversalComponent(config);

// Generate for frameworks
const reactComponent = component.toReact();
const vueComponent = component.toVue();
const angularComponent = component.toAngular();
const svelteComponent = component.toSvelte();
const vanillaComponent = component.toVanilla();
```

## 🎯 Best Practices

### 1. Island Organization
- Use high priority for critical UI elements
- Group related islands together
- Consider loading performance

### 2. Component Design
- Keep components framework-agnostic
- Use design tokens for styling
- Implement proper accessibility

### 3. Performance
- Lazy load non-critical islands
- Use appropriate priorities
- Optimize bundle sizes

### 4. Accessibility
- Include ARIA labels
- Support keyboard navigation
- Test with screen readers

## 🚀 Next Steps

1. **Explore the examples** - Run each framework example
2. **Create your own components** - Use the component generator
3. **Extract design tokens** - Connect to your Figma file
4. **Build your application** - Use the island architecture
5. **Contribute** - Add new components or improvements

## 📖 Additional Resources

- [Design System Documentation](./README.md)
- [API Documentation](./packages/api/README.md)
- [Storybook Documentation](./packages/storybook/README.md)
- [Island Architecture Guide](./packages/islands/README.md)
- [Design Tokens Guide](./packages/tokens/README.md)

---

**Happy coding with the Universal Design System! 🎉**