// Thin wrapper around Resend. Safe to call even if email isn't configured —
// it logs and no-ops so form submissions never fail because of email.

const { Resend } = require("resend");

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.MAIL_FROM || "EduExcellence <onboarding@resend.dev>";
const ADMIN = process.env.ADMIN_EMAIL;
// DEMO ONLY: when set, every email is redirected to this address (Resend test mode
// only delivers to the verified signup email). Remove after domain verification.
const OVERRIDE = process.env.MAIL_OVERRIDE_TO;

const resend = apiKey ? new Resend(apiKey) : null;

// Send one email. Returns true on success, false on failure/skip — never throws.
async function sendMail({ to, subject, html, replyTo }) {
  if (!resend) {
    console.warn("[mailer] RESEND_API_KEY not set — skipping email:", subject);
    return false;
  }
  if (!to) {
    console.warn("[mailer] no recipient — skipping email:", subject);
    return false;
  }
  // Demo redirect: route to the override inbox but keep the real subject untouched.
  const recipient = OVERRIDE || to;
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: recipient,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("[mailer] send failed:", subject, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[mailer] send threw:", subject, err.message);
    return false;
  }
}

// Fire the user + admin emails for a submission without blocking the response.
// `userTpl`/`adminTpl` are { subject, html } objects; `userEmail` is the form's email.
async function notify({ userEmail, userTpl, adminTpl }) {
  const jobs = [];
  if (userTpl && userEmail) jobs.push(sendMail({ to: userEmail, ...userTpl }));
  if (adminTpl && ADMIN) jobs.push(sendMail({ to: ADMIN, replyTo: userEmail, ...adminTpl }));
  else if (adminTpl && !ADMIN) console.warn("[mailer] ADMIN_EMAIL not set — skipping admin notification");
  await Promise.allSettled(jobs);
}

module.exports = { sendMail, notify };
