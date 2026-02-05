"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { FiMessageCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

/* =======================
   FAQ DATA (KEY BASED)
======================= */
const FAQ_DATA = [
  {
    q: "q1.question",
    a: "q1.answer",
    iconColor: "bg-blue-500",
  },
  {
    q: "q2.question",
    a: "q2.answer",
    iconColor: "bg-purple-500",
  },
  {
    q: "q3.question",
    a: "q3.answer",
    iconColor: "bg-emerald-500",
  },
  {
    q: "q4.question",
    a: "q4.answer",
    iconColor: "bg-orange-500",
  },
];

/* =======================
   FAQ ITEM
======================= */
const FAQItem = ({ faq, isOpen, onClick, t }) => {
  return (
    <div
      className={`mb-4 border-2 ${
        isOpen ? "border-blue-100 bg-blue-50/30" : "border-gray-100 bg-white"
      } rounded-2xl transition-all duration-300`}
    >
      <button
        onClick={onClick}
        className="w-full p-5 md:p-6 flex items-center text-left"
      >
        <div
          className={`flex-shrink-0 w-12 h-12 ${faq.iconColor} rounded-xl flex items-center justify-center text-white font-black text-xl mr-5`}
        >
          ?
        </div>

        <span
          className={`flex-grow text-lg md:text-xl font-bold ${
            isOpen ? "text-blue-600" : "text-slate-800"
          }`}
        >
          {t(faq.q)}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`ml-4 text-2xl ${
            isOpen ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <HiChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-6 md:pl-24 md:pr-10 text-slate-600 text-base md:text-lg">
              <div className="h-px w-full bg-gray-100 mb-4" />
              {t(faq.a)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =======================
   FAQ SECTION (PAGE)
======================= */
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const t = useTranslations("FAQSection");

  return (
    <section className="py-16 bg-white rounded-2xl">
      <div className="container mx-auto md:px-10">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center bg-[#BAD4FD] h-8 w-24 mx-auto rounded-full gap-2 mb-4">
            <FiMessageCircle className="text-blue-600" />
            <span className="text-blue-600 font-bold uppercase text-sm">
              {t("tag")}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900">
            {t("title")}
          </h2>

          <p className="text-gray-600 mt-2">
            {t("subtitle")}
          </p>
        </div>

        {/* FAQ LIST */}
        {FAQ_DATA.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            t={t}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
