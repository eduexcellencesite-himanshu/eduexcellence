"use client";
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {

  const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const [errors, setErrors] = useState({
  email: "",
  password: "",
});
const validate = () => {
  const newErrors = {};

  if (!email.trim()) {
    newErrors.email = "Please enter email";
  }

  if (!password.trim()) {
    newErrors.password = "Please enter password";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleLogin = async () => {
  if (!validate()) return;

  try {
    setLoading(true);

    const response = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.role);

    if (data.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/editor/dashboard");
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.replace("/admin/dashboard");
  }
}, []);
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8F9FC] px-6 py-8">
      <div className="grid w-full max-w-[1150px] overflow-hidden rounded-[36px] bg-white shadow-[0_30px_80px_rgba(16,24,43,.10)] lg:grid-cols-2">
        {/* Left Panel */}

        <div className="relative hidden p-6 lg:block">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FF9D29] via-[#FF8A00] to-[#FFB347] p-8 text-white">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
                EduExcellence Admin
              </span>

              <h2 className="heading-font mt-6 text-[42px] font-extrabold leading-[1.05]">
                Transform
                <br />
                School
                <br />
                Leadership.
              </h2>

              <p className="mt-5 max-w-[380px] text-[15px] leading-7 text-white/90">
                Manage study visits, registrations, events and Educarnival
                programs from one powerful dashboard.
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <Image
                src="/assets/login.webp"
                alt="EduExcellence"
                width={500}
                height={350}
                className="h-[280px] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Panel */}

        <div className="flex items-center justify-center px-8 py-10 md:px-12">
          <div className="w-full max-w-[430px]">
            {/* Logo */}

            <div className="mb-8 flex flex-col items-center gap-2">
              <Image
                src="/assets/logo.png"
                alt="EduExcellence"
                width={220}
                height={25}
                priority
                className="h-[30px] w-auto object-contain"
              />
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#6B7488]">Admin Portal</p>
            </div>

            {/* Heading */}

            <div className="mb-8 text-center">
              <h1 className="heading-font text-[38px] font-extrabold text-[#16223A]">
                Welcome Back
              </h1>

              <p className="mt-2 text-[15px] text-[#6B7488]">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Form */}

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#16223A]">
                  Email Address
                </label>

                <div className="flex h-[54px] items-center gap-3 rounded-2xl border border-[#E6EAF2] bg-white px-5 transition-all focus-within:border-[#FF9D29] focus-within:shadow-[0_0_0_4px_rgba(255,157,41,.12)]">
                  <EmailOutlinedIcon
                    sx={{
                      color: "#94A3B8",
                      fontSize: 18,
                    }}
                  />

                  <input
                    type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  }}
                    placeholder="Enter your email"
                    className="text-[14px] w-full bg-transparent text-[#16223A] outline-none placeholder:text-[#94A3B8]"
                  />

                 
                </div>

                 {errors.email && (
  <p className="mt-1 text-xs text-red-500">
    {errors.email}
  </p>
)}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#16223A]">
                  Password
                </label>

                <div className="flex h-[54px] items-center gap-3 rounded-2xl border border-[#E6EAF2] bg-white px-5 transition-all focus-within:border-[#FF9D29] focus-within:shadow-[0_0_0_4px_rgba(255,157,41,.12)]">
                  <LockOutlinedIcon
                    sx={{
                      color: "#94A3B8",
                      fontSize: 18,
                    }}
                  />

                  <input
                    type="password"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  }}
                    placeholder="Enter your password"
                    className="text-[14px] w-full bg-transparent text-[#16223A] outline-none placeholder:text-[#94A3B8]"
                  />
                 
                </div>
                 {errors.password && (
  <p className="mt-1 text-xs text-red-500">
    {errors.password}
  </p>
)}
              </div>

              {/* <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm text-[#6B7488]">
                  <input type="checkbox" className="accent-[#FF9D29]" />
                  Remember me
                </label>

                <Link
                  href="#"
                  className="text-sm font-medium text-[#FF9D29] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div> */}

              <button  onClick={handleLogin}
  disabled={loading} className="mt-2 flex h-[54px] w-full cursor-pointer items-center justify-center rounded-2xl bg-[#FF9D29] text-[15px] font-semibold text-white shadow-[0_12px_24px_rgba(255,157,41,.30)] transition-all hover:bg-[#F28C00]">
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-[#94A3B8]">
              © 2026 EduExcellence. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
