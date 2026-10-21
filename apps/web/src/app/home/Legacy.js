"use client";

const stats = [
  {
    number: "14",
    label: "Years in the K–12 industry",
  },
  {
    number: "250+",
    label: "Industry partners",
  },
  {
    number: "750+",
    label: "Research papers published",
  },
  {
    number: "4000+",
    label: "School leaders engaged",
  },
];

export default function Legacy({ className = "" }) {
  return (
    <section className={`py-[72px] bg-white ${className}`}>
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Heading */}
        <div className="mx-auto mb-10 lg:mb-16 max-w-[760px] text-center">
          <span className="inline-block rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#E8861A]">
            Our Legacy
          </span>

          <h2 className="mt-6 font-['Plus_Jakarta_Sans'] text-[30px] lg:text-[38px] font-extrabold leading-tight text-[#16223A]">
            14 years of excellence in school education
          </h2>

          <p className="mt-5 text-[16px] lg:text-[18px] leading-8 text-[#6B7488]">
            Backed by CII, UNICEF, government bodies, foreign embassies and
            <br></br>
            international education specialists.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#F7F8FB] px-8 py-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className=" lg:text-[44px] text-[35px] font-extrabold leading-none text-[#FF9D29]">
                {item.number}
              </h3>

              <p className="mt-4 text-[15px] font-medium leading-7 text-[#3A4660]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}