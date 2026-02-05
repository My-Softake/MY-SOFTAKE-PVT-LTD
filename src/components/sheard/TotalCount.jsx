import React from "react";
import { FiTrendingUp, FiUsers } from "react-icons/fi";
import { LuGraduationCap, LuBuilding2 } from "react-icons/lu";
import { HiOutlineBanknotes } from "react-icons/hi2";

const totalDataCount = [
  {
    id: 1,
    title: "Total Institutions",
    value: "5",
    growthText: "+2 this month",
    icon: <LuBuilding2 size={22} />, 
    growthColor: "text-green-500",
  },
  {
    id: 2,
    title: "Total Students",
    value: "8",
    growthText: "+12% from last month",
    icon: <LuGraduationCap size={22} />,
    growthColor: "text-green-500",
  },
  {
    id: 3,
    title: "Total Staff",
    value: "6",
    growthText: "+5 new hires",
    icon: <FiUsers size={22} />,
    growthColor: "text-green-500",
  },
  {
    id: 4,
    title: "Total Revenue",
    value: "৳6.5Cr",
    growthText: "+8.2% from last year",
    icon: <HiOutlineBanknotes size={22} />,
    growthColor: "text-green-500",
  },
];

 
const StatsCard = ({ title, value, growthText, icon }) => {
  return (
    <div className="bg-white w-70 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 font-semibold text-sm">{title}</h3>
        <div className="text-gray-400 bg-gray-50 p-2 rounded-lg">{icon}</div>
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{value}</h2>

      <div className="flex items-center gap-1 text-green-500 text-xs font-bold">
        <FiTrendingUp className="text-sm" />
        <span>{growthText}</span>
      </div>
    </div>
  );
};

const TotalCount = () => {
  return (
    <div className="p-6 bg-gray-50 mt-10">
      <div className="flex items-center gap-10">
     
        {totalDataCount.map((item) => (
          <StatsCard
            key={item.id}
            title={item.title}
            value={item.value}
            growthText={item.growthText}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TotalCount;
