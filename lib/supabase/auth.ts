import { getSupabaseBrowserClient } from './client'

// 클라이언트 사이드 인증 함수들
export async function signInWithGitHub() {
  const supabase = getSupabaseBrowserClient()

  if (!supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.')
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
}

export async function signOut() {
  const supabase = getSupabaseBrowserClient()

  if (!supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.')
  }

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
