// On-brand HTML email templates for EduExcellence transactional mail.
// Table-based + inline styles for broad email-client compatibility.

const BRAND = {
  orange: "#FF9D29",
  orangeDark: "#E8861A",
  orangeSoft: "#FFF3E2",
  dark: "#16223A",
  muted: "#6B7488",
  border: "#E7E9F0",
  pageBg: "#F4F5F8",
};

const SITE_URL = process.env.SITE_URL || "https://eduexcellence.in";
// White logo for the orange header. Must be a publicly reachable absolute URL
// (email clients can't load SVGs or relative paths). Update when the site moves to its own domain.
const LOGO_URL =
  process.env.EMAIL_LOGO_URL ||
  "https://eduexcellance-web-hapg.vercel.app/assets/logo-white.png";

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Pretty labels for known program slugs (the registration form sends a slug).
const PROGRAM_LABELS = {
  "usa-study-visit-2026": "USA Study Visit 2026",
  "uk-study-visit-2026": "UK Study Visit 2026",
  "japan-study-visit-2026": "Japan Study Visit 2026",
  singapore: "Singapore & Malaysia Study Visit",
  finland: "Finland Study Visit",
  "australia-germany": "Australia & Germany Study Visit",
  "educarnival-iitmadras-2026": "Educarnival · IIT Madras 2026",
  "educarnival-iitdelhi-2024": "Educarnival · IIT Delhi 2024",
};
const programLabel = (slug) => PROGRAM_LABELS[slug] || slug || "—";

// Full-name helper across the three form shapes.
const fullName = (d) =>
  (d.fullName || [d.firstName, d.lastName].filter(Boolean).join(" ") || "").trim();

function detailTable(rows) {
  const cells = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px;width:42%;vertical-align:top;">${esc(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.dark};font-size:14px;font-weight:600;vertical-align:top;">${esc(value)}</td>
        </tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:8px;">${cells}</table>`;
}

function layout({ heading, preheader, intro, inner = "", cta }) {
  const ctaBlock = cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;"><tr><td style="border-radius:999px;background:${BRAND.orange};">
         <a href="${esc(cta.url)}" style="display:inline-block;padding:13px 30px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${esc(cta.text)}</a>
       </td></tr></table>`
    : "";

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${esc(heading)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.pageBg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader || heading)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${BRAND.pageBg};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid ${BRAND.border};">
        <tr><td style="background:${BRAND.orange};background-image:linear-gradient(135deg,#FFB152,${BRAND.orangeDark});padding:24px 32px;">
          <img src="${LOGO_URL}" alt="EduExcellence" height="30" style="display:block;height:30px;width:auto;border:0;outline:none;text-decoration:none;" />
        </td></tr>
        <tr><td style="padding:36px 32px 8px;">
          <h1 style="margin:0 0 12px;font-size:23px;line-height:1.25;font-weight:800;color:${BRAND.dark};">${esc(heading)}</h1>
          ${intro ? `<p style="margin:0;font-size:15px;line-height:1.7;color:${BRAND.muted};">${intro}</p>` : ""}
        </td></tr>
        <tr><td style="padding:8px 32px 36px;">
          ${inner}
          ${ctaBlock}
        </td></tr>
        <tr><td style="background:#07152E;padding:24px 32px;">
          <p style="margin:0 0 6px;font-size:13px;color:#C7CDDA;">EduExcellence — transforming K–12 education through global learning experiences.</p>
          <p style="margin:0;font-size:12px;color:#8b93a6;"><a href="${esc(SITE_URL)}" style="color:${BRAND.orange};text-decoration:none;">eduexcellence.in</a> · This is an automated message, please do not reply.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/* ---------- Contact ---------- */
function contactUser(d) {
  return {
    subject: "Thanks for reaching out to EduExcellence",
    html: layout({
      heading: `Thank you${fullName(d) ? `, ${esc(fullName(d).split(" ")[0])}` : ""}!`,
      preheader: "We've received your enquiry and will be in touch shortly.",
      intro: "Thanks for reaching out to EduExcellence. Our team has received your enquiry and will get back to you shortly. Here's a copy of what you sent:",
      inner: detailTable([
        ["Name", `${d.salutation || ""} ${fullName(d)}`.trim()],
        ["Email", d.email],
        ["Phone", d.phone],
        ["Institution", d.institution],
        ["Message", d.message],
      ]),
      cta: { text: "Explore our programs", url: SITE_URL },
    }),
  };
}
function contactAdmin(d) {
  return {
    subject: `New contact message from ${fullName(d) || d.email}`,
    html: layout({
      heading: "New contact enquiry",
      preheader: `From ${fullName(d) || d.email}`,
      intro: "A new enquiry was submitted through the website contact form.",
      inner: detailTable([
        ["Name", `${d.salutation || ""} ${fullName(d)}`.trim()],
        ["Email", d.email],
        ["Phone", d.phone],
        ["Institution", d.institution],
        ["Designation", d.designation],
        ["City", d.city],
        ["State", d.state],
        ["Message", d.message],
      ]),
    }),
  };
}

/* ---------- Registration ---------- */
function registrationUser(d) {
  return {
    subject: `Thanks for registering for ${programLabel(d.program)}`,
    html: layout({
      heading: `Thank you${d.firstName ? `, ${esc(d.firstName)}` : ""}!`,
      preheader: `Your registration for ${programLabel(d.program)} has been received.`,
      intro: `We've received your registration for <strong style="color:${BRAND.dark};">${esc(programLabel(d.program))}</strong>. Our team will reach out with the next steps. Here's a summary:`,
      inner: detailTable([
        ["Program", programLabel(d.program)],
        ["Track", d.track],
        ["Name", `${d.salutation || ""} ${fullName(d)}`.trim()],
        ["Email", d.email],
        ["Mobile", d.mobile],
        ["School / institution", d.school],
        ["Designation", d.designation],
        ["City", d.city],
        ["State", d.state],
      ]),
      cta: { text: "Visit EduExcellence", url: SITE_URL },
    }),
  };
}
function registrationAdmin(d) {
  return {
    subject: `New registration: ${fullName(d) || d.email} for ${programLabel(d.program)}`,
    html: layout({
      heading: "New program registration",
      preheader: `${fullName(d) || d.email} · ${programLabel(d.program)}`,
      intro: "A new registration was submitted through the website.",
      inner: detailTable([
        ["Program", programLabel(d.program)],
        ["Track", d.track],
        ["Name", `${d.salutation || ""} ${fullName(d)}`.trim()],
        ["Email", d.email],
        ["Mobile", d.mobile],
        ["School / institution", d.school],
        ["Designation", d.designation],
        ["City", d.city],
        ["State", d.state],
        ["Interested countries", Array.isArray(d.interestedCountries) ? d.interestedCountries.join(", ") : d.interestedCountries],
      ]),
    }),
  };
}

/* ---------- Sponsor ---------- */
function sponsorUser(d) {
  return {
    subject: "Thanks for your interest in partnering with EduExcellence",
    html: layout({
      heading: `Thank you${fullName(d) ? `, ${esc(fullName(d).split(" ")[0])}` : ""}!`,
      preheader: "We've received your sponsorship enquiry.",
      intro: "Thank you for your interest in partnering with EduExcellence. Our team will review your enquiry and get back to you shortly. Here's what you shared:",
      inner: detailTable([
        ["Name", `${d.salutation || ""} ${fullName(d)}`.trim()],
        ["Email", d.email],
        ["Mobile", d.mobile],
        ["Organisation", d.organisation],
        ["Designation", d.designation],
        ["Product details", d.productDetails],
      ]),
      cta: { text: "Visit EduExcellence", url: SITE_URL },
    }),
  };
}
function sponsorAdmin(d) {
  return {
    subject: `New sponsorship enquiry from ${d.organisation || fullName(d) || d.email}`,
    html: layout({
      heading: "New sponsorship enquiry",
      preheader: `${d.organisation || fullName(d) || d.email}`,
      intro: "A new sponsorship enquiry was submitted through the website.",
      inner: detailTable([
        ["Name", `${d.salutation || ""} ${fullName(d)}`.trim()],
        ["Email", d.email],
        ["Mobile", d.mobile],
        ["Organisation", d.organisation],
        ["Designation", d.designation],
        ["City", d.city],
        ["State", d.state],
        ["Product details", d.productDetails],
      ]),
    }),
  };
}

module.exports = {
  contactUser,
  contactAdmin,
  registrationUser,
  registrationAdmin,
  sponsorUser,
  sponsorAdmin,
};
