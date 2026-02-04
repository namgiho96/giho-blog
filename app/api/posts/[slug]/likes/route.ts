import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

// GET: 현재 좋아요 상태 조회
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await getSupabaseServerClient()

    // Supabase가 없으면 mock 데이터 반환
    if (!supabase) {
      return NextResponse.json({
        likeCount: 15,
        isLiked: false,
      })
    }

    // 현재 사용자 확인
    const { data: { user } } = await supabase.auth.getUser()

    // 좋아요 수 가져오기
    const { data: postData } = await supabase
      .from('posts')
      .select('like_count')
      .eq('slug', slug)
      .single()

    type PostRow = Database['public']['Tables']['posts']['Row']
    const post = postData as PostRow | null
    const likeCount = post?.like_count ?? 0

    // 로그인한 경우 좋아요 여부 확인
    let isLiked = false
    if (user) {
      const { data: like } = await supabase
        .from('likes')
        .select('id')
        .eq('post_slug', slug)
        .eq('user_id', user.id)
        .single()

      isLiked = !!like
    }

    return NextResponse.json({
      likeCount,
      isLiked,
    })
  } catch (error) {
    console.error('Likes GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: 좋아요 토글
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await getSupabaseServerClient()

    // Supabase가 없으면 mock 데이터 반환
    if (!supabase) {
      return NextResponse.json({
        likeCount: 16,
        isLiked: true,
      })
    }

    // 로그인 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 현재 좋아요 상태 확인
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('post_slug', slug)
      .eq('user_id', user.id)
      .single()

    // 좋아요 토글
    if (existingLike) {
      // 좋아요 취소
      await supabase
        .from('likes')
        .delete()
        .eq('post_slug', slug)
        .eq('user_id', user.id)
    } else {
      // 좋아요 추가
      await supabase
        .from('likes')
        // @ts-expect-error - Supabase client type inference issue
        .insert({ post_slug: slug, user_id: user.id })
    }

    // 현재 좋아요 수 가져오기
    const { data: postData2 } = await supabase
      .from('posts')
      .select('like_count')
      .eq('slug', slug)
      .single()

    type PostRow2 = Database['public']['Tables']['posts']['Row']
    const post2 = postData2 as PostRow2 | null
    const currentCount = post2?.like_count ?? 0
    const newCount = existingLike ? currentCount - 1 : currentCount + 1

    // posts 테이블의 like_count 업데이트
    await supabase
      .from('posts')
      // @ts-expect-error - Supabase client type inference issue
      .upsert(
        { slug, like_count: newCount },
        { onConflict: 'slug' }
      )

    return NextResponse.json({
      likeCount: newCount,
      isLiked: !existingLike,
    })
  } catch (error) {
    console.error('Likes POST API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
