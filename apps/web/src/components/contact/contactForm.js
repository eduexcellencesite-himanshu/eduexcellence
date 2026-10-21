"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTurnstile, TurnstileField } from "../ui/useTurnstile";
import StateCityFields from "../ui/StateCityFields";
const req = <span className="text-[#E8861A]">*</span>;
const labelCls = "mb-1.5 block text-[15px] font-semibold text-[#3A4660]";

const inputCls =
  "w-full rounded-xl border border-[#E7E9F0] px-3.5 py-3 text-[15px] text-[#16223A] outline-none transition focus:border-[#FF9D29] focus:ring-2 focus:ring-[#FF9D29]/20";


export default function ContactForm() {
  const captcha = useTurnstile();
  const group =
  "mt-6 border-b border-[#E7E9F0] pb-3 text-[14px] font-bold uppercase tracking-[0.12em] text-[#E8861A]";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const [formData, setFormData] = useState({
  salutation: "Mr.",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  institution: "",
  designation: "",
  state: "",
  city: "",
  message: "",
});

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => {
    const newErrors = { ...prev };

    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Please enter email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        newErrors.email = "Please enter a valid email address";
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

   if (!formData.firstName.trim()) {
  newErrors.firstName = "Please enter first name";
}

if (!formData.lastName.trim()) {
  newErrors.lastName = "Please enter last name";
}

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter mobile number";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

   if (!formData.email.trim()) {
  newErrors.email = "Please enter email";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
  newErrors.email = "Please enter a valid email address";
}

    if (!formData.institution.trim()) {
      newErrors.institution = "Please enter institution";
    }
    if (!formData.designation.trim()) {
      newErrors.designation = "Please enter designation";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please select state";
    }
    if (!formData.city.trim()) {
      newErrors.city = "Please enter city";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter message";
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
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, turnstileToken: captcha.token }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you! Your message has been submitted successfully. Our team will contact you shortly.",
        confirmButtonColor: "#FF9D29",
        confirmButtonText: "OK",
      });

      setFormData({
  salutation: "Mr.",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  institution: "",
  designation: "",
  state: "",
  city: "",
  message: "",
});
    } catch (error) {
      alert(error.message);
    } finally {
      captcha.reset();
      setLoading(false);
    }
  };

  return (
    <div
      id="contact-form"
      className="rounded-[24px] border border-[#E7E9F0] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,.05)]"
    >
      <h2 className="heading-font text-[24px] font-extrabold text-[#16223A]">
        Send us a message
      </h2>

      <p className="mb-6 mt-1 text-[15px] text-[#6B7488]">
        Fields marked {req} are required.
      </p>
    <form className="space-y-4" onSubmit={handleSubmit}>
  {/* ABOUT YOU */}
  <div className={group}>About You</div>

<div className="grid grid-cols-1 gap-4 md:grid-cols-[130px_1fr_1fr]">
  {/* Salutation */}
  <div>
    <label className={labelCls}>
      Salutation {req}
    </label>

    <div className="relative">
      <select
        name="salutation"
        value={formData.salutation}
        onChange={handleChange}
        className={`${inputCls} appearance-none pr-12`}
      >
        <option>Mr.</option>
        <option>Ms.</option>
        <option>Dr.</option>
        <option>Mx.</option>
      </select>

      <KeyboardArrowDownIcon
        sx={{ fontSize: 22, color: "#3A4660" }}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
      />
    </div>
  </div>

  {/* First Name */}
  <div>
    <label className={labelCls}>
      First name {req}
    </label>

    <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      maxLength={20}
      placeholder="First name"
      autoComplete="given-name"
      className={inputCls}
    />

    {errors.firstName && (
      <p className="mt-1 text-xs text-red-500">
        {errors.firstName}
      </p>
    )}
  </div>

  {/* Last Name */}
  <div>
    <label className={labelCls}>
      Last name {req}
    </label>

    <input
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      maxLength={20}
      placeholder="Last name"
      autoComplete="family-name"
      className={inputCls}
    />

    {errors.lastName && (
      <p className="mt-1 text-xs text-red-500">
        {errors.lastName}
      </p>
    )}
  </div>
</div>

  {/* CONTACT DETAILS */}
  <div className={group}>Contact Details</div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <label className={labelCls}>
        Mobile (WhatsApp) {req}
      </label>

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        maxLength={10}
        className={inputCls}
        placeholder="10-digit mobile (WhatsApp preferred)"
      />

      {errors.phone && (
        <p className="mt-1 text-xs text-red-500">
          {errors.phone}
        </p>
      )}
    </div>

    <div>
      <label className={labelCls}>
        Email address {req}
      </label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        maxLength={40}
        className={inputCls}
        placeholder="you@school.edu"
      />

      {errors.email && (
        <p className="mt-1 text-xs text-red-500">
          {errors.email}
        </p>
      )}
    </div>
  </div>

  {/* YOUR ORGANIZATION */}
  <div className={group}>Your Organization</div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <label className={labelCls}>
        Institution / School {req}
      </label>

      <input
        type="text"
        name="institution"
        value={formData.institution}
        onChange={handleChange}
        maxLength={30}
        className={inputCls}
        placeholder="School / institution name"
      />

      {errors.institution && (
        <p className="mt-1 text-xs text-red-500">
          {errors.institution}
        </p>
      )}
    </div>

    <div>
      <label className={labelCls}>
        Designation {req}
      </label>

      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        maxLength={20}
        className={inputCls}
        placeholder="e.g. Principal, Director, Trustee"
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
    inputClass={inputCls}
    labelClass={labelCls}
    required={req}
  />

  {/* MESSAGE */}
  <div className={group}>Message</div>

  <div>
    <label className={labelCls}>
      How can we help? {req}
    </label>

    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      maxLength={250}
      className={`${inputCls} min-h-[140px] resize-none`}
      placeholder="Tell us about your enquiry — a study visit, Educarnival, or anything else"
    />

    {errors.message && (
      <p className="mt-1 text-xs text-red-500">
        {errors.message}
      </p>
    )}
  </div>

  <TurnstileField captcha={captcha} className="mt-5" />

  <button
    type="submit"
    className="mt-5 flex h-[60px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FF9D29] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(255,157,41,.35)] transition hover:bg-[#E8861A]"
  >
    {loading ? "Sending..." : "Send Message"}
    <ArrowForwardIcon sx={{ fontSize: 18 }} />
  </button>
</form>
    </div>
  );
}
