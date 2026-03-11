

import CaseStudyCard from "@/components/modules/public/CaseStudyCard";
import FAQSection from "@/components/modules/public/FAQSection";
import GetInTouch from "@/components/modules/public/GetInTouch";

import { getTranslations } from "next-intl/server";
 

const CaseStudy = async ({params}) => {
  const t = await getTranslations("CaseStudy", params);
  return (
    <div className="bg-white">
      <div className="container mx-auto px-10 md:pt-30 pt-24">
        <div className="">
          <h3 className="text-4xl font-semibold text-black text-center">
            {t("title")}
          </h3>
          <p className="font-normal text-base text-gray-600 text-center md:w-[550px] w-full mx-auto pt-2">
            {t("description")}
          </p>
        </div>
        <div className="">
          <CaseStudyCard />
          <FAQSection />
          <GetInTouch />
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;

// Case Studies

//     My Soft Take simplifies complex business challenges with smart,
//             intuitive technology—helping businesses grow faster and smarter.
