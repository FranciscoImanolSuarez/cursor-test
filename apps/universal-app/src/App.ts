// Universal App - Same code for all frameworks
// Similar to React Native's approach

import { 
  Universal, 
  createElement, 
  withUniversalHooks,
  UniversalNode,
  UniversalProps 
} from '@uds/core/UniversalRenderer';
import { 
  UniversalButton, 
  UniversalInput, 
  UniversalCard, 
  UniversalModal,
  UniversalComponents 
} from '@uds/core/UniversalComponent';

// Universal App Component - Same implementation for all frameworks
const UniversalAppComponent = withUniversalHooks((props: UniversalProps): UniversalNode => {
  const [count, setCount] = Universal.Hooks.useState(0, 'counter');
  const [name, setName] = Universal.Hooks.useState('', 'name');
  const [isModalOpen, setIsModalOpen] = Universal.Hooks.useState(false, 'modal');
  const [currentRoute, setCurrentRoute] = Universal.Hooks.useState('home', 'route');

  // Universal effects - same for all frameworks
  Universal.Hooks.useEffect(() => {
    console.log('Universal App mounted');
    document.title = 'Universal Design System App';
  }, [], 'app-mount');

  Universal.Hooks.useEffect(() => {
    console.log('Count changed:', count);
  }, [count], 'count-effect');

  // Universal event handlers
  const handleButtonClick = () => {
    setCount(count + 1);
  };

  const handleInputChange = (event: any) => {
    setName(event.target?.value || '');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigation = (route: string) => {
    setCurrentRoute(route);
    Universal.Navigation.navigate(route);
  };

  // Universal styles
  const styles = Universal.StyleSheet.create({
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa',
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
    },
    main: {
      flex: 1,
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    },
    section: {
      marginBottom: '3rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '1.5rem',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e1e5e9',
    },
    navigation: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
    },
    footer: {
      background: '#f8f9fa',
      padding: '1.5rem',
      textAlign: 'center',
      color: '#6c757d',
      borderTop: '1px solid #e9ecef',
    },
  });

  // Render different routes
  const renderHome = () => createElement('div', { style: styles.section },
    createElement('h2', null, 'Welcome to Universal Design System'),
    createElement('p', null, 'This app demonstrates the same code running across all frameworks.'),
    
    createElement('div', { style: styles.grid },
      createElement('div', { style: styles.card },
        createElement('h3', null, 'Counter Example'),
        createElement('p', null, `Count: ${count}`),
        createElement(UniversalButton, {
          variant: 'primary',
          size: 'lg',
          children: 'Increment',
          onClick: handleButtonClick,
        }),
      ),
      
      createElement('div', { style: styles.card },
        createElement('h3', null, 'Input Example'),
        createElement(UniversalInput, {
          type: 'text',
          placeholder: 'Enter your name',
          value: name,
          onChange: handleInputChange,
          label: 'Name',
        }),
        createElement('p', null, `Hello, ${name || 'stranger'}!`),
      ),
      
      createElement('div', { style: styles.card },
        createElement('h3', null, 'Modal Example'),
        createElement(UniversalButton, {
          variant: 'secondary',
          children: 'Open Modal',
          onClick: handleOpenModal,
        }),
      ),
    )
  );

  const renderComponents = () => createElement('div', { style: styles.section },
    createElement('h2', null, 'Universal Components'),
    createElement('p', null, 'All components work the same way across frameworks.'),
    
    createElement('div', { style: styles.grid },
      createElement('div', { style: styles.card },
        createElement('h3', null, 'Button Variants'),
        createElement(UniversalButton, { variant: 'primary', children: 'Primary' }),
        createElement(UniversalButton, { variant: 'secondary', children: 'Secondary' }),
        createElement(UniversalButton, { variant: 'outline', children: 'Outline' }),
        createElement(UniversalButton, { variant: 'ghost', children: 'Ghost' }),
        createElement(UniversalButton, { variant: 'danger', children: 'Danger' }),
      ),
      
      createElement('div', { style: styles.card },
        createElement('h3', null, 'Button Sizes'),
        createElement(UniversalButton, { size: 'sm', children: 'Small' }),
        createElement(UniversalButton, { size: 'md', children: 'Medium' }),
        createElement(UniversalButton, { size: 'lg', children: 'Large' }),
      ),
      
      createElement('div', { style: styles.card },
        createElement('h3', null, 'Input Types'),
        createElement(UniversalInput, { type: 'text', placeholder: 'Text input' }),
        createElement(UniversalInput, { type: 'email', placeholder: 'Email input' }),
        createElement(UniversalInput, { type: 'password', placeholder: 'Password input' }),
      ),
    )
  );

  const renderAbout = () => createElement('div', { style: styles.section },
    createElement('h2', null, 'About Universal Design System'),
    createElement('p', null, 'This is a truly universal design system that works across all web frameworks.'),
    createElement('p', null, 'Key features:'),
    createElement('ul', null,
      createElement('li', null, 'Single codebase for all frameworks'),
      createElement('li', null, 'Framework-agnostic components'),
      createElement('li', null, 'Universal hooks system'),
      createElement('li', null, 'Universal styling system'),
      createElement('li', null, 'Universal navigation system'),
      createElement('li', null, 'Universal storage and network APIs'),
    ),
    createElement('p', null, `Current platform: ${Universal.Platform.getPlatform()}`),
  );

  // Render current route
  const renderContent = () => {
    switch (currentRoute) {
      case 'home':
        return renderHome();
      case 'components':
        return renderComponents();
      case 'about':
        return renderAbout();
      default:
        return renderHome();
    }
  };

  // Main app structure - same for all frameworks
  return createElement('div', { style: styles.container },
    // Header
    createElement('header', { style: styles.header },
      createElement('h1', null, 'Universal Design System'),
      createElement('p', null, 'Same code, all frameworks'),
    ),
    
    // Navigation
    createElement('nav', { style: styles.navigation },
      createElement(UniversalButton, {
        variant: currentRoute === 'home' ? 'primary' : 'outline',
        children: 'Home',
        onClick: () => handleNavigation('home'),
      }),
      createElement(UniversalButton, {
        variant: currentRoute === 'components' ? 'primary' : 'outline',
        children: 'Components',
        onClick: () => handleNavigation('components'),
      }),
      createElement(UniversalButton, {
        variant: currentRoute === 'about' ? 'primary' : 'outline',
        children: 'About',
        onClick: () => handleNavigation('about'),
      }),
    ),
    
    // Main content
    createElement('main', { style: styles.main },
      renderContent()
    ),
    
    // Footer
    createElement('footer', { style: styles.footer },
      createElement('p', null, 'Universal Design System - Powered by Universal Components'),
    ),
    
    // Modal
    isModalOpen && createElement(UniversalModal, {
      isOpen: isModalOpen,
      title: 'Universal Modal',
      children: createElement('div', null,
        createElement('p', null, 'This modal works the same way across all frameworks!'),
        createElement(UniversalButton, {
          variant: 'primary',
          children: 'Close',
          onClick: handleCloseModal,
        }),
      ),
    }),
  );
});

// Universal App Registration
Universal.AppRegistry.registerComponent('UniversalApp', UniversalAppComponent);

// Export for use in different frameworks
export { UniversalAppComponent };
export default UniversalAppComponent;