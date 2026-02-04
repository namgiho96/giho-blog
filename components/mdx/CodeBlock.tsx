import { codeToHtml } from '@/lib/mdx/shiki'
import { cn } from '@/lib/utils'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  children?: React.ReactNode
  className?: string
}

/**
 * Shiki 기반 코드 블록 컴포넌트 (서버 컴포넌트)
 *
 * 마치 터미널에서 코드를 보는 것처럼 만들어졌어요.
 * Shiki가 서버에서 코드에 색을 칠해주고, 우리는 멋진 테두리와 복사 버튼을 추가했어요.
 */
export async function CodeBlock({ children, className }: CodeBlockProps) {
  // pre > code 구조에서 code의 className을 찾아 언어 추출
  let language = 'text'
  let codeString = ''

  if (children && typeof children === 'object' && 'props' in children) {
    // children이 code 태그인 경우
    const codeElement = children as React.ReactElement
    language = codeElement.props.className?.replace(/language-/, '') || 'text'
    codeString = String(codeElement.props.children).trim()
  } else {
    // children이 직접 문자열인 경우 (fallback)
    language = className?.replace(/language-/, '') || 'text'
    codeString = String(children).trim()
  }

  const code = codeString

  // 서버에서 Shiki를 사용해 코드를 HTML로 변환
  // 다크/라이트 모드 둘 다 지원하기 위해 다크 모드 기본 사용
  const html = await codeToHtml(code, language, 'github-dark')

  return (
    <div className="group relative my-6">
      {/* 언어 배지 - 터미널 상단 탭처럼 */}
      <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0d1117] px-4 py-2">
        <span className="font-mono text-xs text-muted uppercase tracking-wide">
          {language}
        </span>

        {/* 복사 버튼 - 클라이언트 컴포넌트 */}
        <CopyButton code={code} />
      </div>

      {/* 실제 코드 블록 - Shiki가 하이라이팅한 HTML */}
      <div
        className={cn(
          'overflow-x-auto rounded-b-lg border',
          'border-neutral-200 dark:border-neutral-800',
          '[&_pre]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-0',
          '[&_pre]:!bg-neutral-100 [&_pre]:dark:!bg-[#161b22]',
          // Shiki가 생성한 코드 스타일 오버라이드
          '[&_code]:!bg-transparent'
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
