import { PostFrontmatter } from '@/types/post'
import { formatDate } from '@/lib/utils/date'
import { Badge } from '@/components/ui/Badge'

interface PostHeaderProps {
  frontmatter: PostFrontmatter
}

export function PostHeader({ frontmatter }: PostHeaderProps) {
  return (
    <header className="mb-12 pb-8 border-b-2 border-neutral-200 dark:border-neutral-800">
      {/* 터미널 스타일 프롬프트 */}
      <div className="flex items-center gap-2 mb-4 font-mono text-sm text-neutral-500 dark:text-neutral-600">
        <span className="text-[#7ee787]">$</span>
        <span>cat blog/{frontmatter.title.toLowerCase().replace(/\s+/g, '-')}.md</span>
      </div>

      {/* 제목 */}
      <h1 className="font-mono font-bold text-4xl md:text-5xl mb-6 text-neutral-900 dark:text-neutral-100">
        {frontmatter.title}
      </h1>

      {/* 설명 */}
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
        {frontmatter.description}
      </p>

      {/* 날짜 */}
      <time className="font-mono text-sm text-neutral-500 dark:text-neutral-600">
        {formatDate(frontmatter.date)}
      </time>

      {/* 태그들 */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {frontmatter.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              color="blue"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </header>
  )
}
