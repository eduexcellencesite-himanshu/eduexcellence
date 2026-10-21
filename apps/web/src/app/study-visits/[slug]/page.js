import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import Gallery from "../../program/Gallery";
import Itinerary from "../../program/Itinerary";
import { getProgram, isPast } from "../../../lib/programs";
import GainSwiper from "../GainSwiper";
import CardSwiper from "../CardSwiper";
import LegacySwiper from "../LegacySwiper";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const LEGACY = [
  ["gal-UK.png", "United Kingdom", "2010, 2011, 2018, 2022"],
  ["gal-USA.png", "USA", "2012 – 2017"],
  ["gal-Finland.png", "Finland", "2017, 2018, 2023, 2024, 2025"],
  ["gal-Singapore.png", "Singapore", "2023, 2024"],
  ["gal-Australia.png", "Australia", "2013, 2024"],
  ["gal-Germany.png", "Germany", "2024"],
];

const CONTENT = {
  "usa-study-visit-2026": {
    sub: "For K–12 school leaders & educators — observe how leading Bay Area schools implement AI, design thinking and industry partnerships, first-hand.",
    brochure: "/assets/usa-study-visit-brochure.pdf",
    videos: ["6WvoGVgj7rE", "tN626F0UbZw", "jy7ufrJcFGg"],
    heroChip: { Icon: ApartmentOutlinedIcon, text: "9 school & campus visits" },
    why: {
      eyebrow: "Why San Francisco?",
      title: "Where the future of schooling is already happening",
      image: "/assets/silicon-valley-clean.png",
      paras: [
        "The Bay Area is home to schools that put AI, design thinking and real industry partnerships into everyday classrooms — not theory, but practice you can observe and bring home.",
        "This visit is designed to help school leaders make informed, future-ready decisions for their institutions.",
      ],
    },
    gainTitle: "Five outcomes you bring home",
    gain: [
      {
        Icon: AssignmentOutlinedIcon,
        t: "Curriculum & assessment design",
        d: "See how high-performing schools structure curriculum and assessment.",
      },
      {
        Icon: LightbulbOutlinedIcon,
        t: "Design thinking & PBL",
        d: "Watch project-based and design-thinking learning in live classrooms.",
      },
      {
        Icon: HandshakeOutlinedIcon,
        t: "Industry partnerships",
        d: "Study models like Oracle × Design Tech High School up close.",
      },
      {
        Icon: VerifiedOutlinedIcon,
        t: "U.S. accreditation standards",
        d: "Understand WASC accreditation and what quality assurance looks like.",
      },
      {
        Icon: PublicOutlinedIcon,
        t: "Global networking",
        d: "Connect with global educators, founders and entrepreneurs.",
      },
    ],
    schoolsHead: {
      title: "Schools and campuses",
      sub: "Spend real time inside nine of the Bay Area's most forward-thinking schools, campuses and institutions — the heart of this visit.",
    },
    schools: [
      [
        "School visit",
        "Design Tech High School",
        "Project-based learning with the Oracle industry partnership.",
        "/assets/usa-school-1.png",
      ],
      [
        "School visit",
        "Saratoga High School",
        "WASC-accredited public high school.",
        "/assets/usa-school-2.png",
      ],
      [
        "School visit",
        "Argonaut Elementary",
        "Whole-child development model.",
        "/assets/usa-school-3.png",
      ],
      [
        "School visit",
        "Redwood Middle School",
        "STEM and student voice in practice.",
        "/assets/usa-school-4.png",
      ],
      [
        "Accreditation",
        "WASC Accreditation Body",
        "The quality standards framework.",
        "/assets/usa-school-5.png",
      ],
      [
        "Innovation",
        "Apple Park",
        "A first-hand look at innovation culture.",
        "/assets/usa-school-6.png",
      ],
      [
        "Innovation",
        "Google Campus",
        "Technology ecosystem influence on learning.",
        "/assets/usa-school-8.png",
      ],
      [
        "Optional",
        "Computer History Museum",
        "Optional stop.",
        "/assets/usa-school-7.png",
      ],
      [
        "Optional",
        "Stanford University",
        "Optional campus visit.",
        "/assets/usa-school-9.png",
      ],
    ],
    sightsHead: {
      title: "Beyond the classroom",
      sub: "The visit isn't all work — explore San Francisco's icons and the California coast along the way.",
    },
    sights: [
      [
        "Sightseeing",
        "Sea Lions, Pier 39",
        "San Francisco's iconic waterfront.",
        "/assets/usa-sight-1.png",
      ],
      [
        "Sightseeing",
        "Alcatraz Island",
        "The historic island and bay views.",
        "/assets/usa-sight-2.png",
      ],
      [
        "Sightseeing",
        "Bay Area Rapid Transit",
        "Experience the BART network.",
        "/assets/usa-sight-3.png",
      ],
      [
        "Optional",
        "Mystery Spot",
        "Optional Santa Cruz attraction.",
        "/assets/usa-sight-4.png",
      ],
      [
        "Optional",
        "17-Mile Drive",
        "Optional scenic coastal drive.",
        "/assets/usa-sight-5.png",
      ],
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & welcome",
        desc: "Arrive in San Francisco and settle in for the week ahead.",
        img: "/assets/usa-sight-2.png",
      },
      {
        day: "Day 2",
        title: "San Francisco sightseeing + briefing",
        desc: "City highlights and an orientation briefing for the visits.",
        img: "/assets/usa-sight-1.png",
      },
      {
        day: "Day 3",
        title: "Elementary & middle school visits + Google office",
        desc: "Argonaut Elementary, Redwood Middle and a Google campus visit.",
        img: "/assets/usa-school-8.png",
      },
      {
        day: "Day 4",
        title: "Design Tech High School",
        desc: "The Oracle industry partnership and project-based learning.",
        img: "/assets/usa-school-1.png",
      },
      {
        day: "Day 5",
        title: "Saratoga High School + WASC",
        desc: "WASC-accredited high school and the accreditation framework.",
        img: "/assets/usa-school-2.png",
      },
      {
        day: "Day 6",
        title: "Departure / optional Stanford & Computer History Museum",
        desc: "Optional campus and museum visits before departure.",
        img: "/assets/usa-school-7.png",
      },
      {
        day: "Day 7",
        title: "Departure / optional extended sightseeing",
        desc: "Final departure or an optional extended sightseeing day.",
        img: "/assets/usa-sight-5.png",
      },
    ],
    galleryHeading: "Moments from this visit",
    gallery: [
      { type: "image", img: "/assets/usa-moment-1.jpg" },
      { type: "image", img: "/assets/usa-moment-2.jpg" },
      { type: "image", img: "/assets/usa-moment-3.jpg" },
      { type: "image", img: "/assets/usa-moment-4.jpg" },
      { type: "image", img: "/assets/usa-moment-5.jpg" },
      { type: "image", img: "/assets/usa-moment-6.jpg" },
    ],
  },

  "uk-study-visit-2026": {
    sub: "For K–12 school leaders & educators — see how England's leading schools blend a rigorous curriculum, pastoral care and centuries of tradition with modern teaching practice.",
    heroChip: {
      Icon: ApartmentOutlinedIcon,
      text: "School & university visits",
    },
    why: {
      eyebrow: "Why the UK?",
      title: "Where rigour meets a modern, well-rounded education",
      image: "/assets/gal-UK.png",
      paras: [
        "England's schools are known worldwide for academic rigour, strong pastoral care and a broad, balanced curriculum — refined over generations and still evolving today.",
        "Over a week across London and Cambridge you'll observe classrooms first-hand, meet school leaders and understand the quality frameworks that underpin British education.",
      ],
    },
    gainTitle: "What you take away",
    gain: [
      {
        Icon: AssignmentOutlinedIcon,
        t: "National Curriculum & assessment",
        d: "See how English schools structure the National Curriculum and GCSE/A-Level pathways.",
      },
      {
        Icon: HandshakeOutlinedIcon,
        t: "Pastoral care & the house system",
        d: "Understand how British schools build belonging and student wellbeing.",
      },
      {
        Icon: VerifiedOutlinedIcon,
        t: "Ofsted & quality assurance",
        d: "Learn how inspection and accountability drive school improvement.",
      },
      {
        Icon: MenuBookOutlinedIcon,
        t: "Cambridge & international curricula",
        d: "Explore globally recognised frameworks at their source.",
      },
      {
        Icon: PublicOutlinedIcon,
        t: "Global networking",
        d: "Connect with British school leaders and fellow Indian educators.",
      },
    ],
    schoolsHead: {
      title: "Schools & institutions you'll visit",
      sub: "Spend real time inside leading British schools and one of the world's great universities.",
    },
    schools: [
      [
        "School visit",
        "A leading London secondary",
        "Academic rigour with strong pastoral care.",
        "/assets/gal-UK.png",
      ],
      [
        "School visit",
        "A British primary school",
        "The early years and primary foundation.",
        "/assets/d-classroom.jpg",
      ],
      [
        "University",
        "University of Cambridge",
        "A walking visit to one of the world's great universities.",
        "/assets/prog-iit.jpg",
      ],
      [
        "Quality body",
        "Ofsted framework",
        "How inspection drives school improvement.",
        "/assets/d-audience.jpg",
      ],
    ],
    sightsHead: {
      title: "Beyond the classroom",
      sub: "Explore London's landmarks and the historic city of Cambridge along the way.",
    },
    sights: [
      [
        "Sightseeing",
        "Westminster & the Thames",
        "London's iconic riverfront and landmarks.",
        "/assets/gal-UK.png",
      ],
      [
        "Sightseeing",
        "Punting in Cambridge",
        "The historic university city on the river Cam.",
        "/assets/prog-photo.jpg",
      ],
      [
        "Optional",
        "British Museum",
        "Optional cultural stop in central London.",
        "/assets/d-image3.png",
      ],
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & welcome",
        desc: "Arrive in London and settle in for the week ahead.",
        img: "/assets/gal-UK.png",
      },
      {
        day: "Day 2",
        title: "London sightseeing + briefing",
        desc: "City highlights and an orientation briefing for the visits.",
        img: "/assets/prog-photo.jpg",
      },
      {
        day: "Day 3",
        title: "Primary & secondary school visits",
        desc: "Observe English classrooms and meet school leaders.",
        img: "/assets/d-classroom.jpg",
      },
      {
        day: "Day 4",
        title: "Curriculum & assessment sessions",
        desc: "Deep-dive into the National Curriculum and quality frameworks.",
        img: "/assets/d-audience.jpg",
      },
      {
        day: "Day 5",
        title: "Cambridge day",
        desc: "A visit to the University of Cambridge and the historic city.",
        img: "/assets/prog-iit.jpg",
      },
      {
        day: "Day 6",
        title: "Optional museums & culture",
        desc: "Optional cultural visits across central London.",
        img: "/assets/d-image3.png",
      },
      {
        day: "Day 7",
        title: "Departure",
        desc: "Final departure after a week across London and Cambridge.",
        img: "/assets/gal-UK.png",
      },
    ],
    galleryHeading: "Moments from this visit",
    gallery: [
      { type: "image", img: "/assets/gal-UK.png" },
      { type: "image", img: "/assets/d-classroom.jpg" },
      { type: "image", img: "/assets/prog-iit.jpg" },
      { type: "image", img: "/assets/d-audience.jpg" },
      { type: "image", img: "/assets/prog-photo.jpg" },
      { type: "image", img: "/assets/d-image3.png" },
    ],
  },

  "japan-study-visit-2026": {
    sub: "For K–12 school leaders & educators — see how Japanese schools blend discipline, character education (tokkatsu) and world-class STEM into everyday learning.",
    heroChip: { Icon: ApartmentOutlinedIcon, text: "School & campus visits" },
    why: {
      eyebrow: "Why Japan?",
      title: "Where character, discipline and STEM meet",
      image: "/assets/gal-Finland.png",
      paras: [
        "Japanese education is admired worldwide for its blend of academic rigour, character education (tokkatsu) and a deep culture of respect and responsibility.",
        "Over a week across Tokyo and Kyoto you'll observe classrooms first-hand, meet school leaders and explore what makes the Japanese model work.",
      ],
    },
    gainTitle: "What you take away",
    gain: [
      {
        Icon: AssignmentOutlinedIcon,
        t: "Character education (tokkatsu)",
        d: "See how Japanese schools build responsibility, teamwork and self-discipline.",
      },
      {
        Icon: LightbulbOutlinedIcon,
        t: "Lesson study & STEM",
        d: "Watch the lesson-study method and strong STEM teaching in live classrooms.",
      },
      {
        Icon: HandshakeOutlinedIcon,
        t: "Whole-child development",
        d: "Understand how cleaning, meals and clubs shape well-rounded students.",
      },
      {
        Icon: PublicOutlinedIcon,
        t: "Global networking",
        d: "Connect with Japanese school leaders and fellow Indian educators.",
      },
    ],
    schoolsHead: {
      title: "Schools & institutions you'll visit",
      sub: "Spend real time inside leading Japanese schools across Tokyo and Kyoto.",
    },
    schools: [
      [
        "School visit",
        "A Tokyo secondary school",
        "Lesson study and STEM in practice.",
        "/assets/gal-Finland.png",
      ],
      [
        "School visit",
        "A Kyoto primary school",
        "Character education from the early years.",
        "/assets/d-classroom.jpg",
      ],
      [
        "Institute",
        "A Japanese teacher-training college",
        "Behind the system with educators.",
        "/assets/d-audience.jpg",
      ],
      [
        "Innovation",
        "An education technology centre",
        "Technology and pedagogy combined.",
        "/assets/d-image3.png",
      ],
    ],
    sightsHead: {
      title: "Beyond the classroom",
      sub: "Explore Tokyo's energy and Kyoto's historic temples along the way.",
    },
    sights: [
      [
        "Sightseeing",
        "Tokyo cityscape",
        "The world's most dynamic metropolis.",
        "/assets/prog-photo.jpg",
      ],
      [
        "Sightseeing",
        "Kyoto temples",
        "Centuries of culture and tradition.",
        "/assets/prog-iit.jpg",
      ],
      [
        "Optional",
        "Mount Fuji / countryside",
        "Optional day trip to the countryside.",
        "/assets/gal-Finland.png",
      ],
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & welcome",
        desc: "Arrive in Tokyo and settle in for the week ahead.",
        img: "/assets/gal-Finland.png",
      },
      {
        day: "Day 2",
        title: "Tokyo sightseeing + briefing",
        desc: "City highlights and an orientation briefing for the visits.",
        img: "/assets/prog-photo.jpg",
      },
      {
        day: "Day 3",
        title: "Primary & secondary school visits",
        desc: "Observe Japanese classrooms and meet school leaders.",
        img: "/assets/d-classroom.jpg",
      },
      {
        day: "Day 4",
        title: "Lesson study & character-education sessions",
        desc: "Deep-dive into the lesson-study method and tokkatsu.",
        img: "/assets/d-audience.jpg",
      },
      {
        day: "Day 5",
        title: "Kyoto day",
        desc: "School visit and the city's historic temples.",
        img: "/assets/prog-iit.jpg",
      },
      {
        day: "Day 6",
        title: "Optional countryside & culture",
        desc: "Optional Japanese countryside and cultural visits.",
        img: "/assets/d-image3.png",
      },
      {
        day: "Day 7",
        title: "Departure",
        desc: "Final departure after a week across Tokyo and Kyoto.",
        img: "/assets/gal-Finland.png",
      },
    ],
    galleryHeading: "Moments from this visit",
    gallery: [
      { type: "image", img: "/assets/gal-Finland.png" },
      { type: "image", img: "/assets/d-classroom.jpg" },
      { type: "image", img: "/assets/prog-iit.jpg" },
      { type: "image", img: "/assets/d-audience.jpg" },
      { type: "image", img: "/assets/prog-photo.jpg" },
      { type: "image", img: "/assets/d-image3.png" },
    ],
  },

  singapore: {
    sub: "For K–12 school leaders & educators — explore how Singapore works collectively to achieve PISA Rank-2, and deep-dive into Malaysian K-12 systems through school visits and interactive sessions.",
    heroChip: { Icon: CalendarMonthOutlinedIcon, text: "7 days & 6 nights" },
    why: {
      eyebrow: "Why Singapore & Malaysia?",
      title: "Inside the world's PISA Rank-2 education system",
      image: "/assets/sg-perse-school.jpg",
      paras: [
        "Singapore's success isn't down to one factor — management, educators, support staff, students and parents work collectively to reach second place in PISA. This visit explores what makes that possible.",
        "Across the border, you'll deep-dive into Malaysia's K-12 systems through school visits and interactive sessions — two countries, one week.",
      ],
    },
    gainTitle: "What you take away",
    gain: [
      {
        Icon: TrackChangesOutlinedIcon,
        t: "Singapore's high-performance playbook",
        d: "Uncover the strategies and techniques behind Singapore's PISA Rank-2, TIMSS and PIRLS results.",
      },
      {
        Icon: PublicOutlinedIcon,
        t: "Building a global education brand",
        d: "Identify the essential components required to establish a successful global brand in education.",
      },
      {
        Icon: CalculateOutlinedIcon,
        t: "Singapore Mathematics",
        d: "Explore the key principles of Singaporean Mathematics — effective in boosting numeracy mastery.",
      },
      {
        Icon: MenuBookOutlinedIcon,
        t: "Cambridge & International curricula",
        d: "Look into the Cambridge & International Primary Curriculum — globally recognised frameworks.",
      },
    ],
    schoolsHead: {
      title: "Schools & institutions you'll visit",
      sub: "Spend real time inside leading international schools across Malaysia and Singapore — plus Singapore's national teacher-education institute.",
    },
    schools: [
      [
        "School visit",
        "Charterhouse International Secondary School",
        "Leading international secondary school.",
        "/assets/sg-charterhouse.jpeg",
      ],
      [
        "School visit",
        "Tanarata International School",
        "International school with a holistic approach.",
        "/assets/sg-tanarata.jpeg",
      ],
      [
        "Institute",
        "National Institute of Education, NTU",
        "Singapore's national institute for teacher education.",
        "/assets/sg-nie.jpeg",
      ],
      [
        "School visit",
        "Knightsbridge House International School",
        "International curriculum and global outlook.",
        "/assets/sg-knightsbridge.jpeg",
      ],
    ],
    itinerary: [
      {
        day: "Days 1–3",
        title: "Malaysia leg · 3–6 June 2024",
        desc: "Deep-dive into Malaysian K-12 systems through school visits and interactive sessions.",
        img: "/assets/sg-school-2.jpg",
      },
      {
        day: "Days 4–6",
        title: "Singapore leg · 6–9 June 2024",
        desc: "Explore how Singapore's schools collectively achieve PISA Rank-2, with visits to leading international schools and NIE, NTU.",
        img: "/assets/sg-perse-school.jpg",
      },
      {
        day: "Day 7",
        title: "Departure",
        desc: "Final departure after a week across two countries.",
        img: "/assets/sg-g2.jpeg",
      },
    ],
    galleryHeading: "Moments from this visit",
    gallery: [
     {
  type: "image",
  cap: "Charterhouse International School, Malaysia",
  img: "/assets/sg-charterhouse-malaysia.jpg",
},
{
  type: "image",
  cap: "Charterhouse International — group photo",
  img: "/assets/sg-school-1.jpg",
},
{
  type: "image",
  cap: "The Perse School Singapore",
  img: "/assets/sg-perse-school.jpg",
},
{
  type: "image",
  cap: "Delegates at a school visit",
  img: "/assets/sg-school-2.jpg",
},
{
  type: "image",
  cap: "Singapore campus visit",
  img: "/assets/sg-school-4.jpg",
},
{
  type: "image",
  cap: "Group at the school gate",
  img: "/assets/sg-g1.jpeg",
},
{
  type: "image",
  cap: "Networking & sessions",
  img: "/assets/sg-g2.jpeg",
},

// New images
{
  type: "image",
  cap: "School Visit",
  img: "/assets/my-1.jpg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/my-2.jpg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/my-3.jpg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/my-4.jpg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/my-5.jpg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/my-6.jpg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/my-6.jpg",
},

// Additional images
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-5.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-6.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-7.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-9.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-10.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-11.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-12.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-13.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-14.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-15.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-16.jpeg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-17.jpg",
},
{
  type: "image",
  cap: "School Visit",
  img: "/assets/sg-18.jpg",
},
    ],
  },

  finland: {
    sub: "For school leaders & educators — experience Helsinki's trust-based model up close: a forest curriculum, highly qualified teachers and no standardised testing.",
    heroChip: { Icon: CalendarMonthOutlinedIcon, text: "6 days · 5 nights" },
    why: {
      eyebrow: "Why Finland?",
      title: "Inside the world's most trusted education system",
      image: "/assets/fin-visit-1.jpg",
      paras: [
        "Finland builds learning on trust rather than testing — shorter school days, minimal homework and highly qualified teachers given the autonomy to teach.",
        "Over six days in Helsinki you'll see it first-hand across school and institution visits, plus guided sightseeing.",
      ],
    },
    gainEyebrow: "At a glance",
    gainTitle: "Program at a glance",
    gainSub:
      "Six days in Helsinki, built around real classroom and institution visits.",
    gain: [
      {
        Icon: ApartmentOutlinedIcon,
        t: "2 school visits",
        d: "See Finnish classrooms and teaching in action.",
      },
      {
        Icon: MenuBookOutlinedIcon,
        t: "2 institution visits",
        d: "Go behind the system with education institutions.",
      },
      {
        Icon: PublicOutlinedIcon,
        t: "Guided sightseeing",
        d: "Experience Helsinki beyond the classroom.",
      },
      {
        Icon: VerifiedOutlinedIcon,
        t: "Led by Prof. Harish Chaudhry",
        d: "Program director, IIT Delhi.",
      },
    ],
    schoolsHead: {
      title: "What makes Finland different",
      sub: "Six features of the Finnish model you'll see in practice.",
    },
    schools: [
      [
        "Finland model",
        "Forest curriculum",
        "Outdoor learning woven into the curriculum.",
        "/assets/fin-6.jpg",
      ],
      [
        "Finland model",
        "Use of technology",
        "Educational technology in everyday classrooms.",
        "/assets/fin-5.jpg",
      ],
      [
        "Finland model",
        "Trust-based system",
        "A relationship-centred, low-stakes approach.",
        "/assets/fin-3.jpg",
      ],
      [
        "Finland model",
        "Minimal homework & shorter days",
        "Less workload, more depth and wellbeing.",
        "/assets/fin-4.jpg",
      ],
      [
        "Finland model",
        "Highly qualified teachers",
        "Teaching as a respected, master's-level profession.",
        "/assets/fin-2.jpg",
      ],
      [
        "Finland model",
        "No standardised testing",
        "Assessment without high-stakes standardised tests.",
        "/assets/fin-1.jpg",
      ],
    ],
    featureVideo:
      "https://eduexcellence.in/wp-content/uploads/2024/06/Dextres-Finland-Video.mp4",
    featureVideoTitle: "The journey to a world-class education system",
    featureVideoPoster: "/assets/gal-Finland.png",
    galleryHeading: "Moments from this visit",
    gallery: [
      { type: "image", img: "/assets/fin-visit-1.jpg" },
      { type: "image", img: "/assets/fin-visit-2.jpg" },
      { type: "image", img: "/assets/fin-visit-3.jpg" },
      { type: "image", img: "/assets/fin-visit-4.jpg" },
       { type: "image", img: "/assets/fin-visit-5.jpg" },
    ],
  },

  "australia-germany": {
    sub: "An international study visit for school leaders — a structured, diagnostic-led journey across Perth, Australia and Berlin–Leipzig, Germany.",
    heroChip: {
      Icon: CalendarMonthOutlinedIcon,
      text: "Perth · Berlin · Leipzig",
    },
    academicPartner: {
      name: "Dextres",
      tagline: "Deliberate | Effective | Efficient",
      logo: "/assets/dextres-logo.svg",
    },
    why: {
      eyebrow: "The program",
      title: "A diagnostic-led journey across two continents",
      image: "/assets/ag-australia.jpg",
      paras: [
        "Two legs, one structured program: Perth, Australia (14–20 April) and Berlin & Leipzig, Germany (12–18 May) — with partner-school visits and diagnostics for primary and middle grades.",
        "It's bookended by work in India: preliminary board analysis and faculty sessions before you travel, and an analytical synthesis of the diagnostic findings on return.",
      ],
    },
    gainEyebrow: "Highlights",
    gainTitle: "What the program includes",
    gainSub:
      "A structured cycle of analysis, international exposure and synthesis.",
    gain: [
      {
        Icon: AssignmentOutlinedIcon,
        t: "Board analysis & faculty engagement",
        d: "Preliminary board analysis reports and faculty sessions in India.",
      },
      {
        Icon: TrackChangesOutlinedIcon,
        t: "Diagnostics for primary & middle",
        d: "Diagnostic assessments at partner schools across both legs.",
      },
      {
        Icon: VerifiedOutlinedIcon,
        t: "Analysis of diagnostic outcomes",
        d: "Analytical synthesis of the findings back in India.",
      },
      {
        Icon: PublicOutlinedIcon,
        t: "International exposure",
        d: "First-hand exposure to Australian and German educational practice.",
      },
    ],
    schoolsHead: {
      title: "Host schools",
      sub: "Partner schools across the Australia and Germany legs.",
    },
    schools: [
      [
        "Australia · Perth",
        "Bunbury Cathedral School",
        "Host partner school in Western Australia.",
        "/assets/gal-Australia.png",
      ],
      [
        "Germany · Weimar",
        "Thuringia International School",
        "Host partner school in Weimar, Germany.",
        "/assets/ag-germany.png",
      ],
    ],
    itinerary: [
      {
        day: "Stage 1 · Mar–Apr",
        title: "Preliminary analysis in India",
        desc: "Board analysis reports and faculty engagement sessions before you travel.",
        img: "/assets/prog-photo.jpg",
      },
      {
        day: "Stage 2 · Apr–May",
        title: "International school visits",
        desc: "Perth (14–20 Apr) and Berlin–Leipzig (12–18 May) with diagnostics for primary and middle grades.",
        img: "/assets/ag-germany-1.jpg",
      },
      {
        day: "Stage 3 · June",
        title: "Synthesis in India",
        desc: "Analytical synthesis of the diagnostic outcomes on return.",
        img: "/assets/d-audience.jpg",
      },
    ],
    galleryHeading: "Moments from this visit",
    gallery: [
      { type: "image", img: "/assets/ag-australia.jpg" },
      { type: "image", img: "/assets/ag-germany-1.jpg" },
      { type: "image", img: "/assets/ag-germany-2.jpg" },
    ],
  },
};

export function generateStaticParams() {
  return [
    { slug: "usa-study-visit-2026" },
    { slug: "uk-study-visit-2026" },
    { slug: "japan-study-visit-2026" },
    { slug: "singapore" },
    { slug: "finland" },
    { slug: "australia-germany" },
  ];
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProgram(slug);
  return {
    title: p ? `${p.title} — EduExcellence` : "Study Visit — EduExcellence",
  };
}

const Card = ([tag, title, desc, img]) => (
  <div
    key={title}
    className="overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white transition hover:-translate-y-1 hover:border-transparent hover:shadow-[0_10px_30px_rgba(16,24,43,.08)]"
  >
    <div className="relative grid h-[210px] place-items-center overflow-hidden bg-gradient-to-br from-[#eef1f6] to-[#e3e7f0] text-[#9aa3b5]">
      {img ? (
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width:1024px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <span className="flex flex-col items-center text-[13px]">
          <ImageOutlinedIcon sx={{ fontSize: 30, opacity: 0.65 }} />
          Photo
        </span>
      )}
    </div>
    <div className="p-6">
      <span className="text-[11px] font-bold uppercase tracking-wide text-[#E8861A]">
        {tag}
      </span>
      <h3 className="heading-font my-1.5 text-[19px] font-bold text-[#16223A]">
        {title}
      </h3>
      <p className="text-[14px] text-[#6B7488]">{desc}</p>
    </div>
  </div>
);

const SectionHead = ({ eyebrow, title, sub }) => (
  <div className="mx-auto mb-6 md:mb-14 max-w-[680px] text-center">
    <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
      {eyebrow}
    </span>
    <h2 className="heading-font mt-6 text-[30px]  lg:text-[38px] leading-tight font-extrabold text-[#16223A]">
      {title}
    </h2>
    {sub && (
      <p className="mt-4 text-[16px] lg:text-[17px] text-[#6B7488]">{sub}</p>
    )}
  </div>
);

export default async function StudyVisitPage({ params }) {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p || p.type !== "study-visit") notFound();
  const past = isPast(p);

  // For past programs, rewrite forward-looking copy ("you'll visit", "what you take
  // away") into past tense so a completed visit doesn't read like an upcoming one.
  const pastify = (s) =>
    typeof s !== "string"
      ? s
      : s
          .replace(/you'll visit/gi, "we visited")
          .replace(/you'll observe/gi, "we observed")
          .replace(/you'll deep-dive/gi, "we deep-dived")
          .replace(/you'll see/gi, "we saw")
          .replace(/you'll explore/gi, "we explored")
          .replace(/you take away/gi, "we took away")
          .replace(/you bring home/gi, "we brought home")
          .replace(/Spend real time/g, "We spent real time")
          .replace(/send you home/gi, "send everyone home");
  const T = past ? pastify : (s) => s;
  const c = CONTENT[slug];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1f2c4d] to-[#10182b]" />
          <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-[72px]">
            <span className="inline-flex rounded-full bg-[#FF9D29]/20 px-5 py-1.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#FF9D29]">
              International study visit
            </span>
            <h1 className="heading-font mt-4 max-w-[840px] text-[30px] lg:text-[52px] font-extrabold leading-tight">
              {p.title}
            </h1>
            <p className="mt-4 max-w-[680px] text-[16px] lg:text-[18px] text-[#dbe0ec]">
              {T(c?.sub ?? "For K–12 school leaders & educators.")}
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
              {c?.heroChip && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[14px]">
                  <c.heroChip.Icon sx={{ fontSize: 17 }} />
                  {c.heroChip.text}
                </span>
              )}
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
                <Link
                  href={`/register?program=${p.slug}`}
                  className="flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white transition hover:bg-[#E8861A]"
                >
                  Reserve a seat <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Link>
              )}
              {c?.brochure && (
                <a
                  href={c.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[52px] items-center rounded-full border border-white/40 px-8 text-[15px] font-medium text-white transition hover:border-white"
                >
                  View program brochure (PDF)
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Academic partner */}
        {c?.academicPartner && (
          <section className="bg-white pt-14">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="mx-auto flex max-w-[640px] flex-col items-center justify-center gap-3 rounded-2xl border border-[#E7E9F0] bg-[#F7F8FB] px-8 py-6 text-center sm:flex-row sm:gap-6">
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B7488]">
                  Academic Partner
                </span>
                {c.academicPartner.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={c.academicPartner.logo}
                    alt={c.academicPartner.name}
                    className="h-11 w-auto object-contain"
                  />
                ) : (
                  <span className="flex flex-col items-center sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="heading-font text-[24px] font-extrabold text-[#16223A]">
                      {c.academicPartner.name}
                    </span>
                    {c.academicPartner.tagline && (
                      <span className="text-[12.5px] font-medium text-[#6B7488]">
                        {c.academicPartner.tagline}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Why */}
        {c?.why && (
          <section className="bg-white py-[72px]">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                  {c.why.eyebrow}
                </span>

                <h2 className="heading-font mt-4 mb-2 text-[30px] lg:text-[34px] font-extrabold leading-tight text-[#16223A]">
                  {c.why.title}
                </h2>

                {c.why.paras.map((para, i) => (
                  <p
                    key={i}
                    className="mt-3.5 text-[16px] leading-relaxed text-[#3A4660]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="order-1 lg:order-2">
                <Image
                  src={c.why.image}
                  alt={c.why.title}
                  width={560}
                  height={420}
                  className="aspect-[4/3] w-full rounded-2xl border border-[#E7E9F0] object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Feature video */}
        {c?.featureVideo && (
          <section className="bg-[#07142D] py-[72px]">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="mx-auto mb-12 max-w-[680px] text-center">
                <span className="inline-flex rounded-full bg-[#FF9D29]/20 px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#FF9D29]">
                  Watch
                </span>
                <h2 className="heading-font mt-6 text-[30px] lg:text-[38px] leading-tight font-extrabold text-white">
                  {c.featureVideoTitle ??
                    "The journey to a world-class education system"}
                </h2>
              </div>
              <div className="mx-auto max-w-[900px] overflow-hidden rounded-2xl border border-white/10 bg-black">
                <video
                  className="aspect-video w-full"
                  src={c.featureVideo}
                  poster={c.featureVideoPoster}
                  controls
                  controlsList="nodownload"
                  preload="none"
                />
              </div>
            </div>
          </section>
        )}

        {/* Outcomes */}
        {c?.gain && (
          <section className="bg-[#F7F8FB] py-[72px]">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-2 px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
              <div className="lg:sticky lg:top-24">
                <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                  {c.gainEyebrow ?? "What you gain"}
                </span>
                <h2 className="heading-font mb-3.5 mt-4 text-[30px] lg:text-[34px] font-extrabold text-[#16223A]">
                  {T(c.gainTitle)}
                </h2>
                <p className="mb-6 text-[16px] text-[#6B7488]">
                  {T(
                    c.gainSub ??
                      "This isn't a holiday with school visits bolted on — every day is built to send you home with practical, future-ready ideas your school can act on.",
                  )}
                </p>
                {!past && (
                  <Link
                    href={`/register?program=${p.slug}`}
                    className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white transition hover:bg-[#E8861A]"
                  >
                    Reserve a seat <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Link>
                )}
              </div>
              <>
                {/* Mobile */}
                <div className="md:hidden">
                  <GainSwiper gain={c.gain} />
                </div>

                {/* Desktop */}
                <div className="hidden md:flex md:flex-col md:gap-4">
                  {c.gain.map(({ Icon, t, d }) => (
                    <div
                      key={t}
                      className="flex gap-[18px] rounded-2xl border border-[#E7E9F0] bg-white p-6 transition hover:border-[#FF9D29] hover:shadow-[0_10px_30px_rgba(16,24,43,.08)]"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#FFF3E2] text-[#E8861A]">
                        <Icon sx={{ fontSize: 23 }} />
                      </span>

                      <div>
                        <h3 className="heading-font text-[18px] font-bold text-[#16223A]">
                          {t}
                        </h3>

                        <p className="mt-1 text-[14.5px] text-[#6B7488]">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            </div>
          </section>
        )}

        {/* Schools */}
        {c?.schools && (
          <section className="bg-white py-[72px]">
            <div className="mx-auto max-w-[1180px] px-6">
              <SectionHead
                eyebrow="Schools & institutions"
                title={T(c.schoolsHead.title)}
                sub={T(c.schoolsHead.sub)}
              />

              {/* Mobile */}
              <div className="md:hidden">
                <CardSwiper items={c.schools} />
              </div>

              {/* Desktop */}
              <div className="hidden md:grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {c.schools.map(Card)}
              </div>
            </div>
          </section>
        )}

        {/* Sightseeing */}
        {c?.sights && (
          <section className="bg-[#F7F8FB] py-[72px]">
            <div className="mx-auto max-w-[1180px] px-6">
              <SectionHead
                eyebrow="Sightseeing"
                title={T(c.sightsHead.title)}
                sub={T(c.sightsHead.sub)}
              />
              {/* Mobile */}
              <div className="md:hidden">
                <CardSwiper items={c.sights} />
              </div>

              {/* Desktop */}
              <div className="hidden md:grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {c.sights.map(Card)}
              </div>
            </div>
          </section>
        )}

        {/* Mid CTA (upcoming) */}
        {!past && (
          <section className="bg-white py-[72px]">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="rounded-[28px] bg-[#FF9D29] px-8 py-14 text-center text-white">
                <h2 className="heading-font text-[30px] lg:text-[36px] leading-tight font-extrabold">
                  Seats fill fast — secure yours
                </h2>
                <p className="mx-auto mb-7 mt-3.5 max-w-[560px] text-[16px] lg:text-[18px] text-white/90">
                  This is a small-group visit and places are limited. Reserve
                  your seat to join school leaders from across India.
                </p>
                <Link
                  href={`/register?program=${p.slug}`}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-8 text-[15px] font-semibold text-[#E8861A]"
                >
                  Reserve a seat <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Itinerary */}
        {c?.itinerary && (
          <section
            className="border-y border-[#E7E9F0] bg-white py-[72px]"
            style={{
              boxShadow:
                "0 -12px 30px rgba(16,24,43,0.05), 0 12px 30px rgba(16,24,43,0.08)",
            }}
          >
            <div className="mx-auto mb-14 max-w-[680px] px-6 text-center">
              <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                Program snapshot
              </span>
              <h2 className="heading-font mt-6 text-[30px]  lg:text-[38px] leading-tight font-extrabold text-[#16223A]">
                Your itinerary
              </h2>
              <p className="mt-4 text-[16px] lg:text-[17px] text-[#6B7488] hidden lg:block">
                Click any day to preview it.
              </p>
            </div>
            <Itinerary days={c.itinerary} />
          </section>
        )}

        {/* Final CTA (upcoming) or Gallery (past) */}
        {past ? (
          <Gallery
            heading={c?.galleryHeading ?? "Moments from this visit"}
            items={c?.gallery ?? []}
          />
        ) : (
          <section className="bg-white py-[72px]">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="rounded-[28px] bg-[#FF9D29] px-8 py-14 text-center text-white">
                <h2 className="heading-font text-[30px] lg:text-[36px] leading-tight font-extrabold">
                  Reserve your seat on {p.title}
                </h2>
                <p className="mx-auto mb-7 mt-3.5 max-w-[600px] text-[18px] text-white/90">
                  Seats are limited. Register your interest and our team will
                  guide you through the details.
                </p>
                <Link
                  href={`/register?program=${p.slug}`}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-8 text-[15px] font-semibold text-[#E8861A]"
                >
                  Reserve a seat <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Legacy gallery (always) — below the moments gallery */}
        <section className="bg-[#F7F8FB] py-[72px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="mx-auto mb-14 max-w-[680px] text-center">
              <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                14 years &amp; counting
              </span>
              <h2 className="heading-font mt-6 text-[30px]  lg:text-[38px] leading-tight font-extrabold text-[#16223A]">
                A legacy of study visits
              </h2>
            </div>
            {/* Mobile */}
            <div className="md:hidden">
              <LegacySwiper items={LEGACY} />
            </div>

            {/* Desktop */}
            <div className="hidden md:grid mx-auto max-w-[1200px] gap-8 md:grid-cols-3">
              {LEGACY.map(([img, country, years]) => (
                <div
                  key={country}
                  className="overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,24,43,.08)]"
                >
                  <Image
                    src={`/assets/${img}`}
                    alt={country}
                    width={316}
                    height={192}
                    className="h-[180px] w-full object-cover"
                  />

                  <div className="px-5 py-5 text-center">
                    <b className="heading-font block text-[18px] font-bold text-[#16223A]">
                      {country}
                    </b>

                    <span className="text-[14px] text-[#6B7488]">{years}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Participants speak (videos) — just above footer */}
        {c?.videos && (
          <section className="bg-white py-[72px]">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="mx-auto mb-14 max-w-[680px] text-center">
                <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                  Participants speak
                </span>
                <h2 className="heading-font mt-6 text-[30px]  lg:text-[38px] leading-tight font-extrabold text-[#16223A]">
                  Hear from past delegates
                </h2>
              </div>
              <div className="grid gap-7 md:grid-cols-3">
                {c.videos.map((id) => (
                  <div
                    key={id}
                    className="relative aspect-video overflow-hidden rounded-2xl border border-[#E7E9F0] bg-black"
                  >
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${id}`}
                      title="Participant testimonial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
