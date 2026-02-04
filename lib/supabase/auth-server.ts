import { getSupabaseServerClient } from './server'

// 서버 사이드에서만 사용 가능한 인증 함수
export async function getUser() {
  const supabase = await getSupabaseServerClient()

  // Supabase가 설정되지 않았으면 null 반환
  if (!supabase) {
    return null
  }

  const { data: { user } } = await supabase.auth.getUser()
  return user
}
