import { Button } from "@/components/ui/Button";

/**
 * Hero section — the first thing visitors see.
 *
 * Goals of a good SaaS hero: (1) a clear value proposition headline, (2) one
 * sentence of supporting copy, (3) an obvious primary call-to-action. Anything
 * more competes for attention.
 *
 * The soft radial gradient behind the text is purely decorative — it's marked
 * `aria-hidden` and `pointer-events-none` so it never interferes with screen
 * readers or clicks.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,70,229,0.12),transparent)]"
      />

      <div className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-center sm:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-sm font-medium text-foreground/70 dark:border-white/15">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          AI-powered lead follow-up
        </span>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
          Never let a lead go cold again.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/60">
          LeadPilot captures every lead, scores their buying intent with AI, and
          sends a personalized follow-up email automatically — in seconds, not
          days.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#lead-form" size="lg">
            Get started free
          </Button>
          <Button href="#how-it-works" variant="secondary" size="lg">
            See how it works
          </Button>
        </div>
      </div>
    </section>
  );
}
