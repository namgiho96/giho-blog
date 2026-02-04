"use client"

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, src, alt = 'Avatar', fallback, size = 'md', ...props },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)

    // Generate initials from fallback text
    const getInitials = (text?: string): string => {
      if (!text) return '??'

      const words = text.trim().split(/\s+/)
      if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase()
      }
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }

    const showFallback = !src || imageError

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'overflow-hidden',
          'border-2 border-foreground',
          'bg-background',
          'font-mono font-bold',

          // Size variants
          {
            'h-8 w-8 text-xs': size === 'sm',
            'h-10 w-10 text-sm': size === 'md',
            'h-16 w-16 text-lg': size === 'lg',
          },

          className
        )}
        {...props}
      >
        {showFallback ? (
          <span className="select-none text-foreground">
            {getInitials(fallback || alt)}
          </span>
        ) : (
          <img
            src={src!}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

// GitHub avatar component with optimized sizing
export interface GitHubAvatarProps extends Omit<AvatarProps, 'src'> {
  username: string
  size?: 'sm' | 'md' | 'lg'
}

const GitHubAvatar = React.forwardRef<HTMLDivElement, GitHubAvatarProps>(
  ({ username, size = 'md', alt, ...props }, ref) => {
    // GitHub avatar sizes: 40, 80, 200, 400
    const sizeMap = {
      sm: 40,
      md: 80,
      lg: 200,
    }

    const githubSize = sizeMap[size]
    const src = `https://github.com/${username}.png?size=${githubSize}`

    return (
      <Avatar
        ref={ref}
        src={src}
        alt={alt || `${username}'s avatar`}
        fallback={username}
        size={size}
        {...props}
      />
    )
  }
)

GitHubAvatar.displayName = 'GitHubAvatar'

export { Avatar, GitHubAvatar }
