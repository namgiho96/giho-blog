import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Comment } from '@/types/comment'
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
      const mockComments: Comment[] = [
        {
          id: '1',
          post_slug: slug,
          user_id: 'mock-user-1',
          content: '좋은 글 감사합니다!',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: {
            avatar_url: null,
            user_name: 'mock_user',
            display_name: 'Mock User',
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
    const userIds = Array.from(new Set(comments.map((c) => c.user_id)))
    const usersMap = new Map<string, { avatar_url: string | null; user_name: string | null; display_name: string | null }>()

    // Supabase의 auth.users는 직접 조회할 수 없으므로,
    // 실제로는 별도의 profiles 테이블이 필요합니다.
    // 여기서는 기본값으로 처리합니다.
    for (const userId of userIds) {
      usersMap.set(userId, {
        avatar_url: null,
        user_name: userId.substring(0, 8),
        display_name: `User ${userId.substring(0, 8)}`,
      })
    }

    const result: Comment[] = comments.map((comment) => ({
      id: comment.id,
      post_slug: comment.post_slug,
      user_id: comment.user_id,
      content: comment.content,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      user: usersMap.get(comment.user_id) || {
        avatar_url: null,
        user_name: 'unknown',
        display_name: 'Unknown User',
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
      const mockComment: Comment = {
        id: 'mock-' + Date.now(),
        post_slug: slug,
        user_id: 'mock-user-1',
        content: content.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          avatar_url: null,
          user_name: 'mock_user',
          display_name: 'Mock User',
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
    const comment: Comment = {
      id: newComment.id,
      post_slug: newComment.post_slug,
      user_id: newComment.user_id,
      content: newComment.content,
      created_at: newComment.created_at,
      updated_at: newComment.updated_at,
      user: {
        avatar_url: null,
        user_name: user.id.substring(0, 8),
        display_name: `User ${user.id.substring(0, 8)}`,
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
