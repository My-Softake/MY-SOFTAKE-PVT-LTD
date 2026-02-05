"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/sheard/ProductCard";

const OurLetestProject = () => {
  const t = useTranslations("OurLatestProject");
  const tProject = useTranslations("ProjectData");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Project IDs (1-12) and category IDs (1-3)
  const projectIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const categoryIds = ["1", "2", "3"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter projects based on selected category
  const filteredProjectIds = selectedCategory === "All"
    ? projectIds
    : projectIds.filter((id) => tProject(`items.${id}.category`) === selectedCategory);

  const totalSlides = Math.ceil(filteredProjectIds.length / itemsPerView);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
   <div className="bg-white">
     <div className="pt-10 pb-5 container mx-auto px-4 relative ">
      <h3 className="font-bold text-center text-4xl text-slate-900">{t("title")}</h3>
      <p className="text-base text-center md:w-[500px] mx-auto pt-5 text-gray-600 ">
        {t("description")}
      </p>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
        <button
          className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === "All" ? "bg-[#00B3EC] text-white" : "bg-gray-200 text-gray-700 hover:bg-[#00B3EC] hover:text-white"}`}
          onClick={() => { setSelectedCategory("All"); setCurrentIndex(0); }}
        > {tProject("allCategory")} </button>
        {categoryIds.map((catId) => {
          const categoryName = tProject(`categories.${catId}`);
          return (
            <button
              key={catId}
              className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === categoryName ? "bg-[#00B3EC] text-white" : "bg-gray-200 text-gray-700 hover:bg-[#00B3EC] hover:text-white"}`}
              onClick={() => { setSelectedCategory(categoryName); setCurrentIndex(0); }}
            > {categoryName} </button>
          );
        })}
      </div>

      {/* Slider Main Wrapper */}
      <div className="relative  px-2 md:px-10">

        {/* Navigation Buttons  */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-md p-3 rounded-full disabled:opacity-30 transition-all hover:bg-white hover:scale-110 active:scale-95"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#535353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex === totalSlides - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-md p-3 rounded-full disabled:opacity-30 transition-all hover:bg-white hover:scale-110 active:scale-95"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#535353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}


        <div className="overflow-hidden">
          <div
            className="duration-700 ease-in-out flex"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, i) => {
              const slideProjectIds = filteredProjectIds.slice(i * itemsPerView, (i + 1) * itemsPerView);
              return (
                <div key={i} className="min-w-full px-2 mb-5">
                  <ProductCard projectIds={slideProjectIds} t={tProject} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots*/}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8  mb-10">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-8 bg-[#00B3EC]" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
   </div>
  );
};

export default OurLetestProject;