import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    const supabase = await getSupabaseServerClient()

    // Supabase가 없으면 mock 데이터 반환
    if (!supabase) {
      return NextResponse.json({
        viewCount: 42,
        isNewView: true,
      })
    }

    // 세션 기반 중복 방지 체크
    const { data: existingView } = await supabase
      .from('views')
      .select('id')
      .eq('post_slug', slug)
      .eq('session_id', sessionId)
      .single()

    let isNewView = false

    // 새로운 조회면 views 테이블에 기록
    if (!existingView) {
      const { error: viewError } = await supabase
        .from('views')
        // @ts-expect-error - Supabase client type inference issue
        .insert({ post_slug: slug, session_id: sessionId })

      if (viewError) {
        console.error('Failed to record view:', viewError)
      } else {
        isNewView = true
      }
    }

    // 현재 조회수 가져오기
    const { data: postData } = await supabase
      .from('posts')
      .select('view_count')
      .eq('slug', slug)
      .single()

    type PostRow = Database['public']['Tables']['posts']['Row']
    const post = postData as PostRow | null
    const viewCount = post?.view_count ?? 0

    // 새로운 조회면 posts 테이블의 view_count 증가
    if (isNewView) {
      await supabase
        .from('posts')
        // @ts-expect-error - Supabase client type inference issue
        .upsert(
          { slug, view_count: viewCount + 1 },
          { onConflict: 'slug' }
        )
    }

    return NextResponse.json({
      viewCount: isNewView ? viewCount + 1 : viewCount,
      isNewView,
    })
  } catch (error) {
    console.error('Views API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
