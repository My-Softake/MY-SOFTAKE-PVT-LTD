
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const CareerPage = async ({params}) => {
  const { locale } = await params;
  const t = await getTranslations("CareerPage", params);

  // Job IDs (1-6)
  const jobIds = ["1", "2", "3", "4", "5", "6"];

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="relative h-[50vh] md:h-[40vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/about banner.png')` }}
        ></div>

        <div className="relative z-10 text-center text-white px-4 pt-20 md:pt-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 drop-shadow-lg md:leading-[70px]">
            {t("hero.title")}
          </h1>
          <p className="text-white/90 mt-4 max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-3xl dark:text-black font-semibold text-center mb-12">{t("whyJoin.title")}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-xl shadow bg-gray-50 transition">
              <h3 className="text-xl dark:text-black font-semibold mb-3">{t(`whyJoin.item${i}Title`)}</h3>
              <p className="text-gray-600">{t(`whyJoin.item${i}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS / CAREER CARDS */}
      <div className="bg-white">
        <div className="container mx-auto px-6">
          <h3 className="uppercase dark:text-black font-semibold text-[20px] border-b-3 border-[#27A0DB] w-38 pb-2">
            {t("openPositionsTitle")}
          </h3>
          <h2 className="text-5xl dark:text-black font-semibold pt-4">{t("openPositionsSubtitle")}</h2>

          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              {jobIds.map((id) => (
                <div key={id} className="bg-[#F5F5F5] border border-gray-300 shadow-sm rounded-sm p-8 md:p-12 w-full max-w-[700px] relative transition-all">
                  {/* Top Badge */}
                  <div className="absolute top-0 left-0 bg-[#0A0A23] text-white px-6 py-3 text-sm font-medium">
                    {t(`items.${id}.jobType`)}
                  </div>

                  <div className="mt-8">
                    <h2 className="text-3xl md:text-3xl font-bold text-[#0A1A3F] mb-6 leading-tight">
                      {t(`items.${id}.jobTitle`)}
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
                      {t(`items.${id}.description`)}
                    </p>

                    <Link href={`/${locale}/career/${id}`}>
                      <button className="bg-[#27A0DB] text-white px-8 py-4 rounded-sm font-bold text-lg flex items-center gap-3 transition-colors group">
                        {t("applyButton")}
                        <span className="bg-white text-[#27A0DB] rounded-full p-1 transition-transform group-hover:translate-x-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HIRING PROCESS */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-3xl dark:text-black font-semibold text-center mb-12">{t("hiringProcess.title")}</h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#2b59cf] text-white font-bold mb-4">
                {i}
              </div>
              <p className="font-medium dark:text-black">{t(`hiringProcess.step${i}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: "linear-gradient(135deg, #17386f 0%, #2b59cf 100%)" }}>
        <h2 className="text-3xl font-semibold text-white">{t("cta.title")}</h2>
        <p className="text-white/90 mt-4">{t("cta.subtitle")}</p>

        <button className="mt-8 px-12 py-4 bg-white text-[#17386f] font-semibold rounded-md hover:bg-gray-100 transition">
          {t("cta.button")}
        </button>
      </section>
    </div>
  );
};

export default CareerPage;
