import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Terms & Conditions — EduExcellence",
  description: "Terms and conditions for EduExcellence study visits, conferences and website use.",
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

            <h1 className="heading-font mt-6 text-2xl lg:text-4xl font-extrabold text-[#16223A]">
              Terms & Conditions
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-[#6B7488]">
              Please read these Terms & Conditions carefully before using the
              Eduexcellence website or participating in any of our study visits,
              conferences, or educational programs.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                1. Acceptance of Terms
              </h2>

              <p className="leading-8 text-[#6B7488]">
                By accessing or using the Eduexcellence website and registering
                for any of our programs, you agree to comply with these Terms &
                Conditions and all applicable laws.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                2. Program Registration
              </h2>

              <ul className="list-disc space-y-2 pl-6 leading-8 text-[#6B7488]">
                <li>All registrations are subject to confirmation.</li>
                <li>Participants must provide accurate information.</li>
                <li>Incomplete registrations may be rejected.</li>
                <li>Program schedules may change if necessary.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                3. Payments
              </h2>

              <p className="leading-8 text-[#6B7488]">
                Registration fees must be paid within the specified deadline.
                Payment methods, due dates, and invoices will be communicated to
                participants during the registration process.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                4. Cancellation & Refund Policy
              </h2>

              <p className="leading-8 text-[#6B7488]">
                Cancellation requests must be submitted in writing. Refund
                eligibility depends on the cancellation timeline and specific
                program policies communicated at the time of registration.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                5. Participant Responsibilities
              </h2>

              <ul className="list-disc space-y-2 pl-6 leading-8 text-[#6B7488]">
                <li>Follow program guidelines at all times.</li>
                <li>Respect fellow participants and organizers.</li>
                <li>Carry valid travel and identity documents.</li>
                <li>Comply with local laws during international visits.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                6. Intellectual Property
              </h2>

              <p className="leading-8 text-[#6B7488]">
                All website content including text, graphics, logos, images, and
                educational materials belongs to Eduexcellence unless otherwise
                stated and may not be reproduced without permission.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                7. Limitation of Liability
              </h2>

              <p className="leading-8 text-[#6B7488]">
                Eduexcellence shall not be liable for delays, cancellations,
                losses, or damages arising from circumstances beyond our
                reasonable control, including travel disruptions or government
                restrictions.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E9F0] bg-white p-8">
              <h2 className="mb-3 text-xl font-bold text-[#16223A]">
                8. Changes to Terms
              </h2>

              <p className="leading-8 text-[#6B7488]">
                We reserve the right to update these Terms & Conditions at any
                time. Continued use of our services constitutes acceptance of
                the revised terms.
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E9F0] bg-[#07142D] p-8 text-white">
              <h2 className="mb-3 text-xl font-bold">Contact Us</h2>

              <p className="leading-8 text-white/80">
                If you have any questions regarding these Terms & Conditions,
                please contact the Eduexcellence team using the contact details
                available on our website.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
