import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import ContactHero from "../../components/contact/contactHero";
import ContactForm from "../../components/contact/contactForm";
import ContactInfo from "../../components/contact/contactInfo";

export const metadata = {
  title: "Contact — EduExcellence",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main>
        <ContactHero />

        <section className="py-14">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_.9fr]">
              <ContactForm />

              {/* Sticky Sidebar */}
              <aside className="lg:sticky lg:top-24 self-start">
                <ContactInfo />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}