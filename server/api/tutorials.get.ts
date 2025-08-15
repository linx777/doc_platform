import { scanContentFiles } from '~/utils/content'

export default defineEventHandler(async (event) => {
  try {
    return await scanContentFiles('tutorials')
  } catch (error: any) {
    console.error('Error fetching tutorials:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load tutorials'
    })
  }
})
