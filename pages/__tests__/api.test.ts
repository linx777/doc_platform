import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ApiPage from '../api/index.vue'

// Mock the SwaggerUI component
vi.mock('../../components/SwaggerUI.vue', () => ({
  default: {
    name: 'SwaggerUI',
    template: '<div id="swagger-ui-mock">Swagger UI Mock</div>',
    props: ['specUrl']
  }
}))

// Mock Nuxt composables
vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      branding: 'default'
    }
  })
}))

describe('API Page', () => {
  let router: any

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/api', component: ApiPage }
      ]
    })
  })

  it('renders the page title correctly', () => {
    const wrapper = mount(ApiPage, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('h1').text()).toBe('API Documentation')
  })

})
