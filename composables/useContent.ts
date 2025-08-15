import { ref } from 'vue'
import type { ContentItem, ContentDetail } from '~/types/content'

export function useContent(contentType: string) {
  const items = ref<ContentItem[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  /**
   * Fetch content list from API
   */
  async function fetchContentList() {
    loading.value = true
    error.value = null
    
    try {
      console.log(`Fetching ${contentType} list...`)
      const response = await fetch(`/api/${contentType}`)
      console.log(`Response received:`, response.status, response.ok)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`${contentType} data received:`, data)
      items.value = data
      
    } catch (err) {
      console.error(`Failed to load ${contentType}:`, err)
      error.value = err instanceof Error ? err.message : `Failed to load ${contentType}`
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch single content item by slug
   */
  async function fetchContentBySlug(slug: string): Promise<ContentDetail | null> {
    try {
      console.log(`Fetching ${contentType} with slug:`, slug)
      const response = await fetch(`/api/${contentType}/${slug}`)
      console.log(`Response received:`, response.status, response.ok)
      
      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`${contentType} detail data:`, data)
      return data
      
    } catch (err) {
      console.error(`Failed to load ${contentType}:`, err)
      throw err
    }
  }

  /**
   * Navigate to content detail page
   */
  function viewContent(slug: string) {
    window.location.href = `/${contentType}/${slug}`
  }

  return {
    items,
    loading,
    error,
    fetchContentList,
    fetchContentBySlug,
    viewContent
  }
}
