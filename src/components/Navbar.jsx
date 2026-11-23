import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  User,
  Shield,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Filter
} from 'lucide-react';
import { MOCK_CASES } from '../data/mockCases';

export default function Navbar({ selectedCaseId, onSelectCase }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: "CDR Match Alert",
      desc: "Node +91 98290 14820 active in Mansarovar cell tower RJ-JPR-MS-401.",
      time: "10m ago",
      type: "critical"
    },
    {
      id: 2,
      title: "IPDR Exfiltration Flag",
      desc: "High volume 147MB TLS session to Tor relay recorded.",
      time: "45m ago",
      type: "warning"
    },
    {
      id: 3,
      title: "Batch Processing Complete",
      desc: "Airtel CDR file ingest finished (4,200 records).",
      time: "2h ago",
      type: "success"
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/analysis?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tracenet_auth_user');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-[#0a0f1d] border-b border-slate-800/90 px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Global Quick Search */}
      <form onSubmit={handleSearchSubmit} className="relative w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search target phone, IP address, cell ID, IMEI..."
          className="w-full bg-slate-900/90 text-xs text-slate-200 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition"
        />
      </form>

      {/* Right Controls: Active Case, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Active Case Selector */}
        <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
          <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400 hidden sm:inline">Active Case:</span>
          <select
            value={selectedCaseId}
            onChange={(e) => onSelectCase(e.target.value)}
            className="bg-transparent text-slate-200 font-mono text-xs font-medium focus:outline-none cursor-pointer"
          >
            {MOCK_CASES.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                {c.id} — {c.title.slice(0, 26)}...
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition"
            title="Investigation Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-2xl border border-slate-700/80 p-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-white">Live Cyber Alerts</span>
                <span className="text-[10px] text-cyan-400 font-mono">3 Unread</span>
              </div>
              <div className="divide-y divide-slate-800/60 mt-1 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-slate-800/40 rounded-lg transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                        {n.type === 'critical' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Investigator Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              VR
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-medium text-slate-200 leading-none">DSP V. S. Rathore</p>
              <p className="text-[10px] text-slate-400 leading-none mt-1">Rajasthan Cyber Cell</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-2xl border border-slate-700/80 p-2 z-50 animate-fade-in">
              <div className="p-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-white">DSP Vikramaditya Singh</p>
                <p className="text-[10px] text-slate-400">Cyber Crime Police Station, Jaipur</p>
                <div className="mt-1.5 inline-block text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Badge: RJ-CYBER-884
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => navigate('/cases')}
                  className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800/60 rounded-lg flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  Assigned Cases
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-2 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out (Demo)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
