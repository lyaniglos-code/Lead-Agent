/**
 * Core domain types for the Lead Follow-Up Agent.
 *
 * We define these BEFORE building the database or UI so that every layer of the
 * app (form, API route, AI service, dashboard) speaks the same language. When
 * the shape of a "Lead" changes, we change it here once and TypeScript tells us
 * every place that needs updating.
 */

/**
 * The raw data a visitor submits through the lead-capture form.
 * This is the minimal, human-entered information — no AI fields yet.
 */
export interface LeadInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * The lifecycle status of a lead as it moves through our pipeline.
 * Using a string-literal union (instead of a loose `string`) means TypeScript
 * will reject typos like "contactd" and the dashboard can exhaustively handle
 * every case.
 */
export type LeadStatus = "new" | "contacted" | "qualified" | "closed";

/**
 * Whether the automated follow-up email has been sent for this lead.
 * Kept separate from LeadStatus because "did we email them?" and "where are
 * they in the sales funnel?" are two different questions.
 */
export type FollowUpStatus = "pending" | "sent" | "failed";

/**
 * The structured analysis we ask the OpenAI API to produce for each lead.
 * Defining this as a type gives us a contract: the AI service must return
 * exactly these fields, and the rest of the app can rely on them.
 */
export interface LeadAnalysis {
  /** 1–100 — higher means a hotter, more valuable lead. */
  score: number;
  /** How ready the lead appears to buy. */
  buyingIntent: "low" | "medium" | "high";
  /** A short, human-readable summary of who this lead is and what they want. */
  summary: string;
  /** The single most useful next step for the sales team. */
  recommendedAction: string;
}

/**
 * A fully persisted lead as stored in and read back from the database.
 * It combines the visitor's input, our pipeline metadata, and (once processed)
 * the AI analysis. `analysis` is optional because a lead exists the moment it's
 * saved — the AI step happens immediately after and may briefly be absent.
 */
export interface Lead extends LeadInput {
  id: string;
  status: LeadStatus;
  followUpStatus: FollowUpStatus;
  createdAt: string; // ISO 8601 timestamp
  analysis?: LeadAnalysis;
}
