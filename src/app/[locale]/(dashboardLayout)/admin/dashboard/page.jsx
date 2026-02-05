import Calendar from "@/components/modules/public/Calendar";
import EarningChart from "@/components/modules/admin/EarningChart";
import InstitutionTable from "@/components/modules/public/InstitutionTable";
import StudentPiChart from "@/components/modules/admin/StudentPiChart";
import TotalCount from "@/components/sheard/TotalCount";
import React from "react";

const page = () => {
  return (
    <div className="px-5">
      <div className="mt-20 mx-5">
        <h3 className="font-bold text-4xl text-black">Dashboard Overview</h3>
        <p className="pt-2 text-base font-medium">Welcome to your educational institutions management dashboard</p>
      </div>
      {/* Total Count */}
      <TotalCount />

      {/* Earnings and Calendar */}
      <div className="flex gap-10 mx-6">
        <EarningChart className="" />
        <Calendar className="" />
      </div>

      {/* Institution Table and Student Pie Chart */}
      <div className="flex items-center">
        <InstitutionTable className=" " />
        <StudentPiChart className=" " />
      </div>
    </div>
  );
};

export default page;
