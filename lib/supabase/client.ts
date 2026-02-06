import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseBrowserClient() {
  // 환경변수가 설정되지 않았으면 null 반환
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !key || url === 'https://placeholder.supabase.co' || key === 'placeholder-key') {
    console.warn('Supabase credentials not configured. Authentication features will be disabled.')
    return null
  }

  if (client) {
    return client
  }

  client = createBrowserClient<Database>(url, key)

  return client
}
