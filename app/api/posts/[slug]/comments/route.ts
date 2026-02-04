import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

// GET: 댓글 목록 조회
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await getSupabaseServerClient()

    // Supabase가 없으면 mock 데이터 반환
    if (!supabase) {
      const mockComments = [
        {
          id: '1',
          content: '좋은 글 감사합니다!',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: {
            id: 'mock-user-1',
            email: 'mock@example.com',
            user_metadata: {
              full_name: 'Mock User',
              avatar_url: null,
            },
          },
        },
      ]

      return NextResponse.json({
        comments: mockComments,
        total: mockComments.length,
      })
    }

    // 댓글 가져오기
    const { data: commentsData, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_slug', slug)
      .order('created_at', { ascending: false })

    if (error || !commentsData) {
      console.error('Failed to fetch comments:', error)
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      )
    }

    // 유저 정보 가져오기
    type CommentRow = Database['public']['Tables']['comments']['Row']
    const comments = commentsData as CommentRow[]

    // CommentItem 컴포넌트가 기대하는 형식으로 변환
    const result = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      user: {
        id: comment.user_id,
        email: `user_${comment.user_id.substring(0, 8)}@example.com`,
        user_metadata: {
          full_name: `User ${comment.user_id.substring(0, 8)}`,
          avatar_url: null,
        },
      },
    }))

    return NextResponse.json({
      comments: result,
      total: result.length,
    })
  } catch (error) {
    console.error('Comments GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: 댓글 작성
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { content } = await request.json()

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const supabase = await getSupabaseServerClient()

    // Supabase가 없으면 mock 데이터 반환
    if (!supabase) {
      const mockComment = {
        id: 'mock-' + Date.now(),
        content: content.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          id: 'mock-user-1',
          email: 'mock@example.com',
          user_metadata: {
            full_name: 'Mock User',
            avatar_url: null,
          },
        },
      }

      return NextResponse.json({ comment: mockComment })
    }

    // 로그인 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 댓글 작성
    const { data: newCommentData, error: insertError } = await supabase
      .from('comments')
      // @ts-expect-error - Supabase client type inference issue
      .insert({
        post_slug: slug,
        user_id: user.id,
        content: content.trim(),
      })
      .select()
      .single()

    if (insertError || !newCommentData) {
      console.error('Failed to create comment:', insertError)
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      )
    }

    // 유저 정보 (기본값)
    type CommentRow = Database['public']['Tables']['comments']['Row']
    const newComment = newCommentData as CommentRow
    const comment = {
      id: newComment.id,
      content: newComment.content,
      created_at: newComment.created_at,
      updated_at: newComment.updated_at,
      user: {
        id: user.id,
        email: user.email || `user_${user.id.substring(0, 8)}@example.com`,
        user_metadata: {
          full_name: user.user_metadata?.full_name || `User ${user.id.substring(0, 8)}`,
          avatar_url: user.user_metadata?.avatar_url || null,
        },
      },
    }

    return NextResponse.json({ comment })
  } catch (error) {
    console.error('Comments POST API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
