import { cn } from '@/lib/utils'

type CalloutVariant = 'info' | 'warning' | 'error' | 'success'

interface CalloutProps {
  variant?: CalloutVariant
  children: React.ReactNode
  className?: string
}

/**
 * 터미널 스타일 강조 박스 컴포넌트
 *
 * 생각해보면 터미널에서 중요한 메시지를 볼 때는 색깔이 다르죠?
 * 에러는 빨간색, 성공은 초록색... 이 컴포넌트도 똑같은 원리예요!
 */
export function Callout({ variant = 'info', children, className }: CalloutProps) {
  // 각 variant별 아이콘과 스타일 설정
  const variantConfig = {
    info: {
      icon: 'ℹ',
      borderClass: 'border-primary',
      bgClass: 'bg-primary/5 dark:bg-primary/10',
      iconClass: 'text-primary',
      label: 'INFO',
    },
    warning: {
      icon: '⚠',
      borderClass: 'border-yellow-500',
      bgClass: 'bg-yellow-500/5 dark:bg-yellow-500/10',
      iconClass: 'text-yellow-500',
      label: 'WARNING',
    },
    error: {
      icon: '✕',
      borderClass: 'border-accent',
      bgClass: 'bg-accent/5 dark:bg-accent/10',
      iconClass: 'text-accent',
      label: 'ERROR',
    },
    success: {
      icon: '✓',
      borderClass: 'border-secondary',
      bgClass: 'bg-secondary/5 dark:bg-secondary/10',
      iconClass: 'text-secondary',
      label: 'SUCCESS',
    },
  }

  const config = variantConfig[variant]

  return (
    <div
      className={cn(
        'my-6 rounded-lg border-l-4 p-4',
        config.borderClass,
        config.bgClass,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* 아이콘 - 터미널에서 상태 표시하듯이 */}
        <div
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
            'border border-current/20 bg-current/10',
            'font-mono text-sm font-bold',
            config.iconClass
          )}
          aria-hidden="true"
        >
          {config.icon}
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 space-y-2">
          {/* 라벨 */}
          <div
            className={cn(
              'font-mono text-xs font-bold uppercase tracking-wide',
              config.iconClass
            )}
          >
            {config.label}
          </div>

          {/* 실제 메시지 */}
          <div className="text-sm leading-relaxed text-neutral-900 dark:text-neutral-100 [&_p]:my-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
