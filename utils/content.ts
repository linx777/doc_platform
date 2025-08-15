import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'
import { parseMarkdownToHtml, generateSlug, generateDescription } from '~/utils/markdown'
import type { ContentItem, ContentDetail } from '~/types/content'

/**
 * Generic function to scan content files from a directory
 */
export async function scanContentFiles(contentDir: string): Promise<ContentItem[]> {
  try {
    const fullPath = join(process.cwd(), 'content', contentDir)

    // Read all files in the content directory
    const files = await readdir(fullPath)

    // Filter for markdown files
    const markdownFiles = files.filter(file => file.endsWith('.md'))

    const items: ContentItem[] = []

    // Process each markdown file
    for (const file of markdownFiles) {
      const filePath = join(fullPath, file)
      const content = await readFile(filePath, 'utf-8')

      // Parse frontmatter and content
      const { data, content: markdownContent } = matter(content)

      // Extract slug from filename (remove .md extension and replace spaces with hyphens)
      const slug = generateSlug(file.replace('.md', '').replace(/ /g, '-'))

      // Generate description from markdown content
      const description = generateDescription(markdownContent)

      items.push({
        slug,
        title: data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        date: data.date || 'No date',
        author: data.author || 'Unknown',
        description,
        tags: data.tags || []
      })
    }

    // Sort by date (newest first)
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return items

  } catch (error: any) {
    console.error(`Error fetching content from ${contentDir}:`, error)
    throw error
  }
}

/**
 * Generic function to get a single content item by slug
 */
export async function getContentBySlug(contentDir: string, slug: string): Promise<ContentDetail | null> {
  try {
    const fullPath = join(process.cwd(), 'content', contentDir)

    // Read all files in the content directory
    const files = await readdir(fullPath)

    // Filter for markdown files
    const markdownFiles = files.filter(file => file.endsWith('.md'))

    // Process each markdown file to find the one with matching slug
    for (const file of markdownFiles) {
      const filePath = join(fullPath, file)
      const content = await readFile(filePath, 'utf-8')

      // Parse frontmatter and content
      const { data, content: markdownContent } = matter(content)

      // Generate slug from filename (remove .md extension and replace spaces with hyphens)
      const fileSlug = generateSlug(file.replace('.md', '').replace(/ /g, '-'))

      // If this is the content we're looking for
      if (fileSlug === slug) {
        // Pre-render markdown to HTML
        const renderedContent = await parseMarkdownToHtml(markdownContent)

        // Generate description from markdown content
        const description = generateDescription(markdownContent)

        return {
          slug: fileSlug,
          title: data.title || fileSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          date: data.date || 'No date',
          author: data.author || 'Unknown',
          description,
          content: markdownContent,
          renderedContent: renderedContent,
          tags: data.tags || []
        }
      }
    }

    return null

  } catch (error: any) {
    console.error(`Error fetching content from ${contentDir}:`, error)
    throw error
  }
}
