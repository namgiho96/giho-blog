"use client"

import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'

interface CommentSectionProps {
  slug: string
  initialCommentCount?: number
}

export function CommentSection({ slug, initialCommentCount = 0 }: CommentSectionProps) {
  const { user } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <section className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3 border-b-2 border-foreground/20 pb-4">
        <MessageSquare className="h-5 w-5 text-foreground/60" />
        <h2 className="font-mono text-lg font-bold text-foreground">
          댓글
          <span className="ml-2 text-sm font-normal text-foreground/50">
            ({initialCommentCount})
          </span>
        </h2>
      </div>

      {/* 댓글 작성 폼 */}
      <CommentForm slug={slug} onCommentAdded={handleCommentAdded} />

      {/* 댓글 목록 */}
      <CommentList slug={slug} currentUser={user} refreshTrigger={refreshTrigger} />
    </section>
  )
}
