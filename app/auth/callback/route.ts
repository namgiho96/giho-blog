import { getSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await getSupabaseServerClient()

    // Supabase가 설정되지 않았으면 홈으로 리다이렉트
    if (!supabase) {
      console.warn('Auth callback received but Supabase is not configured')
      return NextResponse.redirect(`${origin}`)
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 에러 시 홈으로
  return NextResponse.redirect(`${origin}`)
}
