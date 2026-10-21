import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import Gallery from "../../program/Gallery";
import { getProgram, isPast } from "../../../lib/programs";
import TopicsSwiper from "../swiper";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

const CONTENT = {
  "educarnival-iitmadras-2026": {
    eyebrow: "Educarnival · 5th international symposium",
    heroTitle: "Building a Dream School Team",
    sub: "Educarnival brings school founders, management and academic leaders together to think, dream and plan — on the IIT Madras campus.",
    heroImage: "/assets/iitmadras-4.jpeg",
    heroBadges: [
      [CalendarMonthOutlinedIcon, null],
      [LocationOnOutlinedIcon, null],
      [WorkspacePremiumOutlinedIcon, "Certification included"],
    ],
    theme: {
      quote:
        "Behind every child who thrives, there is a teacher who guided them, a leader who shaped the curriculum, and a school owner who made sure the doors stayed open.",
      caption:
        "Educarnival invites whole school teams to think, dream and plan together.",
    },
    featureGif: "/assets/educarnival-journey-iitmadras.gif",
    featureVideoEyebrow: "Our journey",
    featureVideoTitle: "Educarnival through the years",
    featureVideoSub:
      "From Excellence in School Education (2009) to Building a Dream School Team (2025) — a glimpse of the journey.",
    topics: {
      eyebrow: "Two tracks · 12 topics",
      title: "What we explore",
      sub: "Two parallel tracks for the two halves of every great school team — bring your founders, management and academic leaders.",
      groups: [
        {
          label: "Track 1",
          heading: "School Founders & Management",
          cards: [
            {
              Icon: PaidOutlinedIcon,
              t: "Investment & financing",
              p: [
                "Understanding school funding opportunities",
                "What investors look for in schools",
                "Preparing investor-ready school proposals",
                "Financial models that actually work",
              ],
            },
            {
              Icon: ApartmentOutlinedIcon,
              t: "School expansion",
              p: [
                "Scaling schools without losing quality",
                "Expansion strategies that sustain growth",
                "Multi-campus systems and structures",
                "From single school to network",
              ],
            },
            {
              Icon: VerifiedUserOutlinedIcon,
              t: "Governance & compliance",
              p: [
                "Staying compliant with education regulations",
                "Governance systems that reduce risks",
                "Audit-ready documentation practices",
                "Smooth operations with legal clarity",
              ],
            },
            {
              Icon: CalculateOutlinedIcon,
              t: "Smart budgeting",
              p: [
                "Allocating budgets for maximum impact",
                "Smarter spending, stronger outcomes",
                "Avoiding financial leakages in schools",
                "Data-driven budgeting decisions",
              ],
            },
            {
              Icon: WorkspacePremiumOutlinedIcon,
              t: "School boards",
              p: [
                "Understanding different education boards",
                "Choosing the right board alignment",
                "Smooth transitions between school boards",
                "Strategic board decisions for growth",
              ],
            },
            {
              Icon: Groups2OutlinedIcon,
              t: "Know your leaders",
              p: [
                "Clear roles for academic leadership",
                "Strong administrative leadership frameworks",
                "Avoiding leadership overload and burnout",
                "Building efficient leadership teams",
              ],
            },
          ],
        },
        {
          label: "Track 2",
          heading: "School Academic Leaders",
          cards: [
            {
              Icon: SmartToyOutlinedIcon,
              t: "AI-assisted teaching",
              p: [
                "AI tools for smarter lesson planning",
                "Personalised learning through technology",
                "Reducing workload with smart tools",
                "Teaching efficiently in digital classrooms",
              ],
            },
            {
              Icon: TrackChangesOutlinedIcon,
              t: "High-impact teaching strategies",
              p: [
                "Proven strategies that improve learning",
                "Classroom practices backed by research",
                "Teaching methods with measurable outcomes",
                "Strategies that boost student engagement",
              ],
            },
            {
              Icon: MenuBookOutlinedIcon,
              t: "Teaching fundamentals",
              p: [
                "Revisiting core teaching competencies",
                "Strengthening foundational classroom skills",
                "Timeless practices for effective teaching",
                "Sharpening everyday teaching essentials",
              ],
            },
            {
              Icon: Diversity3OutlinedIcon,
              t: "Teacher mentoring",
              p: [
                "Building collaborative teacher cultures",
                "Structured mentoring for professional growth",
                "Peer learning and coaching models",
                "Continuous development for teachers",
              ],
            },
            {
              Icon: FolderOutlinedIcon,
              t: "Professional portfolio",
              p: [
                "Documenting teaching impact effectively",
                "Reflective practices for career growth",
                "Evidence-based professional portfolios",
                "Showcasing classroom excellence",
              ],
            },
            {
              Icon: EmojiEventsOutlinedIcon,
              t: "Excellence showcase",
              p: [
                "Live demonstrations of best practices",
                "Learning directly from master teachers",
                "Seeing high-impact teaching in action",
                "Practical strategies you can replicate",
              ],
            },
          ],
        },
      ],
    },
    schedule: {
      title: "Your two days at IIT Madras",
      sub: "Two full days on campus — here's what each day includes.",
      days: [
        {
          day: "Day 1",
          date: "20 April 2026",
          time: "9:30 AM – 7:00 PM",
          inc: [
            [
              GroupsOutlinedIcon,
              "Symposium access — separate sessions for school leaders & founders/management",
            ],
            [Inventory2OutlinedIcon, "Symposium kit"],
            [RestaurantOutlinedIcon, "Lunch"],
            [LocalCafeOutlinedIcon, "Morning & evening tea"],
          ],
        },
        {
          day: "Day 2",
          date: "21 April 2026",
          time: "9:30 AM – 5:00 PM",
          inc: [
            [
              GroupsOutlinedIcon,
              "Symposium access — separate sessions for school leaders & founders/management",
            ],
            [WorkspacePremiumOutlinedIcon, "Certification on completion"],
            [RestaurantOutlinedIcon, "Lunch"],
            [LocalCafeOutlinedIcon, "Morning & evening tea"],
          ],
        },
      ],
    },
    pricing: [
      {
        end: "2026-01-31",
        amount: "₹15,000",
        when: "Till 31 Jan 2026",
        early: true,
      },
      { end: "2026-02-28", amount: "₹16,000", when: "1–28 Feb 2026" },
      { end: "2026-03-31", amount: "₹17,000", when: "1–31 Mar 2026" },
      { end: "2026-04-20", amount: "₹18,000", when: "1–20 Apr 2026" },
    ],
    committee: [
      {
        img: "/assets/person-lata.png",
        name: "Prof. Lata Dyaram",
        role: "Professor & Area Chair, HRM & OB — IIT Madras",
        bio: "Dr. Lata Dyaram is a Professor and Area Chair of Human Resource Management and Organizational Behaviour (HR&OB). Her corporate experience is primarily in HR and consulting services, with a focus on hiring, psychometrics, leadership and organization development (L&OD). She has publications in leading academic and scientific journals and specializes in analytical as well as experimental research.",
      },
      {
        img: "/assets/person-harish.png",
        name: "Prof. Harish Chaudhry",
        role: "Professor, Management Department — IIT Delhi",
        bio: "A Professor at the Management Department, IIT Delhi with expertise in creative problem-solving, marketing and strategy. He has conducted extensive research on school sustainability and branding, closely examining how schools operate in countries across the world. A key contributor to training school leaders and teachers, he was recognized with the Global Faculty Award from IBM.",
      },
    ],
    venue: {
      title: "IIT Madras",
      image: "/assets/d-iitmadras.png",
      paras: [
        "Indian Institute of Technology Madras is one of the premier institutes of national importance in India. In addition to its B.Tech programmes, IIT Madras offers M.Tech, M.Sc, MBA and Ph.D. programmes across multiple disciplines.",
        "Over the past 65+ years, IIT Madras has built a strong reputation for academic excellence, cutting-edge research and innovation. It has been declared an Institution of Eminence by the Ministry of Education, Government of India.",
        "Established with the mandate to nurture exceptional talent, IIT Madras provides world-class infrastructure and a distinguished faculty of over 500 academicians.",
      ],
    },
    sponsorContacts: {
      phones: [
        ["+91 99108 76248", "+919910876248"],
        ["+91 97167 80878", "+919716780878"],
      ],
      email: "dhruv@dextres.com",
    },
    participationContacts: {
      phones: [
        ["+91 84483 85048", "+918448385048"],
        ["+91 88606 16240", "+918860616240"],
      ],
      email: "himanshu@eduexcellence.in",
    },
    galleryHeading: "Moments from Educarnival",
    gallery: [
      { type: "image", img: "/assets/iitmadras-1.jpeg" },
      { type: "image", img: "/assets/iitmadras-2.jpeg" },
      { type: "image", img: "/assets/iitmadras-3.jpeg" },
      { type: "image", img: "/assets/iitmadras-4.jpeg" },
      { type: "image", img: "/assets/iitmadras-5.jpeg" },
      { type: "image", img: "/assets/iitmadras-6.jpeg" },
    ],
  },

  "educarnival-iitdelhi-2024": {
    eyebrow: "Educarnival · 15th international conference",
    heroTitle: "Designing a Learner-Centric School",
    sub: "An annual gathering of school leaders from 500+ schools across CBSE, ICSE and IB boards — on how schools must function as integrated systems so every child gets the attention they deserve.",
    heroImage: "/assets/iitdelhi-1.jpg",
    heroBadges: [
      [CalendarMonthOutlinedIcon, null],
      [LocationOnOutlinedIcon, null],
      [WorkspacePremiumOutlinedIcon, "IIT Delhi certification"],
    ],
    theme: {
      text: "Educarnival 2024 brought together school leaders representing 500+ schools from CBSE, ICSE and IB boards across India — exploring how schools must function as integrated systems to ensure each child gets the attention they deserve.",
      caption: "",
    },
    featureGif: "/assets/educarnival-journey-iitdelhi.gif",
    featureVideoEyebrow: "Our journey",
    featureVideoTitle: "Educarnival through the years",
    featureVideoSub:
      "From Excellence in School Education (2009) to Global Partnerships (2023) — a glimpse of the journey.",
    topics: {
      eyebrow: "Five tracks",
      title: "What we explored",
      sub: "Five themes for building a school where every learner is at the centre.",
      groups: [
        {
          cards: [
            {
              Icon: MenuBookOutlinedIcon,
              t: "Inside the classroom",
              p: [
                "The role of the textbook in a school's vision",
                "Teaching changes for learner-centric learning",
                "Artificial intelligence in student learning",
              ],
            },
            {
              Icon: AssignmentOutlinedIcon,
              t: "Assessments & examinations",
              p: [
                "Effectiveness of assessment systems",
                "Integrating formative with summative assessment",
                "Efficiency of evaluation outcomes",
              ],
            },
            {
              Icon: HandshakeOutlinedIcon,
              t: "School–parent partnership",
              p: [
                "Parents as collaborators",
                "School communication with parents",
                "Case studies",
              ],
            },
            {
              Icon: Diversity3OutlinedIcon,
              t: "Diversity in regular classrooms",
              p: [
                "Common myths",
                "Classroom diversity awareness",
                "Process-sensitivity considerations",
              ],
            },
            {
              Icon: Groups2OutlinedIcon,
              t: "Human resource development",
              p: [
                "Teacher recruitment and selection",
                "Personalised professional development",
                "Collaborative needs",
              ],
            },
          ],
        },
      ],
    },
    schedule: {
      title: "Two days at IIT Delhi",
      sub: "Seminar Hall, Main Building — here's what each day includes.",
      days: [
        {
          day: "Day 1",
          date: "15 November 2024",
          time: "9:30 AM – 7:00 PM",
          inc: [
            [GroupsOutlinedIcon, "Conference hall access"],
            [Inventory2OutlinedIcon, "Conference kit"],
            [RestaurantOutlinedIcon, "Lunch"],
            [LocalCafeOutlinedIcon, "Morning & evening tea"],
          ],
        },
        {
          day: "Day 2",
          date: "16 November 2024",
          time: "9:30 AM – 7:00 PM",
          inc: [
            [GroupsOutlinedIcon, "Conference hall access"],
            [WorkspacePremiumOutlinedIcon, "IIT Delhi certification"],
            [RestaurantOutlinedIcon, "Lunch"],
            [LocalCafeOutlinedIcon, "Morning & evening tea"],
          ],
        },
      ],
    },
    pricing: [
      {
        end: "2024-08-31",
        amount: "₹13,500",
        when: "Till 31 Aug 2024",
        early: true,
      },
      { end: "2024-09-30", amount: "₹14,500", when: "1–30 Sep 2024" },
      { end: "2024-11-16", amount: "₹15,500", when: "From 1 Oct 2024" },
    ],
    committee: [
      {
        img: "/assets/person-chariar.png",
        name: "Prof. Vijayaraghavan M Chariar",
        role: "Professor — IIT Delhi",
        bio: "An IIT Delhi faculty member specialising in sustainability, traditional knowledge systems, design thinking and leadership. A recipient of the Teaching Excellence Award.",
      },
      {
        img: "/assets/person-harish.png",
        name: "Prof. Harish Chaudhry",
        role: "Professor, Management Department — IIT Delhi",
        bio: "Professor at the Management Department, IIT Delhi with expertise in problem-solving, marketing, strategy and school-sustainability research. Recipient of the IBM Global Faculty Award.",
      },
    ],
    venue: {
      title: "IIT Delhi",
      image: "/assets/ed24-venue.png",
      paras: [
        "Educarnival 2024 was held at the IIT Delhi campus — Seminar Hall, Main Building — across two full days.",
        "Indian Institute of Technology Delhi is one of India's foremost institutes of national importance, renowned for academic excellence, research and innovation across engineering, sciences and management.",
      ],
    },
    sponsorContacts: {
      phones: [
        ["+91 84483 85048", "+918448385048"],
        ["+91 88606 16240", "+918860616240"],
      ],
      email: "himanshu@eduexcellence.in",
    },
    participationContacts: {
      phones: [
        ["+91 84483 85048", "+918448385048"],
        ["+91 88606 16240", "+918860616240"],
      ],
      email: "himanshu@eduexcellence.in",
    },
    galleryHeading: "Moments from Educarnival 2024",
    gallery: [
      { type: "image", img: "/assets/iitdelhi-1.jpg" },
      { type: "image", img: "/assets/iitdelhi-2.jpg" },
      { type: "image", img: "/assets/iitdelhi-3.jpeg" },
      { type: "image", img: "/assets/iitdelhi-4.jpeg" },
      { type: "image", img: "/assets/iitdelhi-5.jpeg" },
    ],
  },
};

export function generateStaticParams() {
  return [
    { slug: "educarnival-iitmadras-2026" },
    { slug: "educarnival-iitdelhi-2024" },
  ];
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProgram(slug);
  return {
    title: p ? `${p.title} — EduExcellence` : "Conference — EduExcellence",
  };
}

const Topic = ({ Icon, t, p }) => (
  <div className="rounded-2xl border border-[#E7E9F0] bg-white p-6 transition hover:-translate-y-1 hover:border-transparent hover:shadow-[0_10px_30px_rgba(16,24,43,.08)]">
    <div className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-xl bg-[#FFF3E2] text-[#E8861A]">
      <Icon sx={{ fontSize: 23 }} />
    </div>
    <h4 className="heading-font mb-3.5 text-[18px] font-bold text-[#16223A]">
      {t}
    </h4>
    <ul className="space-y-2.5">
      {p.map((x) => (
        <li
          key={x}
          className="relative pl-5 text-[14px] leading-relaxed text-[#3A4660] before:absolute before:left-0.5 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#FF9D29]"
        >
          {x}
        </li>
      ))}
    </ul>
  </div>
);

const Contacts = ({ c, label, light }) => (
  <div
    className={`mt-auto pt-6 text-[13.5px] leading-7 ${light ? "text-[#8b93a6]" : "text-[#8b93a6]"}`}
  >
    {label} · <PhoneOutlinedIcon sx={{ fontSize: 16, color: "#FF9D29" }} />{" "}
    {c.phones.map(([t, h], i) => (
      <span key={h}>
        <a className="hover:text-[#FF9D29]" href={`tel:${h}`}>
          {t}
        </a>
        {i < c.phones.length - 1 ? ", " : ""}
      </span>
    ))}
    <br />
    <EmailOutlinedIcon sx={{ fontSize: 16, color: "#FF9D29" }} />{" "}
    <a className="hover:text-[#FF9D29]" href={`mailto:${c.email}`}>
      {c.email}
    </a>
  </div>
);

export default async function ConferencePage({ params }) {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p || p.type !== "conference") notFound();
  const c = CONTENT[slug];
  if (!c) notFound();
  const past = isPast(p);
  const now = new Date();
  const activeIdx = c.pricing
    ? c.pricing.findIndex((t) => new Date(t.end + "T23:59:59") >= now)
    : -1;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src={c.heroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#10182b]/60 to-[#10182b]/90" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-24">
            <span className="inline-flex rounded-full bg-[#FF9D29]/20 px-5 py-1.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#FF9D29]">
              {c.eyebrow}
            </span>
            <h1 className="heading-font mt-4 max-w-[840px] text-[30px]  lg:text-[52px] font-extrabold leading-tight">
              {c.heroTitle}
            </h1>
            <p className="mt-4 max-w-[680px] text-[16px]  lg:text-[18px] text-[#dbe0ec]">
              {c.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[14px]">
                <CalendarMonthOutlinedIcon sx={{ fontSize: 17 }} />
                {p.dateLabel}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[14px]">
                <LocationOnOutlinedIcon sx={{ fontSize: 17 }} />
                {p.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[14px]">
                <WorkspacePremiumOutlinedIcon sx={{ fontSize: 17 }} />
                {c.heroBadges[2][1]}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3.5">
              {past ? (
                <Link
                  href="#gallery"
                  className="flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white transition hover:bg-[#E8861A]"
                >
                  View gallery <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Link>
              ) : (
                <>
                  <Link
                    href={`/register?program=${p.slug}`}
                    className="flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white transition hover:bg-[#E8861A]"
                  >
                    Reserve a seat <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Link>
                  <Link
                    href="/partnership"
                    className="flex h-[52px] items-center rounded-full border border-white/40 px-8 text-[15px] font-medium text-white transition hover:border-white"
                  >
                    Become a sponsor
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Theme */}
        <section className="bg-[#F7F8FB] py-[72px]">
          <div className="mx-auto max-w-[840px] px-6 text-center">
            <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
              The theme
            </span>
            {c.theme.quote ? (
              <p className="heading-font mb-4 mt-5 text-[26px] font-bold leading-[1.4] text-[#16223A]">
                &ldquo;{c.theme.quote}&rdquo;
              </p>
            ) : (
              <p className="mb-2 mt-5 text-[19px] leading-relaxed text-[#3A4660]">
                {c.theme.text}
              </p>
            )}
            {c.theme.caption && (
              <p className="text-[16px]  lg:text-[18px]  text-[#6B7488]">
                {c.theme.caption}
              </p>
            )}
          </div>
        </section>

        {/* Feature journey (gif preferred, video fallback) */}
        {(c.featureGif || c.featureVideo) && (
          <section className="bg-white py-20">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="mx-auto mb-10 max-w-[680px] text-center">
                <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                  {c.featureVideoEyebrow ?? "Watch"}
                </span>
                <h2 className="heading-font mt-6 text-[30px] lg:text-[38px] leading-tight font-extrabold text-[#16223A]">
                  {c.featureVideoTitle}
                </h2>
                {c.featureVideoSub && (
                  <p className="mt-4 text-[17px] text-[#6B7488]">
                    {c.featureVideoSub}
                  </p>
                )}
              </div>
              <div className="mx-auto max-w-[900px] overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white">
                {c.featureGif ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={c.featureGif}
                    alt={c.featureVideoTitle}
                    className="block h-auto w-full"
                  />
                ) : (
                  <video
                    className="aspect-video w-full"
                    src={c.featureVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Topics */}
        <section className="bg-[#F7F8FB] py-[72px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="mx-auto mb-14 max-w-[680px] text-center">
              <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                {c.topics.eyebrow}
              </span>
              <h2 className="heading-font mt-4 text-[30px] lg:mt-6 lg:text-[38px] font-extrabold text-[#16223A]  leading-tight">
                {c.topics.title}
              </h2>
              <p className="mt-4 text-[16px]  lg:text-[18px]  text-[#6B7488]">
                {c.topics.sub}
              </p>
            </div>
            {c.topics.groups.map((g, gi) => (
              <div key={gi} className="mb-14 last:mb-0">
                {g.label && (
                  <div className="mb-7 flex items-center gap-4 rounded-2xl border border-[#FFE0BD] bg-gradient-to-r from-[#FFF3E2] to-[#FFF3E2]/0 px-5 py-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#FF9D29] text-[20px] font-extrabold text-white shadow-[0_6px_16px_rgba(255,157,41,.35)]">
                      {gi + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#E8861A]">
                        {g.label}
                      </span>
                      <h3 className="heading-font text-[20px] font-extrabold leading-tight text-[#16223A] md:text-[26px]">
                        {g.heading}
                      </h3>
                    </div>
                    <span className="ml-auto hidden shrink-0 rounded-full bg-white px-4 py-1.5 text-[12.5px] font-semibold text-[#6B7488] ring-1 ring-[#E7E9F0] sm:inline-flex">
                      {g.cards.length} topics
                    </span>
                  </div>
                )}
                {/* Mobile Swiper */}
                <div className="md:hidden">
                  <TopicsSwiper cards={g.cards} />
                </div>

                {/* Desktop Grid */}
                <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
                  {g.cards.map((card) => (
                    <Topic key={card.t} {...card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule */}
      <section className="bg-white border-b border-[#E7E9F0] py-[72px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="mx-auto mb-14 max-w-[680px] text-center">
              <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                Schedule
              </span>
              <h2 className="heading-font mt-4 text-[30px] lg:mt-6 lg:text-[38px] font-extrabold text-[#16223A]  leading-tight">
                {c.schedule.title}
              </h2>
              <p className="mt-4 text-[16px]  lg:text-[18px]  text-[#6B7488]">
                {c.schedule.sub}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {c.schedule.days.map((d) => (
                <div
                  key={d.day}
                  className="overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white transition hover:shadow-[0_10px_30px_rgba(16,24,43,.08)]"
                >
                  <div className="flex items-center justify-between border-b border-[#E7E9F0] px-7 py-6">
                    <div>
                      <div className="text-[12px] font-bold uppercase tracking-wide text-[#E8861A]">
                        {d.day}
                      </div>
                      <div className="heading-font mt-0.5 text-[18px]  lg:text-[25px] font-extrabold text-[#16223A]">
                        {d.date}
                      </div>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-[#FFF3E2] px-3.5 py-2 text-[13px] font-semibold text-[#E8861A]">
                      {d.time}
                    </span>
                  </div>
                  <div className="px-7 pb-6 pt-5">
                    <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-[#6B7488]">
                      What&apos;s included
                    </div>
                    <ul>
                      {d.inc.map(([Ic, txt], i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 border-b border-[#E7E9F0] py-3.5 text-[15px] text-[#3A4660] last:border-0"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#FFF3E2] text-[#E8861A]">
                            <Ic sx={{ fontSize: 15 }} />
                          </span>
                          {txt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing (upcoming only) */}
        {!past && c.pricing && activeIdx !== -1 && (
          <section className="bg-[#F7F8FB] py-[72px]">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="mx-auto mb-14 max-w-[680px] text-center">
                <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                  Registration fee
                </span>
                <h2 className="heading-font mt-4 text-[30px] lg:mt-6 lg:text-[38px] font-extrabold text-[#16223A]  leading-tight">
                  Pricing tiers
                </h2>
                <p className="mt-4 text-[16px]  lg:text-[18px]  text-[#6B7488]">
                  Inclusive of GST. Register early to save.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-4">
                {c.pricing.map((t, i) => {
                  const tierPast = new Date(t.end + "T23:59:59") < now;
                  const active = i === activeIdx;
                  return (
                    <div
                      key={t.when}
                      className={`relative rounded-2xl bg-white p-7 text-center ${active ? "border-2 border-[#FF9D29] shadow-[0_10px_30px_rgba(16,24,43,.08)]" : "border border-[#E7E9F0]"} ${tierPast ? "opacity-50" : ""}`}
                    >
                      {active && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF9D29] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                          {t.early ? "Early bird" : "Current price"}
                        </span>
                      )}
                      <div className="text-[13px] font-semibold uppercase tracking-wide text-[#6B7488]">
                        {t.when}
                      </div>
                      <div
                        className={`heading-font my-3 text-[38px] font-extrabold text-[#16223A] ${tierPast ? "line-through" : ""}`}
                      >
                        {t.amount}
                      </div>
                      <div className="text-[13px] text-[#6B7488]">
                        incl. GST
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-9 text-center">
                <Link
                  href={`/register?program=${p.slug}`}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white transition hover:bg-[#E8861A]"
                >
                  Reserve a seat <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Committee */}
        <section className="bg-white py-[72px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="mx-auto mb-14 max-w-[680px] text-center">
              <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                Steering committee
              </span>
              <h2 className="heading-font mt-4 text-[30px] lg:mt-6 lg:text-[38px] font-extrabold text-[#16223A]  leading-tight">
                Guided by leading academics
              </h2>
            </div>
            <div className="mx-auto grid max-w-[980px] gap-7 md:grid-cols-2">
              {c.committee.map((m) => (
                <div
                  key={m.name}
                  className="flex flex-col gap-5 rounded-2xl border border-[#E7E9F0] bg-white p-5 transition hover:shadow-[0_10px_30px_rgba(16,24,43,.08)]
                 sm:flex-row sm:items-start sm:p-7"
                >
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={110}
                    height={130}
                    className="mx-auto h-[130px] w-[110px] rounded-xl object-cover
                   sm:mx-0 sm:shrink-0"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="heading-font text-[22px] sm:text-[19px] font-bold leading-tight text-[#16223A]">
                      {m.name}
                    </h3>

                    <div className="mt-2 mb-3 text-[14px] font-semibold leading-snug text-[#E8861A]">
                      {m.role}
                    </div>

                    <p className="text-[15px] leading-7 text-[#6B7488]">
                      {m.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue */}
        <section className="bg-[#F7F8FB] py-[72px]">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
            <Image
              src={c.venue.image}
              alt={c.venue.title}
              width={560}
              height={420}
              className="aspect-[4/3] w-full rounded-2xl border border-[#E7E9F0] object-cover"
            />
            <div>
              <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                The venue
              </span>
              <h2 className="heading-font mb-2 mt-4 text-[28px]  lg:text-[34px] font-extrabold text-[#16223A]">
                {c.venue.title}
              </h2>
              {c.venue.paras.map((para, i) => (
                <p
                  key={i}
                  className="mt-3.5 text-[16.5px] leading-relaxed text-[#3A4660]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsor + Reserve (upcoming only) */}
        {!past && (
          <section className="bg-white py-[72px]">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 px-6 md:grid-cols-2">
              <div className="flex flex-col rounded-[28px] bg-[#07142D] p-12 text-center text-[#cdd3da]">
                <h2 className="heading-font text-[27px] font-extrabold text-white">
                  Partner with {p.title}
                </h2>
                <p className="mx-auto mt-3.5 mb-6 max-w-[440px] text-[16px]">
                  Reach school founders and academic leaders from across India.
                  Sponsorship slots are open.
                </p>
                <Link
                  href="/partnership"
                  className="mx-auto flex h-[52px] items-center gap-2 rounded-full bg-white px-8 text-[15px] font-semibold text-[#E8861A] transition hover:bg-[#FFF3E2]"
                >
                  Become a sponsor <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Link>
                <Contacts c={c.sponsorContacts} label="Sponsorship" />
              </div>
              <div className="flex flex-col rounded-[28px] bg-[#07142D] p-12 text-center text-[#cdd3da]">
                <h2 className="heading-font text-[27px] font-extrabold text-white">
                  Bring your whole school team
                </h2>
                <p className="mx-auto mt-3.5 mb-6 max-w-[440px] text-[16px]">
                  Reserve seats for {p.title} — limited places.
                </p>
                <Link
                  href={`/register?program=${p.slug}`}
                  className="mx-auto flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white transition hover:bg-[#E8861A]"
                >
                  Reserve a seat <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Link>
                <Contacts c={c.participationContacts} label="Participation" />
              </div>
            </div>
          </section>
        )}

        {/* Gallery (past only) */}
        {past && <Gallery heading={c.galleryHeading} items={c.gallery} />}
      </main>
      <Footer />
    </>
  );
}
