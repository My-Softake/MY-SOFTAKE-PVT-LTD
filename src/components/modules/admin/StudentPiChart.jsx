"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { FiMoreVertical } from "react-icons/fi";  

const data = [
  { name: "Male", value: 58, color: "#2563eb", labelColor: "#2563eb" },
  { name: "Female", value: 40, color: "#38bdf8", labelColor: "#38bdf8" },
  { name: "Other", value: 2, color: "#f97316", labelColor: "#f97316" },
];

const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, outerRadius, fill, payload, value } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#6b7280"
        fontSize={12}
        dy={-5}
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={14}
        textAnchor={textAnchor}
        fill={payload.labelColor}
        fontSize={14}
        fontWeight="bold"
      >
        {`0${value}`.slice(-2)}%
      </text>
    </g>
  );
};

export default function StudentPiChart() {
  return (
    <div className="flex items-center justify-center min-h-[300px] w-120 bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 relative">
       
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Student Pi Chart</h2>
            <p className="text-sm text-gray-400 mt-1">September 2025</p>
          </div>
          
        
          <button className="text-gray-400 hover:text-gray-600">
             <FiMoreVertical size={20} />
          </button>
        </div>

     
        <div className="h-[250px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false} 
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
                
                <Label
                  value="60"
                  position="center"
                  className="text-3xl font-bold fill-gray-800"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

   
        <div className="flex justify-center gap-6 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-600 text-sm font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}