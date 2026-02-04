import { getAllPosts } from '@/lib/mdx/posts'
import { PostList } from '@/components/blog/PostList'

export const metadata = {
  title: 'Blog',
  description: '개발 관련 글과 튜토리얼',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <header className="mb-12">
          <div className="font-mono mb-4">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-600 mb-2">
              <span className="text-[#7ee787]">$</span>
              <span>cd blog/</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-600 mb-4">
              <span className="text-[#7ee787]">$</span>
              <span>ls -la</span>
            </div>
          </div>
          <h1 className="font-mono font-bold text-4xl md:text-5xl text-neutral-900 dark:text-neutral-100 mb-4">
            Blog
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            개발하면서 배운 것들을 기록합니다
          </p>
          {posts.length > 0 && (
            <p className="font-mono text-sm text-neutral-500 dark:text-neutral-600 mt-2">
              총 {posts.length}개의 포스트
            </p>
          )}
        </header>

        {/* 포스트 목록 */}
        <PostList posts={posts} />
      </div>
    </div>
  )
}
