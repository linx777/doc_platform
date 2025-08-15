import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import TutorialsPage from '../tutorials/index.vue'

// Mock the content utilities
vi.mock('~/utils/content', () => ({
  scanContentFiles: vi.fn()
}))

// Mock Nuxt composables
vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      branding: 'default'
    }
  })
}))

describe('Tutorials Page', () => {
  let router: any

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/tutorials', component: TutorialsPage },
        { path: '/tutorials/:slug', component: TutorialsPage }
      ]
    })
  })

  it('renders the page title correctly', () => {
    const wrapper = mount(TutorialsPage, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('h1').text()).toBe('Tutorials')
  })

  it('renders the page with correct structure', () => {
    const wrapper = mount(TutorialsPage, {
      global: {
        plugins: [router]
      }
    })
    
    // Check main container
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
    
  })

})
