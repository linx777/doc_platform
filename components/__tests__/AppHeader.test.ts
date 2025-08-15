import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'

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

describe('AppHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the header with correct branding', () => {
    const wrapper = mount(AppHeader)

    // Check if header exists
    expect(wrapper.find('header').exists()).toBe(true)

    // Check if logo and title are displayed
    expect(wrapper.find('.text-xl.font-bold').text()).toBe('DP')
    expect(wrapper.find('h1').text()).toBe('Documentation Platform')
  })

  it('renders all navigation links', () => {
    const wrapper = mount(AppHeader)

    // Check if all navigation links exist - look for elements with to attributes
    const links = wrapper.findAll('[to]')
    expect(links).toHaveLength(4) // 3 nav links + 1 home link

    // Check link texts and to props
    expect(links[0]?.text()).toContain('DP')
    expect(links[0]?.attributes('to')).toBe('/')

    expect(links[1]?.text()).toBe('API Docs')
    expect(links[1]?.attributes('to')).toBe('/api')

    expect(links[2]?.text()).toBe('Tutorials')
    expect(links[2]?.attributes('to')).toBe('/tutorials')

    expect(links[3]?.text()).toBe('Blog')
    expect(links[3]?.attributes('to')).toBe('/blog')
  })

  it('applies primary color to logo text', () => {
    const wrapper = mount(AppHeader)
    const logoText = wrapper.find('.text-xl.font-bold')

    // Browser converts hex to rgb
    expect(logoText.attributes('style')).toContain('color: rgb(37, 99, 235)')
  })

  it('applies sticky positioning and branding colors', () => {
    const wrapper = mount(AppHeader)
    const header = wrapper.find('header')

    // Check sticky positioning
    expect(header.classes()).toContain('sticky')
    expect(header.classes()).toContain('top-0')
    expect(header.classes()).toContain('z-50')

    // Check branding colors are applied
    expect(header.attributes('style')).toContain('background-color: rgb(219, 234, 254)')
    expect(header.attributes('style')).toContain('color: rgb(30, 64, 175)')
  })

  it('renders navigation with proper styling', () => {
    const wrapper = mount(AppHeader)
    const nav = wrapper.find('nav')

    // Check navigation exists
    expect(nav.exists()).toBe(true)
    expect(nav.classes()).toContain('flex')
    expect(nav.classes()).toContain('space-x-4')

    // Check each link has proper styling
    const links = wrapper.findAll('[to]')
    links.forEach(link => {
      if (link.attributes('to') !== '/') {
        // Only check nav links, not the home link
        expect(link.classes()).toContain('px-4')
        expect(link.classes()).toContain('py-2')
        expect(link.classes()).toContain('rounded-lg')
        expect(link.classes()).toContain('hover:bg-white/20')
        expect(link.classes()).toContain('transition-colors')
      }
    })
  })

  it('makes logo and title clickable to home page', () => {
    const wrapper = mount(AppHeader)
    
    // Find the home link (logo + title)
    const homeLink = wrapper.find('[to="/"]')
    
    expect(homeLink.exists()).toBe(true)
    expect(homeLink.text()).toContain('DP')
    expect(homeLink.text()).toContain('Documentation Platform')
    expect(homeLink.classes()).toContain('hover:opacity-80')
    expect(homeLink.classes()).toContain('transition-opacity')
  })
})
