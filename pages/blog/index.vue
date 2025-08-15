<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Blog Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ PAGE_TITLE }}
        </h1>
      </div>
    </div>

    <!-- Blog List -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">{{ LOADING_TEXT }}</p>
      </div>

      <!-- Blog Grid -->
      <div v-else-if="blogs.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="blog in blogs" 
          :key="blog.slug"
          class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
          @click="viewBlog(blog.slug)"
        >
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ blog.title }}</h3>
            </div>
          </div>
          
          <!-- Tags -->
          <div v-if="blog.tags && blog.tags.length > 0" class="mb-4">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in blog.tags" 
                :key="tag"
                class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">By {{ blog.author }}</span>
            <span class="text-blue-600 text-sm font-medium">{{ READ_ACTION_TEXT }}</span>
          </div>
        </div>
      </div>

      <!-- No Blog State -->
      <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ NO_CONTENT_TITLE }}</h3>
        <p class="text-gray-600">{{ NO_CONTENT_MESSAGE }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ContentItem } from '~/types/content'

// API and navigation constants
const API_ENDPOINT = '/api/blog'
const BASE_ROUTE = '/blog'

// Page content constants
const PAGE_TITLE = 'Blog'
const LOADING_TEXT = 'Loading blogs...'
const NO_CONTENT_TITLE = 'No Blog Yet'
const NO_CONTENT_MESSAGE = "We're working on some amazing blogs. Check back soon!"
const READ_ACTION_TEXT = 'Read Blog →'

// Reactive state
const blogs = ref<ContentItem[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(API_ENDPOINT)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    blogs.value = await response.json()
  } catch (error) {
    console.error('Failed to load blogs:', error)
  } finally {
    loading.value = false
  }
})

function viewBlog(slug: string) {
  window.location.href = `${BASE_ROUTE}/${slug}`
}
</script>
