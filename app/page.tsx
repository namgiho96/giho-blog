import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx/posts'
import { PostCard } from '@/components/blog/PostCard'

export default function Home() {
  const allPosts = getAllPosts()
  const latestPosts = allPosts.slice(0, 3) // 최신 3개 포스트

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* 터미널 스타일 히어로 섹션 */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-neutral-50 dark:bg-[#161b22] border border-neutral-200 dark:border-neutral-800 rounded-lg p-8 md:p-12 terminal-shadow">
          {/* 터미널 헤더 */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-600 ml-2">
              terminal
            </span>
          </div>

          {/* 터미널 내용 */}
          <div className="space-y-4 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#7ee787]">$</span>
              <span className="text-neutral-600 dark:text-neutral-400">
                whoami
              </span>
            </div>
            <div className="pl-4 text-neutral-900 dark:text-neutral-100">
              Developer | Writer | Learner
            </div>

            <div className="flex items-center gap-2 mt-6">
              <span className="text-[#7ee787]">$</span>
              <span className="text-neutral-600 dark:text-neutral-400">
                cat welcome.txt
              </span>
            </div>
            <div className="pl-4 space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                안녕하세요! 👋
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                개발하면서 배운 것들을 기록하고 공유하는 공간입니다.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                코드, 생각, 그리고 여정을 함께 나눕니다.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <span className="text-[#7ee787]">$</span>
              <span className="text-neutral-600 dark:text-neutral-400">
                ls -la topics/
              </span>
            </div>
            <div className="pl-4 space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-[#58a6ff]">📁</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  Web Development
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#58a6ff]">📁</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  JavaScript & TypeScript
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#58a6ff]">📁</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  React & Next.js
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#58a6ff]">📁</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  Development Tips
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <span className="text-[#7ee787]">$</span>
              <span className="text-neutral-900 dark:text-neutral-100 animate-pulse">
                _
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 최신 포스트 섹션 */}
      {latestPosts.length > 0 && (
        <section className="max-w-6xl mx-auto mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="font-mono">
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-600 mb-2">
                <span className="text-[#7ee787]">$</span>
                <span>ls -t posts/ | head -3</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                최신 포스트
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-mono text-sm text-[#58a6ff] hover:text-[#7ee787] transition-colors"
            >
              모든 글 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* CTA 섹션 */}
      <section className="max-w-4xl mx-auto mt-16">
        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="/blog"
            className="group p-6 bg-neutral-50 dark:bg-[#161b22] border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-[#58a6ff] dark:hover:border-[#58a6ff] transition-all"
          >
            <div className="text-2xl mb-3">📝</div>
            <h3 className="font-mono font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-[#58a6ff]">
              Blog Posts
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              최신 글과 튜토리얼을 확인하세요
            </p>
          </a>

          <a
            href="/about"
            className="group p-6 bg-neutral-50 dark:bg-[#161b22] border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-[#58a6ff] dark:hover:border-[#58a6ff] transition-all"
          >
            <div className="text-2xl mb-3">👤</div>
            <h3 className="font-mono font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-[#58a6ff]">
              About Me
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              저에 대해 더 알아보세요
            </p>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-neutral-50 dark:bg-[#161b22] border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-[#58a6ff] dark:hover:border-[#58a6ff] transition-all"
          >
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-mono font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-[#58a6ff]">
              GitHub
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              프로젝트와 코드 보기
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
