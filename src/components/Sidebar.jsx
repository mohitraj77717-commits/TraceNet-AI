import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  UploadCloud,
  FileSpreadsheet,
  Network,
  Bot,
  FileText,
  ShieldAlert,
  Radio,
  ExternalLink
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/cases',
      label: 'Case Management',
      icon: Briefcase,
      badge: '5'
    },
    {
      to: '/upload',
      label: 'Data Ingestion',
      icon: UploadCloud,
      badge: 'CSV'
    },
    {
      to: '/analysis',
      label: 'CDR / IPDR Analysis',
      icon: FileSpreadsheet,
      badge: 'Live'
    },
    {
      to: '/network',
      label: 'Network Graph',
      icon: Network,
      badge: 'Cyto'
    },
    {
      to: '/ai-assistant',
      label: 'AI Investigator',
      icon: Bot,
      badge: 'AI'
    },
    {
      to: '/reports',
      label: 'Intelligence Reports',
      icon: FileText,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/90 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800 bg-slate-950/40">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white tracking-wider text-base">TraceNet</span>
            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              AI
            </span>
          </div>
          <p className="text-[10px] text-slate-400 tracking-tight">Rajasthan Police Cyber Cell</p>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Investigation Modules
          </span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 transition-colors group-hover:text-cyan-400" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Status Footnote */}
      <div className="p-3.5 m-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium text-[11px]">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Cyber Cell Feed
          </span>
          <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Operational
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
          Synthetic CDR/IPDR Engine connected for Hackathon evaluation.
        </p>
      </div>
    </aside>
  );
}
