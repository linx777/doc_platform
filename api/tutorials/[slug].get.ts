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

    const tutorial = await getContentBySlug('tutorials', slug)

    if (!tutorial) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Tutorial not found'
      })
    }

    return tutorial

  } catch (error: any) {
    console.error('Error fetching tutorial:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load tutorial'
    })
  }
})
