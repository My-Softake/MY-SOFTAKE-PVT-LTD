'use client';

import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const OurPartner = () => {
  const t = useTranslations("OurPartner");
  return (
    <div className="bg-[#F5F5FA] md:py-10 py-5">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 bg-white rounded-2xl">
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-black text-center py-8 md:py-10">
          {t("title")}
        </h3>

        <div className="pb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
          <Image
            src="/images/rjsc logo.png"
            alt="partner one"
            width={220}
            height={200}
            className="object-contain w-[120px]"
          />

          <Image
            src="/images/uttorcity logo.png"
            alt="partner two"
            width={220}
            height={200}
            className="object-contain w-[80px]"
          />

          <Image
            src="/images/mpfcomm.png"
            alt="partner three"
            width={220}
            height={200}
            className="object-contain w-[140px] sm:w-[160px] md:w-[180px] lg:w-[220px]"
          />

          <Image
            src="/images/samr.png"
            alt="partner four"
            width={220}
            height={200}
            className="object-contain w-[140px] sm:w-[160px] md:w-[180px] lg:w-[220px]"
          />

          <Image
            src="/images/dcci.png"
            alt="partner five"
            width={220}
            height={200}
            className="object-contain w-[100px]"
          />
          <Image
            src="/images/gaccc.png"
            alt="partner five"
            width={220}
            height={200}
            className="object-contain w-[140px] sm:w-[160px] md:w-[180px] lg:w-[220px]"
          />
           <Image
            src="/images/basis.png"
            alt="partner five"
            width={220}
            height={200}
            className="object-contain w-[140px] sm:w-[160px] md:w-[180px] lg:w-[220px]"
          />
          <Image
            src="/images/jisa.png"
            alt="partner five"
            width={220}
            height={200}
            className="object-contain w-[110px]"
          />
           <Image
            src="/images/csia.png"
            alt="partner five"
            width={220}
            height={200}
            className="object-contain w-[140px] sm:w-[160px] md:w-[180px] lg:w-[220px]"
          />

        </div>
      </div>
    </div>
  );
};

export default OurPartner;
