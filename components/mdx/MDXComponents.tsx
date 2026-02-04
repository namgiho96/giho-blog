import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'

/**
 * MDX 커스텀 컴포넌트 맵
 *
 * MDX는 마크다운을 React 컴포넌트로 바꿔주는데요,
 * 이 맵을 통해 "h1을 만나면 이 컴포넌트를 써라"고 알려주는 거예요.
 * 마치 번역 사전 같은 역할이죠!
 */

// 앵커 링크를 생성하는 유틸리티 함수
// 예: "Hello World!" -> "hello-world"
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-|-$/g, '')
}

// 헤딩 컴포넌트 팩토리
// h1부터 h6까지 공통 로직을 재사용하기 위한 함수
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return function Heading({ children, className, ...props }: ComponentPropsWithoutRef<'h1'>) {
    const Tag = `h${level}` as const
    const id = typeof children === 'string' ? slugify(children) : undefined

    // 크기를 레벨에 따라 조정
    const sizes = {
      1: 'text-4xl mt-12 mb-6',
      2: 'text-3xl mt-10 mb-5',
      3: 'text-2xl mt-8 mb-4',
      4: 'text-xl mt-6 mb-3',
      5: 'text-lg mt-4 mb-2',
      6: 'text-base mt-4 mb-2',
    }

    return (
      <Tag
        id={id}
        className={cn(
          'scroll-mt-20 font-mono font-bold tracking-tight',
          'text-neutral-900 dark:text-neutral-100',
          'group relative',
          sizes[level],
          className
        )}
        {...props}
      >
        {/* 앵커 링크 - 마우스 올리면 보이는 # 기호 */}
        {id && (
          <a
            href={`#${id}`}
            className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary no-underline"
            aria-label={`Link to ${children}`}
          >
            #
          </a>
        )}
        {children}
      </Tag>
    )
  }
}

export const mdxComponents = {
  // 헤딩 요소들 - 모두 앵커 링크 포함
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  // 단락
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p
      className={cn(
        'my-5 leading-7 text-neutral-800 dark:text-neutral-200',
        className
      )}
      {...props}
    />
  ),

  // 순서 없는 리스트
  ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className={cn(
        'my-5 ml-6 list-disc space-y-2',
        'marker:text-primary',
        className
      )}
      {...props}
    />
  ),

  // 순서 있는 리스트
  ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className={cn(
        'my-5 ml-6 list-decimal space-y-2',
        'marker:font-mono marker:text-primary',
        className
      )}
      {...props}
    />
  ),

  // 리스트 아이템
  li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li
      className={cn(
        'leading-7 text-neutral-800 dark:text-neutral-200',
        className
      )}
      {...props}
    />
  ),

  // 링크
  a: ({ className, href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    const isExternal = href?.startsWith('http')

    return (
      <a
        href={href}
        className={cn(
          'font-medium text-primary hover:underline transition-colors',
          'inline-flex items-center gap-1',
          className
        )}
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        {...props}
      >
        {children}
        {/* 외부 링크 아이콘 */}
        {isExternal && (
          <span className="inline-block text-xs" aria-label="External link">
            ↗
          </span>
        )}
      </a>
    )
  },

  // 인라인 코드
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    // pre > code는 CodeBlock에서 처리하므로 여기선 인라인 코드만 스타일링
    return (
      <code
        className={cn(
          'relative rounded px-[0.3rem] py-[0.2rem]',
          'bg-neutral-100 dark:bg-[#161b22]',
          'font-mono text-sm',
          'text-[#58a6ff] dark:text-[#58a6ff]',
          'border border-neutral-200 dark:border-neutral-800',
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  },

  // 코드 블록 (pre 태그)
  pre: CodeBlock,

  // 인용구 - 터미널 스타일
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className={cn(
        'my-6 border-l-4 border-primary pl-6 italic',
        'bg-neutral-50 dark:bg-[#161b22] py-4 pr-4 rounded-r-lg',
        'text-neutral-700 dark:text-neutral-300',
        className
      )}
      {...props}
    />
  ),

  // 수평선
  hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
    <hr
      className={cn(
        'my-8 border-neutral-200 dark:border-neutral-800',
        className
      )}
      {...props}
    />
  ),

  // 테이블
  table: ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn(
          'w-full border-collapse',
          'text-sm',
          className
        )}
        {...props}
      />
    </div>
  ),

  thead: ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead
      className={cn(
        'border-b-2 border-neutral-300 dark:border-neutral-700',
        'bg-neutral-50 dark:bg-[#161b22]',
        className
      )}
      {...props}
    />
  ),

  tbody: ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody
      className={cn(
        '[&_tr:last-child]:border-0',
        className
      )}
      {...props}
    />
  ),

  tr: ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => (
    <tr
      className={cn(
        'border-b border-neutral-200 dark:border-neutral-800',
        'transition-colors hover:bg-neutral-50 dark:hover:bg-[#161b22]/50',
        className
      )}
      {...props}
    />
  ),

  th: ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th
      className={cn(
        'px-4 py-3 text-left font-mono font-bold',
        'text-neutral-900 dark:text-neutral-100',
        className
      )}
      {...props}
    />
  ),

  td: ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td
      className={cn(
        'px-4 py-3 text-left',
        'text-neutral-800 dark:text-neutral-200',
        className
      )}
      {...props}
    />
  ),

  // 이미지
  img: ({ className, alt, ...props }: ComponentPropsWithoutRef<'img'>) => (
    <img
      className={cn(
        'my-6 rounded-lg border border-neutral-200 dark:border-neutral-800',
        'shadow-sm',
        className
      )}
      alt={alt}
      {...props}
    />
  ),

  // 커스텀 컴포넌트
  Callout,
}
