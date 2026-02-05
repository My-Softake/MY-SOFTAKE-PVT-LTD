"use client";
import React, { useState } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));  
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 6));  

 
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);  
  const endDate = endOfWeek(monthEnd);  

 
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

 
  const weekDays = ["S", "M", "T", "W", "Th", "F", "Sa"];

 
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
   
    <div className="bg-white p-6 rounded-3xl shadow-sm  w-100">
  
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-gray-700">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

    
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-400 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

 
      <div className="grid grid-cols-7 gap-y-2">
        {daysInMonth.map((day, idx) => {
       
          const isCurrentMonth = isSameMonth(day, currentDate);
      
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={idx}
              className="flex justify-center items-center relative"
            >
              <button
                onClick={() => {
                  setSelectedDate(day);
                  if (!isCurrentMonth) setCurrentDate(day);
                }}
                className={`
                  h-10 w-10 flex items-center justify-center rounded-full text-sm transition-all duration-200
                  ${
                    !isCurrentMonth
                      ? "text-gray-300 pointer-events-none"  
                      : isSelected
                      ? "bg-[#5BC0EB] text-white font-bold shadow-md"  
                      : "text-gray-700 hover:bg-gray-100 cursor-pointer font-medium"  
                  }
                `}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
