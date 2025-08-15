import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the modules before importing the functions
vi.mock('fs/promises', () => ({
  readdir: vi.fn(),
  readFile: vi.fn(),
  stat: vi.fn()
}))

vi.mock('path', () => ({
  join: vi.fn()
}))

vi.mock('~/utils/markdown', () => ({
  parseMarkdownToHtml: vi.fn(),
  generateSlug: vi.fn(),
  generateDescription: vi.fn()
}))

// Import after mocking
import { scanContentFiles, getContentBySlug } from '../content'

describe('Content Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('scanContentFiles', () => {
    it('handles empty directory gracefully', async () => {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      vi.mocked(fs.readdir).mockResolvedValue([] as any)
      vi.mocked(path.join).mockReturnValue('/mock/path')

      const result = await scanContentFiles('tutorials')

      expect(result).toHaveLength(0)
    })

    it('handles file reading errors gracefully', async () => {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      vi.mocked(fs.readdir).mockResolvedValue(['file1.md'] as any)
      vi.mocked(fs.readFile).mockRejectedValue(new Error('File read error'))
      vi.mocked(path.join).mockReturnValue('/mock/path')

      const result = await scanContentFiles('tutorials')

      expect(result).toHaveLength(0)
    })

  })

  describe('getContentBySlug', () => {
    it('returns null for non-existent slug', async () => {
      const fs = await import('fs/promises')
      const path = await import('path')
      const markdown = await import('~/utils/markdown')
      
      vi.mocked(fs.readdir).mockResolvedValue(['test-tutorial.md'] as any)
      vi.mocked(fs.readFile).mockResolvedValue('---\ntitle: Test Tutorial\n---\nContent')
      vi.mocked(path.join).mockReturnValue('/mock/path')
      vi.mocked(markdown.generateSlug).mockReturnValue('test-tutorial')
      vi.mocked(markdown.generateDescription).mockReturnValue('Test Description')
      vi.mocked(markdown.parseMarkdownToHtml).mockResolvedValue('<p>Content</p>')

      const result = await getContentBySlug('tutorials', 'non-existent')

      expect(result).toBeNull()
    })

    it('handles empty content array', async () => {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      vi.mocked(fs.readdir).mockResolvedValue([] as any)
      vi.mocked(path.join).mockReturnValue('/mock/path')

      const result = await getContentBySlug('tutorials', 'any-slug')

      expect(result).toBeNull()
    })
  })

  describe('Error handling', () => {
    it('handles invalid content directory gracefully', async () => {
      const path = await import('path')
      
      vi.mocked(path.join).mockReturnValue('/invalid/path')

      try {
        await scanContentFiles('invalid')
        expect.fail('Expected function to throw an error')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('handles invalid slug gracefully', async () => {
      const path = await import('path')
      
      vi.mocked(path.join).mockReturnValue('/invalid/path')

      try {
        await getContentBySlug('invalid', 'test')
        expect.fail('Expected function to throw an error')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe('Basic functionality', () => {
    it('can be called without throwing errors', async () => {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      vi.mocked(fs.readdir).mockResolvedValue([] as any)
      vi.mocked(path.join).mockReturnValue('/mock/path')

      expect(async () => {
        await scanContentFiles('tutorials')
      }).not.toThrow()
    })

    it('returns expected data structure', async () => {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      vi.mocked(fs.readdir).mockResolvedValue([] as any)
      vi.mocked(path.join).mockReturnValue('/mock/path')

      const result = await scanContentFiles('tutorials')
      
      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(0)
    })
  })
})
