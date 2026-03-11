"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function Availability() {
  const t = useTranslations("Availability")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch 7-day data
  const fetchWeeklySlots = async () => {
    setLoading(true);
    try {
      // Fetching without date params as you mentioned the backend sends 7 days by default
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking/available-slots/`);
      if (!res.ok) throw new Error("Failed to fetch slots");
      const responseData = await res.json();
      setData(responseData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch weekly slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklySlots();
  }, []);

  // Helper to format date for headers (e.g., "Mon 10")
  const formatHeaderDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
  };

  return (
    <div className="w-full max-w-350 mx-auto p-4 md:p-8 bg-[#F8FAFC] font-sans text-slate-700 min-h-screen">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-sm text-slate-500 mt-1">
           {t("description_1")} <br className="hidden md:block" />
          {t("description_2")}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchWeeklySlots}
            className="flex items-center gap-2 bg-[#0077B6] hover:bg-[#005f92] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
          >
            <HiOutlineCalendarDays size={20} /> {t("async_refresh")}
          </button>
        </div>
      </div>

      {/* Calendar Grid Wrapper */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header Row */}
          <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-slate-200">
            <div className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center border-r border-slate-200">
             {t("ist")}
            </div>
            {data.map((day, idx) => (
              <div 
                key={idx} 
                className={`p-4 text-sm font-semibold text-slate-600 flex items-center justify-center ${idx !== 6 ? 'border-r border-slate-100' : ''}`}
              >
                {formatHeaderDate(day.date)}
              </div>
            ))}
          </div>

          {/* Content Body */}
          <div className="grid grid-cols-[80px_repeat(7,1fr)] relative">
            {/* Left Time Column (Gutter) */}
            <div className="border-r border-slate-200 bg-white flex flex-col text-[11px] text-slate-400 font-medium">
              {["09:00", "11:00", "13:00", "15:00", "17:00"].map((time) => (
                <div key={time} className="h-32 flex items-start justify-center pt-4 border-b border-slate-50 last:border-0">
                  {time}
                </div>
              ))}
            </div>

            {/* Daily Columns */}
            {loading ? (
              <div className="col-span-7 h-150 flex justify-center items-center">
                <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
              </div>
            ) : (
              data.map((day, dayIdx) => (
                <div 
                  key={dayIdx} 
                  className={`p-3 min-h-150 flex flex-col gap-3 ${dayIdx !== 6 ? 'border-r border-slate-100' : ''}`}
                >
                  {day.times && day.times.length > 0 ? (
                    day.times.map((slot, slotIdx) => {
                      // Logic: is_bookable ? Green : Blue (as per your JSON)
                      const isBookable = slot.is_bookable;
                      const isBlocked = slot.is_blocked; // logic for pink if available in data

                      let cardClass = "bg-[#D0EBFF] border-[#A5D8FF] text-[#0077B6]"; // Existing (Blue)
                      let barClass = "bg-[#339AF0]";

                      if (isBookable) {
                        cardClass = "bg-[#E6FCF5] border-[#C3FAE8] text-[#099268]"; // Bookable (Green)
                        barClass = "bg-[#20C997]";
                      } else if (isBlocked) {
                        cardClass = "bg-[#FFF0F6] border-[#FFDEEB] text-[#D6336C]"; // Blocked (Pink)
                        barClass = "bg-[#F06595]";
                      }

                      return (
                        <div
                          key={slotIdx}
                          className={`relative pl-4 pr-2 py-2 rounded-xl border-2 transition-transform hover:scale-[1.02] cursor-pointer shadow-sm ${cardClass}`}
                        >
                          <div className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1/2 rounded-full ${barClass}`} />
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold leading-tight truncate">
                              {isBookable ? "Bookable Slot" : "Existing Meeting"}
                            </span>
                            <span className="text-[9px] opacity-70 font-medium">
                              {slot.time_range}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    /* Empty State - Matches "Fri 14" in image */
                    <div className="h-full w-full rounded-xl border-2 border-dashed border-slate-100 bg-slate-50/20 flex flex-col items-center justify-center text-center p-4">
                      <p className="text-[11px] font-bold text-slate-400 leading-tight">
                        {t("no_slots_available")}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-8 items-center px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#20C997]" />
          <span className="text-xs font-semibold text-slate-500">{t("bookable_slots")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#339AF0]" />
          <span className="text-xs font-semibold text-slate-500">{t("existing_meetings")}</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F06595]" />
          <span className="text-xs font-semibold text-slate-500">Blocked time</span>
        </div> */}
      </div>
    </div>
  );
}  

 