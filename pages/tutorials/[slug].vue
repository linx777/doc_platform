<template>
  <ContentDetail
    :content-type="CONTENT_TYPE_LABEL"
    :content="tutorial"
    :loading="loading"
    :back-route="BACK_ROUTE"
    :back-text="BACK_TEXT"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useContent } from '~/composables/useContent'
import type { ContentDetail } from '~/types/content'

// Route and navigation constants
const route = useRoute()
const SLUG_PARAM = route.params.slug as string

// Content type constants
const CONTENT_TYPE = 'tutorials'
const CONTENT_TYPE_LABEL = 'Tutorial'
const BACK_ROUTE = '/tutorials'
const BACK_TEXT = 'Tutorials'

// Reactive state
const tutorial = ref<ContentDetail | null>(null)
const loading = ref(true)

// Content fetching composable
const { fetchContentBySlug } = useContent(CONTENT_TYPE)

onMounted(async () => {
  try {
    tutorial.value = await fetchContentBySlug(SLUG_PARAM)
  } catch (err) {
    console.error('Failed to load tutorial:', err)
  } finally {
    loading.value = false
  }
})
</script>

<!-- <style scoped>
/* Add some basic styling for the prose content */
.prose :deep(h1) {
  @apply text-3xl font-bold text-gray-900 mb-6;
}

.prose :deep(h2) {
  @apply text-2xl font-semibold text-gray-900 mb-4 mt-8;
}

.prose :deep(h3) {
  @apply text-xl font-semibold text-gray-900 mb-3 mt-6;
}

.prose :deep(p) {
  @apply text-gray-700 mb-4 leading-relaxed;
}

.prose :deep(code) {
  @apply bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono;
}

.prose :deep(pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4;
}

.prose :deep(pre code) {
  @apply bg-transparent text-gray-100 p-0;
}

.prose :deep(ul) {
  @apply list-disc list-inside mb-4;
}

.prose :deep(ol) {
  @apply list-decimal list-inside mb-4;
}

.prose :deep(li) {
  @apply mb-1;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4;
}
</style> -->