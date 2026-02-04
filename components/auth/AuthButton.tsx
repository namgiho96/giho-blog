"use client"

import { useAuth } from './AuthProvider'
import { UserAvatar } from './UserAvatar'
import { signInWithGitHub, signOut } from '@/lib/supabase/auth'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function AuthButton() {
  const { user, loading } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signInWithGitHub()
    } catch (error) {
      console.error('로그인 실패:', error)
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
      setDropdownOpen(false)
    } catch (error) {
      console.error('로그아웃 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="h-9 w-9 rounded-md border border-neutral-700 dark:border-neutral-600 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
    )
  }

  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className={cn(
          "font-mono text-sm px-4 py-2 rounded-md border border-neutral-700 dark:border-neutral-600",
          "bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800",
          "text-neutral-900 dark:text-neutral-100 transition-colors",
          "flex items-center gap-2",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        {isLoading ? '로그인 중...' : 'GitHub로 로그인'}
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={cn(
          "font-mono text-sm px-3 py-1.5 rounded-md border border-neutral-700 dark:border-neutral-600",
          "bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800",
          "transition-colors"
        )}
      >
        <UserAvatar user={user} />
      </button>

      {dropdownOpen && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setDropdownOpen(false)}
          />

          {/* 드롭다운 메뉴 */}
          <div className="absolute right-0 mt-2 w-48 z-20 rounded-md border border-neutral-700 dark:border-neutral-600 bg-white dark:bg-neutral-900 shadow-lg">
            <div className="py-1">
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className={cn(
                  "w-full text-left px-4 py-2 font-mono text-sm",
                  "text-neutral-900 dark:text-neutral-100",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  "transition-colors",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? '로그아웃 중...' : '로그아웃'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
