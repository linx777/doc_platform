import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

// Mock Swagger UI modules at the top level
vi.mock('swagger-ui-dist', () => ({
  SwaggerUIBundle: vi.fn(),
  SwaggerUIStandalonePreset: {}
}))

import SwaggerUI from '../SwaggerUI.vue'

describe('SwaggerUI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the container div', () => {
    const wrapper = mount(SwaggerUI, {
      props: {
        specUrl: '/api/spec.json'
      }
    })

    expect(wrapper.find('#swagger-ui').exists()).toBe(true)
    expect(wrapper.find('.swagger-ui').exists()).toBe(true)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(SwaggerUI, {
      props: {
        specUrl: '/api/spec.json'
      }
    })

    const container = wrapper.find('.w-full')
    expect(container.exists()).toBe(true)
  })

  it('accepts specUrl prop', () => {
    const wrapper = mount(SwaggerUI, {
      props: {
        specUrl: 'https://example.com/api.json'
      }
    })

    expect(wrapper.props('specUrl')).toBe('https://example.com/api.json')
  })

  it('renders with default props', () => {
    const wrapper = mount(SwaggerUI)

    expect(wrapper.find('#swagger-ui').exists()).toBe(true)
  })

  it('has proper component structure', () => {
    const wrapper = mount(SwaggerUI, {
      props: {
        specUrl: '/api/spec.json'
      }
    })

    // Check that the component has the expected structure
    expect(wrapper.find('.w-full').exists()).toBe(true)
    expect(wrapper.find('#swagger-ui').exists()).toBe(true)
    expect(wrapper.find('.swagger-ui').exists()).toBe(true)
  })
})
