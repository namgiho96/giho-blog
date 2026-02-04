import Link from 'next/link'
import { PostMeta } from '@/types/post'
import { formatDate } from '@/lib/utils/date'
import { Badge } from '@/components/ui/Badge'

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter } = post

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-neutral-50 dark:bg-[#161b22] border-2 border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden transition-all hover:border-[#58a6ff] dark:hover:border-[#58a6ff] hover:shadow-[0_0_20px_rgba(88,166,255,0.3)] dark:hover:shadow-[0_0_20px_rgba(88,166,255,0.2)]"
    >
      <div className="p-6">
        {/* 날짜 */}
        <time className="font-mono text-xs text-neutral-500 dark:text-neutral-600">
          {formatDate(frontmatter.date)}
        </time>

        {/* 제목 */}
        <h2 className="font-mono font-bold text-xl mt-2 mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-[#58a6ff] dark:group-hover:text-[#58a6ff] transition-colors">
          {frontmatter.title}
        </h2>

        {/* 설명 */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
          {frontmatter.description}
        </p>

        {/* 태그들 */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                color="default"
                className="text-xs"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* 읽기 표시 */}
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-xs text-[#58a6ff] group-hover:text-[#7ee787] transition-colors">
            $ cat {slug}.md →
          </span>
        </div>
      </div>
    </Link>
  )
}
