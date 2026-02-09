import { ContributionData } from '@/lib/github/types'
import { ContributionCell } from './ContributionCell'

interface ContributionGridProps {
  data: ContributionData
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

export function ContributionGrid({ data }: ContributionGridProps) {
  // Calculate month labels positions
  const monthLabels: { month: string; position: number }[] = []
  let currentMonth = -1

  data.weeks.forEach((week, weekIndex) => {
    if (week.length > 0) {
      const firstDay = new Date(week[0].date)
      const month = firstDay.getMonth()
      if (month !== currentMonth) {
        currentMonth = month
        monthLabels.push({ month: MONTHS[month], position: weekIndex })
      }
    }
  })

  return (
    <div className="inline-block">
      {/* Month labels */}
      <div className="flex text-xs text-neutral-500 dark:text-neutral-400 mb-1 ml-8">
        <div className="relative w-full" style={{ height: '13px' }}>
          {monthLabels.map(({ month, position }) => (
            <span
              key={`${month}-${position}`}
              className="absolute"
              style={{ left: `${position * 12}px` }}
            >
              {month}
            </span>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col text-xs text-neutral-500 dark:text-neutral-400 mr-2 gap-[2px]">
          {DAYS.map((day, index) => (
            <div key={index} className="h-[10px] flex items-center">
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-[2px]" role="grid" aria-label="Contribution graph">
          {data.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]" role="row">
              {week.map((day, dayIndex) => (
                <ContributionCell key={`${weekIndex}-${dayIndex}`} day={day} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Total contributions */}
      <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
        총 {data.totalContributions.toLocaleString()}개의 기여
      </div>
    </div>
  )
}
