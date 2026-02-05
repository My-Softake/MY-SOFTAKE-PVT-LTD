"use client";

import React, { useState, useEffect } from "react";
import {
  IoShareOutline,
  IoTimeOutline,
  IoLanguageOutline,
  IoCloseOutline,
} from "react-icons/io5";
import {
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import CalendarWidget from "./CalendarWidget";

const formatDateForAPI = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const BookingWidget = () => {
  const t = useTranslations("SchedulePage.BookingWidget");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const apiDate = formatDateForAPI(selectedDate);

  // --- Fetch Slots ---
  useEffect(() => {
    const fetchSlots = async () => {
      setIsSlotsLoading(true);
      setSelectedSlot(null);
      try {
        const res = await fetch("/data/slot.json");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAvailableSlots(data?.available_slots || []);
      } catch (error) {
        console.error("Error loading slots:", error);
        toast.error(t("loadError"));
      } finally {
        setIsSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [apiDate]);

  // --- Fetch Departments ---
  useEffect(() => {
    if (isModalOpen) {
      const fetchDepts = async () => {
        try {
          const res = await fetch("/data/depeartment.json");
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setDepartments(data || []);
        } catch (error) {
          console.error("Error loading departments:", error);
        }
      };
      fetchDepts();
    }
  }, [isModalOpen]);

  const onSubmit = async (data) => {
    if (!selectedSlot) return toast.error(t("selectSlotError"));
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Payload:", {
        date: apiDate,
        slot: selectedSlot.pk,
        user_info: data,
      });
      setIsSubmitting(false);
      setIsModalOpen(false);
      setSelectedSlot(null);
      reset();
      toast.success(t("successMessage"));
    }, 1500);
  };

  const formatDateLabel = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    return `${isToday ? "Today · " : ""}${date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}`;
  };

  return (
    <div className="py-16 flex items-center justify-center p-4 font-sans text-[#476788] relative">
      <Toaster position="top-center" />

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              SL
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">{t("title")}</h2>
              <p className="text-sm text-gray-600">{t("subtitle")}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium">
            <IoShareOutline size={18} /> {t("share")}
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row">
          <div className="p-8 lg:w-1/2 flex flex-col gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">
                {t("selectDateTime")}
              </h3>
              <CalendarWidget
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
          </div>

          <div className="p-8 lg:w-1/2 lg:border-l border-slate-100 bg-slate-50/30">
            <div className="flex items-center justify-between mb-6 text-black">
              <span className="font-medium flex items-center gap-2">
                <HiOutlineSun className="text-blue-500" />{" "}
                {formatDateLabel(selectedDate)}
              </span>
              <span className="text-sm flex items-center gap-1 cursor-pointer">
                <IoLanguageOutline /> {t("timezone")}
              </span>
            </div>

            <div className="min-h-[220px]">
              {isSlotsLoading ? (
                <div className="flex justify-center py-10">
                  <AiOutlineLoading3Quarters
                    className="animate-spin text-blue-500"
                    size={32}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot.pk}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedSlot?.pk === slot.pk
                            ? "bg-blue-500 border-blue-500 text-white shadow-md"
                            : "bg-white border-slate-200 hover:border-blue-500 text-black"
                        }`}
                      >
                        {slot.start_time.split(":").slice(0, 2).join(":")}
                      </button>
                    ))
                  ) : (
                    <p className="col-span-2 text-center py-10 text-gray-400">
                      {t("noSlots")}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!selectedSlot}
              className={`w-full mt-6 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                !selectedSlot
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {t("confirmSelection")} <HiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center text-black">
              <h3 className="text-lg font-bold">{t("bookingDetails")}</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <IoCloseOutline size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <FormInput
                label={t("name")}
                name="name"
                register={register}
                errors={errors}
                required
                t={t}
              />
              <FormInput
                label={t("email")}
                name="email"
                register={register}
                errors={errors}
                type="email"
                required
                t={t}
              />

              <div>
                <label className="block text-sm font-medium mb-1 text-black">
                  {t("department")}
                </label>
                <select
                  {...register("department", {
                    required: t("selectDepartment"),
                  })}
                  className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">{t("selectDepartment")}</option>
                  {departments.map((dept) => (
                    <option key={dept.id || dept.pk} value={dept.id || dept.pk}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  t("scheduleNow")
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Input Component
const FormInput = ({
  label,
  name,
  register,
  errors,
  type = "text",
  required,
  t,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-black">{label}</label>
    <input
      type={type}
      {...register(name, {
        required: required ? `${label} is required` : false,
      })}
      className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-100 ${errors[name] ? "border-red-500" : ""}`}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default BookingWidget;
