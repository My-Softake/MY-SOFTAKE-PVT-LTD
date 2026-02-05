"use client";

import React, { useState } from "react";
import { LuLink2 } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";

import Availability from "@/components/modules/public/Availability";
import ScheduleBooking from "@/components/modules/public/ScheduleBooking";

const Schedule = () => {
  const t = useTranslations("SchedulePage");

  // Default tab = availability
  const [activeTab, setActiveTab] = useState("availability");

  const sidebarItems = [
    {
      id: "availability",
      label: t("availability"),
      icon: <IoTimeOutline size={22} />,
    },
    {
      id: "schedule",
      label: t("schedule"),
      icon: <LuLink2 size={22} />,
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-64 space-y-2 lg:sticky lg:top-28">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl text-lg font-medium transition ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-500"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </aside>

          {/* CONTENT */}
          <main className="flex-1">
            {activeTab === "availability" && <Availability />}
            {activeTab === "schedule" && <ScheduleBooking />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
