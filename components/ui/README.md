# UI Components

터미널 스타일의 모노스페이스 UI 컴포넌트 라이브러리입니다.

## 디자인 컨셉

- **스타일**: 테크/터미널 느낌
- **폰트**: 모노스페이스 (font-mono)
- **특징**: 미니멀하고 깔끔한 border, 부드러운 호버 효과

## 컴포넌트 목록

### Button

버튼 컴포넌트 - 다양한 variant와 size 지원

```tsx
import { Button } from '@/components/ui'

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button isLoading>Loading</Button>

// As Link (asChild pattern)
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

### Input

입력 필드 컴포넌트 - label과 error 상태 지원

```tsx
import { Input } from '@/components/ui'

<Input
  label="Email"
  placeholder="Enter your email"
/>

<Input
  label="Password"
  error="Password is required"
/>
```

### Textarea

텍스트 영역 컴포넌트 - 자동 높이 조절과 글자 수 표시 지원

```tsx
import { Textarea } from '@/components/ui'

<Textarea
  label="Comment"
  placeholder="Write a comment..."
  showCharCount
  maxLength={500}
/>

<Textarea
  autoResize
  placeholder="Auto-resize as you type"
/>
```

### Skeleton

로딩 플레이스홀더 컴포넌트 - 다양한 preset 제공

```tsx
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard
} from '@/components/ui'

// Basic
<Skeleton width={200} height={20} />

// Text lines
<SkeletonText lines={3} />

// Avatar
<SkeletonAvatar size={40} />

// Card with avatar + text
<SkeletonCard />
```

### Avatar

유저 아바타 컴포넌트 - 이미지 또는 이니셜 폴백

```tsx
import { Avatar, GitHubAvatar } from '@/components/ui'

// With fallback
<Avatar fallback="John Doe" size="md" />

// With image
<Avatar
  src="/avatar.jpg"
  fallback="JD"
  alt="Profile"
/>

// GitHub avatar (optimized)
<GitHubAvatar username="torvalds" size="lg" />
```

### Badge

태그/뱃지 컴포넌트 - variant와 color 지원

```tsx
import { Badge } from '@/components/ui'

// Variants
<Badge>Default</Badge>
<Badge variant="outline">Outline</Badge>

// Colors
<Badge color="blue">Blue</Badge>
<Badge color="green">Green</Badge>
<Badge color="red">Red</Badge>
<Badge color="yellow">Yellow</Badge>
<Badge color="purple">Purple</Badge>
```

## Import 방식

```tsx
// Named imports
import { Button, Input, Badge } from '@/components/ui'

// Individual imports
import { Button } from '@/components/ui/Button'
```

## 데모 페이지

모든 컴포넌트의 사용 예시를 확인하려면:

```bash
npm run dev
```

그리고 `/ui-demo` 페이지를 방문하세요.

## 스타일 커스터마이징

모든 컴포넌트는 `className` prop을 통해 Tailwind 클래스를 추가할 수 있습니다:

```tsx
<Button className="mt-4 w-full">
  Full Width Button
</Button>
```

## 접근성

- 모든 input 컴포넌트는 적절한 `aria-*` 속성을 포함합니다
- 에러 상태는 `aria-invalid`와 `aria-describedby`로 스크린 리더에 전달됩니다
- Skeleton 컴포넌트는 `aria-live="polite"`와 `aria-busy="true"`를 사용합니다
