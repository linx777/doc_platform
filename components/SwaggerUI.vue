<template>
  <div class="w-full">
    <div id="swagger-ui" class="swagger-ui"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import 'swagger-ui-dist/swagger-ui.css'
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist'

const props = defineProps<{
  specUrl: string
}>()

onMounted(() => {
  try {
    const ui = SwaggerUIBundle({
      url: props.specUrl,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      deepLinking: true,
      showExtensions: true,
      showCommonExtensions: true,
      docExpansion: 'list',
      filter: true,
      tryItOutEnabled: true
    })
  } catch (error) {
    console.error('Failed to initialize Swagger UI:', error)
  }
})
</script>

<style scoped>
/* Ensure Swagger UI container is properly sized */
#swagger-ui {
  min-height: 400px;
  width: 100%;
}
</style>
