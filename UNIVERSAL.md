# Universal Design System - Single Codebase for All Frameworks

This document explains the new universal system that allows you to write **one codebase** that compiles to **all web frameworks**, similar to React Native's approach for mobile platforms.

## 🎯 **The Vision**

Write once, run everywhere:

```typescript
// ONE codebase that works in React, Vue, Angular, Svelte, and Vanilla HTML
const UniversalApp = () => {
  const [count, setCount] = Universal.Hooks.useState(0, 'counter');
  
  return Universal.createElement('div', null,
    Universal.createElement('h1', null, 'Universal App'),
    Universal.createElement(UniversalButton, {
      children: `Count: ${count}`,
      onClick: () => setCount(count + 1)
    })
  );
};
```

## 🏗️ **Architecture Overview**

### **Core Principles**
1. **Single Codebase**: Write your app once using universal APIs
2. **Framework Agnostic**: No framework-specific code in your app
3. **Compile Time**: Build system compiles to target framework
4. **Runtime Adapters**: Framework-specific adapters handle rendering

### **System Components**

```
Universal App (Your Code)
         ↓
Universal Renderer (Core System)
         ↓
Framework Adapters (React/Vue/Angular/Svelte/Vanilla)
         ↓
Target Framework Output
```

## 🚀 **Quick Start**

### **1. Create Universal App**
```typescript
// apps/universal-app/src/App.ts
import { Universal, createElement, withUniversalHooks } from '@uds/core/UniversalRenderer';
import { UniversalButton, UniversalInput } from '@uds/core/UniversalComponent';

const UniversalAppComponent = withUniversalHooks((props) => {
  const [count, setCount] = Universal.Hooks.useState(0, 'counter');
  const [name, setName] = Universal.Hooks.useState('', 'name');

  return createElement('div', { style: { padding: '2rem' } },
    createElement('h1', null, 'Universal App'),
    createElement(UniversalButton, {
      children: `Count: ${count}`,
      onClick: () => setCount(count + 1)
    }),
    createElement(UniversalInput, {
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: 'Enter your name'
    })
  );
});
```

### **2. Build for All Frameworks**
```bash
# Build for all frameworks
npm run build-universal

# Build for specific framework
npm run build-universal:react
npm run build-universal:vue
npm run build-universal:angular
npm run build-universal:svelte
npm run build-universal:vanilla
```

### **3. Run the Built Apps**
```bash
# Each framework gets its own build in dist/
cd dist/react && npm run dev
cd dist/vue && npm run dev
cd dist/angular && npm run dev
cd dist/svelte && npm run dev
cd dist/vanilla && python3 -m http.server 3000
```

## 📚 **Universal APIs**

### **Universal Hooks**
```typescript
// Same hooks work in all frameworks
const [state, setState] = Universal.Hooks.useState(initialValue, 'key');
const [count, setCount] = Universal.Hooks.useState(0, 'counter');

Universal.Hooks.useEffect(() => {
  console.log('Effect runs in all frameworks');
}, [], 'effect-key');

const ref = Universal.Hooks.useRef(null, 'ref-key');
const memoizedValue = Universal.Hooks.useMemo(() => expensive(), deps, 'memo-key');
const callback = Universal.Hooks.useCallback(fn, deps, 'callback-key');
```

### **Universal Styling**
```typescript
// Universal StyleSheet (similar to React Native)
const styles = Universal.StyleSheet.create({
  container: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
  },
});

// Use in components
return createElement('div', { style: styles.container },
  createElement('button', { style: styles.button }, 'Click me')
);
```

### **Universal Navigation**
```typescript
// Register routes
Universal.Navigation.registerRoute('home', HomeComponent);
Universal.Navigation.registerRoute('about', AboutComponent);

// Navigate
Universal.Navigation.navigate('about');

// Get current route
const currentRoute = Universal.Navigation.getCurrentRoute();
```

### **Universal Storage**
```typescript
// Works in all frameworks
await Universal.Storage.setItem('user', JSON.stringify(userData));
const userData = await Universal.Storage.getItem('user');
await Universal.Storage.removeItem('user');
await Universal.Storage.clear();
```

### **Universal Network**
```typescript
// HTTP requests work everywhere
const response = await Universal.Network.get('/api/users');
const data = await Universal.Network.post('/api/users', userData);
const updated = await Universal.Network.put('/api/users/1', userData);
await Universal.Network.delete('/api/users/1');
```

### **Universal Platform Detection**
```typescript
// Detect current platform
if (Universal.Platform.isReact()) {
  // React-specific logic
}

if (Universal.Platform.isVue()) {
  // Vue-specific logic
}

const platform = Universal.Platform.getPlatform(); // 'react', 'vue', etc.
```

## 🎨 **Universal Components**

### **Pre-built Components**
```typescript
import { 
  UniversalButton, 
  UniversalInput, 
  UniversalCard, 
  UniversalModal 
} from '@uds/core/UniversalComponent';

// Use the same way in all frameworks
createElement(UniversalButton, {
  variant: 'primary',
  size: 'lg',
  children: 'Click me',
  onClick: () => console.log('Clicked!')
});

createElement(UniversalInput, {
  type: 'email',
  placeholder: 'Enter email',
  onChange: (e) => console.log(e.target.value)
});
```

### **Create Custom Components**
```typescript
import { createUniversalComponent } from '@uds/core/UniversalComponent';

const CustomButton = createUniversalComponent({
  name: 'CustomButton',
  props: {
    variant: 'default',
    size: 'md',
  },
  style: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
  },
  events: {
    click: (event, props) => {
      console.log('Custom button clicked!', props);
    },
  },
  lifecycle: {
    onMount: (props) => {
      console.log('Custom button mounted', props);
    },
  },
});
```

## 🔧 **Build System**

### **Build Process**
1. **Parse**: Universal code is parsed
2. **Transform**: Converted to framework-specific code
3. **Generate**: Framework-specific files are created
4. **Bundle**: Framework-specific bundling

### **Build Outputs**
```
dist/
├── react/          # React app
├── vue/           # Vue app
├── angular/       # Angular app
├── svelte/        # Svelte app
├── vanilla/       # Vanilla HTML app
└── package/       # Universal package
```

### **Framework Adapters**
Each framework has its own adapter that:
- Converts universal nodes to framework elements
- Maps universal events to framework events
- Handles framework-specific lifecycle
- Provides framework-specific optimizations

## 📱 **Framework Support**

### **React**
- ✅ Full support
- ✅ React hooks compatibility
- ✅ JSX-like syntax
- ✅ React DevTools support

### **Vue**
- ✅ Full support
- ✅ Vue 3 Composition API
- ✅ Vue DevTools support
- ✅ Scoped styling

### **Angular**
- ✅ Full support
- ✅ Angular CLI compatibility
- ✅ Angular DevTools support
- ✅ Dependency injection

### **Svelte**
- ✅ Full support
- ✅ Svelte reactivity
- ✅ Svelte DevTools support
- ✅ Scoped styling

### **Vanilla HTML**
- ✅ Full support
- ✅ No build step required
- ✅ Direct DOM manipulation
- ✅ Progressive enhancement

## 🎯 **Use Cases**

### **1. Design Systems**
```typescript
// One design system for all frameworks
const DesignSystem = {
  Button: UniversalButton,
  Input: UniversalInput,
  Card: UniversalCard,
  Modal: UniversalModal,
};
```

### **2. Cross-Framework Libraries**
```typescript
// Library that works everywhere
export const DataTable = createUniversalComponent({
  name: 'DataTable',
  props: { data: [], columns: [] },
  // ... implementation
});
```

### **3. Micro-Frontends**
```typescript
// Micro-frontend that can be embedded anywhere
const MicroApp = () => {
  // Same code works in React, Vue, Angular, etc.
};
```

### **4. Component Libraries**
```typescript
// Publish once, use everywhere
npm install @my-company/universal-components
// Works in React, Vue, Angular, Svelte, Vanilla
```

## 🚀 **Advanced Features**

### **Universal Islands**
```typescript
// Mix universal components with framework-specific code
const HybridApp = () => {
  return (
    <div>
      <h1>React Component</h1>
      <UniversalButton>Universal Button</UniversalButton>
      <VueComponent>Vue Component</VueComponent>
    </div>
  );
};
```

### **Universal State Management**
```typescript
// State that works across frameworks
const useUniversalStore = () => {
  const [state, setState] = Universal.Hooks.useState({}, 'store');
  
  const dispatch = (action) => {
    setState(prev => reducer(prev, action));
  };
  
  return [state, dispatch];
};
```

### **Universal Testing**
```typescript
// Test once, run everywhere
describe('Universal Component', () => {
  it('works in all frameworks', () => {
    const component = render(UniversalButton);
    expect(component).toBeInTheDocument();
  });
});
```

## 📖 **Migration Guide**

### **From Framework-Specific to Universal**

**Before (React-specific):**
```tsx
import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
};
```

**After (Universal):**
```typescript
import { Universal, createElement, withUniversalHooks } from '@uds/core/UniversalRenderer';

const App = withUniversalHooks((props) => {
  const [count, setCount] = Universal.Hooks.useState(0, 'counter');
  
  return createElement('div', null,
    createElement('button', {
      onClick: () => setCount(count + 1),
      children: `Count: ${count}`
    })
  );
});
```

## 🔮 **Future Roadmap**

### **Phase 1: Core System** ✅
- [x] Universal component system
- [x] Universal hooks
- [x] Universal styling
- [x] Framework adapters
- [x] Build system

### **Phase 2: Advanced Features**
- [ ] Universal routing
- [ ] Universal state management
- [ ] Universal testing
- [ ] Universal debugging tools
- [ ] Universal performance monitoring

### **Phase 3: Ecosystem**
- [ ] Universal component marketplace
- [ ] Universal plugin system
- [ ] Universal deployment tools
- [ ] Universal CI/CD integration
- [ ] Universal documentation generator

## 🤝 **Contributing**

### **Adding New Frameworks**
1. Create framework adapter
2. Implement universal renderer
3. Add build configuration
4. Update documentation

### **Adding New Components**
1. Create universal component
2. Add framework-specific implementations
3. Update build system
4. Add tests

## 📚 **Resources**

- [Universal API Reference](./docs/api.md)
- [Framework Adapters](./docs/adapters.md)
- [Build System](./docs/build.md)
- [Migration Guide](./docs/migration.md)
- [Examples](./examples/)

---

**Write once, run everywhere! 🚀**