"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const VisionMission = () => {
  const t = useTranslations("VisionMission");

  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-10">
        {/* Vision Section */}
        <div className="flex flex-col md:flex-row gap-20 mb-10">
          <div className="w-full md:w-1/2 space-y-4 order-2 md:order-1">
            <h3 className="font-semibold dark:text-black text-4xl">
              {t("visionTitle")}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed text-justify md:text-left">
              {t("visionDesc")}
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="relative group">
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#27A0DB] rounded-lg -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-500"></div>
              <Image
                src="/images/vision.png"
                alt={t("visionTitle")}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-gray-900 rounded-lg -z-10 group-hover:bottom-0 group-hover:left-0 transition-all duration-500"></div>
              <Image
                src="/images/mision.png"
                alt={t("missionTitle")}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="font-semibold dark:text-black text-4xl">
              {t("missionTitle")}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed text-justify md:text-left">
              {t("missionDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
