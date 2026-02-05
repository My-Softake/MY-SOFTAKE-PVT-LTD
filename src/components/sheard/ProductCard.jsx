"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useLocale, useTranslations } from "next-intl";

const ProductCard = ({ projects, projectIds, t: externalT }) => {
  const locale = useLocale();
  const internalT = useTranslations("ProjectData");

  // Use external translation function if provided, otherwise use internal
  const t = externalT || internalT;

  // Support both old API (projects array) and new API (projectIds + t)
  if (projects && projects.length > 0) {
    // Old API: projects is an array of project objects
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm group flex flex-col h-full overflow-hidden border border-gray-100">
            <div className="relative h-70 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-xl text-slate-800 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-grow">{project.description}</p>
              <Link href={`/${locale}/project/${project.id}`}>
                <Button className="!text-black w-full py-3 cursor-pointer hover:!bg-[#0EA5E9] hover:!text-white duration-300 transition-all rounded-xl font-bold uppercase text-sm">
                  {t("viewDetails")}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // New API: projectIds + t (translation function)
  if (projectIds && projectIds.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectIds.map((id) => (
          <div key={id} className="bg-white rounded-xl shadow-sm group flex flex-col h-full overflow-hidden border border-gray-100">
            <div className="relative h-70 w-full overflow-hidden">
              <Image
                src={t(`items.${id}.image`)}
                alt={t(`items.${id}.title`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-xl text-slate-800 mb-2">{t(`items.${id}.title`)}</h3>
              <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-grow">{t(`items.${id}.description`)}</p>
              <Link href={`/${locale}/project/${id}`}>
                <Button className="!text-black w-full py-3 cursor-pointer hover:!bg-[#0EA5E9] hover:!text-white duration-300 transition-all rounded-xl font-bold uppercase text-sm">
                  {t("viewDetails")}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Fallback: empty state
  return <div className="text-center text-gray-500 py-10">No projects found</div>;
};
export default ProductCard;