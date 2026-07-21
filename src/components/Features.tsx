import type { ReactNode } from "react";

/**
 * Features section — three value-proposition cards.
 *
 * The `features` array is data; the JSX below maps over it. This separation
 * (data vs. presentation) means adding a fourth feature is a one-object edit,
 * and the layout stays consistent automatically. This is a pattern you'll reuse
 * constantly in React.
 */

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

// Simple inline SVG icons — no icon library dependency needed. `currentColor`
// makes them inherit the surrounding text color, so they theme automatically.
const features: Feature[] = [
  {
    title: "Capture every lead",
    description:
      "A clean, fast form saves each lead straight to your database — no lead ever falls through the cracks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
        <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
        <path d="M4 9h16M8 5v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Score with AI",
    description:
      "OpenAI analyzes each lead and returns a 1–100 score, buying intent, and a short summary — so you know who to call first.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
        <path d="m12 3 2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Follow up automatically",
    description:
      "A personalized follow-up email is generated and sent within seconds of submission — while the lead is still warm.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
        <path d="M4 6h16v12H4z" strokeLinejoin="round" />
        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to close faster
        </h2>
        <p className="mt-4 text-foreground/60">
          From first contact to follow-up, LeadPilot handles the busywork so you
          can focus on selling.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-black/5 bg-black/[.02] p-6 dark:border-white/10 dark:bg-white/[.02]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              {feature.icon}
            </div>
            <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
