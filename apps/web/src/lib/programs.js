// Central program registry. In production this is backed by the admin/MongoDB;
// for now it drives the menus, detail routes, register + status logic.

export const PROGRAMS = [
  {
    slug: "usa-study-visit-2026",
    type: "study-visit",
    title: "USA Study Visit 2026",
    short: "USA Study Visit 2026",
    location: "San Francisco & Silicon Valley",
    dateLabel: "26 Apr – 03 May 2026",
    startDate: "2026-04-26",
    endDate: "2026-05-03",
  },
  {
    slug: "uk-study-visit-2026",
    type: "study-visit",
    title: "UK Study Visit 2026",
    short: "UK Study Visit 2026",
    location: "London & Cambridge, UK",
    dateLabel: "12–18 Oct 2026",
    startDate: "2026-10-12",
    endDate: "2026-10-18",
  },
  // Japan Study Visit 2026 removed on 2026-10-21 (placeholder programme, not confirmed).
  // Its page copy is still in app/study-visits/[slug]/page.js; re-add the entry here
  // and in generateStaticParams there to bring it back.
  {
    slug: "singapore",
    type: "study-visit",
    title: "Singapore & Malaysia Study Visit",
    short: "Singapore & Malaysia",
    location: "Malaysia & Singapore",
    dateLabel: "3–9 June 2024",
    startDate: "2024-06-03",
    endDate: "2024-06-09",
  },
  {
    slug: "finland",
    type: "study-visit",
    title: "Finland Study Visit",
    short: "Finland",
    location: "Helsinki, Finland",
    dateLabel: "23–28 September",
    startDate: "2025-06-01",
    endDate: "2025-06-08",
  },
  {
    slug: "australia-germany",
    type: "study-visit",
    title: "Australia & Germany Study Visit",
    short: "Australia & Germany",
    location: "Australia & Germany",
    dateLabel: "2024",
    startDate: "2024-06-01",
    endDate: "2024-06-10",
  },
  {
    // Registrations are open, but there is no delegate page yet: links go to the
    // partner-facing page. Drop `href` and `noDetailPage` once a delegate page exists
    // at /conferences/educarnival-iitdelhi-2026.
    slug: "educarnival-iitdelhi-2026",
    type: "conference",
    title: "Educarnival · IIT Delhi 2026",
    short: "Educarnival · IIT Delhi 2026",
    location: "IIT Delhi Campus, New Delhi",
    dateLabel: "28–29 Dec 2026",
    startDate: "2026-12-28",
    endDate: "2026-12-29",
    href: "/partnership",
    noDetailPage: true,
  },
  {
    slug: "educarnival-iitmadras-2026",
    type: "conference",
    title: "Educarnival · IIT Madras 2026",
    short: "Educarnival · IIT Madras 2026",
    location: "IIT Madras Campus, Chennai",
    dateLabel: "20–21 Apr 2026",
    startDate: "2026-04-20",
    endDate: "2026-04-21",
  },
  {
    slug: "educarnival-iitdelhi-2024",
    type: "conference",
    title: "Educarnival 2024",
    short: "Educarnival 2024",
    location: "IIT Delhi Campus, New Delhi",
    dateLabel: "15–16 November 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-02",
  },
];

export const getProgram = (slug) => PROGRAMS.find((p) => p.slug === slug);

// Upcoming programs first, registry order preserved within each group.
const upcomingFirst = (list, now = new Date()) =>
  [...list].sort((a, b) => isPast(a, now) - isPast(b, now));

export const studyVisits = () => upcomingFirst(PROGRAMS.filter((p) => p.type === "study-visit"));
export const conferences = () => upcomingFirst(PROGRAMS.filter((p) => p.type === "conference"));

// An event is "past" once its end date is before today.
export const isPast = (program, now = new Date()) =>
  new Date(program.endDate + "T23:59:59") < now;

export const detailHref = (p) =>
  p.href || (p.type === "conference" ? `/conferences/${p.slug}` : `/study-visits/${p.slug}`);

// Programs without a delegate page are still listed and open for registration, but
// the /conferences and /study-visits index redirects skip them (see `hasDetailPage`).
export const hasDetailPage = (p) => !p.noDetailPage;

// Programs still open for registration (not past). Conferences first.
export const openPrograms = (now = new Date()) =>
  [...conferences(), ...studyVisits()].filter((p) => !isPast(p, now));

// "Latest" = highest start date. Since upcoming dates are in the future and past
// dates are not, this picks an upcoming program when one exists, else the most
// recent past one. Used by the /study-visits and /conferences index redirects.
const latestByStartDate = (list) =>
  [...list].filter(hasDetailPage).sort((a, b) => b.startDate.localeCompare(a.startDate))[0];

export const latestStudyVisit = () => latestByStartDate(studyVisits());
export const latestConference = () => latestByStartDate(conferences());
