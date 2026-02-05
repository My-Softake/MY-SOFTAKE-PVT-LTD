"use client";

import Link from "next/link";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useTranslations, useLocale } from "next-intl";
import FAQSection from "@/components/modules/public/FAQSection";
import ContactForm from "@/components/ContactForm";
 

const ContactPage = () => {
  const t = useTranslations("ContactPage");
  const locale = useLocale();

  const helpOptions = [
    { key: "webDevelopment", label: t("helpOptions.webDevelopment") },
    { key: "uiUxDesign", label: t("helpOptions.uiUxDesign") },
    { key: "appDevelopment", label: t("helpOptions.appDevelopment") },
    { key: "digitalMarketing", label: t("helpOptions.digitalMarketing") },
    { key: "consultancy", label: t("helpOptions.consultancy") },
    { key: "manufacturing", label: t("helpOptions.manufacturing") },
    { key: "export", label: t("helpOptions.export") },
    { key: "it", label: t("helpOptions.it") },
    { key: "transport", label: t("helpOptions.transport") },
    { key: "travel", label: t("helpOptions.travel") },
    { key: "construction", label: t("helpOptions.construction") },
  ];

  const contactInfo = [
    {
      id: 1,
      title: t("contactInfo.address.title"),
      details: t("contactInfo.address.details"),
      icon: <HiOutlineMapPin className="text-3xl" />,
    },
    {
      id: 2,
      title: t("contactInfo.phone.title"),
      details: t("contactInfo.phone.details"),
      icon: <HiOutlinePhone className="text-3xl" />,
    },
    {
      id: 3,
      title: t("contactInfo.email.title"),
      details: t("contactInfo.email.details"),
      icon: <HiOutlineMail className="text-3xl" />,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[40vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/about banner.png')` }}
        />
        <div className="relative z-10 text-center text-white pt-10 px-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 drop-shadow-lg">
            {t("hero.title")}
          </h1>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="bg-white pt-10 px-4 font-sans">
        <div className="container mx-auto max-w-6xl text-center">
          <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm">
            {t("getInTouch")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-5 mb-8 md:w-[600px] mx-auto leading-[1.1]">
            {t("mainHeading")}
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            {t("generalEnquiry")}
            <Link
              href={`mailto:${t("email")}`}
              className="text-blue-600 font-semibold hover:underline px-2"
            >
              {t("email")}
            </Link>
            {t("orCallOn")}{" "}
            <span className="text-blue-600 font-semibold">{t("phone")}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
            {contactInfo.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-10 bg-white shadow-md rounded-xl border border-gray-50 transition-all duration-500 group"
              >
                <div className="w-16 h-16 text-blue-600 rounded-full flex items-center justify-center bg-blue-50">
                  {item.icon}
                </div>
                <div className="ml-7">
                  <h4 className="font-bold text-xl text-slate-800 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 font-medium w-46">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-slate-600 font-medium text-lg my-10">
            {t("branchesText")}
          </p>
          <div className="w-full h-[550px] rounded-2xl overflow-hidden shadow-inner bg-gray-100 border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4297.131886628774!2d90.39888879389679!3d23.875514034491435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1768989416841!5m2!1sen!2sbd"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* আলাদা করে নেওয়া Contact Form Component */}
          <ContactForm t={t} helpOptions={helpOptions} />

          <div>
            <FAQSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;