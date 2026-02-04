import { PostMeta } from '@/types/post'
import { PostCard } from './PostCard'

interface PostListProps {
  posts: PostMeta[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-neutral-50 dark:bg-[#161b22] border-2 border-neutral-200 dark:border-neutral-800 rounded-lg p-12 text-center">
        <div className="font-mono space-y-4">
          <div className="text-6xl">📝</div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            아직 작성된 포스트가 없습니다
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-600">
            $ echo &quot;Coming soon...&quot;
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
