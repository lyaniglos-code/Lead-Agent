"use client";

/**
 * LeadForm — the interactive lead-capture form.
 *
 * WHY "use client"?
 * By default, App Router components render on the SERVER and ship zero JS. But
 * this component needs browser interactivity: it tracks what the user types
 * (state), responds to typing/submitting (event handlers), and uses hooks
 * (useState). Those only work in the browser, so we opt into a Client Component
 * with the "use client" directive at the top of the file.
 */

import { useState } from "react";
import {
  leadSchema,
  toFieldErrors,
  type LeadInput,
  type LeadFieldErrors,
} from "@/lib/validations/lead";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// The four states our form can be in. Modeling this as one union (instead of a
// pile of booleans like isLoading/isSuccess/isError) makes impossible states
// impossible — we can never be "loading AND success" at once.
type FormStatus = "idle" | "submitting" | "success" | "error";

// The empty starting values for a controlled form.
const EMPTY_LEAD: LeadInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function LeadForm() {
  // `values` holds the current text of every field (controlled inputs).
  const [values, setValues] = useState<LeadInput>(EMPTY_LEAD);
  // `errors` holds per-field validation messages to show under each input.
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  // `status` drives the button label, disabled state, and success/error UI.
  const [status, setStatus] = useState<FormStatus>("idle");
  // A general error message (e.g. network/server failure) shown above the form.
  const [formError, setFormError] = useState<string | null>(null);

  // One handler updates whichever field changed, keyed by the input's `name`.
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it — feels responsive.
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser's default full-page reload
    setFormError(null);

    // 1. CLIENT-SIDE VALIDATION with the shared schema — instant feedback.
    const result = leadSchema.safeParse(values);
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    setErrors({});

    // 2. SUBMIT to our API route.
    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        // The server validates too; surface any field errors it returns.
        const data = await response.json().catch(() => null);
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        throw new Error(data?.error ?? "Submission failed.");
      }

      setStatus("success");
      setValues(EMPTY_LEAD); // reset the form on success
    } catch {
      setStatus("error");
      setFormError("Something went wrong. Please try again in a moment.");
    }
  }

  // SUCCESS STATE: replace the form with a confirmation message.
  if (status === "success") {
    return (
      <div className="rounded-2xl border border-black/5 bg-black/[.02] p-8 text-center dark:border-white/10 dark:bg-white/[.02]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Thanks — we got your details!</h3>
        <p className="mt-2 text-sm text-foreground/60">
          We&apos;ll review your message and follow up shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-brand hover:underline"
        >
          Submit another lead
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate // we handle validation ourselves via zod, not the browser
      className="rounded-2xl border border-black/5 bg-black/[.02] p-6 sm:p-8 dark:border-white/10 dark:bg-white/[.02]"
    >
      {/* A general error (network/server) shown above the fields. */}
      {formError && (
        <p className="mb-5 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" value={values.name} error={errors.name} onChange={handleChange} placeholder="Jane Doe" autoComplete="name" />
        <Field label="Company" name="company" value={values.company} error={errors.company} onChange={handleChange} placeholder="Acme Inc." autoComplete="organization" />
        <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={handleChange} placeholder="jane@acme.com" autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" value={values.phone} error={errors.phone} onChange={handleChange} placeholder="+1 555 123 4567" autoComplete="tel" />
      </div>

      <div className="mt-5">
        <Field label="Message" name="message" value={values.message} error={errors.message} onChange={handleChange} placeholder="Tell us what you're looking for..." multiline />
      </div>

      <div className="mt-6">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Sending..." : "Get my follow-up"}
        </Button>
      </div>
    </form>
  );
}

/**
 * Field — a small internal component for one labeled input + its error message.
 * Extracting this keeps the form above readable and guarantees every field
 * looks and behaves identically. `multiline` switches to a <textarea>.
 */
interface FieldProps {
  label: string;
  name: keyof LeadInput;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
}

function Field({ label, name, value, onChange, error, type = "text", placeholder, autoComplete, multiline }: FieldProps) {
  // Shared input styling. The red ring appears only when there's an error.
  const inputClasses = cn(
    "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/40 focus:ring-2 focus:ring-brand",
    error ? "border-red-500/60 focus:ring-red-500" : "border-black/10 dark:border-white/15",
  );

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          // aria-invalid tells screen readers this field has an error.
          aria-invalid={error ? true : undefined}
          className={cn(inputClasses, "resize-y")}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          className={inputClasses}
        />
      )}
      {error && <span className="mt-1.5 block text-xs text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}
