// GitHub GraphQL API response types
export interface GitHubContributionDay {
  contributionCount: number
  date: string // ISO 8601 format: "2024-01-15"
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[]
}

export interface GitHubContributionsCollection {
  contributionCalendar: {
    totalContributions: number
    weeks: GitHubContributionWeek[]
  }
}

export interface GitHubGraphQLResponse {
  data: {
    user: {
      contributionsCollection: GitHubContributionsCollection
    } | null
  }
  errors?: Array<{ message: string }>
}

// Transformed types for component consumption
export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // Intensity level
}

export interface ContributionData {
  totalContributions: number
  weeks: ContributionDay[][] // 52 weeks x 7 days
}

// Helper function type
export function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}
