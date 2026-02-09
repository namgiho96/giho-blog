export function ContributionGraphSkeleton() {
  // 52 weeks x 7 days grid skeleton
  const weeks = Array(52).fill(null)
  const days = Array(7).fill(null)

  return (
    <div className="inline-block animate-pulse">
      {/* Month labels skeleton */}
      <div className="flex mb-1 ml-8 gap-6">
        {Array(12).fill(null).map((_, i) => (
          <div key={i} className="h-3 w-6 bg-neutral-200 dark:bg-neutral-800 rounded" />
        ))}
      </div>

      <div className="flex">
        {/* Day labels skeleton */}
        <div className="flex flex-col mr-2 gap-[2px]">
          {days.map((_, index) => (
            <div key={index} className="h-[10px] w-6" />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="flex gap-[2px]">
          {weeks.map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {days.map((_, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="w-[10px] h-[10px] rounded-[2px] bg-neutral-200 dark:bg-neutral-800"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Total skeleton */}
      <div className="mt-3">
        <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </div>
    </div>
  )
}
