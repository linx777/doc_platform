import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BlogPage from '../blog/index.vue'

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

describe('Blog Page', () => {
  let router: any

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/blog', component: BlogPage },
        { path: '/blog/:slug', component: BlogPage }
      ]
    })
  })

  it('renders the page title correctly', () => {
    const wrapper = mount(BlogPage, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('h1').text()).toBe('Blog')
  })

})
