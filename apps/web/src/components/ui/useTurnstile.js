"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Cloudflare's public test key renders a widget that always passes; the real
// site key comes from NEXT_PUBLIC_TURNSTILE_SITE_KEY in production.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
const SCRIPT_ID = "cf-turnstile-script";

// Shared Turnstile handling for every public form.
//   const captcha = useTurnstile();
//   ...send captcha.token with the request; call captcha.reset() after submit...
//   <TurnstileField captcha={captcha} />
export function useTurnstile() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    const render = () => {
      if (!widgetRef.current || widgetIdRef.current !== null || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        // The normal widget is a fixed 300px iframe, wider than a form column on
        // small phones; the compact widget fits there.
        size: window.innerWidth < 420 ? "compact" : "flexible",
        callback: (t) => { setToken(t); setError(""); },
        "expired-callback": () => setToken(""),
        "error-callback": () => { setToken(""); setError("Verification failed to load. Please refresh and try again."); },
      });
    };
    if (window.turnstile) { render(); return; }
    let s = document.getElementById(SCRIPT_ID);
    if (!s) {
      s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    s.addEventListener("load", render, { once: true });
  }, []);

  const reset = useCallback(() => {
    setToken("");
    if (window.turnstile && widgetIdRef.current !== null) window.turnstile.reset(widgetIdRef.current);
  }, []);

  // Call on submit: returns true when a token is present, otherwise shows the prompt.
  const require = useCallback(() => {
    if (token) return true;
    setError("Please complete the verification below.");
    return false;
  }, [token]);

  return { token, error, setError, reset, require, widgetRef };
}

export function TurnstileField({ captcha, className = "" }) {
  return (
    <div className={className}>
      {/* Compact widget on phones is narrower than the form, so centre it there. */}
      <div ref={captcha.widgetRef} className="flex min-h-[65px] justify-center sm:justify-start" />
      {captcha.error && <p className="mt-1.5 text-[12.5px] font-medium text-red-500">{captcha.error}</p>}
    </div>
  );
}
