"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TeamSection = ({ title, members, subtitle, translateDesignation, translateName, translateEmail, translatePhone }) => {
  if (!members || members.length === 0) return null;

  return (
    <section className="py-10 mb-10">
      <div className="container mx-auto md:px-10">
        <h2 className="text-4xl text-black text-center font-bold mb-3">{title}</h2>
        {subtitle && (
          <p className="font-normal text-gray-600 text-base w-full md:w-[500px] text-center mx-auto pt-2 pb-10">
            {subtitle}
          </p>
        )}

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={members.length > 1}
          speed={800}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="team-swiper"
        >
          {members.map((member) => (
            <SwiperSlide key={member.id}>
              <div className="  rounded-3xl shadow-lg h-[500px] w-full md:w-[350px] transition-all duration-300 overflow-hidden group flex flex-col mb-10">
                <div className="relative w-full overflow-hidden flex items-center justify-center bg-gray-50">
                  <Image
                    src={member.image}
                    alt={translateName ? translateName(member.name) : member.name}
                    width={280}
                    height={280}
                    className="object-contain w-full rounded-lg group-hover:scale-105 transition-transform duration-500 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {translateName ? translateName(member.name) : member.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-4">
                    {translateDesignation ? translateDesignation(member.designation) : member.designation}
                  </p>
                  <div className="mt-auto space-y-2 pt-4 border-t border-gray-100">
                    {member.gmail && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{member.gmail}</span>
                      </div>
                    )}
                    {member.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{member.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .team-swiper .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.5;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }
        .team-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
