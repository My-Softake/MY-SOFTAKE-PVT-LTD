import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsBriefcase } from "react-icons/bs";

const Footer = () => {
  const locale = useLocale(); 
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");  
    const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1a2533] text-gray-300 py-12 px-6 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* 1. Logo & Social Column */}
          <div className="flex flex-col space-y-2">
            <div className="relative w-40 h-20">
              <Image
                src="/images/footer logo.png"
                alt="MY SOFTAKE Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="">
              <p className="w-80">{t("tagline")}</p>
            </div>
            {/* Social Icons - Direct Div & Link */}
            <div className="flex space-x-3">
              <Link
                href="https://www.facebook.com/mysoftake"
                target="_blank"
                className="w-9 h-9 bg-white text-[#1a2533] rounded-full flex items-center justify-center hover:bg-[#27A0DB] duration-300 hover:text-white transition-colors"
              >
                <FaFacebookF size={16} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-9 h-9 bg-white text-[#1a2533] rounded-full flex items-center justify-center hover:bg-[#27A0DB] duration-300 hover:text-white transition-colors"
              >
                <FaInstagram size={16} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-9 h-9 bg-white text-[#1a2533] rounded-full flex items-center justify-center hover:bg-[#27A0DB] duration-300 hover:text-white transition-colors"
              >
                <FaTwitter size={16} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/my-softake/"
                target="_blank"
                className="w-9 h-9 bg-white text-[#1a2533] rounded-full flex items-center justify-center hover:bg-[#27A0DB] duration-300 hover:text-white transition-colors"
              >
                <FaLinkedinIn size={16} />
              </Link>
            </div>
          </div>

          {/* 2. Japan Office Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold">{t("quickLinks")}</h3>
            </div>
            <div className="flex flex-col text-[14px] space-y-1">
              <Link href="/" className="hover:text-[#27A0DB] duration-300">
                {tNav("home")}
              </Link>
              <Link   href={`/${locale}/about`} className="hover:text-[#27A0DB] duration-300">
                {tNav("aboutUs")}
              </Link>
              <Link
            
                href={`/${locale}/service`}
                className="hover:text-[#27A0DB] duration-300"
              >
                {tNav("service")}
              </Link>
              <Link
                href={`/${locale}/project`}
              
                className="hover:text-[#27A0DB] duration-300"
              >
                {tNav("project")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="hover:text-[#27A0DB] duration-300"
              >
                {tNav("contactUs")}
              </Link>
              <Link
              
                href={`/${locale}/career`}
                className="hover:text-[#27A0DB] duration-300"
              >
                {tNav("career")}
              </Link>
            </div>
          </div>

          {/* 3. Bangladesh Office Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/R&D Center, Bangladesh.png"
                alt="corporate office"
                height={30}
                width={20}
                className=" "
              />
              <h3 className="text-white font-semibold">
                {t("corporateOffice")}
              </h3>
            </div>
            <div className="space-y-3 text-[14px]">
              <div className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-lg mt-0.5 flex-shrink-0" />
                <p>Sector 9, Road 3/E, House 04, Uttara, Dhaka-1230.</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="flex-shrink-0" />
                <p>+88 01910-219667</p>
              </div>
              <div className="flex items-center gap-3">
                <BsBriefcase className="flex-shrink-0" />
                <p>+88 01302-788947</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="flex-shrink-0" />
                <Link href="mailto:info@mysoftake.com" className=" ">
                  info@mysoftake.com.bd
                </Link>
              </div>
            </div>
          </div>

          {/* 4. China Office Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/artwork.png"
                alt="manufactaring office"
                height={30}
                width={20}
                className=" "
              />
              <h3 className="text-white font-semibold">
                {t("manufacturingOffice")}
              </h3>
            </div>
            <div className="space-y-3 text-[14px]">
              <div className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-lg mt-0.5 flex-shrink-0" />
                <p>
                  1102,Building A, Zhidihuijin Business Center Shushan District,
                  Hefei City, Anhui Province, China
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="flex-shrink-0" />
                <p>+861-365-555-1302</p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="flex-shrink-0" />
                <Link href="mailto:info@mysoftake.com" className=" ">
                  277768034@qq.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-400">
          <p>  © {year} MY SOFTAKE PVT LTD {t("rightsReserved")}</p> 

          
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link
            
              href={`/${locale}/terms-and-service`}
              className="hover:text-[#27A0DB] duration-300"
            >
              {t("termsOfService")}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-[#27A0DB] duration-300">
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
