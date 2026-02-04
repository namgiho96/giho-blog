import { Metadata } from 'next'
import { evaluate } from 'next-mdx-remote-client/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/mdx/posts'
import { PostHeader } from '@/components/blog/PostHeader'
import { mdxComponents } from '@/components/mdx'
import { ViewCount } from '@/components/interaction/ViewCount'
import { LikeButton } from '@/components/interaction/LikeButton'
import { CommentSection } from '@/components/interaction/CommentSection'
import Link from 'next/link'

interface PageProps {
  params: {
    slug: string
  }
}

// 정적 경로 생성
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  // MDX를 서버에서 직접 evaluate (빌드 타임에 처리)
  const { content } = await evaluate({
    source: post.content,
    options: {
      parseFrontmatter: false, // 이미 frontmatter를 파싱했음
    },
    components: mdxComponents,
  })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <article className="max-w-4xl mx-auto">
        {/* 뒤로 가기 링크 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-[#58a6ff] hover:text-[#7ee787] transition-colors mb-8"
        >
          <span>←</span>
          <span>cd ..</span>
        </Link>

        {/* 포스트 헤더 */}
        <PostHeader frontmatter={post.frontmatter} />

        {/* 인터랙션 (조회수, 좋아요) */}
        <div className="flex items-center gap-4 mb-8">
          <ViewCount slug={params.slug} />
          <LikeButton slug={params.slug} />
        </div>

        {/* 포스트 내용 */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="bg-neutral-50 dark:bg-[#161b22] border-2 border-neutral-200 dark:border-neutral-800 rounded-lg p-8 md:p-12">
            {content}
          </div>
        </article>

        {/* 댓글 섹션 */}
        <div className="mt-12">
          <CommentSection slug={params.slug} />
        </div>

        {/* 푸터 */}
        <footer className="mt-12 pt-8 border-t-2 border-neutral-200 dark:border-neutral-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#58a6ff] hover:text-[#7ee787] transition-colors"
          >
            <span>←</span>
            <span>모든 포스트 보기</span>
          </Link>
        </footer>
      </article>
    </div>
  )
}
