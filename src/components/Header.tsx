import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Site header — the sticky top navigation bar.
 *
 * `sticky top-0` keeps it pinned while scrolling; the translucent background
 * with `backdrop-blur` is the frosted-glass effect common on modern SaaS sites.
 * Nav links use in-page anchors (#features) for now; the "Get started" CTA
 * points at #lead-form, which we'll build in Milestone 3.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur-md dark:border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo / wordmark */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-sm text-white">
            L
          </span>
          <span>LeadPilot</span>
        </Link>

        {/* Primary nav — hidden on small screens to keep mobile clean */}
        <nav className="hidden items-center gap-8 text-sm text-foreground/70 sm:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
        </nav>

        <Button href="#lead-form" size="md">
          Get started
        </Button>
      </div>
    </header>
  );
}
