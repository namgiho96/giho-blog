export interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags?: string[]
}

export interface Post {
  slug: string
  content: string
  frontmatter: PostFrontmatter
}

export interface PostMeta {
  slug: string
  frontmatter: PostFrontmatter
}
