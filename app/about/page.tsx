import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: '개발자 소개',
  openGraph: {
    title: 'About',
    description: '개발자 소개',
    type: 'profile',
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로 가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-sm text-[#58a6ff] hover:text-[#7ee787] transition-colors mb-8"
        >
          <span>←</span>
          <span>cd ..</span>
        </Link>

        {/* 터미널 헤더 */}
        <div className="bg-neutral-50 dark:bg-[#161b22] border-2 border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          {/* 터미널 타이틀바 */}
          <div className="bg-neutral-200 dark:bg-[#0d1117] border-b-2 border-neutral-300 dark:border-neutral-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400 ml-2">
              about.sh
            </span>
          </div>

          {/* 터미널 컨텐츠 */}
          <div className="p-8 md:p-12 font-mono text-sm">
            {/* whoami */}
            <div className="mb-8">
              <div className="text-[#58a6ff] mb-2">
                <span className="text-[#7ee787]">$</span> whoami
              </div>
              <div className="pl-4 text-neutral-700 dark:text-neutral-300">
                <p className="mb-2 text-lg">&gt; 풀스택 개발자</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  웹 개발에 열정을 가진 개발자입니다.
                  <br />
                  사용자 경험과 코드 품질을 중요하게 생각합니다.
                </p>
              </div>
            </div>

            {/* cat skills.txt */}
            <div className="mb-8">
              <div className="text-[#58a6ff] mb-2">
                <span className="text-[#7ee787]">$</span> cat skills.txt
              </div>
              <div className="pl-4 text-neutral-700 dark:text-neutral-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#f97583] mb-1"># Frontend</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                      <li>&gt; TypeScript</li>
                      <li>&gt; React / Next.js</li>
                      <li>&gt; Tailwind CSS</li>
                      <li>&gt; Zustand / Redux</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[#f97583] mb-1"># Backend</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                      <li>&gt; Node.js</li>
                      <li>&gt; Express / NestJS</li>
                      <li>&gt; PostgreSQL / MongoDB</li>
                      <li>&gt; Prisma / TypeORM</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[#f97583] mb-1"># DevOps</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                      <li>&gt; Docker</li>
                      <li>&gt; GitHub Actions</li>
                      <li>&gt; Vercel / AWS</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[#f97583] mb-1"># Tools</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                      <li>&gt; Git / GitHub</li>
                      <li>&gt; VS Code</li>
                      <li>&gt; Figma</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* cat interests.json */}
            <div className="mb-8">
              <div className="text-[#58a6ff] mb-2">
                <span className="text-[#7ee787]">$</span> cat interests.json
              </div>
              <div className="pl-4 text-neutral-700 dark:text-neutral-300">
                <pre className="text-neutral-600 dark:text-neutral-400">
{`{
  "coding": [
    "Clean Architecture",
    "Design Patterns",
    "Performance Optimization",
    "User Experience"
  ],
  "learning": [
    "System Design",
    "DevOps",
    "Open Source"
  ],
  "hobbies": [
    "Reading Tech Blogs",
    "Contributing to OSS",
    "Writing Articles"
  ]
}`}
                </pre>
              </div>
            </div>

            {/* cat contact.json */}
            <div className="mb-8">
              <div className="text-[#58a6ff] mb-2">
                <span className="text-[#7ee787]">$</span> cat contact.json
              </div>
              <div className="pl-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      &gt; GitHub:
                    </span>
                    <a
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#58a6ff] hover:text-[#7ee787] hover:underline transition-colors"
                    >
                      github.com/yourusername
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      &gt; Email:
                    </span>
                    <a
                      href="mailto:your.email@example.com"
                      className="text-[#58a6ff] hover:text-[#7ee787] hover:underline transition-colors"
                    >
                      your.email@example.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      &gt; LinkedIn:
                    </span>
                    <a
                      href="https://linkedin.com/in/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#58a6ff] hover:text-[#7ee787] hover:underline transition-colors"
                    >
                      linkedin.com/in/yourprofile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* echo message */}
            <div className="border-t-2 border-neutral-200 dark:border-neutral-800 pt-6">
              <div className="text-[#58a6ff] mb-2">
                <span className="text-[#7ee787]">$</span> echo &quot;Thanks for
                visiting!&quot;
              </div>
              <div className="pl-4 text-neutral-600 dark:text-neutral-400">
                &gt; 방문해주셔서 감사합니다! 함께 성장하는 개발자가 되고 싶습니다.
              </div>
            </div>

            {/* 커서 */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[#7ee787]">$</span>
              <span className="inline-block w-2 h-4 bg-[#7ee787] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Projects 섹션 (선택사항) */}
        <div className="mt-12 bg-neutral-50 dark:bg-[#161b22] border-2 border-neutral-200 dark:border-neutral-800 rounded-lg p-8">
          <div className="font-mono">
            <div className="text-[#58a6ff] mb-4">
              <span className="text-[#7ee787]">$</span> ls projects/
            </div>
            <div className="pl-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                  &gt; Project 1
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  프로젝트 설명이 들어갑니다.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-[#58a6ff]/10 text-[#58a6ff] rounded">
                    TypeScript
                  </span>
                  <span className="text-xs px-2 py-1 bg-[#58a6ff]/10 text-[#58a6ff] rounded">
                    Next.js
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                  &gt; Project 2
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  프로젝트 설명이 들어갑니다.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-[#7ee787]/10 text-[#7ee787] rounded">
                    React
                  </span>
                  <span className="text-xs px-2 py-1 bg-[#7ee787]/10 text-[#7ee787] rounded">
                    Node.js
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
