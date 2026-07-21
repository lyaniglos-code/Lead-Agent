/**
 * Home page — Server Component (the default in the App Router).
 *
 * This is intentionally a minimal, clean SHELL for Milestone 1. In Milestone 2
 * we'll build this out into a full SaaS landing page (hero, features, CTA).
 * Keeping it simple now lets us verify the whole toolchain — TypeScript,
 * Tailwind, fonts, dev server — renders correctly before adding complexity.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 rounded-full border border-black/10 px-3 py-1 text-sm font-medium text-foreground/70 dark:border-white/15">
        AI Lead Follow-Up Agent
      </span>

      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Never let a lead go cold again.
      </h1>

      <p className="mt-4 max-w-md text-lg text-foreground/60">
        Capture, score, and follow up with every lead automatically — powered by
        AI.
      </p>

      <p className="mt-10 text-sm text-foreground/40">
        🚧 Under construction — Milestone 1 complete.
      </p>
    </main>
  );
}
