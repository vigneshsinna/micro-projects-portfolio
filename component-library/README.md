# React Component Library 🎨

A modern, accessible, and customizable React component library built with TypeScript, Tailwind CSS, and Storybook. Perfect for building consistent user interfaces across applications.

## Features

- 🎯 **TypeScript First**: Full type safety with comprehensive TypeScript definitions
- ♿ **Accessibility**: WCAG 2.1 AA compliant components with proper ARIA attributes
- 🎨 **Design Tokens**: Consistent theming system with customizable design tokens
- 📚 **Storybook**: Interactive component documentation and playground
- 🔧 **Tree Shaking**: Optimized bundle size with tree-shaking support
- 🎭 **Multiple Themes**: Built-in light/dark themes with custom theme support
- 📱 **Responsive**: Mobile-first responsive design principles
- ⚡ **Performance**: Optimized for performance with minimal bundle impact

## Installation

```bash
# Using npm
npm install @yourorg/component-library

# Using yarn
yarn add @yourorg/component-library

# Using pnpm
pnpm add @yourorg/component-library
```

## Quick Start

```tsx
import React from 'react';
import { Button, Card, ThemeProvider } from '@yourorg/component-library';
import '@yourorg/component-library/dist/styles.css';

function App() {
  return (
    <ThemeProvider theme="light">
      <Card>
        <Card.Header>
          <Card.Title>Welcome</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>Get started with our component library!</p>
          <Button variant="primary" size="medium">
            Get Started
          </Button>
        </Card.Content>
      </Card>
    </ThemeProvider>
  );
}

export default App;
```

## Components

### Layout Components

#### Button
```tsx
import { Button } from '@yourorg/component-library';

<Button variant="primary" size="large" onClick={() => console.log('Clicked!')}>
  Primary Button
</Button>

<Button variant="secondary" disabled>
  Disabled Button
</Button>

<Button variant="outline" leftIcon={<PlusIcon />}>
  With Icon
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `loading`: boolean
- `leftIcon`, `rightIcon`: ReactNode
- `fullWidth`: boolean

#### Card
```tsx
import { Card } from '@yourorg/component-library';

<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Optional description</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card content goes here</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

#### Modal
```tsx
import { Modal, useModal } from '@yourorg/component-library';

function MyComponent() {
  const { isOpen, open, close } = useModal();
  
  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={close} title="Modal Title">
        <p>Modal content</p>
      </Modal>
    </>
  );
}
```

### Form Components

#### Input
```tsx
import { Input } from '@yourorg/component-library';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Please enter a valid email"
  required
/>

<Input
  label="Search"
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
/>
```

#### Select
```tsx
import { Select } from '@yourorg/component-library';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

<Select
  label="Choose an option"
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  searchable
  multiSelect
/>
```

#### Checkbox & Radio
```tsx
import { Checkbox, Radio, RadioGroup } from '@yourorg/component-library';

<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={setAccepted}
/>

<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" />
</RadioGroup>
```

### Data Display Components

#### Table
```tsx
import { Table } from '@yourorg/component-library';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', filterable: true }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
];

<Table
  columns={columns}
  data={data}
  sortable
  filterable
  pagination
  selectable
/>
```

#### Badge
```tsx
import { Badge } from '@yourorg/component-library';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
```

#### Avatar
```tsx
import { Avatar, AvatarGroup } from '@yourorg/component-library';

<Avatar src="/avatar.jpg" alt="User Avatar" size="large" />
<Avatar initials="JD" size="medium" />
<Avatar icon={<UserIcon />} size="small" />

<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
</AvatarGroup>
```

### Feedback Components

#### Alert
```tsx
import { Alert } from '@yourorg/component-library';

<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="success" dismissible onDismiss={() => {}}>
  Operation completed successfully!
</Alert>
```

#### Toast
```tsx
import { useToast } from '@yourorg/component-library';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleClick = () => {
    showToast({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
      duration: 5000
    });
  };
  
  return <Button onClick={handleClick}>Show Toast</Button>;
}
```

#### Loading Spinner
```tsx
import { Spinner, Skeleton } from '@yourorg/component-library';

<Spinner size="large" />
<Spinner color="primary" />

<Skeleton height={20} width="100%" />
<Skeleton.Text lines={3} />
<Skeleton.Avatar size="large" />
```

### Navigation Components

#### Tabs
```tsx
import { Tabs } from '@yourorg/component-library';

<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content for Tab 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content for Tab 2</Tabs.Panel>
  <Tabs.Panel value="tab3">Content for Tab 3</Tabs.Panel>
</Tabs>
```

#### Breadcrumb
```tsx
import { Breadcrumb } from '@yourorg/component-library';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Product Name' }
];

<Breadcrumb items={items} separator="/" />
```

## Theming

### Design Tokens

The component library uses a comprehensive design token system:

```typescript
// Design tokens
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      900: '#1e3a8a'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    }
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
};
```

### Custom Themes

Create custom themes by extending the base theme:

```typescript
import { createTheme } from '@yourorg/component-library';

const customTheme = createTheme({
  colors: {
    primary: {
      500: '#8b5cf6', // Custom purple
    },
    secondary: {
      500: '#f59e0b', // Custom amber
    }
  },
  components: {
    Button: {
      primary: {
        backgroundColor: 'var(--color-primary-500)',
        '&:hover': {
          backgroundColor: 'var(--color-primary-600)'
        }
      }
    }
  }
});

// Use with ThemeProvider
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### CSS Variables

All design tokens are exposed as CSS variables:

```css
:root {
  --color-primary-500: #3b82f6;
  --color-gray-500: #6b7280;
  --spacing-md: 1rem;
  --font-size-base: 1rem;
  --border-radius-md: 0.375rem;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

### Keyboard Navigation
- Full keyboard support for all interactive components
- Focus management and visible focus indicators
- Logical tab order

### Screen Reader Support
- Proper ARIA labels and descriptions
- Semantic HTML structure
- Live regions for dynamic content

### Color and Contrast
- Minimum 4.5:1 contrast ratio for text
- Color is not the only means of conveying information
- Support for reduced motion preferences

### Example Accessible Component Usage

```tsx
<Button
  aria-label="Delete item"
  aria-describedby="delete-help"
>
  <TrashIcon aria-hidden="true" />
</Button>
<div id="delete-help" className="sr-only">
  This will permanently delete the item
</div>
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourorg/component-library.git
cd component-library

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run storybook    # Start Storybook
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Building
npm run build        # Build library
npm run build:storybook  # Build Storybook

# Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run format       # Format code with Prettier

# Testing
npm run test:coverage    # Run tests with coverage
npm run test:a11y       # Run accessibility tests
npm run test:visual     # Run visual regression tests
```

### Project Structure

```
src/
├── components/          # Component implementations
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── hooks/              # Custom React hooks
├── tokens/             # Design tokens
├── themes/             # Theme definitions
├── utils/              # Utility functions
└── types/              # TypeScript type definitions

.storybook/             # Storybook configuration
docs/                   # Documentation
tests/                  # Test utilities and setup
```

### Creating New Components

1. **Generate component skeleton:**
   ```bash
   npm run generate:component ComponentName
   ```

2. **Component template:**
   ```tsx
   import React, { forwardRef } from 'react';
   import { cn } from '../../utils';
   import { ComponentNameProps } from './ComponentName.types';
   
   export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
     ({ className, children, ...props }, ref) => {
       return (
         <div
           ref={ref}
           className={cn('component-name', className)}
           {...props}
         >
           {children}
         </div>
       );
     }
   );
   
   ComponentName.displayName = 'ComponentName';
   ```

3. **Story template:**
   ```tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { ComponentName } from './ComponentName';
   
   const meta: Meta<typeof ComponentName> = {
     title: 'Components/ComponentName',
     component: ComponentName,
     parameters: {
       layout: 'centered',
     },
     tags: ['autodocs'],
   };
   
   export default meta;
   type Story = StoryObj<typeof meta>;
   
   export const Default: Story = {
     args: {
       children: 'Component Name',
     },
   };
   ```

4. **Test template:**
   ```tsx
   import { render, screen } from '@testing-library/react';
   import { ComponentName } from './ComponentName';
   
   describe('ComponentName', () => {
     it('renders correctly', () => {
       render(<ComponentName>Test</ComponentName>);
       expect(screen.getByText('Test')).toBeInTheDocument();
     });
   });
   ```

## Testing

### Unit Testing
```bash
# Run all tests
npm run test

# Run tests for specific component
npm run test Button

# Run tests with coverage
npm run test:coverage
```

### Visual Testing
```bash
# Run Chromatic visual tests
npm run chromatic

# Update visual baselines
npm run chromatic -- --auto-accept-changes
```

### Accessibility Testing
```bash
# Run automated a11y tests
npm run test:a11y

# Test with screen reader
npm run test:sr
```

## Bundle Analysis

Analyze bundle size and dependencies:

```bash
# Analyze bundle
npm run analyze

# Check bundle size
npm run size

# Verify tree-shaking
npm run tree-shake
```

## Publishing

### Versioning
```bash
# Version bump
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### Release Process
```bash
# Build and publish
npm run build
npm publish

# Publish beta version
npm publish --tag beta
```

## Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests and stories
5. Run quality checks (`npm run lint && npm run test`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Contribution Guidelines

- Follow the established code style
- Write comprehensive tests
- Include Storybook stories
- Update documentation
- Ensure accessibility compliance

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@yourorg.com
- 💬 Discord: [Join our community](https://discord.gg/component-library)
- 🐛 Issues: [GitHub Issues](https://github.com/yourorg/component-library/issues)
- 📖 Storybook: [Component Documentation](https://storybook.yourorg.com)

## Roadmap

- [ ] Additional form components (DatePicker, TimePicker, etc.)
- [ ] Data visualization components (Charts, Graphs)
- [ ] Advanced layout components (DataGrid, Kanban)
- [ ] Animation and transition utilities
- [ ] Mobile-specific components
- [ ] Design system CLI tools
- [ ] Figma design tokens integration
