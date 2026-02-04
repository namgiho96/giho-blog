# Interaction Components

터미널 스타일의 블로그 인터랙션 컴포넌트 모음입니다.

## 컴포넌트 목록

### 1. ViewCount
조회수를 표시하고 자동으로 증가시키는 컴포넌트입니다.

```tsx
import { ViewCount } from '@/components/interaction'

<ViewCount slug="my-post" initialCount={0} />
```

**특징:**
- 마운트 시 자동으로 조회수 증가
- sessionId를 사용하여 중복 카운트 방지
- 눈 아이콘과 함께 표시
- 로딩 상태 표시 (---)

---

### 2. LikeButton
좋아요 기능을 제공하는 버튼 컴포넌트입니다.

```tsx
import { LikeButton } from '@/components/interaction'

<LikeButton
  slug="my-post"
  initialLikes={10}
  initialIsLiked={false}
/>
```

**특징:**
- 로그인 필요 (비로그인 시 안내 메시지)
- 낙관적 업데이트 (즉시 UI 반영)
- 하트 아이콘 애니메이션
- 좋아요 수 표시

---

### 3. CommentSection
전체 댓글 시스템을 포함하는 메인 컴포넌트입니다.

```tsx
import { CommentSection } from '@/components/interaction'

<CommentSection
  slug="my-post"
  initialCommentCount={5}
/>
```

**특징:**
- 댓글 작성 폼 포함
- 댓글 목록 자동 새로고침
- 총 댓글 수 표시
- 로그인 상태 자동 확인

---

### 4. CommentForm
댓글 작성 폼 컴포넌트입니다.

```tsx
import { CommentForm } from '@/components/interaction'

<CommentForm
  slug="my-post"
  onCommentAdded={() => console.log('Comment added!')}
/>
```

**특징:**
- 1000자 제한
- 실시간 글자 수 표시
- 로그인 필요
- 자동 높이 조절

---

### 5. CommentList
댓글 목록을 표시하는 컴포넌트입니다.

```tsx
import { CommentList } from '@/components/interaction'
import { useAuth } from '@/components/auth/AuthProvider'

const { user } = useAuth()

<CommentList
  slug="my-post"
  currentUser={user}
  refreshTrigger={0}
/>
```

**특징:**
- 로딩 스켈레톤
- 빈 상태 메시지
- 자동 새로고침 지원
- 에러 처리

---

### 6. CommentItem
개별 댓글을 렌더링하는 컴포넌트입니다.

```tsx
import { CommentItem } from '@/components/interaction'

<CommentItem
  comment={comment}
  currentUser={user}
  slug="my-post"
  onCommentUpdated={() => {}}
  onCommentDeleted={() => {}}
/>
```

**특징:**
- 아바타 표시
- 상대 시간 표시 (예: "5분 전")
- 수정/삭제 버튼 (소유자만)
- 인라인 편집 모드
- 삭제 확인 모달

---

## 통합 사용 예제

```tsx
'use client'

import { ViewCount, LikeButton, CommentSection } from '@/components/interaction'

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <article>
      {/* 포스트 헤더 */}
      <header>
        <h1>포스트 제목</h1>

        {/* 인터랙션 통계 */}
        <div className="flex items-center gap-4">
          <ViewCount slug={params.slug} />
          <LikeButton slug={params.slug} />
        </div>
      </header>

      {/* 포스트 내용 */}
      <div>{/* ... */}</div>

      {/* 댓글 섹션 */}
      <CommentSection slug={params.slug} />
    </article>
  )
}
```

---

## 디자인 시스템

모든 컴포넌트는 터미널 스타일을 따릅니다:

- **폰트:** 모노스페이스 (`font-mono`)
- **테두리:** 2px solid (`border-2`)
- **색상:** 다크/라이트 테마 지원 (`foreground`, `background`)
- **애니메이션:** 부드러운 전환 효과
- **상태:** 로딩, 에러, 빈 상태 처리

---

## API 엔드포인트

컴포넌트들이 사용하는 API 엔드포인트:

```
POST   /api/posts/[slug]/views
GET    /api/posts/[slug]/likes
POST   /api/posts/[slug]/likes
GET    /api/posts/[slug]/comments
POST   /api/posts/[slug]/comments
PUT    /api/posts/[slug]/comments/[id]
DELETE /api/posts/[slug]/comments/[id]
```

---

## 의존성

```json
{
  "dependencies": {
    "lucide-react": "아이콘",
    "date-fns": "날짜 포맷팅",
    "@supabase/supabase-js": "인증"
  }
}
```

---

## 접근성

- ARIA 레이블 제공
- 키보드 네비게이션 지원
- 스크린 리더 친화적
- 포커스 인디케이터
