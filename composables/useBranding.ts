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
      '--secondary-color': branding.secondaryColor,
      '--accent-color': branding.accentColor,
      '--background-color': branding.backgroundColor,
      '--text-color': branding.textColor,
      '--header-bg-color': branding.headerBgColor,
      '--header-text-color': branding.headerTextColor,
      '--button-bg-color': branding.buttonBgColor,
      '--button-text-color': branding.buttonTextColor,
      '--link-color': branding.linkColor,
      '--border-color': branding.borderColor,
      '--card-bg-color': branding.cardBgColor,
      '--card-border-color': branding.cardBorderColor,
    }),
    
    // Tailwind classes based on branding
    getTailwindClasses: () => ({
      header: `bg-[${branding.headerBgColor}] text-[${branding.headerTextColor}]`,
      button: `bg-[${branding.buttonBgColor}] text-[${branding.buttonTextColor}] hover:opacity-90`,
      link: `text-[${branding.linkColor}] hover:underline`,
      card: `bg-[${branding.cardBgColor}] border border-[${branding.cardBorderColor}]`,
      background: `bg-[${branding.backgroundColor}]`,
      text: `text-[${branding.textColor}]`,
    })
  }
}
