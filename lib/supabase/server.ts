import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export async function getSupabaseServerClient() {
  // 환경변수가 설정되지 않았으면 null 반환 (줄바꿈 문자 제거)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/[\r\n\s]/g, '')
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/[\r\n\s]/g, '')

  if (!url || !key || url === 'https://placeholder.supabase.co' || key === 'placeholder-key') {
    console.warn('Supabase credentials not configured. Authentication features will be disabled.')
    return null
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
