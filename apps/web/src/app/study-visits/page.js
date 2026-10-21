import { redirect } from "next/navigation";
import { latestStudyVisit, detailHref } from "../../lib/programs";

// /study-visits redirects to the latest study visit (upcoming if any, else most recent past).
export default function StudyVisitsIndex() {
  redirect(detailHref(latestStudyVisit()));
}
