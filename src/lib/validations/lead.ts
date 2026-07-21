import { z } from "zod";

/**
 * Validation schema for the lead-capture form — the SINGLE SOURCE OF TRUTH for
 * what a valid lead submission looks like.
 *
 * WHY ZOD, AND WHY HERE?
 * - We define the rules once and reuse the SAME schema on the client (instant
 *   feedback as the user types/submits) AND on the server (never trust the
 *   client — someone can bypass the browser and POST directly to our API).
 * - `z.infer<typeof leadSchema>` derives the TypeScript type from the schema,
 *   so the type and the validation can never fall out of sync.
 *
 * This lives in `lib/validations/` because validation is app logic, not a React
 * component and not a pure "type". Both the form and the API route import it.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "That name is too long."),

  company: z
    .string()
    .trim()
    .min(1, "Company is required.")
    .max(100, "That company name is too long."),

  // z.email() is zod v4's top-level email validator (replaces the older
  // z.string().email()). It rejects anything that isn't a well-formed address.
  email: z.email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "That phone number is too long.")
    // Allow digits, spaces, and the common phone symbols + ( ) - . Nothing else.
    .regex(/^[+\d][\d\s().-]*$/, "Enter digits and, optionally, + ( ) - only."),

  message: z
    .string()
    .trim()
    .min(10, "Please add a short message (at least 10 characters).")
    .max(1000, "Please keep your message under 1000 characters."),
});

/**
 * The TypeScript type for a valid lead submission, derived from the schema.
 * Import this anywhere you need the input shape — the form, the API, etc.
 */
export type LeadInput = z.infer<typeof leadSchema>;

/** A map of field name -> first error message for that field. */
export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>;

/**
 * Convert a zod validation error into a simple { field: message } object.
 *
 * zod can report multiple issues per field; for a form we only need to show the
 * first message per field. Shared by the client form and the API route so both
 * present errors identically.
 */
export function toFieldErrors(error: z.ZodError<LeadInput>): LeadFieldErrors {
  const fieldErrors: LeadFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof LeadInput | undefined;
    // Keep only the first message we encounter for each field.
    if (key && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}
