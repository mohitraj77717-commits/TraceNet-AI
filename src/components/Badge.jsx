import React from 'react';
import { getStatusColor } from '../utils/formatters';

export default function Badge({ children, variant, className = '', pulse = false }) {
  const colorClass = variant ? getStatusColor(variant) : 'text-slate-300 bg-slate-800 border-slate-700';
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}
