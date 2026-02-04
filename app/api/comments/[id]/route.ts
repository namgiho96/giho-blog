import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Comment } from '@/types/comment'
import type { Database } from '@/types/database'

// PATCH: 댓글 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
        id,
        post_slug: 'mock-slug',
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

    // 기존 댓글 확인 (본인 댓글인지 체크)
    const { data: existingCommentData, error: fetchError } = await supabase
      .from('comments')
      .select('user_id, post_slug')
      .eq('id', id)
      .single()

    if (fetchError || !existingCommentData) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    type CommentRow = Database['public']['Tables']['comments']['Row']
    const existingComment = existingCommentData as Pick<CommentRow, 'user_id' | 'post_slug'>

    // 본인 댓글이 아니면 거부
    if (existingComment.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // 댓글 수정
    const { data: updatedCommentData, error: updateError } = await supabase
      .from('comments')
      // @ts-expect-error - Supabase client type inference issue
      .update({ content: content.trim() })
      .eq('id', id)
      .select()
      .single()

    if (updateError || !updatedCommentData) {
      console.error('Failed to update comment:', updateError)
      return NextResponse.json(
        { error: 'Failed to update comment' },
        { status: 500 }
      )
    }

    // 유저 정보 (기본값)
    const updatedComment = updatedCommentData as CommentRow
    const comment: Comment = {
      id: updatedComment.id,
      post_slug: updatedComment.post_slug,
      user_id: updatedComment.user_id,
      content: updatedComment.content,
      created_at: updatedComment.created_at,
      updated_at: updatedComment.updated_at,
      user: {
        avatar_url: null,
        user_name: user.id.substring(0, 8),
        display_name: `User ${user.id.substring(0, 8)}`,
      },
    }

    return NextResponse.json({ comment })
  } catch (error) {
    console.error('Comment PATCH API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE: 댓글 삭제
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await getSupabaseServerClient()

    // Supabase가 없으면 성공 응답
    if (!supabase) {
      return NextResponse.json({ success: true })
    }

    // 로그인 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 기존 댓글 확인 (본인 댓글인지 체크)
    const { data: existingCommentData2, error: fetchError } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingCommentData2) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    type CommentRow2 = Database['public']['Tables']['comments']['Row']
    const existingComment2 = existingCommentData2 as Pick<CommentRow2, 'user_id'>

    // 본인 댓글이 아니면 거부
    if (existingComment2.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // 댓글 삭제
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Failed to delete comment:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Comment DELETE API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
