import { scanContentFiles } from '~/utils/content'

export default defineEventHandler(async (event) => {
  try {
    return await scanContentFiles('blog')
  } catch (error: any) {
    console.error('Error fetching blogs:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load blogs'
    })
  }
})
