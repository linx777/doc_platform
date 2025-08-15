export interface ContentItem {
  slug: string
  title: string
  date: string
  author: string
  description: string
  tags: string[]
}

export interface ContentDetail extends ContentItem {
  content: string
  renderedContent: string
}
