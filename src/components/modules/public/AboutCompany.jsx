"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IoVideocamOutline } from "react-icons/io5";

const AboutCompany = () => {
  const t = useTranslations("AboutCompany");
  return (
    <div className="bg-white md:py-10 py-5">
      <div className="container mx-auto px-5 md:px-10 flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between">
        {/* Left Content */}
        <div>
          <h4 className="font-bold text-2xl text-[#27A0DB]">{t("title")}</h4>



          <p className="font-normal text-black text-base pt-5 max-w-[500px]">
            {t("description1")}
          </p>

          <p className="font-normal text-black text-base pt-5 max-w-[500px]">
            {t("description2")}
          </p>

          {/* Feature Items */}
          <div>
            <div className="mt-5 flex gap-5 items-start">
              <Image
                src="/images/experts.png"
                alt="experiance icon"
                height={40}
                width={60}
                className="object-contain"
              />
              <div className="mt-1">
                <h3 className="text-2xl text-black font-medium">{t("experience_title")}</h3>
                <p className="font-normal text-base text-gray-600">
                  {t("experience_desc")}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-5 items-start">
              <Image
                src="/images/support.png"
                alt="experiance icon"
                height={40}
                width={60}
                className="h-10 w-auto object-contain"
              />
              <div className="mt-1">
                <h3 className="text-2xl text-black font-medium">{t("quickSupport_title")}</h3>
                <p className="font-normal text-base text-gray-600">
                  {t("quickSupport_desc")}
                </p>
              </div>
            </div>

            <div>
              <button className="relative py-4 px-8 bg-[#0EA5E9] text-white mt-8 flex items-center gap-3 rounded-xl font-semibold overflow-hidden group hover:bg-[#0284c7] transition-all duration-300 shadow-lg shadow-blue-500/30">
                {/* Pulse Animation Effect */}
                <span className="absolute flex h-10 w-10  ">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                </span>

                <IoVideocamOutline className="text-xl ml-2 group-hover:scale-125 transition-transform duration-300" />
                <span className="relative">{t("introVideo")}</span>

                {/* Button Shine Effect on Hover */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="pt-0 lg:pt-8 flex justify-center">
          <Image
            src="/images/group_pik.png"
            alt="group pik"
            height={600}
            width={600}
            className="w-full max-w-[350px] sm:max-w-[450px] md:w-[600px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
