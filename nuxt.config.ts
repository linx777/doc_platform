// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  nitro: {
    // Ensure content directory is accessible in production
    publicAssets: [
      {
        baseURL: '/',
        dir: 'content',
      }
    ]
  },
  runtimeConfig: {
    public: {
      branding: 'default'
    }
  },
})
