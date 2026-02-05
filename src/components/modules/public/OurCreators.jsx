"use client";

import Image from "next/image";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";

const OurCreators = () => {
  const t = useTranslations("OurCreators");

  return (
    <div className="py-12 md:py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="font-semibold text-3xl md:text-4xl text-black leading-tight">
            {t("title")}
          </h3>
          <p className="font-normal text-gray-600 text-sm md:text-base mt-4 px-4">
            {t("description")}
          </p>
        </div>

        {/* Image Grid Section */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">

          {/* Left Side Big Image (Group Pik) */}
          <div className="w-full lg:w-7/12">

            <div className="relative min-h-[350px] sm:min-h-[450px] md:h-[625px] w-full overflow-hidden rounded-3xl shadow-sm">
              <Image
                src="/images/group_pik.png"
                alt="group image"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side Small Images */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 md:gap-8">
            <div className="relative min-h-[250px] md:h-[300px] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/creators right.png"
                alt="creator right top"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative min-h-[200px] md:h-[220px] w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/creators right.png"
                  alt="creator right bottom"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Blue Banner Section */}
              <div className="bg-[#27A0DB] min-h-[85px] w-full flex items-center gap-4 rounded-2xl px-6 py-4 shadow-md mt-auto">
                <div className="flex-shrink-0 h-11 w-11 rounded-full bg-blue-700 flex items-center justify-center shadow-inner">
                  <IoCheckmarkSharp className="text-white text-xl md:text-2xl" />
                </div>
                <h3 className="font-medium text-white text-sm md:text-base leading-snug">
                  {t("teamworkQuote")}
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurCreators;
