"use client";
import Link from "next/link";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";

const DashboardHeader = () => {
 
  return (
 
    <div className="w-full fixed top-0 z-30 bg-white font-sans">
      <div className="flex justify-between items-center   px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-1">
         
          <Image src="/images/Logo.png" alt="logo" width={100} height={50} />
        </div>

        <div className="hidden md:flex gap-60 text-gray-700 font-semibold text-lg">
          <Link href="/" className="hover:text-[#1e5aa0] cursor-pointer">
            Home
          </Link>
          <Link
            href="/institutions"
            className="hover:text-[#1e5aa0] cursor-pointer"
          >
            Institutions
          </Link>
          <Link href="/message" className="hover:text-[#1e5aa0] cursor-pointer">
            Message
          </Link>
        </div>

        <div>
          <BsThreeDotsVertical className="text-2xl text-black cursor-pointer" />
        </div>
      </div>

      <div className="flex  items-center justify-between px-6 py-3 mt-2 bg-white border-b shadow-md border-gray-200">
        <div className="flex items-center">
         

          <div className="flex items-center justify-end gap-10">
            <div className="ml-60">
              <FiMenu className="text-xl text-gray-600 cursor-pointer" />
            </div>
            <div className="flex-1 max-w-3xl w-150 flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
              <FiSearch className="text-gray-400 text-lg mr-2" />
              <input
                type="text"
                placeholder="Search institutions, students, staff..."
                className="w-full outline-none text-gray-600 placeholder-gray-400 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-4">
      
          <div className="relative cursor-pointer">
            <FiBell className="text-xl text-gray-700" />
          
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

         
          <div className="cursor-pointer">
            <FaRegUserCircle className="text-2xl text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;