import { NextResponse } from "next/server";
import { leadSchema, toFieldErrors } from "@/lib/validations/lead";

/**
 * POST /api/leads  — receives a new lead submission.
 *
 * In the App Router, a file named `route.ts` inside `app/api/.../` becomes an
 * API endpoint. Exporting an async function named after an HTTP verb (`POST`)
 * handles that method. This runs ONLY on the server — safe for secret keys.
 *
 * MILESTONE 3 (now): validate the input and return success. This is a STUB.
 * MILESTONE 4+ will expand the marked section below to: save the lead to
 * Supabase, run the OpenAI analysis, and send the follow-up email via Resend —
 * without changing this validation/response contract.
 *
 * KEY LESSON — never trust the client. Even though the browser form validates
 * before sending, anyone can POST raw JSON straight to this URL. So we validate
 * again here with the exact same schema.
 */
export async function POST(request: Request) {
  // 1. Parse the JSON body defensively — a malformed body should not crash us.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 } // 400 = Bad Request
    );
  }

  // 2. Validate against our shared schema.
  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        fieldErrors: toFieldErrors(result.error),
      },
      { status: 400 }
    );
  }

  // `result.data` is now fully typed and trusted (LeadInput).
  const lead = result.data;

  // ---------------------------------------------------------------------------
  // TODO (Milestone 4+): replace this stub with the real pipeline:
  //   1. Save `lead` to Supabase
  //   2. Run OpenAI analysis -> save analysis
  //   3. Generate + send follow-up email via Resend
  // For now we just log it on the server so we can see submissions come through.
  // ---------------------------------------------------------------------------
  console.log("New lead received:", lead);

  // 201 = Created. Signals the resource was accepted/created successfully.
  return NextResponse.json({ success: true }, { status: 201 });
}
