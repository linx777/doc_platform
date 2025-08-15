export interface BrandingConfig {
  name: string
  logo: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  headerBgColor: string
  headerTextColor: string
  buttonBgColor: string
  buttonTextColor: string
  linkColor: string
  borderColor: string
  cardBgColor: string
  cardBorderColor: string
}

export const brandingConfigs: Record<string, BrandingConfig> = {
  default: {
    name: 'Documentation Platform',
    logo: 'DP',
    primaryColor: '#2563eb', // blue-600
    secondaryColor: '#1d4ed8', // blue-700
    accentColor: '#3b82f6', // blue-500
    backgroundColor: '#f9fafb', // gray-50
    textColor: '#111827', // gray-900
    headerBgColor: '#dbeafe', // blue-100 (light blue)
    headerTextColor: '#1e40af', // blue-800 (dark blue text for contrast)
    buttonBgColor: '#2563eb', // blue-600
    buttonTextColor: '#ffffff', // white
    linkColor: '#2563eb', // blue-600
    borderColor: '#e5e7eb', // gray-200
    cardBgColor: '#ffffff', // white
    cardBorderColor: '#e5e7eb', // gray-200
  },
  techcorp: {
    name: 'TechCorp Docs',
    logo: 'TC',
    primaryColor: '#059669', // emerald-600
    secondaryColor: '#047857', // emerald-700
    accentColor: '#10b981', // emerald-500
    backgroundColor: '#f0fdf4', // emerald-50
    textColor: '#064e3b', // emerald-900
    headerBgColor: '#d1fae5', // emerald-100 (light green)
    headerTextColor: '#065f46', // emerald-800 (dark green text for contrast)
    buttonBgColor: '#059669', // emerald-600
    buttonTextColor: '#ffffff', // white
    linkColor: '#059669', // emerald-600
    borderColor: '#a7f3d0', // emerald-200
    cardBgColor: '#ffffff', // white
    cardBorderColor: '#a7f3d0', // emerald-200
  },
  startup: {
    name: 'StartupHub',
    logo: 'SH',
    primaryColor: '#7c3aed', // violet-600
    secondaryColor: '#6d28d9', // violet-700
    accentColor: '#8b5cf6', // violet-500
    backgroundColor: '#faf5ff', // violet-50
    textColor: '#2e1065', // violet-900
    headerBgColor: '#e9d5ff', // violet-100 (light purple)
    headerTextColor: '#581c87', // violet-800 (dark purple text for contrast)
    buttonBgColor: '#7c3aed', // violet-600
    buttonTextColor: '#ffffff', // white
    linkColor: '#7c3aed', // violet-600
    borderColor: '#c4b5fd', // violet-200
    cardBgColor: '#ffffff', // white
    cardBorderColor: '#c4b5fd', // violet-200
  },
  enterprise: {
    name: 'Enterprise Solutions',
    logo: 'ES',
    primaryColor: '#374151', // gray-700
    secondaryColor: '#1f2937', // gray-800
    accentColor: '#6b7280', // gray-500
    backgroundColor: '#f9fafb', // gray-50
    textColor: '#111827', // gray-900
    headerBgColor: '#e5e7eb', // gray-200 (light gray)
    headerTextColor: '#374151', // gray-700 (dark gray text for contrast)
    buttonBgColor: '#374151', // gray-700
    buttonTextColor: '#ffffff', // white
    linkColor: '#374151', // gray-700
    borderColor: '#d1d5db', // gray-300
    cardBgColor: '#ffffff', // white
    cardBorderColor: '#d1d5db', // gray-300
  }
}

export function getBrandingConfig(brand: string = 'startup'): BrandingConfig {
  const config = brandingConfigs[brand]
  return config ?? brandingConfigs.default
}
