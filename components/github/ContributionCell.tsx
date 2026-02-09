import { cn } from '@/lib/utils'
import { ContributionDay } from '@/lib/github/types'

interface ContributionCellProps {
  day: ContributionDay
}

const levelColors = {
  0: 'bg-neutral-200 dark:bg-[#161b22]',
  1: 'bg-[#9be9a8] dark:bg-[#0e4429]',
  2: 'bg-[#40c463] dark:bg-[#006d32]',
  3: 'bg-[#30a14e] dark:bg-[#26a641]',
  4: 'bg-[#216e39] dark:bg-[#39d353]',
} as const

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ContributionCell({ day }: ContributionCellProps) {
  const tooltip = `${day.count}개의 기여 - ${formatDate(day.date)}`

  return (
    <div
      className={cn(
        'w-[10px] h-[10px] rounded-[2px]',
        levelColors[day.level]
      )}
      title={tooltip}
      role="gridcell"
      aria-label={tooltip}
    />
  )
}
