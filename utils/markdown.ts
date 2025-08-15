import { marked } from 'marked'

/**
 * Parse markdown content to HTML
 * @param markdownContent - The raw markdown content
 * @returns The parsed HTML content
 */
export async function parseMarkdownToHtml(markdownContent: string): Promise<string> {
  return await marked.parse(markdownContent)
}

/**
 * Generate a slug from a title or filename
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace('.md', '')
    // .replace(/ /g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Generate a description from markdown content
 * @param markdownContent - The raw markdown content
 * @param maxLength - Maximum length for the description (default: 150)
 * @returns A truncated description
 */
export function generateDescription(markdownContent: string, maxLength: number = 150): string {
  const lines = markdownContent.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') && trimmed.length > 20) {
      return trimmed.substring(0, maxLength) + (trimmed.length > maxLength ? '...' : '')
    }
  }

  return 'No description available'
}
