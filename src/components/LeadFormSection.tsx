import { LeadForm } from "@/components/LeadForm";

/**
 * LeadFormSection — the section that houses the lead-capture form.
 *
 * This is a Server Component (no "use client"): the heading/layout are static,
 * so they render on the server with zero JS. Only the interactive <LeadForm/>
 * inside it ships JavaScript to the browser. This "server shell + client island"
 * split is a core App Router performance pattern — keep the interactive surface
 * as small as possible.
 *
 * `id="lead-form"` is the anchor target for every "Get started" CTA on the page.
 */
export function LeadFormSection() {
  return (
    <section id="lead-form" className="mx-auto max-w-2xl scroll-mt-20 px-6 py-20">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Get your AI follow-up
        </h2>
        <p className="mt-4 text-foreground/60">
          Fill out the form and we&apos;ll analyze your details and reply with a
          personalized follow-up.
        </p>
      </div>

      <LeadForm />
    </section>
  );
}
