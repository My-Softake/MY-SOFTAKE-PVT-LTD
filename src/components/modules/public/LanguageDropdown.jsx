import { useRouter, usePathname } from "../../../i18n/routing";
import { useState, useTransition, useEffect } from "react";
import Flag from "react-world-flags";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

const countries = [
  { code: "US", label: "United States" },

  { code: "JP", label: "Japan" },
  { code: "CN", label: "China" },
  { code: "KR", label: "South Korea" },
];

const localeMap = {
  US: "en-US",
  GB: "en-GB",
  JP: "ja",
  CN: "zh",
  KR: "ko", // KR flag for Korean
};

const LanguageDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  // Find the country object that matches the current locale
  const getCountryFromLocale = (locale) => {
    const entry = Object.entries(localeMap).find(
      ([key, val]) => val === locale,
    );
    return entry ? countries.find((c) => c.code === entry[0]) : countries[0];
  };

  const [selected, setSelected] = useState(getCountryFromLocale(currentLocale));
  const [isOpen, setIsOpen] = useState(false);

  // Update selected when locale changes externally
  useEffect(() => {
    setSelected(getCountryFromLocale(currentLocale));
  }, [currentLocale]);

  const handleSelect = (country) => {
    setSelected(country);
    setIsOpen(false);

    const nextLocale = localeMap[country.code] || "en-US";

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative inline-block w-full max-w-[100px]">
      {/* Selected Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-2 py-2 cursor-pointer transition-all active:scale-90"
      >
        <div className="flex items-center gap-2">
          <Flag
            code={selected.code}
            className="w-8 h-5 rounded-sm object-cover shadow-sm"
          />
        </div>
        <HiChevronDown
          className={`text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown List with Animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to close */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            ></div>

            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute z-20 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl overflow-y-auto max-h-60 no-scrollbar"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {/* CSS for Chrome/Safari to hide scrollbar */}
              <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {countries.map((item) => (
                <motion.li
                  key={item.code}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                >
                  <button
                    onClick={() => handleSelect(item)}
                    className="flex justify-center items-center w-full py-3 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <Flag
                      code={item.code}
                      className="w-7 h-4 rounded-sm object-cover shadow-sm"
                    />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;
