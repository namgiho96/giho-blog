import { createHighlighter, Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

/**
 * Shiki 하이라이터 싱글톤 인스턴스를 가져옵니다
 */
export async function getHighlighter(): Promise<Highlighter> {
  if (highlighter) {
    return highlighter
  }

  highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: [
      'typescript',
      'javascript',
      'jsx',
      'tsx',
      'json',
      'css',
      'html',
      'markdown',
      'bash',
      'shell',
      'python',
      'rust',
      'go',
      'java',
      'c',
      'cpp',
    ],
  })

  return highlighter
}

/**
 * 코드를 HTML로 변환합니다
 */
export async function codeToHtml(
  code: string,
  lang: string,
  theme: 'github-dark' | 'github-light' = 'github-dark'
): Promise<string> {
  const highlighterInstance = await getHighlighter()

  return highlighterInstance.codeToHtml(code, {
    lang,
    theme,
  })
}
