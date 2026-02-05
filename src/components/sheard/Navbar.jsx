"use client";

import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import LanguageDropdown from "../modules/public/LanguageDropdown";

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isHomePage = pathname === "/";

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Click Outside ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCompanyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path || pathname.endsWith(path);

  /* ---------------- Company Sublinks ---------------- */
  const companySubLinks = [
    { name: t("aboutUs"), path: "/about" },
    { name: t("team"), path: "/team" },
  ];

  const isCompanyActive = companySubLinks.some((sub) =>
    pathname.endsWith(sub.path),
  );

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("service"), path: "/service" },
    { name: t("project"), path: "/project" },
    { name: t("caseStudy"), path: "/case-study" },
    { name: t("company"), path: null, subLinks: companySubLinks },
    { name: t("contactUs"), path: "/contact" },
    { name: t("career"), path: "/career" },
  ];

  const navStyle = isHomePage
    ? `transition-colors duration-500 ${
        scrolled
          ? "bg-gray-900 text-white shadow-md"
          : "bg-transparent text-white"
      }`
    : "bg-[#1F2A3A] text-white shadow-md transition-colors duration-500";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${navStyle}`}>
      <div className="container mx-auto flex items-center justify-between py-5 px-6 md:px-10">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo my softake.png"
            alt="logo"
            width={60}
            height={30}
            className="h-10 w-auto"
          />
        </Link>

        {/* ================= Desktop Menu ================= */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              ref={link.subLinks ? dropdownRef : null}
            >
              {link.subLinks ? (
                <div
                  className="flex items-center gap-1 cursor-pointer select-none"
                  onClick={() => setCompanyOpen(!companyOpen)}
                >
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      companyOpen || isCompanyActive
                        ? "text-[#27A0DB]"
                        : "hover:text-[#27A0DB]"
                    }`}
                  >
                    {link.name}
                  </span>

                  <MdKeyboardArrowDown
                    className={`text-xl transition-transform duration-300 ${
                      companyOpen || isCompanyActive
                        ? "rotate-180 text-[#27A0DB]"
                        : ""
                    }`}
                  />

                  <div
                    className={`absolute top-full left-0 mt-4 w-48 bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-lg py-2 border-t-4 border-[#27A0DB]
                    transform transition-all duration-300 origin-top
                    ${
                      companyOpen
                        ? "opacity-100 scale-y-100 visible"
                        : "opacity-0 scale-y-0 invisible"
                    }`}
                  >
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        onClick={() => setCompanyOpen(false)}
                        className={`block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                        ${
                          isActive(sub.path) ? "text-[#27A0DB] font-bold" : ""
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.path}
                  className={`font-medium transition-colors duration-300 ${
                    isActive(link.path)
                      ? "text-[#27A0DB]"
                      : "hover:text-[#27A0DB]"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* ================= Actions ================= */}
        <div className="flex items-center gap-3 md:gap-5">
          <LanguageDropdown />

          {/*  FIXED Desktop Button */}
          <Link href="/schedule">
            <Button className="hidden md:inline-flex whitespace-nowrap px-6 hover:bg-[#27A0DB] duration-300">
              {t("bookNow")}
            </Button>
          </Link>

          <div
            className="md:hidden flex items-center"
            onClick={() => setOpen(true)}
          >
            <IoMdMenu className="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ================= Mobile Overlay ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* ================= Mobile Drawer ================= */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl z-[60]
        transform transition-transform duration-500 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6" onClick={() => setOpen(false)}>
          <IoMdClose className="text-3xl cursor-pointer hover:text-[#27A0DB]" />
        </div>

        <div className="flex flex-col gap-4 px-8 mt-4">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.subLinks ? (
                <>
                  <div
                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 cursor-pointer"
                    onClick={() => setCompanyOpen(!companyOpen)}
                  >
                    <span className="text-lg font-semibold">{link.name}</span>
                    <MdKeyboardArrowDown
                      className={`text-2xl transition-transform ${
                        companyOpen ? "rotate-180 text-[#27A0DB]" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 bg-gray-50 dark:bg-gray-800 rounded-lg ${
                      companyOpen ? "max-h-40 mt-2 py-2" : "max-h-0"
                    }`}
                  >
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        onClick={() => {
                          setOpen(false);
                          setCompanyOpen(false);
                        }}
                        className="block px-4 py-2 text-gray-600 dark:text-gray-300"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          {/*  Mobile Book Now Button */}
          <Link href="/schedule" onClick={() => setOpen(false)}>
            <Button className="w-full mt-4 bg-[#27A0DB] text-white hover:bg-[#1e8cc3]">
              {t("bookNow")}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
