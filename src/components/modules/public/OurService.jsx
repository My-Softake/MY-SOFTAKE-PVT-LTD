'use client';

import {
  FaIndustry,
  FaGlobe,
  FaLaptopCode,
  FaTruckMoving,
  FaPlaneDeparture,
  FaHardHat,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

const servicesData = [
  {
    id: 1,
    titleKey: "service1_title",
    descKey: "service1_desc",
    icon: <FaIndustry />,
  },
  {
    id: 2,
    titleKey: "service2_title",
    descKey: "service2_desc",
    icon: <FaGlobe />,
  },
  {
    id: 3,
    titleKey: "service3_title",
    descKey: "service3_desc",
    icon: <FaLaptopCode />,
  },
  {
    id: 4,
    titleKey: "service4_title",
    descKey: "service4_desc",
    icon: <FaTruckMoving />,
  },
  {
    id: 5,
    titleKey: "service5_title",
    descKey: "service5_desc",
    icon: <FaPlaneDeparture />,
  },
  {
    id: 6,
    titleKey: "service6_title",
    descKey: "service6_desc",
    icon: <FaHardHat />,
  },
];

const OurService = () => {
  const t = useTranslations("OurService");
  return (
    <section className="py-16 bg-[#F3FBFD]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {t("title")}
          </h2>
          <p className="mt-3 text-black max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="service-card group h-full flex flex-col justify-start"
            >
              <h3 className="text-2xl font-semibold text-white mb-3 pt-5">
                {t(service.titleKey)}
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {t(service.descKey)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurService;
