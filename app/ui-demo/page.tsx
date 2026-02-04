'use client'

import {
  Button,
  Input,
  Textarea,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  Avatar,
  GitHubAvatar,
  Badge,
} from '@/components/ui'
import Link from 'next/link'

export default function UIDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Header */}
        <header className="border-b-2 border-foreground pb-4">
          <h1 className="font-mono text-4xl font-bold">UI Components Demo</h1>
          <p className="mt-2 font-mono text-sm text-foreground/60">
            Terminal-styled components for tech blog
          </p>
        </header>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="font-mono text-2xl font-bold">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" isLoading>
              Loading
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" asChild>
              <Link href="/">Link as Button</Link>
            </Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="font-mono text-2xl font-bold">Inputs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Enter your email" label="Email" />
            <Input
              placeholder="Wrong input"
              label="With Error"
              error="This field is required"
            />
            <Input placeholder="Disabled" disabled />
          </div>
        </section>

        {/* Textarea */}
        <section className="space-y-4">
          <h2 className="font-mono text-2xl font-bold">Textarea</h2>
          <div className="grid gap-4">
            <Textarea
              placeholder="Write a comment..."
              label="Comment"
              showCharCount
              maxLength={500}
            />
            <Textarea
              placeholder="Auto-resize as you type"
              label="Auto-resize"
              autoResize
            />
          </div>
        </section>

        {/* Skeletons */}
        <section className="space-y-4">
          <h2 className="font-mono text-2xl font-bold">Skeletons</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="font-mono text-sm text-foreground/60">Text</p>
              <SkeletonText lines={3} />
            </div>
            <div className="space-y-2">
              <p className="font-mono text-sm text-foreground/60">Avatar</p>
              <SkeletonAvatar size={80} />
            </div>
            <div className="md:col-span-2">
              <p className="mb-2 font-mono text-sm text-foreground/60">Card</p>
              <SkeletonCard />
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section className="space-y-4">
          <h2 className="font-mono text-2xl font-bold">Avatars</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar fallback="JD" size="sm" />
            <Avatar fallback="Jane Doe" size="md" />
            <Avatar
              fallback="John"
              size="lg"
              src="https://unavailable-image.jpg"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <GitHubAvatar username="torvalds" size="sm" />
            <GitHubAvatar username="gaearon" size="md" />
            <GitHubAvatar username="vercel" size="lg" />
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="font-mono text-2xl font-bold">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge color="blue">Blue</Badge>
            <Badge color="green">Green</Badge>
            <Badge color="red">Red</Badge>
            <Badge color="yellow">Yellow</Badge>
            <Badge color="purple">Purple</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" color="blue">
              React
            </Badge>
            <Badge variant="outline" color="green">
              TypeScript
            </Badge>
            <Badge variant="outline" color="purple">
              Next.js
            </Badge>
          </div>
        </section>
      </div>
    </div>
  )
}
