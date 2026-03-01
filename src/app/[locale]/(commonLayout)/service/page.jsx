
import FAQSection from "@/components/modules/public/FAQSection";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
 
import { BsArrowRight } from "react-icons/bs";


export default async function ServicePage({params}) {
  const  {locale} = await params
  const t = await getTranslations("ServiceData", params);

  const serviceIds = ["1", "2", "3", "4", "5", "6"];

  return (
    <section className="pt-20 bg-[#f8f9fa]">
      <section className="relative h-[40vh] md:h-[32vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/about banner.png')` }}
        />
        <div className="relative z-10 text-center text-white pt-6 px-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 drop-shadow-lg">
            {t("herotitle")}
          </h1>
        </div>
      </section>
      <div className="container mx-auto px-4 mt-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            {t("title")}
          </h2>
          <p className="text-gray-600 text-lg pt-2">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {serviceIds.map((id) => (
            <div
              key={id}
              className="group relative bg-white rounded-[10px] border border-gray-100 shadow-sm duration-700 overflow-hidden flex flex-col h-full"
            >
              <div className="absolute -right-12 -top-12 w-10 h-10 bg-[#27A0DB] rounded-full group-hover:scale-[15] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-80 z-20 pointer-events-none"></div>

              {/* 1. Image Section */}
              <div className="w-full h-60 overflow-hidden relative z-10">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={t(`items.${id}.image`) || "/images/placeholder.png"}
                    alt={t(`items.${id}.title`)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* 2. Content Section */}

              <div className="relative z-30 p-5 pt-2 flex flex-col flex-grow">
                <h3 className="text-2xl font-extrabold text-slate-800 mb-4 group-hover:text-black transition-colors duration-500">
                  {t(`items.${id}.title`)}
                </h3>

                <p className="text-slate-500 text-base leading-relaxed mb-8 group-hover:text-black transition-colors duration-500 font-medium line-clamp-3">
                  {t(`items.${id}.desc`)}
                </p>

                {/* Button */}
                <div className="mt-auto">
                  <Link href={`/${locale}/service/${id}`}>
                    <button className="flex items-center gap-3 font-bold text-[#27A0DB] group-hover:text-black transition-all duration-500 cursor-pointer">
                      <span className="text-sm tracking-wider">
                        {t("exploreMore")}
                      </span>
                      <BsArrowRight
                        size={20}
                        className="group-hover:translate-x-2 transition-transform duration-500"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <FAQSection />
      </div>
    </section>
  );
}
