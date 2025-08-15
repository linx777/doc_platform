<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Content Detail Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <NuxtLink :to="backRoute" class="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to {{ backText }}
        </NuxtLink>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading {{ contentType }}...</p>
        </div>

        <!-- Content -->
        <div v-else-if="content" class="bg-white rounded-lg shadow-md p-8">
          <!-- Content Header -->
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              {{ content.title }}
            </h1>
            
            <div class="flex items-center text-gray-600 mb-6">
              <span class="mr-4">By {{ content.author }}</span>
              <span class="mr-4">•</span>
              <span>{{ new Date(content.date).toLocaleDateString() }}</span>
            </div>

            <!-- Tags -->
            <div v-if="content.tags && content.tags.length > 0" class="mb-6">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in content.tags"
                  :key="tag"
                  class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Content Body -->
          <div class="prose prose-lg max-w-none">
            <div v-html="content.renderedContent"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ contentType }} Not Found</h3>
          <p class="text-gray-600">The {{ contentType.toLowerCase() }} you're looking for doesn't exist.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentDetail } from '~/types/content'

interface Props {
  contentType: string
  content: ContentDetail | null
  loading: boolean
  backRoute: string
  backText: string
}

defineProps<Props>()
</script>

<style scoped>
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
</style>
