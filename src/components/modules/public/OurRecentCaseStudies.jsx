"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

const OurRecentCaseStudies = () => {
  const t = useTranslations("OurRecentCaseStudies");
  const tCaseStudy = useTranslations("CaseStudy");
  const locale = useLocale();

  // Get case study IDs (1-6 for homepage)
  const caseStudyIds = ["1", "2", "3", "4", "5", "6"];

  // Get case studies data from translations
  const getCaseStudies = () => {
    return caseStudyIds.map((id) => {
      try {
        const raw = tCaseStudy.raw(`items.${id}`);
        return {
          id: parseInt(id),
          ...raw,
        };
      } catch (error) {
        console.warn(`Could not load case study ${id}:`, error.message);
        return null;
      }
    }).filter(Boolean);
  };

  const caseStudies = getCaseStudies();

  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto px-4 md:px-10">
        <h3 className="font-bold text-white text-3xl md:text-4xl text-center mb-12 uppercase tracking-widest">
          {t("title")}
        </h3>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-6">

            <CaseStudyCard
              item={caseStudies[0]}
              aspect="aspect-[16/9] lg:h-[400px]"
              locale={locale}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <CaseStudyCard
                item={caseStudies[1]}
                aspect="aspect-[4/3] lg:h-[250px]"
                locale={locale}
              />

              <CaseStudyCard
                item={caseStudies[2]}
                aspect="aspect-[4/3] lg:h-[250px]"
                locale={locale}
              />
            </div>
          </div>
          <div className="lg:col-span-5">

            <CaseStudyCard
              item={caseStudies[3]}
              aspect="aspect-[3/4]  min-h-[400px]"
              locale={locale}
            />
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-8">

            <CaseStudyCard
              item={caseStudies[4]}
              aspect="aspect-[21/9] lg:h-[300px]"
              locale={locale}
            />
          </div>
          <div className="lg:col-span-4">

            <CaseStudyCard
              item={caseStudies[5]}
              aspect="aspect-[4/3] lg:h-[300px]"
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const CaseStudyCard = ({ item, aspect, locale }) => {
  const t = useTranslations("OurRecentCaseStudies");
  const [isActive, setIsActive] = useState(false);

  if (!item) return null;

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`relative group w-full ${aspect} overflow-hidden rounded-2xl cursor-pointer bg-slate-900 transition-all duration-500`}
    >
      <Image
        src={Array.isArray(item.images) ? item.images[0] : item.images || "/images/placeholder.png"}
        alt={item.title}
        fill
        className={`object-cover transition-transform duration-700 ${isActive ? "scale-110" : "scale-100"
          }`}
      />

      {/* Blur & Content Layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-all duration-500 ${isActive ? "opacity-100" : "opacity-70"
          }`}
      />
      {/* Text & Button */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-500 delay-300 ${isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        <h4 className="text-xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
          {item.title}
        </h4>
        <Link href={`/${locale}/case-study/${item.id || ""}`}>
          <button className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-black cursor-pointer hover:bg-[#0EA5E9] hover:text-white transition-all duration-300 shadow-xl uppercase text-xs md:text-sm tracking-widest">
            {t("viewDetail")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OurRecentCaseStudies;
