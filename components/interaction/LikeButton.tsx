"use client"

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  slug: string
  initialLikes?: number
  initialIsLiked?: boolean
}

export function LikeButton({
  slug,
  initialLikes = 0,
  initialIsLiked = false
}: LikeButtonProps) {
  const { user, loading: authLoading } = useAuth()
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginHint, setShowLoginHint] = useState(false)

  useEffect(() => {
    if (!authLoading && user) {
      // 사용자가 로그인했을 때 좋아요 상태 확인
      checkLikeStatus()
    }
  }, [user, authLoading, slug])

  const checkLikeStatus = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/posts/${slug}/likes`)
      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)
        setIsLiked(data.isLiked)
      }
    } catch (error) {
      console.error('Failed to check like status:', error)
    }
  }

  const handleClick = async () => {
    if (!user) {
      setShowLoginHint(true)
      setTimeout(() => setShowLoginHint(false), 3000)
      return
    }

    // 낙관적 업데이트
    const previousLikes = likes
    const previousIsLiked = isLiked

    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/posts/${slug}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        // 실패 시 롤백
        setIsLiked(previousIsLiked)
        setLikes(previousLikes)
      } else {
        const data = await response.json()
        setLikes(data.likes)
        setIsLiked(data.isLiked)
      }
    } catch (error) {
      console.error('Failed to toggle like:', error)
      // 에러 시 롤백
      setIsLiked(previousIsLiked)
      setLikes(previousLikes)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        disabled={isLoading || authLoading}
        className={cn(
          'inline-flex items-center gap-2 rounded border-2 px-3 py-1.5 font-mono text-sm transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isLiked
            ? 'border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700'
            : 'border-foreground/20 bg-background text-foreground/80 hover:border-red-600 hover:text-red-600'
        )}
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-all',
            isLiked && 'fill-current'
          )}
        />
        <span className="font-medium tabular-nums">
          {likes.toLocaleString()}
        </span>
      </button>

      {/* 로그인 안내 툴팁 */}
      {showLoginHint && !user && (
        <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded border-2 border-foreground bg-background p-2 font-mono text-xs shadow-lg">
          <p className="text-foreground">로그인이 필요합니다</p>
        </div>
      )}
    </div>
  )
}
