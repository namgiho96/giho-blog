import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'yyyy년 M월 d일', { locale: ko })
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
}
