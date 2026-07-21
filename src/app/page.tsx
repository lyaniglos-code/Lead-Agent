import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadFormSection } from "@/components/LeadFormSection";
import { Footer } from "@/components/Footer";

/**
 * Home page — the SaaS landing page (Milestone 2).
 *
 * Notice this file is now just COMPOSITION: it imports self-contained sections
 * and arranges them. Each section owns its own markup and copy. This is the
 * payoff of building reusable components — the page reads like an outline, and
 * you can reorder or swap sections without touching their internals.
 *
 * `<main className="flex-1">` grows to fill the space between the sticky Header
 * and the Footer, keeping the footer at the bottom even on short pages (the
 * body is `min-h-full flex flex-col`, set in layout.tsx).
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <LeadFormSection />
      </main>
      <Footer />
    </>
  );
}
