import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const GetInTouch = () => {
const locale = useLocale();  
   const t = useTranslations("GetInTouch");
  return (
    <div className="pb-10 pt-10 px-4">
      <div className="container mx-auto md:px-10">
        <div
          className="
            py-12 
            w-full max-w-[800px]
            rounded-3xl mx-auto 
            flex flex-col items-center justify-center 
            text-center px-6 sm:px-8 md:px-10
            shadow-2xl relative overflow-hidden
          "
          style={{
            background: "linear-gradient(135deg, #17386f 0%, #2b59cf 100%)",
          }}
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>

          {/* Heading */}
          <h3 className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl max-w-[900px] leading-snug md:leading-[60px] z-10">
           {t("title")}
          </h3>

          {/* Subtext */}
          <p className="font-light text-white/80 pt-6 text-sm sm:text-base md:text-xl max-w-2xl z-10">
            {t("peragraph")}
          </p>

          {/* Button */}
         <Link href={`/${locale}/contact`}>
            <button
              className="
                px-6 py-3 sm:px-8 md:px-10 md:py-3 mt-8 sm:mt-10
                bg-white text-[#17386f] font-bold text-base sm:text-lg
                rounded-xl cursor-pointer
                hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300
                shadow-[0_10px_20px_rgba(0,0,0,0.2)] z-10
              "
            >
              {t("btntext")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
