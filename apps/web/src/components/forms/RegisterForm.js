"use client";

import { useState, useEffect } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { PROGRAMS, getProgram, isPast } from "../../lib/programs";
import Swal from "sweetalert2";
import { useTurnstile, TurnstileField } from "../ui/useTurnstile";
import StateCityFields from "../ui/StateCityFields";
const FEES = { "educarnival-iitmadras-2026": "₹15,000" };

const input =
  "w-full rounded-xl border border-[#E7E9F0] px-3.5 py-3 text-[15px] text-[#16223A] outline-none transition focus:border-[#FF9D29] focus:ring-2 focus:ring-[#FF9D29]/20";
const label = "mb-1.5 block text-[14px] font-semibold text-[#3A4660]";
const group =
  "mb-3.5 mt-7 border-b border-[#E7E9F0] pb-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#E8861A] first:mt-0";
const req = <span className="text-[#E8861A]">*</span>;

export default function RegisterForm({ initialProgram }) {
  const captcha = useTurnstile();
  const fallback = PROGRAMS.find((p) => !isPast(p))?.slug || PROGRAMS[0].slug;

  const [slug, setSlug] = useState(
    getProgram(initialProgram) ? initialProgram : fallback,
  );

  const [formData, setFormData] = useState({
    program: fallback,
    track: "",
    salutation: "Dr.",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    school: "",
    designation: "",
    state: "",
    city: "",
    interestedCountries: [],
    internationalPrograms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Sync the selected program when the ?program= URL changes via client-side
  // navigation (e.g. clicking a different visit in the Reserve-a-seat menu),
  // since useState only reads initialProgram on first mount.
  useEffect(() => {
    if (getProgram(initialProgram)) {
      setSlug(initialProgram);
      setFormData((prev) => ({ ...prev, program: initialProgram }));
    }
  }, [initialProgram]);

  const p = getProgram(slug);
  const isConf = p.type === "conference";

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (name === "interestedCountries") {
    setFormData((prev) => ({
      ...prev,
      interestedCountries: checked
        ? [...prev.interestedCountries, value]
        : prev.interestedCountries.filter((item) => item !== value),
    }));

    setErrors((prev) => ({
      ...prev,
      interestedCountries: "",
    }));

    return;
  }

  const fieldValue = type === "checkbox" ? checked : value;

  setFormData((prev) => ({
    ...prev,
    [name]: fieldValue,
  }));

  setErrors((prev) => {
    const newErrors = { ...prev };

    if (name === "email") {
      if (!fieldValue.trim()) {
        newErrors.email = "Please enter email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
        newErrors.email = "Please enter valid email";
      } else {
        newErrors.email = "";
      }
    } else {
      newErrors[name] = "";
    }

    return newErrors;
  });
};

  const validate = () => {
    const newErrors = {};

    // Program
    if (!slug) {
      newErrors.program = "Please select a program";
    }

    // Conference Track
    if (isConf && !formData.track) {
      newErrors.track = "Please select a track";
    }

    // Personal Details
    if (!formData.firstName.trim())
      newErrors.firstName = "Please enter first name";

    if (!formData.lastName.trim())
      newErrors.lastName = "Please enter last name";

    if (!formData.mobile.trim())
      newErrors.mobile = "Please enter mobile number";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";

    if (!formData.email.trim()) newErrors.email = "Please enter email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter valid email";

    if (!formData.school.trim()) newErrors.school = "Please enter school name";

    if (!formData.designation.trim())
      newErrors.designation = "Please enter designation";

    if (!formData.state) newErrors.state = "Please select state";

    if (!formData.city.trim()) newErrors.city = "Please enter city";

    // Study Visit only
    if (!isConf) {
      if (formData.interestedCountries.length === 0) {
        newErrors.interestedCountries = "Please select at least one country";
      }

      if (!formData.internationalPrograms) {
        newErrors.internationalPrograms = "Please select this option";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = validate();
    const verified = captcha.require();
    if (!valid || !verified) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            program: slug,
            turnstileToken: captcha.token,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Thank you! Your registration has been submitted successfully.",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF9D29",
      });

      setFormData({
        program: slug,
        track: "",
        salutation: "Dr.",
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        school: "",
        designation: "",
        state: "",
        city: "",
        interestedCountries: [],
        internationalPrograms: false,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      captcha.reset();
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-10 px-6 lg:grid-cols-[1.5fr_.9fr]">
      {/* Form */}
      <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
        <h2 className="heading-font text-[24px] font-extrabold text-[#16223A]">
          Your details
        </h2>
        <p className="mb-6 mt-1 text-[15px] text-[#6B7488]">
          Fields marked {req} are required.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className={group}>Program</div>
          <div>
            <label className={label}>Which program? {req}</label>
            <div className="relative">
              <select
                className={`${input} custom-select pr-12`}
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    program: "",
                  }));
                }}
              >
                {[...PROGRAMS]
                  .sort((a, b) => isPast(a) - isPast(b))
                  .map((pr) => (
                    <option key={pr.slug} value={pr.slug} disabled={isPast(pr)}>
                      {pr.title}
                      {pr.dateLabel ? ` · ${pr.dateLabel}` : ""}
                      {isPast(pr) ? " (Registration Closed)" : ""}
                    </option>
                  ))}
              </select>

              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 22,
                  color: "#3A4660",
                }}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          {isConf && (
            <div>
              <label className={label}>Which track? {req}</label>
              <select
                name="track"
                value={formData.track}
                onChange={handleChange}
                className={input}
              >
                <option value="">Select Track</option>
                <option value="School Founders & Management">
                  School Founders & Management
                </option>
                <option value="School Academic Leaders">
                  School Academic Leaders
                </option>
              </select>
            </div>
          )}

          <div className={group}>About you</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[130px_1fr]">
            {/* Salutation */}
            <div>
              <label className={label}>Salutation {req}</label>

              <div className="relative">
                <select
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleChange}
                  className={`${input} custom-select pr-12`}
                >
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                  <option>Mx.</option>
                </select>

                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 22,
                    color: "#3A4660",
                  }}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>First name {req}</label>

                <input
                  type="text"
                 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  maxLength={30}
                  placeholder="First name"
                  autoComplete="given-name"
                  className={input}
                />

                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className={label}>Last name {req}</label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="Last name"
                  autoComplete="family-name"
                  className={input}
                />

                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Mobile (WhatsApp) {req}</label>
              <input
                name="mobile"
                type="tel"
                inputMode="numeric"
                value={formData.mobile}
                maxLength={10}
                onChange={handleChange}
                placeholder="10-digit mobile"
                autoComplete="tel"
                className={input}
              />

              {errors.mobile && (
                <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
              )}
            </div>
            <div>
              <label className={label}>Email address {req}</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                maxLength={254}
                onChange={handleChange}
                placeholder="you@school.edu"
                autoComplete="email"
                className={input}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className={group}>Your school</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>School / institute {req}</label>{" "}
              <input
                name="school"
                value={formData.school}
                onChange={handleChange}
                maxLength={50}
                placeholder="School / institution name"
                autoComplete="organization"
                className={input}
              />
              {errors.school && (
                <p className="mt-1 text-xs text-red-500">{errors.school}</p>
              )}
            </div>
            <div>
              <label className={label}>Designation {req}</label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                maxLength={30}
                placeholder="e.g. Principal, Director, Trustee"
                autoComplete="organization-title"
                className={input}
              />

              {errors.designation && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.designation}
                </p>
              )}
            </div>
          </div>
          <StateCityFields
            state={formData.state}
            city={formData.city}
            errors={errors}
            setField={(name, value) => handleChange({ target: { name, value } })}
            inputClass={input}
            labelClass={label}
            required={req}
          />

          {!isConf && (
            <>
              <div className={group}>Your interests</div>
              <div>
                <label className={label}>
                  Interested in studying education systems beyond this
                  destination? {req}
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {["USA", "Finland", "Singapore", "Australia & Germany"].map(
                    (c) => (
                      <label
                        key={c}
                        className="flex cursor-pointer items-center rounded-xl border border-[#E7E9F0] px-4 py-3.5 transition hover:border-[#FF9D29] hover:bg-[#FFF3E2]"
                      >
                        <input
                          type="checkbox"
                          name="interestedCountries"
                          value={c}
                          checked={formData.interestedCountries.includes(c)}
                          onChange={handleChange}
                          className="mr-3 h-[18px] w-[18px] accent-[#FF9D29]"
                        />
                        <span className="text-[15px] font-medium text-[#3A4660]">
                          {c}
                        </span>
                      </label>
                    ),
                  )}

                  {errors.interestedCountries && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.interestedCountries}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className={label}>
                  Interested in designing international programs for your
                  students?
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center rounded-xl border border-[#E7E9F0] px-4 py-3.5 transition hover:border-[#FF9D29] hover:bg-[#FFF3E2]">
                    <input
                      type="checkbox"
                      name="internationalPrograms"
                      checked={formData.internationalPrograms}
                      onChange={handleChange}
                      className="mr-3 h-[18px] w-[18px] accent-[#FF9D29]"
                    />
                    <span className="text-[15px] font-medium text-[#3A4660]">
                      Yes, tell me more
                    </span>
                  </label>
                </div>
                {errors.internationalPrograms && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.internationalPrograms}
                  </p>
                )}
              </div>
            </>
          )}

          <TurnstileField captcha={captcha} className="mt-5" />

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex h-[60px] w-full items-center cursor-pointer justify-center gap-2 rounded-full bg-[#FF9D29] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(255,157,41,.35)] transition hover:bg-[#E8861A]"
          >
            {loading ? "Submitting..." : "Submit Registration"}
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </button>
          <div className="flex items-center justify-center gap-2 pt-2 text-[13px] text-[#6B7488]">
            <LockOutlinedIcon sx={{ fontSize: 16 }} /> Your details go straight
            to our team — we never share them.
          </div>
        </form>
      </div>

      {/* Summary */}
      <aside className="sticky top-24 overflow-hidden rounded-2xl bg-[#07142D] text-[#CDD3DA]">
        {/* <div className="flex h-[150px] items-center justify-center bg-gradient-to-br from-[#1f2c4d] to-[#10182b] text-[#6B7488]">
          <span className="flex flex-col items-center text-[13px]"><ImageOutlinedIcon sx={{ fontSize: 40, opacity: 0.6 }} />Program image</span>
        </div> */}
        <div className="p-7">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#FF9D29]">
            {isConf ? "Conference" : "Study visit"}
          </span>
          <h3 className="heading-font mb-4 mt-1.5 text-[21px] font-bold text-white">
            {p.title}
          </h3>
          <div className="mb-2.5 flex gap-2.5 text-[14px]">
            <CalendarMonthOutlinedIcon
              sx={{ fontSize: 18, color: "#FF9D29" }}
            />
            <span>{p.dateLabel}</span>
          </div>
          <div className="mb-2.5 flex gap-2.5 text-[14px]">
            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#FF9D29" }} />
            <span>{p.location}</span>
          </div>
          <div className="flex gap-2.5 text-[14px]">
            <GroupsOutlinedIcon sx={{ fontSize: 18, color: "#FF9D29" }} />
            <span>For K–12 school leaders &amp; educators</span>
          </div>
          {isConf && FEES[slug] && (
            <div className="mt-4 border-t border-white/10 pt-4 text-[13px]">
              <span>From</span>
              <br />
              <b className="heading-font text-[26px] font-extrabold text-white">
                {FEES[slug]}
              </b>{" "}
              <span>incl. GST (early bird)</span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
