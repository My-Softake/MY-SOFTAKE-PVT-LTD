"use client";

import ProductCard from "@/components/sheard/ProductCard";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import GetInTouch from "@/components/modules/public/GetInTouch";

const ProjectPage = () => {
  const t = useTranslations("ProjectData");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get project IDs (1-12)
  const projectIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  // Get category IDs (1-3)
  const categoryIds = ["1", "2", "3"];

  // Filtered projects based on selected category
  const filteredProjectIds =
    selectedCategory === "All"
      ? projectIds
      : projectIds.filter((id) => t(`items.${id}.category`) === selectedCategory);

  return (
    <div className="pt-30 bg-gray-50">
      <div className="container mx-auto px-10">
        <h3 className="font-bold text-black text-center text-4xl">{t("pageTitle")}</h3>
        <p className="text-base text-gray-600 font-normal text-center w-full max-sm:px-3 md:w-[500px] mx-auto pt-5">
          {t("pageDescription")}
        </p>

        {/* Category Buttons */}
        <div className=" flex flex-wrap justify-center gap-3 mt-8 mb-10">
          <button
            className={`px-4 py-2 rounded-full font-medium transition ${selectedCategory === "All"
                ? "bg-[#00B3EC] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#00B3EC] hover:text-white"
              }`}
            onClick={() => setSelectedCategory("All")}
          >
            {t("allCategory")}
          </button>
          {categoryIds.map((catId) => {
            const categoryName = t(`categories.${catId}`);
            return (
              <button
                key={catId}
                className={`px-4 py-2 rounded-full font-medium transition ${selectedCategory === categoryName
                    ? "bg-[#00B3EC] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-[#00B3EC] hover:text-white"
                  }`}
                onClick={() => setSelectedCategory(categoryName)}
              >
                {categoryName}
              </button>
            );
          })}
        </div>

        {/* Product Cards */}
        <div className="">
          <ProductCard projectIds={filteredProjectIds} t={t} />
        </div>
      </div>
      <div className="">
        <GetInTouch />
      </div>
    </div>
  );
};

export default ProjectPage;

