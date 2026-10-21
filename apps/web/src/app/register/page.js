import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import RegisterForm from "../../components/forms/RegisterForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const metadata = { title: "Reserve a seat — EduExcellence" };

export default async function RegisterPage({ searchParams }) {
  const sp = await searchParams;
  const program = sp?.program ?? null;

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_-20%,#FFF3E2_0%,transparent_45%)]  py-[72px]">
          <div className="absolute -left-24 top-0 h-[280px] w-[280px] rounded-full bg-[#FF9D29]/20 blur-[120px]" />

          <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#FF9D29]/20 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-[1180px] px-6">
            <div className="max-w-[720px]">
              <span className="inline-flex rounded-full bg-[#FFf] md:bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
                Registration
              </span>

              <h1 className="heading-font mt-6 text-[30px] font-extrabold leading-tight text-[#16223A] lg:text-[48px]">
                Reserve your <span className="text-[#FF9D29]">seat</span>
              </h1>

              <p className="mt-4 max-w-[620px] text-[16px]  lg:mt-6  lg:text-[18px]  leading-8 text-[#6B7488]">
                Fill in your details once — our team confirms your seat and
                shares everything you need. Takes about two minutes.
              </p>

            
            </div>
          </div>
        </section>
        
        <section className="pt-14 pb-20">
          <RegisterForm initialProgram={program} />
        </section>
      </main>
      <Footer />
    </>
  );
}
