import { vi } from 'vitest'

// Mock Nuxt composables using vi.stubGlobal
vi.stubGlobal('useRuntimeConfig', () => ({
  public: {
    branding: 'default'
  }
}))

vi.stubGlobal('useRoute', () => ({
  query: {}
}))

// Mock branding config
vi.mock('~/branding.config', () => ({
  getBrandingConfig: vi.fn((brand: string) => {
    const configs = {
      default: {
        name: 'Documentation Platform',
        logo: 'DP',
        primaryColor: '#2563eb',
        backgroundColor: '#f9fafb',
        headerBgColor: '#dbeafe',
        headerTextColor: '#1e40af',
        linkColor: '#2563eb',
        cardBorderColor: '#e5e7eb',
      },
      techcorp: {
        name: 'TechCorp Docs',
        logo: 'TC',
        primaryColor: '#059669',
        backgroundColor: '#f0fdf4',
        headerBgColor: '#d1fae5',
        headerTextColor: '#065f46',
        linkColor: '#059669',
        cardBorderColor: '#a7f3d0',
      },
      startup: {
        name: 'StartupHub',
        logo: 'SH',
        primaryColor: '#7c3aed',
        backgroundColor: '#faf5ff',
        headerBgColor: '#e9d5ff',
        headerTextColor: '#581c87',
        linkColor: '#7c3aed',
        cardBorderColor: '#c4b5fd',
      },
      enterprise: {
        name: 'Enterprise Solutions',
        logo: 'ES',
        primaryColor: '#374151',
        backgroundColor: '#f9fafb',
        headerBgColor: '#e5e7eb',
        headerTextColor: '#374151',
        linkColor: '#374151',
        cardBorderColor: '#d1d5db',
      }
    }
    return configs[brand as keyof typeof configs] || configs.default
  })
}))

vi.mock('~/utils/markdown', () => ({
  parseMarkdownToHtml: vi.fn((markdown: string) => {
    // Simple mock implementation
    if (!markdown) return ''
    return markdown
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
  }),
  generateSlug: vi.fn((text: string) => {
    if (!text) return ''
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  }),
  generateDescription: vi.fn((markdown: string, maxLength = 150) => {
    if (!markdown) return 'No description available'
    const content = markdown.replace(/^#.*$/gm, '').replace(/^---[\s\S]*?---/gm, '').trim()
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  })
}))

vi.mock('~/utils/content', () => ({
  scanContentFiles: vi.fn(() => []),
  getContentBySlug: vi.fn(() => null)
}))

// Mock Swagger UI modules
vi.mock('swagger-ui-dist', () => ({
  SwaggerUIBundle: {
    presets: {
      apis: {}
    }
  },
  SwaggerUIStandalonePreset: {}
}))

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
}

