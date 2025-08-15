<template>
  <header 
    class="p-4" 
    :style="{ 
      backgroundColor: branding.headerBgColor, 
      color: branding.headerTextColor 
    }"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center">
        <!-- Logo/Title -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span :style="{ color: branding.primaryColor }" class="text-xl font-bold">{{ branding.logo }}</span>
          </div>
          <h1 class="text-2xl font-bold">
            {{ branding.name }}
          </h1>
        </div>
        
        <!-- Navigation Tabs -->
        <nav class="flex space-x-4">
          <NuxtLink to="/api" class="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            API Docs
          </NuxtLink>
          <NuxtLink to="/tutorials" class="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            Tutorials
          </NuxtLink>
          <NuxtLink to="/blog" class="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            Blog
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getBrandingConfig } from '~/branding.config'
const config = useRuntimeConfig()

// Get brand from route query or use default
const route = useRoute()
const brand = computed(() => {
  return config.public.branding|| 'default'
})

const branding = computed(() => getBrandingConfig(brand.value))
</script>
