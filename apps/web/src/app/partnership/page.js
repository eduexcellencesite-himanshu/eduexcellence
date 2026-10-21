"use client";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import Hero from "./Hero";
import Purpose from "./Purpose";
import Glimpses from "./Glimpses";
import Recognition from "./Recognition";
import EsteemedPartners from "./EsteemedPartners";
import PartnerBenefits from "./PartnerBenefits";
import ConnectPartner from "./ConnectPartner";

export default function PartnershipPage() {
  return (
    <>
      <Header />

      <main className="overflow-hidden bg-white">
        <Hero />

        <Purpose />

        <Glimpses />

        <Recognition />

        <EsteemedPartners />

        <PartnerBenefits />

        <ConnectPartner />
      </main>

      <Footer />
    </>
  );
}
