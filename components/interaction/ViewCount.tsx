"use client"

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { getOrCreateSessionId } from '@/lib/utils/session'

interface ViewCountProps {
  slug: string
  initialCount?: number
}

export function ViewCount({ slug, initialCount = 0 }: ViewCountProps) {
  const [viewCount, setViewCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const incrementView = async () => {
      try {
        const sessionId = getOrCreateSessionId()
        const response = await fetch(`/api/posts/${slug}/views`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        if (response.ok) {
          const data = await response.json()
          setViewCount(data.views)
        }
      } catch (error) {
        console.error('Failed to increment view count:', error)
      } finally {
        setIsLoading(false)
      }
    }

    incrementView()
  }, [slug])

  return (
    <div className="inline-flex items-center gap-2 rounded border-2 border-foreground/20 bg-background px-3 py-1.5 font-mono text-sm transition-colors hover:border-foreground/40">
      <Eye className="h-4 w-4 text-foreground/60" />
      <span className="text-foreground/80">
        {isLoading ? (
          <span className="inline-block w-8 animate-pulse">---</span>
        ) : (
          <span className="font-medium tabular-nums">{viewCount.toLocaleString()}</span>
        )}
      </span>
    </div>
  )
}
