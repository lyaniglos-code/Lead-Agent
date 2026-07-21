/**
 * "How it works" section — a simple numbered 3-step flow.
 *
 * Same data-driven approach as Features: the `steps` array drives the render.
 * This section maps directly onto the real pipeline we're building across
 * Milestones 3–6, so it doubles as a mental model for the app's architecture.
 */

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "A lead submits the form",
    description:
      "Name, company, email, phone, and their message are validated and saved instantly.",
  },
  {
    number: "02",
    title: "AI analyzes the lead",
    description:
      "OpenAI scores buying intent, writes a summary, and recommends the best next action.",
  },
  {
    number: "03",
    title: "A follow-up email is sent",
    description:
      "A tailored email goes out automatically via Resend — and everything lands in your dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-black/5 bg-black/[.015] dark:border-white/10 dark:bg-white/[.015]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-foreground/60">
            Three steps, fully automated, running in seconds.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="text-sm font-semibold text-brand">{step.number}</div>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
