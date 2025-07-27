# Universal Design System (UDS)

Un design system completo y escalable con arquitectura de islas, soporte multi-framework y 100% accesible.

## 🚀 Características

- **🎨 Design System Core**: Componentes React con TypeScript y CSS Modules
- **🏝️ Arquitectura de Islas**: Sistema similar a Astro para hidratación selectiva
- **🌍 i18n Nativo**: Soporte completo para internacionalización
- **♿ 100% Accesible**: Cumple con WCAG 2.1 AA
- **📱 Responsive**: Diseño adaptativo con breakpoints configurables
- **🎯 Tokens de Diseño**: Sistema de tokens extraíbles desde Figma
- **📚 Storybook**: Documentación interactiva con múltiples pantallas
- **🔌 API Completa**: REST API para gestión de islas y componentes
- **⚡ Multi-Framework**: Arquitectura preparada para Vue, Angular, Svelte

## 📦 Estructura del Proyecto

```
universal-design-system/
├── packages/
│   ├── core/           # Componentes principales
│   ├── tokens/         # Sistema de tokens de diseño
│   ├── islands/        # Arquitectura de islas
│   ├── api/           # API REST
│   └── storybook/     # Documentación interactiva
├── apps/
│   ├── react-app/     # Aplicación React de ejemplo
│   ├── vue-app/       # Aplicación Vue de ejemplo
│   ├── angular-app/   # Aplicación Angular de ejemplo
│   └── svelte-app/    # Aplicación Svelte de ejemplo
├── scripts/
│   ├── extract-figma-tokens.js  # Extracción de tokens desde Figma
│   └── generate-components.js   # Generación de componentes
└── docs/              # Documentación adicional
```

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/your-org/universal-design-system.git
cd universal-design-system

# Instalar dependencias
npm install

# Construir todos los paquetes
npm run build

# Iniciar Storybook
npm run storybook
```

## 🎨 Uso de Componentes

### React

```tsx
import { Button, Input } from '@uds/core';

function MyComponent() {
  return (
    <div>
      <Input 
        label="Email" 
        type="email" 
        placeholder="Enter your email"
        required 
      />
      <Button variant="primary" size="lg">
        Submit
      </Button>
    </div>
  );
}
```

### Arquitectura de Islas

```tsx
import { IslandProvider, useIslands } from '@uds/islands';

function App() {
  return (
    <IslandProvider>
      <div>
        <h1>Mi Aplicación</h1>
        {/* Contenido estático */}
        <p>Este contenido se renderiza en el servidor</p>
        
        {/* Isla interactiva */}
        <div id="island-cart" data-component="ShoppingCart" />
      </div>
    </IslandProvider>
  );
}
```

## 🏝️ Sistema de Islas

El sistema de islas permite hidratación selectiva de componentes:

```tsx
// Definir una isla
const cartIsland = {
  id: 'shopping-cart',
  component: 'ShoppingCart',
  props: { items: [] },
  hydrate: true,
  priority: 'high'
};

// Registrar en el sistema
islandManager.addIsland(cartIsland);
```

## 🌍 Internacionalización

```tsx
import { useTranslation } from 'react-i18next';

function LocalizedComponent() {
  const { t } = useTranslation();
  
  return (
    <Button>
      {t('common.submit')}
    </Button>
  );
}
```

## 🎯 Tokens de Diseño

### Extraer desde Figma

```bash
# Extraer tokens desde un archivo de Figma
npm run extract-tokens <figma-file-key> <figma-access-token> ./tokens/figma-tokens.json
```

### Usar tokens

```tsx
import { getTokenValue } from '@uds/tokens';

const primaryColor = getTokenValue('primary-500'); // '#3b82f6'
const spacing = getTokenValue('md'); // '1rem'
```

## 📚 Storybook

```bash
# Iniciar Storybook
npm run storybook

# Construir Storybook estático
npm run build-storybook
```

Storybook incluye:
- 📱 Múltiples viewports (mobile, tablet, desktop)
- 🎨 Temas (light, dark)
- ♿ Auditoría de accesibilidad
- 📏 Herramientas de medición
- 🎯 Outline de componentes

## 🔌 API REST

### Iniciar la API

```bash
cd packages/api
npm run dev
```

### Endpoints Principales

```bash
# Gestión de islas
GET    /api/v1/islands
POST   /api/v1/islands
PUT    /api/v1/islands/:id
DELETE /api/v1/islands/:id

# Componentes
GET    /api/v1/components
POST   /api/v1/components
DELETE /api/v1/components/:name

# Temas
GET    /api/v1/themes
POST   /api/v1/themes
PUT    /api/v1/themes/:name

# Localización
GET    /api/v1/localization
POST   /api/v1/localization

# Métricas y salud
GET    /api/v1/metrics
GET    /health
```

## 🎨 Personalización

### Temas

```css
:root {
  --uds-color-primary-500: #your-color;
  --uds-font-family-base: 'Your Font', sans-serif;
  --uds-spacing-md: 1.5rem;
}
```

### Componentes

```tsx
// Crear variante personalizada
const CustomButton = styled(Button)`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 25px;
`;
```

## ♿ Accesibilidad

Todos los componentes incluyen:

- ✅ Navegación por teclado
- ✅ Screen readers
- ✅ ARIA labels y roles
- ✅ Contraste de colores
- ✅ Reducción de movimiento
- ✅ Alto contraste

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests de accesibilidad
npm run test:a11y

# Tests visuales
npm run test:visual
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Desarrollo en modo watch
npm run build            # Construir todos los paquetes
npm run lint             # Linting
npm run test             # Tests

# Storybook
npm run storybook        # Iniciar Storybook
npm run build-storybook  # Construir Storybook

# Tokens
npm run extract-tokens   # Extraer tokens desde Figma
npm run generate-components # Generar componentes

# API
npm run api:dev          # Desarrollo de la API
npm run api:build        # Construir API
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- 📧 Email: support@uds.com
- 💬 Discord: [UDS Community](https://discord.gg/uds)
- 📖 Documentación: [docs.uds.com](https://docs.uds.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/universal-design-system/issues)

## 🗺️ Roadmap

- [ ] Soporte para Vue.js
- [ ] Soporte para Angular
- [ ] Soporte para Svelte
- [ ] Editor visual de componentes
- [ ] Sistema de plugins
- [ ] CDN para distribución
- [ ] Herramientas de migración
- [ ] Integración con CMS populares

---

Hecho con ❤️ por el equipo de Universal Design System