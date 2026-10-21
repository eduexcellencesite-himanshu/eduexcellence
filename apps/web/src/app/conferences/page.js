import { redirect } from "next/navigation";
import { latestConference, detailHref } from "../../lib/programs";

// /conferences redirects to the latest Educarnival (upcoming if any, else most recent past).
export default function ConferencesIndex() {
  redirect(detailHref(latestConference()));
}
