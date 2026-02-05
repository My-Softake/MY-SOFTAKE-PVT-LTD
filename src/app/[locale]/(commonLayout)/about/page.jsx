
import CounterSection from "@/components/modules/public/CounterSection";
import AboutCompany from "@/components/modules/public/AboutCompany";
import FeaturedOn from "@/components/modules/public/FeaturedOn";
import OurCreators from "@/components/modules/public/OurCreators";
import FAQSection from "@/components/modules/public/FAQSection";
import VisionMission from "@/components/modules/public/VisionMission";
import { getTranslations } from "next-intl/server";

const AboutPage = async ({params}) => {
  const t = await getTranslations("AboutPage", params);
  

  return (
    <main className="bg-white">
      <section className="relative h-[50vh] md:h-[40vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/about banner.png')`,
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl  md:text-5xl lg:text-6xl font-black tracking-tighter pt-16 mb-4 drop-shadow-lg">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      <div>
        <AboutCompany />
        <VisionMission />
        <CounterSection />
        <OurCreators />
        <FeaturedOn />
        <FAQSection />
      </div>
    </main>
  );
};

export default AboutPage;
