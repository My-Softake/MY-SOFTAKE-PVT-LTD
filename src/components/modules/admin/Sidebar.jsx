"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MdOutlineDashboard, MdOutlineAccountBalance, MdOutlineSchool, MdOutlinePersonOutline, MdOutlinePeopleOutline, MdOutlineLocationOn, MdOutlineAssessment, MdOutlineBarChart, MdOutlineSettings, MdOutlineAttachMoney } from "react-icons/md";

const menuItems = [
  { name: "Overview", icon: MdOutlineDashboard, href: "/dashboard" },
  { name: "Institutions", icon: MdOutlineAccountBalance, href: "/dashboard/institutions" },
  { name: "Teacher", icon: MdOutlinePersonOutline, href: "/dashboard/teacher" },
  { name: "Student", icon: MdOutlineSchool, href: "/dashboard/student" },
  { name: "Staff", icon: MdOutlinePeopleOutline, href: "/dashboard/staff" },
  { name: "Facilities", icon: MdOutlineLocationOn, href: "/dashboard/facilities" },
  { name: "Reports", icon: MdOutlineAssessment, href: "/dashboard/reports" },
  { name: "Analytics", icon: MdOutlineBarChart, href: "/dashboard/analytics" },
  { name: "Settings", icon: MdOutlineSettings, href: "/dashboard/settings" },
  { name: "Fees management", icon: MdOutlineAttachMoney, href: "/dashboard/fees" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar Toggle */}
       

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-md z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:top-[76px] md:h-[calc(100vh-115px)]
        `}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-2 border-b border-t border-gray-200 px-3 py-7 pb-3">
          <Image src="/images/edu.png" alt="logo" width={30} height={50} />
          <h1 className="text-xl font-bold text-gray-800">EduDashboard</h1>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-1 px-4">
            {menuItems.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (pathname === "/dashboard" && item.href === "/dashboard");
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}  
                    className={`
                      flex items-center p-3 rounded-lg transition-colors duration-200 
                      ${isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <item.icon className="text-xl mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
