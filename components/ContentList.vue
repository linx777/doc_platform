<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Content Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h1>
      </div>
    </div>

    <!-- Content List -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading {{ title }}...</p>
      </div>

      <!-- Content Grid -->
      <div v-else-if="items.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="item in items" 
          :key="item.slug"
          class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
          @click="viewItem(item.slug)"
        >
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ item.title }}</h3>
            </div>
          </div>
          
          <!-- Tags -->
          <div v-if="item.tags && item.tags.length > 0" class="mb-4">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in item.tags" 
                :key="tag"
                class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">By {{ item.author }}</span>
            <span class="text-blue-600 text-sm font-medium">{{ actionText }} →</span>
          </div>
        </div>
      </div>

      <!-- No Content State -->
      <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No {{ title }} Yet</h3>
        <p class="text-gray-600">We're working on some amazing {{ title.toLowerCase() }}. Check back soon!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ContentList'
})

import type { ContentItem } from '~/types/content'

interface Props {
  title: string
  items: ContentItem[]
  loading: boolean
  actionText?: string
  baseRoute?: string
}

const props = withDefaults(defineProps<Props>(), {
  actionText: 'Read',
  baseRoute: ''
})

const emit = defineEmits<{
  viewItem: [slug: string]
}>()

function viewItem(slug: string) {
  emit('viewItem', slug)
}
</script>
