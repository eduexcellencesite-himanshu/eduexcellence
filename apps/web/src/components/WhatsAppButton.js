"use client";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function WhatsAppButton() {
  const phone = "919990418600"; // Replace with your WhatsApp number

  const message = encodeURIComponent(
    `Hello EduExcellence Team,

I would like to know more about Educarnival and the partnership opportunities available.
Please share the details.

Thank you!`,
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[76px] right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110 md:bottom-24 md:right-6 md:h-14 md:w-14"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon sx={{ fontSize: { xs: 26, md: 34 } }} />
    </a>
  );
}
