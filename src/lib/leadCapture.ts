/**
 * Where application submissions go.
 *
 * The form previously threw every submission away while showing a success
 * screen, which is the worst possible failure: the operator believes they have
 * applied, and nobody ever finds out they did.
 *
 * Two safeguards now:
 *   1. If no endpoint is configured, the form does not pretend to succeed. It
 *      shows the contact address so the lead has a route that works.
 *   2. If an endpoint is configured but the POST fails, it says so and falls
 *      back to the same address rather than silently swallowing the lead.
 *
 * Set PUBLIC_FORM_ENDPOINT to a form-to-email service (Formspree, Web3Forms,
 * Cloudflare Worker — anything that accepts a POST). PUBLIC_CONTACT_EMAIL is
 * the fallback and should always be set.
 */
export const FORM_ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT ?? "";
export const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL ?? "";
