"use client";
import Image from "next/image";
import Link from "next/link";
 
import { useLocale, useTranslations } from "next-intl";

const CaseStudyCard = () => {
  const locale = useLocale();
  const t = useTranslations("CaseStudy");

  // Case study IDs (1-12)
  const caseStudyIds = ["1", "2", "3", "4", "5", "6" ];

  // Helper to safely get array data
  const getArrayData = (key) => {
    try {
      const raw = t.raw(key);
      return Array.isArray(raw) ? raw : [];
    } catch (error) {
      console.warn(`Could not resolve ${key} in messages for locale ${locale}.`);
      return [];
    }
  };

  return (
    <div className="container mx-auto md:px-10 md:py-16 py-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {caseStudyIds.map((id) => {
          const images = getArrayData(`items.${id}.images`);
          const results = getArrayData(`items.${id}.results`);

          return (
            <div
              key={id}
              className="group relative overflow-hidden rounded-2xl h-[400px] md:h-[500px] cursor-pointer"
            >
              {images && images.length > 0 && (
                <Image
                  src={images[0]}
                  alt={t(`items.${id}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                />
              )}

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/70 to-transparent">

                <span className="text-[#27A0DB] font-semibold text-sm mb-3 tracking-wider uppercase">
                  {t(`items.${id}.duration`)}
                </span>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {t(`items.${id}.title`)}
                </h3>

                {results && results.length > 0 && (
                  <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <p className="text-gray-200 text-sm md:text-base border-l-4 border-[#27A0DB] pl-4 italic">
                      {results[0]}
                    </p>
                  </div>
                )}

                {/* View Case Study Button */}
                <div className="mt-6">
                  <Link href={`/${locale}/case-study/${id}`}>
                    <button className="text-white font-bold flex items-center gap-2 group-hover:text-[#27A0DB] transition-colors cursor-pointer">
                      {t("viewCaseStudy")}
                      <span className="transform group-hover:translate-x-2 transition-transform">
                        →
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStudyCard;
