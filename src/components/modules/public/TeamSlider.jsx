"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css/bundle"; 

const teamMembers = [
  {
    name: "Md Abu Nahid",
    title: "Head of IT",
    image: "/images/emp 0ne.jpg",
  },
  {
    name: "Md Rony",
    title: "UI/UX Designer",
    image: "/images/emp three.jpg",
  },
  {
    name: "Md Abu Taleb Khan",
    title: "Frontend Developer",
    image: "/images/emp 0ne.jpg",
  },
  {
    name: "Md Abir",
    title: "Backend Engineer",
    image: "/images/emp three.jpg",
  },
  {
    name: "Md Abir",
    title: "Backend Engineer",
    image: "/images/emp three.jpg",
  },
  {
    name: "Md Abir",
    title: "Backend Engineer",
    image: "/images/emp three.jpg",
  },
];

export default function TeamSlider() {
  return (
    <section className="md:py-10 py-5 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Meet with our <span className="text-primary">Amazing Team Members</span>
        </h2>

        <Swiper
          modules={[Autoplay]}    
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-10 max-sm:mx-7">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
