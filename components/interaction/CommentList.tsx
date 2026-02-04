"use client"

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { CommentItem, Comment } from './CommentItem'
import { Skeleton } from '@/components/ui/Skeleton'

interface CommentListProps {
  slug: string
  currentUser: User | null
  refreshTrigger: number
}

export function CommentList({ slug, currentUser, refreshTrigger }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComments()
  }, [slug, refreshTrigger])

  const fetchComments = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/posts/${slug}/comments`)

      if (!response.ok) {
        throw new Error('댓글을 불러오는데 실패했습니다')
      }

      const data = await response.json()
      setComments(data.comments || [])
    } catch (err) {
      console.error('Failed to fetch comments:', err)
      setError('댓글을 불러오는데 실패했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded border-2 border-foreground/10 bg-background p-4"
          >
            <div className="mb-3 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded border-2 border-red-600/20 bg-red-600/5 p-4 text-center">
        <p className="font-mono text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="rounded border-2 border-foreground/20 bg-background p-12 text-center">
        <p className="font-mono text-sm text-foreground/40">
          아직 댓글이 없습니다
        </p>
        <p className="mt-2 font-mono text-xs text-foreground/30">
          첫 번째 댓글을 작성해보세요
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onCommentUpdated={fetchComments}
          onCommentDeleted={fetchComments}
        />
      ))}
    </div>
  )
}
