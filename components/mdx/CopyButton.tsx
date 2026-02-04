'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  code: string
}

/**
 * 코드 복사 버튼 (클라이언트 컴포넌트)
 *
 * 버튼을 누르면 코드를 클립보드에 복사해줘요!
 * 복사하면 2초간 체크마크가 보여서 "복사됐어!"라고 알려줍니다.
 */
export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'rounded px-2 py-1 text-xs font-mono transition-colors',
        'border border-neutral-300 dark:border-neutral-700',
        'hover:bg-neutral-200 dark:hover:bg-neutral-800',
        copied
          ? 'bg-secondary/20 text-secondary border-secondary'
          : 'bg-neutral-100 dark:bg-[#161b22] text-muted'
      )}
      aria-label="Copy code"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}
