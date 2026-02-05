"use client";

import FAQSection from "@/components/modules/public/FAQSection";
import Image from "next/image";
import { use } from "react";
import { useTranslations } from "next-intl";

const ServiceDetails = ({ params }) => {
  const resolvedParams = use(params);
  const serviceId = resolvedParams.id;
  const t = useTranslations("ServiceData");

  // Helper to safely get array data
  const getArray = (key) => {
    const data = t.raw(key);
    return Array.isArray(data) ? data : [];
  };

  const processList = getArray(`items.${serviceId}.process`);
  const benefitsList = getArray(`items.${serviceId}.benefits`);

  return (
    <div className="bg-white">
      <div
        className="py-10 mt-10 md:py-20"
        style={{
          background: "linear-gradient(135deg, #17386f 0%, #2b59cf 100%)",
        }}
      >
        <div className="container mx-auto px-4 md:px-10">
          {/* Heading */}
          <h1 className="font-semibold text-white text-3xl sm:text-4xl md:text-5xl pt-6 md:pt-10 text-center md:text-left">
            {t("servicedetailspage")}
          </h1>

          {/* Divider & Text */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 mt-8">
            {/* Line */}
            <div className="h-1 w-32 sm:w-48 md:w-[450px] bg-white hidden md:block"></div>

            {/* Description */}
            <p className="font-normal text-sm sm:text-base text-white max-w-xl text-center md:text-left">
              {t("servicedetailspageparagraph")}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-10 pb-10 pt-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-black">
              {t(`items.${serviceId}.title`)}
            </h1>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              {t(`items.${serviceId}.headline`)}
            </h2>

            {/* Show BrainAlgo for IT Service */}
            {serviceId === "1" && (
              <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-gray-700">
                  Our dedicated IT team,{" "}
                  <span className="font-bold text-blue-600 text-lg">
                    BrainAlgo
                  </span>
                  , specializes in cutting-edge technology solutions and digital
                  transformation.
                </p>
              </div>
            )}

            <p className="text-gray-600 text-lg">
              {t(`items.${serviceId}.desc`)}
            </p>
          </div>
          <div className="md:w-1/2 relative h-[330px] md:h-[400px] w-full">
            <Image
              src={t(`items.${serviceId}.image`) || "/images/placeholder.png"}
              alt={t(`items.${serviceId}.title`)}
              fill
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        </div>

        {/* Why Choose Us / Overview */}
        {/* Note: Original code used "Why Choose Us" header for "Overview" section... I will stick to structure or fix it.
          Original code: 
          <div className="">
             <h3 ...>Overview</h3>
             <p>{service.overview_one}</p>
             <p>{service.overview_two}</p>
          </div>
          ...
          <div className="pt-5">
             <h3 ...>Why Choose Us</h3>
             <p>{service.why_choose_us}</p>
             <p>{service.choce_one}</p>
          </div>
      */}

        <div className="">
          <h3 className="text-4xl text-black font-semibold mb-4 flex items-center gap-2">
            Overview
          </h3>
          <p className="text-gray-700">
            {t(`items.${serviceId}.overview_one`)}
          </p>

          <p className="text-gray-700 pt-2">
            {t(`items.${serviceId}.overview_two`)}
          </p>
        </div>

        <div className="pt-5">
          <h3 className="text-2xl text-black font-semibold mb-4 flex items-center gap-2">
            Why Choose Us
          </h3>
          <p className="text-gray-700">
            {t(`items.${serviceId}.why_choose_us`)}
          </p>
          <p className="text-gray-700 pt-2">
            {t(`items.${serviceId}.choce_one`)}
          </p>
        </div>

        {/* Process */}
        <div className="mb-12 pt-10">
          <h3 className="text-2xl text-black font-semibold mb-6 flex items-center gap-2">
            Our Process
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {processList.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h3 className="text-2xl text-black font-semibold mb-6 flex items-center gap-2">
            Benefits
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {benefitsList.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="">
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
