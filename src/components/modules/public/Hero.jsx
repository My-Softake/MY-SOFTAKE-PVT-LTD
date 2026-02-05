"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../sheard/Button";
import { FaLinkedinIn } from "react-icons/fa6";

import Link from "next/link";

const sliderData = [
  {
    id: 1,
    titleKey: "slide1_title",
    descKey: "slide1_desc",
    image: "/images/hero_Banner_one.png",
  },
  {
    id: 2,
    titleKey: "slide2_title",
    descKey: "slide2_desc",
    image: "/images/hero_banner_two.png",
  },
  {
    id: 3,
    titleKey: "slide3_title",
    descKey: "slide3_desc",
    image: "/images/hero_banner_three.png",
  },
  {
    id: 4,
    titleKey: "slide4_title",
    descKey: "slide4_desc",
    image: "/images/hero_banner_four.png",
  },
  {
    id: 5,
    titleKey: "slide5_title",
    descKey: "slide5_desc",
    image: "/images/hero_banner_five.png",
  },
  {
    id: 6,
    titleKey: "slide6_title",
    descKey: "slide6_desc",
    image: "/images/hero_banner_six.png",
  },
];

const Hero = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  const progressWidth = ((currentIndex + 1) / sliderData.length) * 100;

  const previewImages = [
    sliderData[currentIndex],
    sliderData[(currentIndex + 1) % sliderData.length],
    sliderData[(currentIndex + 2) % sliderData.length],
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-gray-900 text-white">
      {/* Background Hero with Fade Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sliderData[currentIndex].image})` }}
        >
          <div className="absolute inset-0 bg-black/40 bg-linear-to-r from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto h-full flex flex-col justify-between px-4 sm:px-6 lg:px-12 pt-20 lg:pt-24">
        {/* Hero Content */}
        <div className="flex flex-col max-sm:pt-10 lg:flex-row items-center h-full">
          <motion.div
            key={currentIndex}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[55%] space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[50px] md:leading-[75px] font-bold max-w-[830px]">
              {t(sliderData[currentIndex].titleKey)}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-md">
              {t(sliderData[currentIndex].descKey)}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button className="cursor-pointer hover:bg-[#27A0DB] duration-300">
                {t("getStarted")}
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Controls & Social */}
        <div className="flex flex-col gap-6 pb-30 lg:pb-20">
          <div className="flex items-center gap-10">
            <div className="flex gap-6 text-xl text-gray-300">
              <Link href="https://www.facebook.com/mysoftake" target="_blank">
                <FaFacebookF className="hover:text-[#27A0DB] duration-300 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://www.twiteer.com/mysoftake" target="_blank">
                <FaTwitter className="hover:text-[#27A0DB] duration-300 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://www.insta.com/mysoftake" target="_blank">
                <FaInstagram className="hover:text-[#27A0DB] duration-300 cursor-pointer transition-colors" />
              </Link>

              <Link
                href="https://www.linkedin.com/company/my-softake/"
                target="_blank"
              >
                <FaLinkedinIn className="hover:text-[#27A0DB] duration-300 cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>

          {/* Controls + Progress */}
          <div className="flex items-center md:justify-end gap-10 md:gap-30">
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-white group transition-all"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 27 38"
                  fill="none"
                  className="h-5 w-5 rotate-180"
                >
                  <path
                    d="M25.395 19.4582L0.39502 37.3976L15.1677 19.4582L0.39502 0.397583L25.395 19.4582Z"
                    fill="white"
                    className="group-hover:fill-black"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-white group transition-all"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 27 38"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M25.395 19.4582L0.39502 37.3976L15.1677 19.4582L0.39502 0.397583L25.395 19.4582Z"
                    fill="white"
                    className="group-hover:fill-black"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full max-w-[260px]">
              <div className="w-full h-[2px] bg-gray-600 relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-yellow-400"
                  animate={{ width: `${progressWidth}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-lg font-mono">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Animated Preview Slider */}
      <div className="absolute right-0 bottom-1/4 translate-x-[5%] z-20 hidden lg:flex items-end gap-6 overflow-visible">
        <AnimatePresence mode="popLayout">
          {previewImages.slice(0, 2).map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`rounded-xl overflow-hidden  shadow-2xl ${
                idx === 0 ? "w-80 h-52  z-30" : "w-80 h-52  opacity-60 scale-90"
              }`}
            >
              <Image
                src={item.image}
                alt="preview"
                width={400}
                height={300}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
