import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable Button primitive.
 *
 * WHY A COMPONENT INSTEAD OF RAW <button> TAGS?
 * Every button in the app should look and behave consistently (padding, focus
 * ring, hover, disabled state). Centralizing that here means: (1) we style it
 * once, (2) a design change happens in one place, (3) call sites stay short and
 * declarative — `<Button variant="primary">`.
 *
 * POLYMORPHIC BEHAVIOR:
 * If `href` is passed, we render a Next.js <Link> (for navigation). Otherwise
 * we render a real <button> (for actions like submitting a form). Same styles,
 * correct semantics + accessibility for each case.
 */

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  /** If provided, the button renders as a link to this URL. */
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Only used when rendering as a <button> (no href). */
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

// Styles shared by every variant/size.
const baseStyles =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

// Look-and-feel per variant. Using a lookup object (instead of if/else) keeps
// this easy to extend — add a "ghost" variant by adding one line.
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary:
    "border border-black/10 text-foreground hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]",
};

// Size controls height + horizontal padding + font size.
const sizeStyles: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  // Navigation → render a link. (Next.js <Link> also handles same-page
  // anchor links like "#lead-form".)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Action → render a real, accessible button.
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
