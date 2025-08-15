import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../app.vue'

// Mock the AppHeader component with a proper Vue component
const MockAppHeader = {
  name: 'AppHeader',
  template: '<header id="app-header">Header Mock</header>'
}

// Mock the branding config
vi.mock('~/branding.config', () => ({
  getBrandingConfig: (brand: string) => ({
    name: 'Documentation Platform',
    logo: 'DP',
    primaryColor: '#2563eb',
    backgroundColor: '#f9fafb',
    headerBgColor: '#dbeafe',
    headerTextColor: '#1e40af',
    linkColor: '#2563eb',
    cardBorderColor: '#e5e7eb',
  })
}))

// Mock Nuxt composables
vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      branding: 'default'
    }
  })
}))

describe('App Component', () => {
  let router: any

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home Page</div>' } }
      ]
    })
  })

  it('renders the main app structure', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          AppHeader: MockAppHeader
        }
      }
    })
    
    // Check main container
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
    
    // Check header
    expect(wrapper.find('#app-header').exists()).toBe(true)
    
    // Check main content area
    expect(wrapper.find('main.flex-1').exists()).toBe(true)
  })

  it('applies branding background color', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          AppHeader: MockAppHeader
        }
      }
    })
    
    const mainContainer = wrapper.find('.min-h-screen')
    // The browser converts hex to rgb, so we need to check for the rgb value
    expect(mainContainer.attributes('style')).toContain('background-color: rgb(249, 250, 251)')
  })

  it('renders AppHeader component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          AppHeader: MockAppHeader
        }
      }
    })
    
    expect(wrapper.find('#app-header').exists()).toBe(true)
    expect(wrapper.find('#app-header').text()).toBe('Header Mock')
  })

  it('has proper layout structure', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          AppHeader: MockAppHeader
        }
      }
    })
    
    // Check that the layout follows the expected structure
    const mainContainer = wrapper.find('.min-h-screen')
    expect(mainContainer.exists()).toBe(true)
    
    const header = mainContainer.find('#app-header')
    expect(header.exists()).toBe(true)
    
    const main = mainContainer.find('main.flex-1')
    expect(main.exists()).toBe(true)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          AppHeader: MockAppHeader
        }
      }
    })
    
    const mainContainer = wrapper.find('.min-h-screen')
    expect(mainContainer.exists()).toBe(true)
    
    const main = wrapper.find('main.flex-1')
    expect(main.exists()).toBe(true)
  })

  it('maintains responsive design', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          AppHeader: MockAppHeader
        }
      }
    })
    
    const mainContainer = wrapper.find('.min-h-screen')
    expect(mainContainer.exists()).toBe(true)
    
    // The min-h-screen class ensures the app takes at least the full viewport height
    expect(mainContainer.classes()).toContain('min-h-screen')
  })

  it('integrates with Nuxt routing system', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          AppHeader: MockAppHeader
        }
      }
    })
    
    // Check that NuxtPage is rendered (this would be the router view in Nuxt)
    const main = wrapper.find('main.flex-1')
    expect(main.exists()).toBe(true)
  })
})
