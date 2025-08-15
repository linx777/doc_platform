import { describe, it, expect } from 'vitest'
import { getBrandingConfig } from '../branding.config'

describe('Branding Configuration', () => {
  describe('getBrandingConfig', () => {
    it('returns default branding when no brand is specified', () => {
      const branding = getBrandingConfig('default')
      
      expect(branding.name).toBe('Documentation Platform')
      expect(branding.logo).toBe('DP')
      expect(branding.primaryColor).toBe('#2563eb')
      expect(branding.headerBgColor).toBe('#dbeafe')
      expect(branding.headerTextColor).toBe('#1e40af')
      expect(branding.backgroundColor).toBe('#f9fafb')
      expect(branding.linkColor).toBe('#2563eb')
      expect(branding.cardBorderColor).toBe('#e5e7eb')
    })

    it('returns techcorp branding correctly', () => {
      const branding = getBrandingConfig('techcorp')
      
      expect(branding.name).toBe('TechCorp Docs')
      expect(branding.logo).toBe('TC')
      expect(branding.primaryColor).toBe('#059669')
      expect(branding.headerBgColor).toBe('#d1fae5')
      expect(branding.headerTextColor).toBe('#065f46')
      expect(branding.backgroundColor).toBe('#f0fdf4')
      expect(branding.linkColor).toBe('#059669')
      expect(branding.cardBorderColor).toBe('#a7f3d0')
    })

    it('returns startup branding correctly', () => {
      const branding = getBrandingConfig('startup')
      
      expect(branding.name).toBe('StartupHub')
      expect(branding.logo).toBe('SH')
      expect(branding.primaryColor).toBe('#7c3aed')
      expect(branding.headerBgColor).toBe('#e9d5ff')
      expect(branding.headerTextColor).toBe('#581c87')
      expect(branding.backgroundColor).toBe('#faf5ff')
      expect(branding.linkColor).toBe('#7c3aed')
      expect(branding.cardBorderColor).toBe('#c4b5fd')
    })

    it('returns enterprise branding correctly', () => {
      const branding = getBrandingConfig('enterprise')
      
      expect(branding.name).toBe('Enterprise Solutions')
      expect(branding.logo).toBe('ES')
      expect(branding.primaryColor).toBe('#374151')
      expect(branding.headerBgColor).toBe('#e5e7eb')
      expect(branding.headerTextColor).toBe('#374151')
      expect(branding.backgroundColor).toBe('#f9fafb')
      expect(branding.linkColor).toBe('#374151')
      expect(branding.cardBorderColor).toBe('#d1d5db')
    })

    it('falls back to default branding for unknown brands', () => {
      const branding = getBrandingConfig('unknown-brand')
      
      expect(branding.name).toBe('Documentation Platform')
      expect(branding.logo).toBe('DP')
    })

    it('maintains consistent color scheme for each branding', () => {
      const brandings = ['default', 'techcorp', 'startup', 'enterprise']
      
      brandings.forEach(brand => {
        const config = getBrandingConfig(brand)
        
        // Check that all required properties exist
        expect(config).toHaveProperty('name')
        expect(config).toHaveProperty('logo')
        expect(config).toHaveProperty('primaryColor')
        expect(config).toHaveProperty('headerBgColor')
        expect(config).toHaveProperty('headerTextColor')
        expect(config).toHaveProperty('backgroundColor')
        expect(config).toHaveProperty('linkColor')
        expect(config).toHaveProperty('cardBorderColor')
        
        // Check that colors are valid hex values
        expect(config.primaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(config.headerBgColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(config.headerTextColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(config.backgroundColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(config.linkColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(config.cardBorderColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
      })
    })

    it('provides distinct visual identities for each branding', () => {
      const defaultBranding = getBrandingConfig('default')
      const techcorpBranding = getBrandingConfig('techcorp')
      const startupBranding = getBrandingConfig('startup')
      const enterpriseBranding = getBrandingConfig('enterprise')
      
      // Each branding should have unique colors
      expect(defaultBranding.primaryColor).not.toBe(techcorpBranding.primaryColor)
      expect(defaultBranding.primaryColor).not.toBe(startupBranding.primaryColor)
      expect(defaultBranding.primaryColor).not.toBe(enterpriseBranding.primaryColor)
      
      expect(techcorpBranding.primaryColor).not.toBe(startupBranding.primaryColor)
      expect(techcorpBranding.primaryColor).not.toBe(enterpriseBranding.primaryColor)
      
      expect(startupBranding.primaryColor).not.toBe(enterpriseBranding.primaryColor)
    })

    it('ensures header colors provide good contrast', () => {
      const brandings = ['default', 'techcorp', 'startup', 'enterprise']
      
      brandings.forEach(brand => {
        const config = getBrandingConfig(brand)
        
        // Header background and text colors should be different
        expect(config.headerBgColor).not.toBe(config.headerTextColor)
        
        // Background colors should be lighter than text colors for readability
        const bgColor = config.headerBgColor
        const textColor = config.headerTextColor
        
        // Simple check: lighter colors typically have higher values
        const bgValue = parseInt(bgColor.slice(1), 16)
        const textValue = parseInt(textColor.slice(1), 16)
        
        // This is a basic check - in practice you'd want more sophisticated contrast validation
        expect(bgValue).toBeGreaterThan(textValue)
      })
    })
  })
})
