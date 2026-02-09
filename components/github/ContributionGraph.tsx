import { fetchGitHubContributions } from '@/lib/github/contributions'
import { ContributionGrid } from './ContributionGrid'

interface ContributionGraphProps {
  username?: string
  className?: string
}

export async function ContributionGraph({
  username,
  className
}: ContributionGraphProps) {
  const targetUsername = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME

  if (!targetUsername) {
    return (
      <div className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
        <span className="text-[#f85149]">Error:</span> GitHub 사용자명이 설정되지 않았습니다.
      </div>
    )
  }

  const data = await fetchGitHubContributions(targetUsername)

  if (!data) {
    return (
      <div className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
        <span className="text-[#f85149]">Error:</span> 기여 데이터를 불러올 수 없습니다.
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Scrollable container for mobile */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[680px]">
          <ContributionGrid data={data} />
        </div>
      </div>
    </div>
  )
}
