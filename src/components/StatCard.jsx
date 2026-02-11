import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';

const StatCard = ({ label, value, growth, isPositive }) => {
  return (
    <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={cn(
          "p-2 rounded-lg",
          isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-1">{value}</h3>
        <div className="flex items-center gap-1.5">
          <span className={cn(
            "text-xs font-bold px-1.5 py-0.5 rounded-md",
            isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
          )}>
            {growth}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
