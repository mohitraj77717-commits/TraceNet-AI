import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan', trend }) {
  const colorMap = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20 group-hover:border-rose-500/40',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 group-hover:border-indigo-500/40',
  };

  const badgeClass = colorMap[color] || colorMap.cyan;

  return (
    <div className="glass-card group p-5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-950/20 hover:border-slate-700/80">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1.5 tracking-tight font-mono">{value}</h3>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg border ${badgeClass} transition-colors`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Activity Trend</span>
          <span className={`font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend.value}
          </span>
        </div>
      )}
    </div>
  );
}
