 

"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BsThreeDots } from "react-icons/bs";  
 
const data = [
  { name: "Jan", income: 0, expense: 0 },
  { name: "Feb", income: 80000, expense: 70000 },
  { name: "Mar", income: 60000, expense: 50000 },
  { name: "Apr", income: 120000, expense: 100000 },
  { name: "May", income: 110000, expense: 95000 },
  { name: "Jun", income: 180000, expense: 160000 },
  { name: "Jul", income: 100000, expense: 90000 },
  { name: "Aug", income: 50000, expense: 45000 },
  { name: "Sep", income: 140000, expense: 125000 },
  { name: "Oct", income: 70000, expense: 60000 },
  { name: "Nov", income: 160000, expense: 140000 },
  { name: "Dec", income: 150000, expense: 130000 },
];

 
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-xl rounded-xl border border-gray-100 text-sm">
        <p className="text-gray-500 mb-2">{label}</p>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#4673e5]"></div>
          <span className="font-bold text-gray-700">
            ৳{payload[0].value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C7D2FE]"></div>
          <span className="font-bold text-gray-700">
            ৳{payload[1].value.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">20th September 2024</p>
      </div>
    );
  }
  return null;
};

const EarningChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm w-200 h-[400px]">
    
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Earnings</h2>

        <div className="flex items-center gap-6">
        
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4F46E5]"></span>
            <span className="text-gray-600 text-sm font-medium">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#C7D2FE]"></span>
            <span className="text-gray-600 text-sm font-medium">Expense</span>
          </div>
        </div>

       
        <button className="text-gray-400 hover:text-gray-600">
          <BsThreeDots size={24} />
        </button>
      </div>

   
      <div className="w-180 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C7D2FE" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C7D2FE" stopOpacity={0} />
              </linearGradient>
            </defs>

         
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#E5E7EB"
            />

        
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />

         
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}K`}  
              domain={[0, 200000]}
              ticks={[0, 50000, 100000, 150000, 200000]}  
            />

         
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#4F46E5", strokeWidth: 1, strokeDasharray: "5 5" }} />
 
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#A5B4FC"  
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpense)"  
              activeDot={{ r: 6, strokeWidth: 0 }}
            />

         
            <Area
              type="monotone"
              dataKey="income"
              stroke="#4F46E5"  
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIncome)"  
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningChart;