"use client"

import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Trash2, Edit2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Avatar } from '@/components/ui/Avatar'
import { formatRelativeTime } from '@/lib/utils/date'

export interface Comment {
  id: string
  content: string
  created_at: string
  updated_at?: string
  user: {
    id: string
    email: string
    user_metadata: {
      full_name?: string
      avatar_url?: string
    }
  }
}

interface CommentItemProps {
  comment: Comment
  currentUser: User | null
  onCommentUpdated: () => void
  onCommentDeleted: () => void
}

const MAX_COMMENT_LENGTH = 1000

export function CommentItem({
  comment,
  currentUser,
  onCommentUpdated,
  onCommentDeleted,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [error, setError] = useState('')

  const isOwner = currentUser?.id === comment.user.id
  const userName =
    comment.user.user_metadata?.full_name ||
    comment.user.email?.split('@')[0] ||
    'Anonymous'
  const avatarUrl = comment.user.user_metadata?.avatar_url

  const handleUpdate = async () => {
    if (!editContent.trim()) {
      setError('댓글 내용을 입력해주세요')
      return
    }

    if (editContent.length > MAX_COMMENT_LENGTH) {
      setError(`댓글은 ${MAX_COMMENT_LENGTH}자 이내로 입력해주세요`)
      return
    }

    setIsUpdating(true)
    setError('')

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editContent }),
      })

      if (!response.ok) {
        throw new Error('댓글 수정에 실패했습니다')
      }

      setIsEditing(false)
      onCommentUpdated()
    } catch (err) {
      setError(err instanceof Error ? err.message : '댓글 수정에 실패했습니다')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('댓글 삭제에 실패했습니다')
      }

      onCommentDeleted()
    } catch (err) {
      console.error('Failed to delete comment:', err)
      alert('댓글 삭제에 실패했습니다')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditContent(comment.content)
    setError('')
  }

  return (
    <div className="group relative rounded border-2 border-foreground/10 bg-background p-4 transition-colors hover:border-foreground/20">
      {/* 헤더 */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={avatarUrl}
            alt={userName}
            fallback={userName.charAt(0).toUpperCase()}
          />
          <div>
            <div className="font-mono text-sm font-medium text-foreground">
              {userName}
            </div>
            <div className="font-mono text-xs text-foreground/50">
              {formatRelativeTime(comment.created_at)}
              {comment.updated_at && comment.updated_at !== comment.created_at && (
                <span className="ml-1">(수정됨)</span>
              )}
            </div>
          </div>
        </div>

        {/* 액션 버튼 (소유자만) */}
        {isOwner && !isEditing && (
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-7 w-7 p-0"
              aria-label="수정"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="h-7 w-7 p-0 hover:text-red-600"
              aria-label="삭제"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      {/* 내용 */}
      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            maxLength={MAX_COMMENT_LENGTH}
            showCharCount
            autoResize
            error={error}
            className="min-h-[80px]"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              disabled={isUpdating}
            >
              <X className="mr-1 h-4 w-4" />
              취소
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleUpdate}
              isLoading={isUpdating}
              disabled={!editContent.trim() || isUpdating}
            >
              <Check className="mr-1 h-4 w-4" />
              저장
            </Button>
          </div>
        </div>
      ) : (
        <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground/80">
          {comment.content}
        </p>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded bg-background/95 backdrop-blur-sm">
          <div className="space-y-4 p-4 text-center">
            <p className="font-mono text-sm font-medium text-foreground">
              정말 삭제하시겠습니까?
            </p>
            <div className="flex justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                취소
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
