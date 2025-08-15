# Testing Guide

This project uses **Vitest** as the testing framework with **Vue Test Utils** for component testing.

## 🚀 Quick Start

### Run Tests
```bash
# Run tests in watch mode (development)
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📁 Test Structure

```
test/
├── setup.ts                 # Global test configuration
├── README.md               # This file
└── __tests__/              # Test files
    ├── app.test.ts         # Main app component tests
    └── branding.config.test.ts  # Branding configuration tests

components/
└── __tests__/
    ├── AppHeader.test.ts   # Header component tests
    └── SwaggerUI.test.ts   # Swagger UI component tests

pages/
└── __tests__/
    ├── api.test.ts         # API page tests
    ├── blog.test.ts        # Blog page tests
    └── tutorials.test.ts   # Tutorials page tests

utils/
└── __tests__/
    ├── content.test.ts     # Content utility tests
    └── markdown.test.ts    # Markdown utility tests
```

## 🧪 Test Categories

### Component Tests
- **AppHeader**: Tests navigation, branding, and sticky positioning
- **SwaggerUI**: Tests Swagger UI initialization and error handling
- **App**: Tests main layout and branding integration

### Page Tests
- **API Page**: Tests API documentation page structure
- **Blog Page**: Tests blog listing page structure
- **Tutorials Page**: Tests tutorials listing page structure

### Utility Tests
- **Content**: Tests content scanning and retrieval functions
- **Markdown**: Tests markdown parsing and HTML conversion
- **Branding**: Tests branding configuration and themes

## 🔧 Test Configuration

### Vitest Config (`vitest.config.ts`)
- **Environment**: jsdom for DOM testing
- **Coverage**: V8 provider with HTML, JSON, and text reports
- **Aliases**: Configured for `~` and `@` path resolution

### Test Setup (`test/setup.ts`)
- **Mocks**: Nuxt composables and auto-imports
- **Global**: ResizeObserver and console mocks
- **Environment**: JSDOM setup for browser-like testing

## 📝 Writing Tests

### Component Test Example
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.find('.my-class').exists()).toBe(true)
  })
})
```

### Utility Test Example
```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../myUtils'

describe('myFunction', () => {
  it('returns expected result', () => {
    const result = myFunction('input')
    expect(result).toBe('expected output')
  })
})
```

## 🎯 Testing Best Practices

### Component Testing
- Test component rendering and structure
- Verify CSS classes and styling
- Test props and event handling
- Mock external dependencies

### Utility Testing
- Test function inputs and outputs
- Cover edge cases and error conditions
- Mock file system and external APIs
- Test async functions properly

### Mocking Strategy
- Mock Nuxt composables (`useRuntimeConfig`, `useRoute`)
- Mock external libraries (Swagger UI, file system)
- Use virtual modules for CSS imports
- Create realistic test data

## 🚨 Common Issues

### Import Errors
- Ensure proper path resolution in `vitest.config.ts`
- Use correct import syntax for Vue components
- Mock external dependencies properly

### Component Mounting
- Provide required props and global plugins
- Mock router and other global dependencies
- Handle async component loading

### Test Environment
- JSDOM provides browser-like environment
- Some browser APIs may need mocking
- CSS-in-JS libraries may require special handling

## 📊 Coverage Reports

Run `npm run test:coverage` to generate coverage reports:

- **Text**: Console output with coverage summary
- **JSON**: Machine-readable coverage data
- **HTML**: Interactive coverage report in `coverage/` directory

## 🔄 Continuous Integration

Tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions step
- name: Run Tests
  run: npm run test:run

- name: Generate Coverage
  run: npm run test:coverage
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [JSDOM](https://github.com/jsdom/jsdom)
- [Testing Vue Components](https://vuejs.org/guide/scaling-up/testing.html)
