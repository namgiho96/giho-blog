import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      // Base styles - terminal aesthetic
      'inline-flex items-center justify-center',
      'font-mono text-sm font-medium',
      'border-2 transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',

      // Variant styles
      {
        // Primary - bold accent
        'bg-foreground text-background border-foreground': variant === 'primary',
        'hover:bg-transparent hover:text-foreground': variant === 'primary' && !disabled,

        // Secondary - outlined
        'bg-transparent text-foreground border-foreground': variant === 'secondary',
        'hover:bg-foreground hover:text-background': variant === 'secondary' && !disabled,

        // Ghost - minimal
        'bg-transparent text-foreground border-transparent': variant === 'ghost',
        'hover:border-foreground': variant === 'ghost' && !disabled,

        // Danger - red accent
        'bg-red-600 text-white border-red-600': variant === 'danger',
        'hover:bg-transparent hover:text-red-600': variant === 'danger' && !disabled,
      },

      // Size styles
      {
        'h-8 px-3 text-xs': size === 'sm',
        'h-10 px-4': size === 'md',
        'h-12 px-6 text-base': size === 'lg',
      },

      className
    )

    // If asChild, clone the child element and merge props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(baseClasses, children.props.className),
        ref,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="mr-2 inline-block h-4 w-4 animate-spin">
              <svg
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
