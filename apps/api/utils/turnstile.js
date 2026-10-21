// Cloudflare Turnstile server-side verification, shared by every public form.
// Falls back to Cloudflare's public test secret (always passes) when
// TURNSTILE_SECRET_KEY is not set, so local dev works; production sets the real one.

const TEST_SECRET = "1x0000000000000000000000000000000AA";

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY || TEST_SECRET;
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — using test secret");
  }
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = await r.json();
    return Boolean(data?.success);
  } catch (err) {
    console.error("[turnstile] verify failed:", err.message);
    return false;
  }
}

// Express middleware for public POST routes: requires and verifies
// `turnstileToken` in the JSON body, then strips it so it never reaches a model.
async function requireTurnstile(req, res, next) {
  const token = req.body?.turnstileToken;
  if (!token || typeof token !== "string") {
    return res.status(400).json({ success: false, message: "Please complete the verification." });
  }
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
  if (!(await verifyTurnstile(token, ip))) {
    return res.status(400).json({ success: false, message: "Verification failed. Please try again." });
  }
  delete req.body.turnstileToken;
  next();
}

module.exports = { verifyTurnstile, requireTurnstile };
