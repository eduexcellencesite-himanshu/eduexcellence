import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Privacy Policy — EduExcellence",
  description: "How EduExcellence collects, uses and protects your personal information.",
};

export default function Page() {
  return (
    <>
      <Header />
      <section className="bg-[#F8FAFC] py-[72px]">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF9D29]">
              Legal
            </span>

            <h1 className="heading-font mt-6 text-xl lg:text-4xl font-extrabold text-[#16223A]">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-[#6B7488]">
              Your privacy matters to us. This Privacy Policy explains how
              Eduexcellence collects, uses, stores, and protects your personal
              information when you use our website and services.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                1. Information We Collect
              </h2>

              <p className="leading-8 text-[#6B7488]">
                We may collect personal information including your name, email
                address, phone number, school or institution details,
                designation, city, state, and any information you voluntarily
                submit through registration forms or enquiry forms.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                2. How We Use Your Information
              </h2>

              <ul className="list-disc space-y-2 pl-6 leading-8 text-[#6B7488]">
                <li>Process registrations for study visits and conferences.</li>
                <li>Respond to your enquiries.</li>
                <li>Provide program updates and important notifications.</li>
                <li>Improve our website and user experience.</li>
                <li>
                  Send relevant educational opportunities and announcements.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                3. Information Sharing
              </h2>

              <p className="leading-8 text-[#6B7488]">
                We do not sell, rent, or trade your personal information. Your
                information is shared only when required to provide our
                services, comply with legal obligations, or work with trusted
                service providers under confidentiality agreements.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                4. Data Security
              </h2>

              <p className="leading-8 text-[#6B7488]">
                We implement appropriate technical and organizational security
                measures to safeguard your information against unauthorized
                access, disclosure, alteration, or destruction.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                5. Cookies
              </h2>

              <p className="leading-8 text-[#6B7488]">
                Our website may use cookies and similar technologies to improve
                functionality, analyze traffic, and enhance your browsing
                experience. You may disable cookies through your browser
                settings if preferred.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                6. Third-Party Services
              </h2>

              <p className="leading-8 text-[#6B7488]">
                We may use trusted third-party services for analytics, payment
                processing, communication, or hosting. These providers process
                data only to deliver their services and follow their own privacy
                obligations.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                7. Your Rights
              </h2>

              <p className="leading-8 text-[#6B7488]">
                You may request access to, correction of, or deletion of your
                personal information by contacting us. We will respond to such
                requests in accordance with applicable laws.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                8. Policy Updates
              </h2>

              <p className="leading-8 text-[#6B7488]">
                This Privacy Policy may be updated periodically. Changes will be
                posted on this page with the latest revision date.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-[#07142D] p-8 text-white">
              <h2 className="mb-3 text-xl font-bold">Contact Us</h2>

              <p className="leading-8 text-white/80">
                If you have any questions regarding this Privacy Policy or your
                personal information, please contact the Eduexcellence team
                through the contact details available on our website.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
