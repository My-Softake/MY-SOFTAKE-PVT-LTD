"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import {
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineUserCircle,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineLightBulb,
  HiOutlineDesktopComputer
} from "react-icons/hi";

import Button from "@/components/sheard/Button";

// Helper to safely get arrays from translations
const getArray = (t, key) => {
  try {
    // Check if the key exists first
    const message = t.raw(key);
    return Array.isArray(message) ? message : [];
  } catch (error) {
    // Return empty array if key doesn't exist (prevents console warnings)
    return [];
  }
};

const ProjectDetails = ({ params }) => {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const t = useTranslations("ProjectData");
  const locale = useLocale();

  // Check if project exists by trying to get its title
  let projectExists = true;
  try {
    t(`items.${projectId}.title`);
  } catch {
    projectExists = false;
  }

  // Get challenges and tech stack arrays
  const challenges = getArray(t, `items.${projectId}.challenges`);
  const techStack = getArray(t, `items.${projectId}.techStack`);
  const tags = getArray(t, `items.${projectId}.tags`);
  
  // Try to get benefits - fallback to empty if not available in translations
  let benefits = [];
  try {
    benefits = getArray(t, `items.${projectId}.benefits`);
  } catch {
    benefits = [];
  }

  if (!projectExists) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">{t("projectNotFound")}</h1>
      <Link href={`/${locale}`} className="text-blue-500 underline">{t("backToHome")}</Link>
    </div>
  );

  return (
    <main className="bg-[#f9fafb] min-h-screen pb-20 pt-30">


      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-8">
            <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-md">
              <Image
                src={t(`items.${projectId}.image`) || "/fallback.jpg"}
                alt={t(`items.${projectId}.title`)}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className=" ">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                {t(`items.${projectId}.title`)}
              </h1>
              <p className="font-normal text-gray-600 text-base pb-5">{t(`items.${projectId}.description`)}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("labels.projectOverview")}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {t(`items.${projectId}.longDescription`) || t(`items.${projectId}.description`)}
                </p>
              </div>

              {/* Challenges Section */}
              {challenges.length > 0 && (
                <section className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("labels.keyChallenges")}</h3>
                  <ul className="space-y-2 text-gray-600">
                    {challenges.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tech Stack Section */}
              {techStack.length > 0 && (
                <section className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <HiOutlineDesktopComputer className="text-purple-600" /> {t("labels.technologyStack")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {techStack.map((tech, i) => (
                      <div key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold text-gray-700">
                        {tech}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Benefits Section */}
              {benefits.length > 0 && (
                <section className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("labels.resultsBenefits")}</h3>
                  <ul className="space-y-2 text-gray-600">
                    {benefits.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mt-10">
                <h4 className="font-bold text-green-900 flex items-center gap-2 mb-2">
                  <HiOutlineCheckCircle className="text-xl" /> {t("labels.projectOutcome")}
                </h4>
                <p className="text-green-800">{t(`items.${projectId}.results`)}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-10">
              <h3 className="text-xl font-bold text-black mb-6 border-b pb-4">{t("labels.details")}</h3>
              <div className="space-y-6">
                <InfoItem icon={<HiOutlineUserCircle />} label={t("labels.client")} value={t(`items.${projectId}.client`)} notSpecified={t("labels.notSpecified")} />
                <InfoItem icon={<HiOutlineTag />} label={t("labels.category")} value={t(`items.${projectId}.category`)} notSpecified={t("labels.notSpecified")} />
                <InfoItem icon={<HiOutlineCalendar />} label={t("labels.date")} value={t(`items.${projectId}.date`)} notSpecified={t("labels.notSpecified")} />
                <InfoItem icon={<HiOutlineCheckCircle />} label={t("labels.status")} value={t(`items.${projectId}.status`)} isStatus notSpecified={t("labels.notSpecified")} />
              </div>
              {/* Case Study Link - For all projects 1-12 */}
              {/* <Link href={`/${locale}/case-study/${projectId}`} className="">
                <Button className="w-full mt-6 !bg-purple-600 !text-white py-4 rounded-xl font-bold cursor-pointer">
                  View Case Study
                </Button>
              </Link> */}
              
              <Link href={`/${locale}/contact`} className="">
                <Button className="w-full mt-4 !bg-blue-600 !text-white py-4 rounded-xl font-bold cursor-pointer">
                  {t("startSimilarProject")}
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

const InfoItem = ({ icon, label, value, isStatus, notSpecified }) => (
  <div className="flex items-start gap-4">
    <div className="text-2xl text-blue-600 mt-1">{icon}</div>
    <div>
      <p className="text-[10px] uppercase text-gray-400 font-black">{label}</p>
      <p className={`font-bold ${isStatus ? "text-green-600" : "text-gray-900"}`}>
        {value || notSpecified}
      </p>
    </div>
  </div>
);

export default ProjectDetails;