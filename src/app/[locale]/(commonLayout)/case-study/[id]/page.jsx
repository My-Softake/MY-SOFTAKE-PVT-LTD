"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
 
import { useTranslations, useLocale } from "next-intl";

const CaseStudyDetailsPage = () => {
  const { id } = useParams();
  const t = useTranslations("CaseStudy");
  const locale = useLocale();

  // Helper to safely get arrays from translations
  const getArray = (key) => {
    try {
      const raw = t.raw(key);
      return Array.isArray(raw) ? raw : [];
    } catch (error) {
      console.warn(
        `Could not resolve ${key} in messages for locale ${locale}. Error: ${error.message}`,
      );
      return [];
    }
  };

  // Get case study data
  const caseStudy = {
    title: t(`items.${id}.title`),
    duration: t(`items.${id}.duration`),
    investment: t(`items.${id}.investment`),
    target: t(`items.${id}.target`),
    overview: t(`items.${id}.overview`),
    overview1: t(`items.${id}.overview1`),

    challenges: getArray(`items.${id}.challenges`),
    approach: getArray(`items.${id}.approach`),
    solution: getArray(`items.${id}.solution`),
    technologies: getArray(`items.${id}.technologies`),
    results: getArray(`items.${id}.results`),
    images: getArray(`items.${id}.images`),
  };

  // Check if case study exists
  let caseStudyExists = true;
  try {
    t(`items.${id}.title`);
  } catch {
    caseStudyExists = false;
  }

  if (!caseStudyExists || !caseStudy.title) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">{t("notFound")}</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div
        className="py-10 mt-10 md:py-20"
        style={{
          background: "linear-gradient(135deg, #17386f 0%, #2b59cf 100%)",
        }}
      >
        <div className="container mx-auto px-4 md:px-10">
          <h1 className="font-semibold text-white text-3xl md:text-5xl pt-6">
            {t("caseStudyDetails")}
          </h1>

          <p className="text-white max-w-xl mt-6">{t("bannerDescription")}</p>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-10 py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#001b3d] mb-12">
          {caseStudy.title}
        </h2>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b pb-12">
          <div>
            <h4 className="text-[#e85a2a] font-bold text-sm uppercase">
              {t("totalDuration")}
            </h4>
            <p className="font-normal text-base text-gray-500">{caseStudy.duration}</p>
          </div>
          <div>
            <h4 className="text-[#e85a2a] font-bold text-sm uppercase">
              {t("estimatedInvestment")}
            </h4>
            <p className="font-normal text-base text-gray-500">{caseStudy.investment}</p>
          </div>
          <div>
            <h4 className="text-[#e85a2a] font-bold text-sm uppercase">
              {t("projectTarget")}
            </h4>
            <p className="font-normal text-base text-gray-500">{caseStudy.target}</p>
          </div>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-black">{t("overview")}</h3>
            <p className="text-gray-600 text-lg">{caseStudy.overview}</p>
            <p className="text-gray-600 text-lg mt-3">{caseStudy.overview1}</p>
          </div>

          {caseStudy.images.length > 0 && (
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={caseStudy.images[0]}
                alt="Overview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16  mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-black">{t("challenges")}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
              {caseStudy.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>

          {caseStudy.images.length > 1 && (
            <div className="relative h-[300px] rounded-lg overflow-hidden mt-5">
              <Image
                src={caseStudy.images[2]}
                alt="Challenges"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-black">{t("approach")}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
              {caseStudy.approach.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {caseStudy.images.length > 2 && (
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={caseStudy.images[2]}
                alt="Approach"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-black">{t("solution")}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
              {caseStudy.solution.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {caseStudy.images.length > 3 && (
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={caseStudy.images[3]}
                alt="Solution"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        {/* Technologies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-black">{t("technologies")}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
              {caseStudy.technologies.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {caseStudy.images.length > 3 && (
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={caseStudy.images[3]}
                alt="Solution"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <h3 className="text-3xl font-bold mb-6 text-black">{t("result")}</h3>
          <ul className="space-y-4">
            {caseStudy.results.map((res, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-bold text-[#001b3d]">✓</span>
                <p className="text-gray-700 text-lg">{res}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetailsPage;
