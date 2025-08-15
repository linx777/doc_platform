<template>
  <ContentDetail
    :content-type="CONTENT_TYPE_LABEL"
    :content="blog"
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
const CONTENT_TYPE = 'blog'
const CONTENT_TYPE_LABEL = 'Blog'
const BACK_ROUTE = '/blog'
const BACK_TEXT = 'Blog'

// Reactive state
const blog = ref<ContentDetail | null>(null)
const loading = ref(true)

// Content fetching composable
const { fetchContentBySlug } = useContent(CONTENT_TYPE)

onMounted(async () => {
  try {
    blog.value = await fetchContentBySlug(SLUG_PARAM)
  } catch (err) {
    console.error('Failed to load blog:', err)
  } finally {
    loading.value = false
  }
})
</script>