import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="p-6 bg-card rounded-2xl border border-border shadow-sm h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">{title}</h3>
        <select className="bg-secondary text-xs font-medium px-2 py-1 rounded-md border-none outline-none cursor-pointer">
          <option>Last 12 Months</option>
          <option>Last 6 Months</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="flex-1 min-h-0 w-full font-medium">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
