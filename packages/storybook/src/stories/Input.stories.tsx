import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@uds/core';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with various types, states, and accessibility features.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The type of the input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input',
    },
    value: {
      control: { type: 'text' },
      description: 'The current value of the input',
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'The default value of the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether the input has an error state',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display below the input',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the input should take full width',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Types
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
    label: 'Name',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
    label: 'Age',
  },
};

export const Tel: Story = {
  args: {
    type: 'tel',
    placeholder: 'Enter your phone number',
    label: 'Phone',
  },
};

export const Url: Story = {
  args: {
    type: 'url',
    placeholder: 'Enter a URL',
    label: 'Website',
  },
};

// States
export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Password must be at least 8 characters long',
    placeholder: 'Enter your password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: true,
    helperText: 'Please enter a valid email address',
    placeholder: 'Enter your email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    disabled: true,
    value: 'john.doe',
    placeholder: 'Enter your username',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    fullWidth: true,
    placeholder: 'This input takes full width',
  },
  parameters: {
    layout: 'padded',
  },
};

// Interactive examples
export const Controlled: Story = {
  args: {
    label: 'Controlled Input',
    value: 'This is a controlled input',
    placeholder: 'Type something...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Input with Value',
    defaultValue: 'Default value',
    placeholder: 'Enter text...',
  },
};

// Form examples
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Input
        label="First Name"
        placeholder="Enter your first name"
        required
      />
      <Input
        label="Last Name"
        placeholder="Enter your last name"
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
        helperText="Password must be at least 8 characters"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Accessibility examples
export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Search for products',
    placeholder: 'Search...',
  },
};

export const WithAriaDescribedBy: Story = {
  args: {
    'aria-describedby': 'input-description',
    label: 'Username',
    placeholder: 'Enter your username',
  },
  render: (args) => (
    <div>
      <Input {...args} />
      <div id="input-description" style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
        Your username will be displayed publicly
      </div>
    </div>
  ),
};

// Error states
export const MultipleErrors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Input
        label="Email"
        type="email"
        error
        helperText="Please enter a valid email address"
        placeholder="Enter your email"
      />
      <Input
        label="Password"
        type="password"
        error
        helperText="Password must be at least 8 characters"
        placeholder="Enter your password"
      />
      <Input
        label="Confirm Password"
        type="password"
        error
        helperText="Passwords do not match"
        placeholder="Confirm your password"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};