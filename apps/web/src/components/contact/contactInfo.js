"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

export default function ContactInfo() {
  return (
    <div>
      <div>
        <div className="rounded-2xl bg-[#07142D] p-8 text-[#CDD3DA]">
          <h3 className="heading-font mb-5 text-[20px] font-bold text-white">
            Get in touch
          </h3>
          <div className="mb-5 flex gap-3.5">
            <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#FF9D29]/15 text-[#FF9D29]">
              <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <b className="block text-[14px] text-white">Office</b>
              <span className="text-[14px] leading-6">
                402, Fourth Floor, A-09, Northex GDITL Tower, Netaji Subhash
                Place, Delhi 110034
              </span>
            </div>
          </div>
          <div className="mb-5 flex gap-3.5">
            <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#FF9D29]/15 text-[#FF9D29]">
              <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <b className="block text-[14px] text-white">Phone</b>
              <span className="text-[14px] leading-6">
                <a className="hover:text-[#FF9D29]" href="tel:+918448385048">
                  +91 84483 85048
                </a>
                <br />
                <a className="hover:text-[#FF9D29]" href="tel:+918448187404">
                  +91 84481 87404
                </a>
                <br />
                <a className="hover:text-[#FF9D29]" href="tel:+917971418081">
                  +91 79714 18081
                </a>
              </span>
            </div>
          </div>
          <div className="flex gap-3.5">
            <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#FF9D29]/15 text-[#FF9D29]">
              <EmailOutlinedIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <b className="block text-[14px] text-white">Email</b>
              <span className="text-[14px] leading-6">
                <a
                  className="hover:text-[#FF9D29]"
                  href="mailto:arnab@eduexcellence.in"
                >
                  arnab@eduexcellence.in
                </a>
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            {[FacebookIcon, LinkedInIcon, InstagramIcon].map((Ic, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition hover:bg-[#FF9D29]"
              >
                <Ic sx={{ fontSize: 18 }} />
              </a>
            ))}
          </div>
        </div>
       <div className="mt-5 overflow-hidden rounded-2xl border border-[#E7E9F0] shadow-sm">
  <iframe
    src="https://maps.google.com/maps?q=Northex%20GDITL%20Tower%20Netaji%20Subhash%20Place%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="260"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
      </div>
    </div>
  );
}
