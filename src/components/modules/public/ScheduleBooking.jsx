"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";
import { IoFlashOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

/* ================= TIMEZONE ================= */
const ALL_TIMEZONES = Intl.supportedValuesOf("timeZone");

const DEPT_CHOICES = [
  { value: "", label: "Select Department" },
  { value: "sales", label: "Sales" },
  { value: "technical_support", label: "Technical Support" },
  { value: "enquiry", label: "Enquiry" },
];

const getGMTOffset = (timeZone) => {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).formatToParts(now);
  const tz = parts.find((p) => p.type === "timeZoneName")?.value || "";
  return tz.replace("GMT", "GMT");
};

/* ================= TIMEZONE CONVERSION ================= */
const getFormatter = (tz) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: tz,
  });

const convertTimeRange = (range, date, formatter) => {
  const [start, end] = range.split(" - ");
  const buildUTCDate = (time) => {
    const [h, m] = time.split(":");
    return new Date(`${date}T${h}:${m}:00Z`);
  };
  return `${formatter.format(buildUTCDate(start))} - ${formatter.format(
    buildUTCDate(end),
  )}`;
};

/* ================= MAIN COMPONENT ================= */
const ScheduleBooking = () => {
  const t = useTranslations("ScheduleBooking"); //language changer er jonno 
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [timezone, setTimezone] = useState("UTC");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");

  /* AUTO-DETECT TIMEZONE */
  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected) queueMicrotask(() => setTimezone(detected));
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDateForAPI = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  /* ================= FETCH AVAILABILITY ================= */
  const fetchAvailability = async () => {
    setLoading(true);
    setSelectedSlot(null);
    try {
      const apiDate = formatDateForAPI(selectedDate);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/booking/slots/?date=${apiDate}`,
      );
      if (!res.ok) throw new Error("Failed to fetch slots");
      const data = await res.json();

      if (data && data.times) {
        const formatter = getFormatter(timezone);
        setSlots(
          data.times.map((slot) => ({
            ...slot,
            display_time_range: convertTimeRange(
              slot.time_range,
              apiDate,
              formatter,
            ),
            api_time_range: slot.time_range,
          })),
        );
      } else {
        setSlots([]);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      setSlots([]);
      toast.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [selectedDate, timezone]);

  const handleMonthChange = (dir) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setSelectedDate(newDate);
  };

  /* ================= HANDLE BOOKING ================= */
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return toast.error("Please select a slot");

    setSubmitting(true);

    const payload = {
      date: formatDateForAPI(selectedDate),
      time_ranges: [selectedSlot.api_time_range],
      full_name: name,
      email,
      contact_number: contactNumber,
      department: department,
      message,
    };

    console.log(payload);

    try {
      // Optimistically remove booked slot from UI
      setSlots((prev) =>
        prev.filter(
          (slot) => slot.api_time_range !== selectedSlot.api_time_range,
        ),
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/booking/bookings/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();

      setShowModal(false);
      setSelectedSlot(null);
      setName("");
      setEmail("");
      setContactNumber("");
      setDepartment("");
      setMessage("");

      if (data.message) {
        toast.success(
          `Meeting Scheduled on ${selectedDate.toDateString()} at ${payload.time_ranges[0]}`,
        );
        await fetchAvailability();
      } else {
        fetchAvailability();
        toast.error(data.error || "Failed to book slot");
      }
    } catch (err) {
      // Restore slots if error
      fetchAvailability();
      setShowModal(false);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= CALENDAR ================= */
  const calendarDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const days = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  }, [selectedDate]);

  return (
    <div className="max-w-5xl mx-auto px-4 font-sans text-[#374151]">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-2 lg:p-8 border-b border-gray-100 bg-[#F9FAFB]">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {t("avatar")}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{t("name")}</h3>
              <p className="text-sm text-gray-500 font-medium">
                {t("Calendar")}
              </p>
            </div>
          </div>
          <div className="text-right flex items-center gap-3 mt-4 sm:mt-0">
            <div className="text-[#3B82F6] bg-blue-50 p-2 rounded-full">
              <HiOutlineClock />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">
                {selectedDate.toLocaleDateString("en-US", { weekday: "short" })}{" "}
                •{t("select")}
              </p>
              <p className="text-lg font-black text-gray-800 leading-none">
                {selectedDate.getDate()}{" "}
                {selectedDate.toLocaleString("default", { month: "long" })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Calendar */}
          <div className="w-full lg:w-[48%] p-8 lg:p-10 border-r border-gray-50">
            <h2 className="text-xl font-bold mb-6">  {t("choose_a_time")}</h2>
            <div className="space-y-4 mb-8 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-3">
                <HiOutlineClock className="text-blue-500 text-lg" />  {t("30_minute_session")}
              </div>
              <div className="flex items-center gap-3">
                <IoFlashOutline className="text-green-500 text-lg" />  {t("buffers")}
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineUsers className="text-purple-500 text-lg" />  {t("invitee_time")} 
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => handleMonthChange(-1)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <HiOutlineChevronLeft className="text-gray-400" />
                </button>
                <span className="font-bold">
                  {selectedDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  onClick={() => handleMonthChange(1)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <HiOutlineChevronRight className="text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, i) => {
                  if (!date) return <div key={`empty-${i}`} />;
                  const isPast = date < today;
                  const isSelected =
                    date.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      key={i}
                      disabled={isPast}
                      onClick={() => setSelectedDate(new Date(date))}
                      className={`h-9 w-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all
                        ${isPast ? "text-gray-300 cursor-not-allowed" : " hover:text-blue-600"}
                        ${isSelected ? "bg-[#0EA5E9] text-white shadow-lg shadow-blue-200" : ""}`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Slots */}
          <div className="w-full lg:w-[52%] p-8 lg:p-10 flex flex-col bg-white">
            <div className="mb-8">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                {t("time_zone")}
              </label>
              <div className="relative">
                <HiOutlineGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {ALL_TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {getGMTOffset(tz)} {tz}
                    </option>
                  ))}
                </select>
                <HiOutlineChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
                {t("available_slots")}
              </label>
              {loading ? (
                <div className="flex justify-center py-20">
                  <AiOutlineLoading3Quarters className="animate-spin text-3xl text-blue-500" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {slots.length > 0 ? (
                    slots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={!slot.is_bookable}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all
                        ${
                          !slot.is_bookable
                            ? "opacity-20 cursor-not-allowed"
                            : selectedSlot?.api_time_range ===
                                slot.api_time_range
                              ? "bg-[#0EA5E9] text-white border-[#3B82F6] shadow-md scale-[1.02]"
                              : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                        }`}
                      >
                        {slot.display_time_range}
                      </button>
                    ))
                  ) : (
                    <p className="col-span-2 text-center py-10 text-gray-400 font-medium">
                      {t("no_slots_available")}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              disabled={!selectedSlot}
              onClick={() => setShowModal(true)}
              className="w-full mt-10 bg-[#0EA5E9] hover:bg-[#0284C7] disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              {t("confirm_time")} <HiOutlineChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative my-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"
            >
              <HiOutlineXMark className="text-xl" />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black mb-2">
                Finalize Your Booking
              </h3>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                  <HiOutlineClock /> 30 Minute Session
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {selectedDate.toDateString()} at:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-600">
                    {selectedSlot?.display_time_range}
                  </span>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleBookingSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">
                  {t("full_name")}
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">
                 {t("email_address")}
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">
                  {t("contact_number")}
                </label>
                <input
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="+1 234 567 890"
                  className="w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">
               { t("department")}
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {DEPT_CHOICES.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-full">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">
              {t("message")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Anything else you'd like us to know?"
                  className="w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none h-24"
                />
              </div>
              <div className="col-span-full">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black py-5 rounded-2xl mt-2 flex items-center justify-center gap-2 shadow-xl active:scale-95 disabled:opacity-50"
                >
                  {submitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleBooking;
