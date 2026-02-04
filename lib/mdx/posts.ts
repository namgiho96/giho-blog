import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostMeta } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * 모든 포스트의 메타데이터를 가져옵니다 (날짜 역순 정렬)
 */
export function getAllPosts(): PostMeta[] {
  // posts 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        frontmatter: {
          title: data.title,
          date: data.date,
          description: data.description,
          tags: data.tags,
        },
      }
    })

  // 날짜 역순 정렬
  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * 특정 slug의 포스트 내용과 메타데이터를 가져옵니다
 */
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    frontmatter: {
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags,
    },
  }
}

/**
 * 정적 생성을 위한 모든 포스트의 slug 목록을 가져옵니다
 */
export function getAllSlugs(): string[] {
  // posts 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}
