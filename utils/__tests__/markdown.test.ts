import { describe, it, expect } from 'vitest'
import { parseMarkdownToHtml, generateSlug, generateDescription } from '../markdown'

describe('Markdown Utilities', () => {
  describe('parseMarkdownToHtml', () => {
    it('converts basic markdown to HTML', async () => {
      const markdown = '# Hello World\n\nThis is a **bold** text.'
      const result = await parseMarkdownToHtml(markdown)
      
      expect(result).toContain('<h1>Hello World</h1>')
      expect(result).toContain('<p>This is a <strong>bold</strong> text.</p>')
    })

    it('handles empty markdown input', async () => {
      const result = await parseMarkdownToHtml('')
      expect(result).toBe('')
    })

    it('handles markdown with no images', async () => {
      const markdown = '# Title\n\nJust some text with **formatting**.'
      const result = await parseMarkdownToHtml(markdown)
      
      expect(result).toContain('<h1>Title</h1>')
      expect(result).toContain('<p>Just some text with <strong>formatting</strong>.</p>')
    })

    it('converts links correctly', async () => {
      const markdown = '[Link text](https://example.com)'
      const result = await parseMarkdownToHtml(markdown)
      
      expect(result).toContain('<a href="https://example.com">Link text</a>')
    })

    it('handles inline code', async () => {
      const markdown = 'Use `npm install` to install packages.'
      const result = await parseMarkdownToHtml(markdown)
      
      expect(result).toContain('<code>npm install</code>')
    })

  })

  describe('generateSlug', () => {
    it('generates URL-friendly slugs', () => {
      expect(generateSlug('Hello World')).toBe('hello-world')
      expect(generateSlug('Getting Started with TypeScript')).toBe('getting-started-with-typescript')
      expect(generateSlug('API Documentation')).toBe('api-documentation')
    })


    it('handles special characters', () => {
      expect(generateSlug('Hello & World!')).toBe('hello-world')
      expect(generateSlug('C++ Programming')).toBe('c-programming')
      expect(generateSlug('Node.js Basics')).toBe('node-js-basics')
    })

    it('removes leading and trailing hyphens', () => {
      expect(generateSlug('---Title---')).toBe('title')
      expect(generateSlug('  Title  ')).toBe('title')
    })
  })

  describe('generateDescription', () => {
    it('generates description from markdown content', () => {
      const markdown = '# Title\n\nThis is a long description that should be used for the summary.'
      const result = generateDescription(markdown)
      
      expect(result).toBe('This is a long description that should be used for the summary.')
    })

    it('respects maximum length', () => {
      const markdown = '# Title\n\nThis is a very long description that exceeds the maximum length limit and should be truncated appropriately.'
      const result = generateDescription(markdown, 50)
      
      expect(result.length).toBeLessThanOrEqual(53) // 50 + "..."
      expect(result).toContain('...')
    })

    it('skips headers and frontmatter', () => {
      const markdown = '---\ntitle: Test\n---\n# Header\n\nActual description here.'
      const result = generateDescription(markdown)
      
      expect(result).toBe('Actual description here.')
    })

    it('handles empty content', () => {
      const result = generateDescription('')
      expect(result).toBe('No description available')
    })
  })
})
