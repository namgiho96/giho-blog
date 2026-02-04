import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline'
  color?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = 'default', color = 'default', children, ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center',
          'px-2 py-0.5',
          'font-mono text-xs font-medium',
          'border-2',
          'transition-colors',

          // Variant: default (filled)
          variant === 'default' && {
            'bg-foreground text-background border-foreground': color === 'default',
            'bg-blue-600 text-white border-blue-600': color === 'blue',
            'bg-green-600 text-white border-green-600': color === 'green',
            'bg-red-600 text-white border-red-600': color === 'red',
            'bg-yellow-600 text-white border-yellow-600': color === 'yellow',
            'bg-purple-600 text-white border-purple-600': color === 'purple',
          },

          // Variant: outline
          variant === 'outline' && {
            'bg-transparent text-foreground border-foreground': color === 'default',
            'bg-transparent text-blue-600 border-blue-600': color === 'blue',
            'bg-transparent text-green-600 border-green-600': color === 'green',
            'bg-transparent text-red-600 border-red-600': color === 'red',
            'bg-transparent text-yellow-600 border-yellow-600': color === 'yellow',
            'bg-transparent text-purple-600 border-purple-600': color === 'purple',
          },

          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
