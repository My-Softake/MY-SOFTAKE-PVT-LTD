import AboutCompany from "@/components/modules/public/AboutCompany";
import AreaWeServe from "@/components/modules/public/AreaWeServe";
import CounterSection from "@/components/modules/public/CounterSection";
import Hero from "@/components/modules/public/Hero";
import OurLetestProject from "@/components/modules/public/OurLetestProject";
import OurPartner from "@/components/modules/public/OurPartner";
import OurRecentCaseStudies from "@/components/modules/public/OurRecentCaseStudies";
import OurService from "@/components/modules/public/OurService";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <AboutCompany />
      <OurService />
      <OurLetestProject />
      <OurRecentCaseStudies />
      <CounterSection />
      <AreaWeServe />
      <OurPartner />
    </>
  );
};

export default page;
