import { getContentBySlug } from '~/utils/content'

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug parameter is required'
      })
    }

    const blog = await getContentBySlug('blog', slug)

    if (!blog) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog not found'
      })
    }

    return blog

  } catch (error: any) {
    console.error('Error fetching blog:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load blog'
    })
  }
})
