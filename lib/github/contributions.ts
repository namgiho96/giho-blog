import {
  GitHubGraphQLResponse,
  ContributionData,
  ContributionDay,
  getContributionLevel,
} from './types'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

export async function fetchGitHubContributions(
  username: string
): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    console.error('GITHUB_TOKEN is not set')
    return null
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // ISR: 1 hour cache
    })

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`)
      return null
    }

    const json: GitHubGraphQLResponse = await response.json()

    if (json.errors) {
      console.error('GitHub GraphQL errors:', json.errors)
      return null
    }

    const user = json.data?.user
    if (!user) {
      console.error(`User not found: ${username}`)
      return null
    }

    const calendar = user.contributionsCollection.contributionCalendar

    // Transform to our format
    const weeks: ContributionDay[][] = calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: getContributionLevel(day.contributionCount),
      }))
    )

    return {
      totalContributions: calendar.totalContributions,
      weeks,
    }
  } catch (error) {
    console.error('Failed to fetch contributions:', error)
    return null
  }
}
