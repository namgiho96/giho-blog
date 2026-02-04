'use client'

import { MDXClient } from 'next-mdx-remote-client/csr'
import type { SerializeResult } from 'next-mdx-remote-client/csr'
import { mdxComponents } from '@/components/mdx'

interface PostContentProps {
  source: SerializeResult
}

export function PostContent({ source }: PostContentProps) {
  // SerializeResult에 error가 있을 수 있으므로 처리
  if ('error' in source) {
    return (
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-lg p-8 md:p-12">
          <h2 className="text-red-600 dark:text-red-400">MDX 렌더링 오류</h2>
          <pre className="text-sm">{source.error.message}</pre>
        </div>
      </article>
    )
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <div className="bg-neutral-50 dark:bg-[#161b22] border-2 border-neutral-200 dark:border-neutral-800 rounded-lg p-8 md:p-12">
        <MDXClient
          compiledSource={source.compiledSource}
          frontmatter={source.frontmatter}
          scope={source.scope}
          components={mdxComponents}
        />
      </div>
    </article>
  )
}
