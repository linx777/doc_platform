<template>
  <div class="min-h-screen" :style="{ backgroundColor: branding.backgroundColor }">
    <!-- Header with Navigation -->
    <AppHeader />

    <!-- Main Content Area for Pages -->
    <main class="flex-1">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
// App component logic
import { computed } from 'vue'
import { getBrandingConfig } from '~/branding.config'

const config = useRuntimeConfig()
const brand = computed(() => config.public.branding || 'default')
const branding = computed(() => getBrandingConfig(brand.value))
</script>
