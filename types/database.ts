export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          slug: string
          view_count: number
          like_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          slug: string
          view_count?: number
          like_count?: number
        }
        Update: {
          view_count?: number
          like_count?: number
        }
      }
      views: {
        Row: {
          id: string
          post_slug: string
          session_id: string
          created_at: string
        }
        Insert: {
          post_slug: string
          session_id: string
        }
        Update: never
      }
      likes: {
        Row: {
          id: string
          post_slug: string
          user_id: string
          created_at: string
        }
        Insert: {
          post_slug: string
          user_id: string
        }
        Update: never
      }
      comments: {
        Row: {
          id: string
          post_slug: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          post_slug: string
          user_id: string
          content: string
        }
        Update: {
          content?: string
        }
      }
    }
  }
}
