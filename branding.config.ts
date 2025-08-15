export interface BrandingConfig {
  name: string
  logo: string
  primaryColor: string
  backgroundColor: string
  headerBgColor: string
  headerTextColor: string
  linkColor: string
  cardBorderColor: string
}

export const brandingConfigs: Record<string, BrandingConfig> = {
  default: {
    name: 'Documentation Platform',
    logo: 'DP',
    primaryColor: '#2563eb', // blue-600
    backgroundColor: '#f9fafb', // gray-50
    headerBgColor: '#dbeafe', // blue-100 (light blue)
    headerTextColor: '#1e40af', // blue-800 (dark blue text for contrast)
    linkColor: '#2563eb', // blue-600
    cardBorderColor: '#e5e7eb', // gray-200
  },
  techcorp: {
    name: 'TechCorp Docs',
    logo: 'TC',
    primaryColor: '#059669', // emerald-600
    backgroundColor: '#f0fdf4', // emerald-50
    headerBgColor: '#d1fae5', // emerald-100 (light green)
    headerTextColor: '#065f46', // emerald-800 (dark green text for contrast)
    linkColor: '#059669', // emerald-600
    cardBorderColor: '#a7f3d0', // emerald-200
  },
  startup: {
    name: 'StartupHub',
    logo: 'SH',
    primaryColor: '#7c3aed', // violet-600
    backgroundColor: '#faf5ff', // violet-50
    headerBgColor: '#e9d5ff', // violet-100 (light purple)
    headerTextColor: '#581c87', // violet-800 (dark purple text for contrast)
    linkColor: '#7c3aed', // violet-600
    cardBorderColor: '#c4b5fd', // violet-200
  },
  enterprise: {
    name: 'Enterprise Solutions',
    logo: 'ES',
    primaryColor: '#374151', // gray-700
    backgroundColor: '#f9fafb', // gray-50
    headerBgColor: '#e5e7eb', // gray-200 (light gray)
    headerTextColor: '#374151', // gray-700 (dark gray text for contrast)
    linkColor: '#374151', // gray-700
    cardBorderColor: '#d1d5db', // gray-300
  }
}

export function getBrandingConfig(brand: string = 'startup'): BrandingConfig {
  const config = brandingConfigs[brand]
  return config ?? brandingConfigs.default
}
