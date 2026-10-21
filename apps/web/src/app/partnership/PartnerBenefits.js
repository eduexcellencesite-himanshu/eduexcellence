"use client";

import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";

const benefits = [
  { Icon: RecordVoiceOverOutlinedIcon, title: "Direct Leadership Access", desc: "Engage key decision-makers — school owners, CEOs, trustees and principals." },
  { Icon: AccountBalanceOutlinedIcon, title: "17-Year Proven Legacy", desc: "Partner with a trusted platform hosted alongside premier institutions like IIT Delhi and IIT Madras." },
  { Icon: GroupsOutlinedIcon, title: "High-Intent Audience", desc: "Connect directly with education leaders actively seeking growth solutions." },
  { Icon: HandshakeOutlinedIcon, title: "Long-Term Partnerships", desc: "Turn event connections into pilots, institutional deals and lasting business." },
  { Icon: PublicOutlinedIcon, title: "Pan-India Reach", desc: "Expand into new regional markets through nationwide IIT-hosted conferences." },
  { Icon: ShowChartOutlinedIcon, title: "Real Business Growth", desc: "Move beyond brand exposure to drive qualified leads and actual conversions." },
];

export default function PartnerBenefits() {
  return (
    <section className="bg-[#F7F8FB] py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#E8861A]">
            Partner Benefits
          </span>
          <h2 className="heading-font mt-5 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#16223A] sm:text-[40px] md:text-[46px]">
            Why Partner with <span className="text-[#E8861A]">Educarnival</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[22px] border border-[#E7E9F0] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF9D29]/50 hover:shadow-[0_22px_45px_rgba(16,24,43,.10)]"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-[#FF9D29] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-[#FFF3E2] text-[#E8861A] transition-transform duration-300 group-hover:scale-110" style={{ height: 52, width: 52 }}>
                  <Icon sx={{ fontSize: 26 }} />
                </span>
                <span className="heading-font text-[13px] font-extrabold tracking-wide text-[#D0D5E0]">0{i + 1}</span>
              </div>
              <h3 className="heading-font mt-5 text-[20px] font-extrabold leading-snug text-[#16223A]">{title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-7 text-[#6B7488]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
