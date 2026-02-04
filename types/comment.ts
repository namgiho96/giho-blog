export interface Comment {
  id: string
  post_slug: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  user: {
    avatar_url: string | null
    user_name: string | null
    display_name: string | null
  }
}
