import { getBrandingConfig, type BrandingConfig } from '~/branding.config'

export const useBranding = () => {
  const config = useRuntimeConfig()
  const brand = config.public.branding || 'default'
  
  const branding: BrandingConfig = getBrandingConfig(brand)
  
  return {
    branding,
    brand,
    // Helper functions for common branding operations
    getCssVariables: () => ({
      '--primary-color': branding.primaryColor,
      '--background-color': branding.backgroundColor,
      '--header-bg-color': branding.headerBgColor,
      '--header-text-color': branding.headerTextColor,
      '--link-color': branding.linkColor,
      '--card-border-color': branding.cardBorderColor,
    }),
    
    // Tailwind classes based on branding
    getTailwindClasses: () => ({
      header: `bg-[${branding.headerBgColor}] text-[${branding.headerTextColor}]`,
      link: `text-[${branding.linkColor}] hover:underline`,
      card: `bg-white border border-[${branding.cardBorderColor}]`,
      background: `bg-[${branding.backgroundColor}]`,
    })
  }
}
