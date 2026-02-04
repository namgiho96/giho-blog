"use client"

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'

interface CommentFormProps {
  slug: string
  onCommentAdded: () => void
}

const MAX_COMMENT_LENGTH = 1000

export function CommentForm({ slug, onCommentAdded }: CommentFormProps) {
  const { user, loading: authLoading } = useAuth()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError('로그인이 필요합니다')
      return
    }

    if (!content.trim()) {
      setError('댓글 내용을 입력해주세요')
      return
    }

    if (content.length > MAX_COMMENT_LENGTH) {
      setError(`댓글은 ${MAX_COMMENT_LENGTH}자 이내로 입력해주세요`)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(`/api/posts/${slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error('댓글 작성에 실패했습니다')
      }

      setContent('')
      onCommentAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : '댓글 작성에 실패했습니다')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="animate-pulse rounded border-2 border-foreground/20 bg-foreground/5 p-4">
        <div className="h-24 rounded bg-foreground/10" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="rounded border-2 border-foreground/20 bg-background p-6 text-center">
        <p className="font-mono text-sm text-foreground/60">
          댓글을 작성하려면 로그인이 필요합니다
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        maxLength={MAX_COMMENT_LENGTH}
        showCharCount
        autoResize
        error={error}
        className="min-h-[100px]"
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={!content.trim() || isSubmitting}
        >
          댓글 작성
        </Button>
      </div>
    </form>
  )
}
