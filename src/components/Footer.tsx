/**
 * Site footer. Minimal for now — brand, a short line, and the year.
 *
 * `new Date().getFullYear()` runs on the server (this is a Server Component),
 * so the year is always current without any client-side JavaScript.
 */
export function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-foreground/50 sm:flex-row">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-xs text-white">
            L
          </span>
          LeadPilot
        </div>
        <p>© {new Date().getFullYear()} LeadPilot. Built as a portfolio project.</p>
      </div>
    </footer>
  );
}
