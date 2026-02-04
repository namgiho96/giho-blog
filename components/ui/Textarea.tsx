import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  showCharCount?: boolean
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      label,
      showCharCount = false,
      autoResize = false,
      maxLength,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const textareaId = id || React.useId()
    const [charCount, setCharCount] = React.useState(0)
    const internalRef = React.useRef<HTMLTextAreaElement>(null)

    // Combine refs
    React.useImperativeHandle(ref, () => internalRef.current!)

    // Auto-resize logic
    React.useEffect(() => {
      if (autoResize && internalRef.current) {
        const textarea = internalRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [autoResize, props.value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)

      if (autoResize && internalRef.current) {
        const textarea = internalRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }

      onChange?.(e)
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block font-mono text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            // Base styles
            'flex min-h-[80px] w-full px-3 py-2',
            'font-mono text-sm',
            'bg-background text-foreground',
            'border-2 transition-colors',
            'resize-y',

            // States
            'placeholder:text-foreground/40',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',

            // Error state
            error
              ? 'border-red-600 focus-visible:ring-red-600'
              : 'border-foreground/20 focus-visible:border-foreground focus-visible:ring-foreground',

            // Auto-resize
            autoResize && 'resize-none overflow-hidden',

            className
          )}
          ref={internalRef}
          maxLength={maxLength}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : showCharCount
              ? `${textareaId}-count`
              : undefined
          }
          {...props}
        />
        <div className="mt-1.5 flex items-center justify-between">
          {error && (
            <p
              id={`${textareaId}-error`}
              className="font-mono text-xs text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
          {showCharCount && maxLength && (
            <p
              id={`${textareaId}-count`}
              className={cn(
                'ml-auto font-mono text-xs',
                charCount > maxLength * 0.9
                  ? 'text-red-600'
                  : 'text-foreground/50'
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
