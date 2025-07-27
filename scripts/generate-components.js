#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ComponentGenerator {
  constructor() {
    this.templates = {
      react: this.getReactTemplate(),
      vue: this.getVueTemplate(),
      angular: this.getAngularTemplate(),
      svelte: this.getSvelteTemplate(),
    };
  }

  generateComponent(name, framework = 'react', options = {}) {
    const componentName = this.pascalCase(name);
    const template = this.templates[framework];
    
    if (!template) {
      throw new Error(`Framework ${framework} not supported`);
    }

    const componentContent = this.processTemplate(template, {
      componentName,
      ...options,
    });

    const outputPath = this.getOutputPath(componentName, framework);
    this.writeFile(outputPath, componentContent);

    console.log(`✅ Generated ${framework} component: ${componentName}`);
    return outputPath;
  }

  getReactTemplate() {
    return `import React, { forwardRef } from 'react';
import { BaseComponentProps } from '../../types';
import { cn } from '../../utils/classNames';
import styles from './{{componentName}}.module.css';

export interface {{componentName}}Props extends BaseComponentProps {
  // Add your props here
}

export const {{componentName}} = forwardRef<HTMLDivElement, {{componentName}}Props>(
  (
    {
      children,
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const componentClasses = cn(
      styles.{{componentName.toLowerCase()}},
      className
    );

    return (
      <div
        ref={ref}
        className={componentClasses}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

{{componentName}}.displayName = '{{componentName}}';
`;
  }

  getVueTemplate() {
    return `<template>
  <div
    :class="componentClasses"
    :data-testid="testId"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../utils/classNames';
import './{{componentName}}.css';

interface Props {
  testId?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  testId: undefined,
  class: '',
});

const componentClasses = computed(() => {
  return cn('{{componentName.toLowerCase()}}', props.class);
});
</script>

<style scoped>
.{{componentName.toLowerCase()}} {
  /* Add your styles here */
}
</style>
`;
  }

  getAngularTemplate() {
    return `import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uds-{{componentName.toLowerCase()}}',
  template: \`
    <div
      [class]="componentClasses"
      [attr.data-testid]="testId"
    >
      <ng-content></ng-content>
    </div>
  \`,
  styleUrls: ['./{{componentName}}.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => {{componentName}}Component),
      multi: true,
    },
  ],
})
export class {{componentName}}Component implements ControlValueAccessor {
  @Input() testId?: string;
  @Input() class?: string;

  get componentClasses(): string {
    return \`{{componentName.toLowerCase()}} \${this.class || ''}\`.trim();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}
`;
  }

  getSvelteTemplate() {
    return `<script lang="ts">
  import { cn } from '../../utils/classNames';
  import './{{componentName}}.css';

  interface Props {
    testId?: string;
    class?: string;
  }

  let { testId, class: className = '', ...props }: Props = $props();

  $: componentClasses = cn('{{componentName.toLowerCase()}}', className);
</script>

<div
  class={componentClasses}
  data-testid={testId}
  {...props}
>
  <slot />
</div>

<style>
  .{{componentName.toLowerCase()}} {
    /* Add your styles here */
  }
</style>
`;
  }

  processTemplate(template, variables) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match;
    });
  }

  getOutputPath(componentName, framework) {
    const basePath = path.join(__dirname, '..', 'packages');
    
    switch (framework) {
      case 'react':
        return path.join(basePath, 'core', 'src', 'components', componentName);
      case 'vue':
        return path.join(basePath, 'vue', 'src', 'components', componentName);
      case 'angular':
        return path.join(basePath, 'angular', 'src', 'components', componentName);
      case 'svelte':
        return path.join(basePath, 'svelte', 'src', 'components', componentName);
      default:
        throw new Error(`Framework ${framework} not supported`);
    }
  }

  writeFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
  }

  pascalCase(str) {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (_, c) => c.toUpperCase());
  }

  generateCSSModule(componentName) {
    const cssContent = `.${componentName.toLowerCase()} {
  /* Add your styles here */
}

/* Variants */
.${componentName.toLowerCase()}--primary {
  /* Primary variant styles */
}

.${componentName.toLowerCase()}--secondary {
  /* Secondary variant styles */
}

/* Sizes */
.${componentName.toLowerCase()}--sm {
  /* Small size styles */
}

.${componentName.toLowerCase()}--md {
  /* Medium size styles */
}

.${componentName.toLowerCase()}--lg {
  /* Large size styles */
}

/* States */
.${componentName.toLowerCase()}--disabled {
  /* Disabled state styles */
}

/* Focus styles for accessibility */
.${componentName.toLowerCase()}:focus-visible {
  outline: 2px solid var(--uds-color-primary-500);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .${componentName.toLowerCase()} {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .${componentName.toLowerCase()} {
    transition: none;
  }
}`;

    return cssContent;
  }

  generateStory(componentName) {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '@uds/core';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A ${componentName.toLowerCase()} component with various configurations.',
      },
    },
  },
  argTypes: {
    // Add your argTypes here
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: '${componentName}',
  },
};

// Add more stories here
`;
  }

  generateIndex(componentName) {
    return `export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
`;
  }

  generateAll(componentName, framework = 'react') {
    const componentPath = this.getOutputPath(componentName, framework);
    
    // Generate component file
    const componentFile = path.join(componentPath, `${componentName}.tsx`);
    this.writeFile(componentFile, this.processTemplate(this.templates[framework], { componentName }));

    // Generate CSS module
    const cssFile = path.join(componentPath, `${componentName}.module.css`);
    this.writeFile(cssFile, this.generateCSSModule(componentName));

    // Generate index file
    const indexFile = path.join(componentPath, 'index.ts');
    this.writeFile(indexFile, this.generateIndex(componentName));

    // Generate story file
    const storyFile = path.join(componentPath, `${componentName}.stories.tsx`);
    this.writeFile(storyFile, this.generateStory(componentName));

    console.log(`✅ Generated complete ${framework} component: ${componentName}`);
    console.log(`📁 Files created:`);
    console.log(`   - ${componentFile}`);
    console.log(`   - ${cssFile}`);
    console.log(`   - ${indexFile}`);
    console.log(`   - ${storyFile}`);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node generate-components.js <component-name> [framework] [options]');
    console.log('');
    console.log('Examples:');
    console.log('  node generate-components.js button');
    console.log('  node generate-components.js card vue');
    console.log('  node generate-components.js modal angular');
    console.log('  node generate-components.js badge svelte');
    process.exit(1);
  }
  
  const [componentName, framework = 'react'] = args;
  
  const generator = new ComponentGenerator();
  
  try {
    generator.generateAll(componentName, framework);
    console.log('🎉 Component generation completed successfully!');
  } catch (error) {
    console.error('💥 Component generation failed:', error.message);
    process.exit(1);
  }
}

module.exports = ComponentGenerator;