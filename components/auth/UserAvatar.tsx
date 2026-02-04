"use client"

import { User } from '@supabase/supabase-js'
import Image from 'next/image'

interface UserAvatarProps {
  user: User
}

export function UserAvatar({ user }: UserAvatarProps) {
  const avatarUrl = user.user_metadata?.avatar_url
  const userName = user.user_metadata?.full_name || user.user_metadata?.user_name || 'User'
  const userEmail = user.email || ''

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8 rounded-full border border-neutral-700 dark:border-neutral-600 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={userName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-sm text-neutral-600 dark:text-neutral-400">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="hidden sm:block">
        <div className="font-mono text-sm text-neutral-900 dark:text-neutral-100">
          {userName}
        </div>
        <div className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
          {userEmail}
        </div>
      </div>
    </div>
  )
}
