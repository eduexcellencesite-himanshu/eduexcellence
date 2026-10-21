import Header from "../components/common/Header";
import Hero from "./home/Hero";
import Partner from "./home/Partner";
import Legacy from "./home/Legacy";
import Reach from "./home/Reach";
import Participation from "./home/Participation";
import Programs from "./home/Programs";
import Footer from "../components/common/Footer";
import Offer from "./home/Offer";
import Event from "./home/Event";
import Voices from "./home/Voices";
import Join from "./home/Join";
import { PROGRAMS, isPast } from "../lib/programs";
import { SITE_DESCRIPTION } from "../lib/site";

export const metadata = {
  title: "EduExcellence — International Study Visits & Educarnival for K-12 School Leaders",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
 
  const hasUpcoming = PROGRAMS.some((p) => !isPast(p));

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Partner />
        <Legacy className="hidden md:block" />
        {/* <Reach />
        <Participation /> */}
        <Programs />

        <Offer />
        <Event />
        <Voices altBg={!hasUpcoming} />
        <Join />
      </main>

      <Footer />
    </>
  );
}
