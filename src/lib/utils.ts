/**
 * Small, framework-agnostic helper functions used across the app.
 * This is the first file in our `lib/` layer — the home for logic that isn't
 * a React component (utilities now; Supabase, OpenAI, and email clients later).
 */

/**
 * `cn` = "class names". Conditionally joins Tailwind class strings into one.
 *
 * It lets us write:
 *   cn("base", isActive && "bg-brand", className)
 * and any `false`, `null`, or `undefined` entries are dropped automatically.
 * This keeps component JSX readable when classes depend on props/state.
 *
 * NOTE: In larger projects the popular choice is `clsx` + `tailwind-merge`
 * (which also de-duplicates conflicting Tailwind classes). We're using this
 * dependency-free version to keep things simple while you learn the pattern.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
