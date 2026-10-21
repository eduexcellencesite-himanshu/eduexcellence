"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MailOutlineIcon from "@mui/icons-material/EmailOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Must match INTERESTS in the API controller and the model enum.
const INTERESTS = ["Speaking Opportunities", "Expo & Exhibition", "Partnership & Sponsorship", "Recognition"];

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// Cloudflare's public test key renders a widget that always passes; swap for the
// real site key (NEXT_PUBLIC_TURNSTILE_SITE_KEY) in production.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

const contacts = [
  { title: "For Sponsorship & Partnerships", name: "Dhruv Lamba", phone: "9910876248", email: "dhruv@dextres.com", Icon: HandshakeOutlinedIcon },
  { title: "For Overall Queries", name: "Himanshu Srivastava", phone: "9990418600", email: "himanshu@eduexcellence.com", Icon: SupportAgentOutlinedIcon },
];

// IIT Delhi main campus (Hauz Khas). Keyless Google Maps embed.
const MAP_SRC = "https://www.google.com/maps?q=Indian+Institute+of+Technology+Delhi,+Hauz+Khas,+New+Delhi&z=15&output=embed";

const initialForm = { name: "", email: "", phone: "", organisation: "", interest: "", message: "" };

// Shared SweetAlert2 look so popups match the site (fonts, pill button, close icon).
const swalBase = {
  buttonsStyling: false,
  showCloseButton: true,
  customClass: {
    popup: "!w-[min(92vw,460px)] !rounded-[24px] !px-8 !pb-8 !pt-6",
    icon: "!mt-4 !border-0",
    title: "heading-font !pt-3 !text-[26px] !font-extrabold !tracking-[-0.02em] !text-[#16223A]",
    htmlContainer: "!mt-2 !text-[15px] !leading-7 !text-[#6B7488]",
    actions: "!mt-7",
    confirmButton:
      "inline-flex h-[48px] cursor-pointer items-center justify-center rounded-full bg-[#FF9D29] px-9 text-[15px] font-bold text-white transition hover:bg-[#E8861A] focus:outline-none",
    closeButton: "!text-[#9AA3B5] hover:!text-[#16223A] focus:!shadow-none",
  },
};

const rules = {
  interest: (v) => (!v ? "Please select your area of interest" : ""),
  name: (v) => (!v.trim() ? "Please enter your name" : v.trim().length < 2 ? "Name looks too short" : ""),
  email: (v) => (!v.trim() ? "Please enter your email" : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Please enter a valid email address" : ""),
  phone: (v) => (!v.trim() ? "Please enter your mobile number" : !/^[6-9]\d{9}$/.test(v.replace(/\s+/g, "")) ? "Enter a valid 10-digit Indian mobile number" : ""),
  organisation: (v) => (!v.trim() ? "Please enter your organisation" : ""),
  message: (v) => (!v.trim() ? "Tell us a little about how you'd like to partner" : v.trim().length < 20 ? "Please add a few more details (at least 20 characters)" : ""),
};

const fieldClass = (name, { form, errors, touched }) =>
  `h-12 w-full rounded-xl border bg-white px-4 text-[14px] text-[#16223A] outline-none transition-all placeholder:text-gray-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 ${
    errors[name] && touched[name]
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : touched[name] && !errors[name] && form[name]
        ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100"
        : "border-[#E7E9F0] focus:border-[#FF9D29] focus:ring-[#FF9D29]/20"
  }`;

// Top-level so React keeps the same component identity across renders
// (defining it inside the form would remount inputs and drop focus on each keystroke).
function Field({ name, label, type = "text", placeholder, autoComplete, maxLength, inputMode, state, loading, onChange, onBlur }) {
  const { form, errors, touched } = state;
  const invalid = Boolean(errors[name] && touched[name]);
  const valid = Boolean(touched[name] && !errors[name] && form[name]);
  return (
    <div>
      <label htmlFor={`pf-${name}`} className="mb-1.5 block text-[13px] font-semibold text-[#3A4660]">
        {label} <span className="text-[#E8861A]">*</span>
      </label>
      <div className="relative">
        <input
          id={`pf-${name}`}
          type={type}
          name={name}
          value={form[name]}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          inputMode={inputMode}
          disabled={loading}
          aria-invalid={invalid}
          aria-describedby={invalid ? `pf-${name}-err` : undefined}
          // Reserve room on the right when the valid tick is shown so long values don't run under it.
          className={`${fieldClass(name, state)} ${valid ? "pr-11" : ""}`}
        />
        {valid && (
          <CheckCircleOutlineIcon sx={{ fontSize: 18 }} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
        )}
      </div>
      {invalid && (
        <p id={`pf-${name}-err`} className="mt-1.5 text-[12.5px] font-medium text-red-500">{errors[name]}</p>
      )}
    </div>
  );
}

export default function ConnectPartner() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Load + render the Turnstile widget once.
  useEffect(() => {
    const render = () => {
      if (!widgetRef.current || widgetIdRef.current !== null || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        // The normal widget is a fixed 300px iframe, wider than the form on small
        // phones — it would blow the layout out. Use the compact widget there.
        size: window.innerWidth < 420 ? "compact" : "flexible",
        callback: (t) => { setToken(t); setCaptchaError(""); },
        "expired-callback": () => setToken(""),
        "error-callback": () => { setToken(""); setCaptchaError("Verification failed to load. Please refresh and try again."); },
      });
    };
    if (window.turnstile) { render(); return; }
    const id = "cf-turnstile-script";
    let s = document.getElementById(id);
    if (!s) {
      s = document.createElement("script");
      s.id = id;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    s.addEventListener("load", render, { once: true });
  }, []);

  const resetCaptcha = useCallback(() => {
    setToken("");
    if (window.turnstile && widgetIdRef.current !== null) window.turnstile.reset(widgetIdRef.current);
  }, []);

  // Opportunity cards above dispatch this so clicking "Apply to speak" etc.
  // preselects the matching interest here.
  useEffect(() => {
    const onInterest = (e) => {
      if (!INTERESTS.includes(e.detail)) return;
      setForm((p) => ({ ...p, interest: e.detail }));
      setTouched((p) => ({ ...p, interest: true }));
      setErrors((p) => ({ ...p, interest: "" }));
    };
    window.addEventListener("partner-interest", onInterest);
    return () => window.removeEventListener("partner-interest", onInterest);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) setErrors((p) => ({ ...p, [name]: rules[name](value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: rules[name](value) }));
  };

  const validateAll = () => {
    const next = {};
    Object.keys(rules).forEach((k) => { const m = rules[k](form[k]); if (m) next[k] = m; });
    setErrors(next);
    setTouched(Object.fromEntries(Object.keys(rules).map((k) => [k, true])));
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const ok = validateAll();
    if (!token) setCaptchaError("Please complete the verification below.");
    if (!ok || !token) return;

    setLoading(true);
    try {
      if (!API_URL) throw new Error("API URL is not configured. Please contact the administrator.");
      const res = await fetch(`${API_URL}/partnership-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.replace(/\s+/g, ""),
          interest: form.interest,
          organisation: form.organisation.trim(),
          message: form.message.trim(),
          pageUrl: window.location.href,
          turnstileToken: token,
        }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok) throw new Error(result?.message || "Unable to submit your inquiry. Please try again.");

      setForm(initialForm);
      setErrors({});
      setTouched({});
      resetCaptcha();
      await Swal.fire({
        ...swalBase,
        icon: "success",
        iconColor: "#FF9D29",
        title: "Thank you!",
        text: "Your interest has been submitted. Our team will get back to you in the next 24–48 hours.",
        confirmButtonText: "Close",
      });
    } catch (err) {
      resetCaptcha();
      await Swal.fire({
        ...swalBase,
        icon: "error",
        iconColor: "#E5484D",
        title: "Submission failed",
        text: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        confirmButtonText: "Try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const state = { form, errors, touched };
  const fieldProps = { state, loading, onChange: handleChange, onBlur: handleBlur };

  return (
    <section id="partner-form" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="overflow-hidden rounded-[32px] bg-[#17233B] px-6 py-10 md:px-14 md:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <span className="inline-flex rounded-full bg-[#FF9D29]/15 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#FF9D29]">
                Let&apos;s Connect
              </span>
              <h2 className="heading-font mt-5 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-white sm:text-[40px] md:text-[46px]">
                Explore Partnership <span className="text-[#FF9D29]">Opportunities</span>
              </h2>
              <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#C7CEDB] md:text-[16px]">
                Connect with our team to explore partnership, exhibition and collaboration opportunities at IIT Delhi Educarnival 2026.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contacts.map(({ title, name, phone, email, Icon }) => (
                  <div key={phone} className="group min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-[#FF9D29]/50 hover:bg-white/[0.07]">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#FF9D29]/10 text-[#FF9D29]">
                        <Icon sx={{ fontSize: 23 }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-bold leading-6 text-white sm:text-[15px]">{title}</h3>
                        <p className="mt-1.5 text-[14px] text-[#C7CEDB]">{name}</p>
                        <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
                          <a href={`tel:+91${phone}`} className="inline-flex items-center gap-2 text-[15px] font-bold text-[#FF9D29] transition-colors hover:text-[#FFB45C]">
                            <PhoneInTalkOutlinedIcon sx={{ fontSize: 17 }} />
                            {phone}
                          </a>
                          <a href={`mailto:${email}`} className="inline-flex min-w-0 items-center gap-2 break-all text-[14px] font-semibold text-[#C7CEDB] transition-colors hover:text-white">
                            <MailOutlineIcon sx={{ fontSize: 17, color: "#FF9D29" }} className="shrink-0" />
                            <span>{email}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Venue map: shorter on phones, fills the space under the contacts on desktop. */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={MAP_SRC}
                  title="IIT Delhi on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-[200px] w-full border-0 lg:h-[260px]"
                />
              </div>
            </div>

            <form noValidate onSubmit={handleSubmit} className="rounded-3xl bg-white p-5 sm:p-7 md:p-8">
              <h3 className="heading-font text-[22px] font-extrabold text-[#16223A] md:text-[26px]">Express Your Interest</h3>
              <p className="mb-6 mt-1 text-[13.5px] text-[#6B7488]">Fields marked <span className="text-[#E8861A]">*</span> are required.</p>

              <div className="grid gap-4">
                <Field name="name" label="Your name" placeholder="Full name" autoComplete="name" maxLength={100} {...fieldProps} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="email" label="Email address" type="email" placeholder="you@company.com" autoComplete="email" maxLength={254} {...fieldProps} />
                  <Field name="phone" label="Mobile number" type="tel" placeholder="10-digit mobile" autoComplete="tel" maxLength={14} inputMode="numeric" {...fieldProps} />
                </div>
                <Field name="organisation" label="Organisation" placeholder="Company / institution" autoComplete="organization" maxLength={150} {...fieldProps} />

                <div>
                  <label htmlFor="pf-interest" className="mb-1.5 block text-[13px] font-semibold text-[#3A4660]">
                    Area of interest <span className="text-[#E8861A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="pf-interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      aria-invalid={Boolean(errors.interest && touched.interest)}
                      className={`${fieldClass("interest", state)} cursor-pointer appearance-none pr-10 ${form.interest ? "" : "text-gray-400"}`}
                    >
                      <option value="">Select your interest</option>
                      {INTERESTS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <KeyboardArrowDownIcon sx={{ fontSize: 20 }} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7488]" />
                  </div>
                  {errors.interest && touched.interest && (
                    <p className="mt-1.5 text-[12.5px] font-medium text-red-500">{errors.interest}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pf-message" className="mb-1.5 block text-[13px] font-semibold text-[#3A4660]">
                    How would you like to partner? <span className="text-[#E8861A]">*</span>
                  </label>
                  <textarea
                    id="pf-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    maxLength={3000}
                    placeholder="Exhibition stall, speaking slot, co-branding, product showcase…"
                    disabled={loading}
                    aria-invalid={Boolean(errors.message && touched.message)}
                    className={`${fieldClass("message", state)} block h-auto resize-none py-3`}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    {errors.message && touched.message ? (
                      <p className="text-[12.5px] font-medium text-red-500">{errors.message}</p>
                    ) : <span />}
                    <span className="shrink-0 text-[12px] text-[#9AA3B5]">{form.message.length}/3000</span>
                  </div>
                </div>

                {/* Cloudflare Turnstile */}
                <div>
                  {/* Compact widget on phones is narrower than the form, so centre it there. */}
                  <div ref={widgetRef} className="flex min-h-[65px] justify-center sm:justify-start" />
                  {captchaError && <p className="mt-1.5 text-[12.5px] font-medium text-red-500">{captchaError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FF9D29] text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(255,157,41,.35)] transition hover:bg-[#E8861A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting…" : "Submit"}
                  {!loading && <ArrowForwardIcon sx={{ fontSize: 20 }} />}
                </button>
                <p className="text-center text-[12px] text-[#9AA3B5]">Protected by Cloudflare Turnstile. We&apos;ll never share your details.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
