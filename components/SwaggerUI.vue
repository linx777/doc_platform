<template>
  <div class="w-full">
    <div id="swagger-ui" class="swagger-ui"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  specUrl: string
}>()

onMounted(() => {
  // Load Swagger UI dynamically
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js'
  script.onload = () => {
    // Load CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css'
    document.head.appendChild(link)
    
    // Initialize Swagger UI
    const ui = (window as any).SwaggerUIBundle({
      url: props.specUrl,
      dom_id: '#swagger-ui',
      presets: [
        (window as any).SwaggerUIBundle.presets.apis,
        (window as any).SwaggerUIStandalonePreset
      ],
      deepLinking: true,
      showExtensions: true,
      showCommonExtensions: true,
      docExpansion: 'list',
      filter: true,
      tryItOutEnabled: true
    })
  }
  document.head.appendChild(script)
})
</script>

<style scoped>

</style>
