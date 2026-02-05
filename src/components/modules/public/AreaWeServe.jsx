"use client"

import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt } from "react-icons/fa";


const AreaWeServe = () => {
  const t = useTranslations("AreaWeServe");
  const regions = [
    { nameKey: "bangladesh", src: "/images/bd.png", color: "#006a4e" },
    { nameKey: "china", src: "/images/China.png", color: "#ee1c25" },
    { nameKey: "japan", src: "/images/japan.png", color: "#bc002d" },
    { nameKey: "uae", src: "/images/uae.png", color: "#00732f" },
  ];

  return (
    <div className="bg-[#F8F9FD] py-20">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Title Section */}
        <div className="flex flex-col items-center mb-16">
          <h3 className="font-black text-3xl md:text-4xl text-[#1e2b47] text-center tracking-widest relative">
            {t("title")}
            <span className="block w-16 h-1.5 bg-[#27A0DB] mt-4 mx-auto rounded-full"></span>
          </h3>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {regions.map((region, index) => (
            <div
              key={index}
              className="group flex flex-col items-center bg-white p-10 rounded-[20px] shadow-[20px_20px_60px_#d9d9d9,-20px_-20px_60px_#ffffff] transition-transform duration-300  "
            >
              {/* Flag Container with 3D shadow */}
              <div className="relative h-40 md:h-[100px] w-full rounded-2xl mb-12 drop-shadow-2xl">
                <Image
                  src={region.src}
                  alt={t(region.nameKey)}
                  fill
                  className="object-cover rounded-2xl border-2 border-white drop-shadow-2xl"
                />
              </div>

              {/* Pin Icon & Divider */}
              <div className="relative w-full flex flex-col items-center">
                <div className="absolute -top-6">
                  <FaMapMarkerAlt

                    size={24}
                    fill={region.color}
                    className="text-white drop-shadow-md"
                    style={{ color: region.color }}
                  />
                </div>
                <div className="h-[2px] bg-gray-300 w-full mt-5 mt-1">
                  <div className="h-1 w-1 rounded-full bg-red-600 mx-auto"></div>
                </div>
              </div>

              {/* Country Name */}
              <p className="font-extrabold text-sm md:text-base text-[#3d4b66] text-center mt-6 tracking-[0.3em] uppercase">
                {t(region.nameKey)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AreaWeServe;