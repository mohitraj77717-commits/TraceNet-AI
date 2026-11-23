import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Briefcase,
  PhoneCall,
  Globe,
  Users,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Bot,
  Network,
  UploadCloud,
  FileText,
  Clock,
  Radio
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import LoadingState from '../components/LoadingState';
import { caseService } from '../services/caseService';
import { analysisService } from '../services/analysisService';
import { formatDuration, formatPhoneNumber } from '../utils/formatters';
import { formatDateTime, timeAgo } from '../utils/dateUtils';

export default function DashboardPage() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [frequentNumbers, setFrequentNumbers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [statsRes, casesRes, timelineRes, freqRes, actRes] = await Promise.all([
          caseService.getStatistics(),
          caseService.getCases(),
          analysisService.getCallTimeline(),
          analysisService.getFrequentNumbers(),
          caseService.getRecentActivities()
        ]);
        setStats(statsRes.data);
        setCases(casesRes.data);
        setTimeline(timelineRes.data);
        setFrequentNumbers(freqRes.data);
        setActivities(actRes.data);
      } catch (e) {
        console.error('Error loading dashboard data', e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingState message="Aggregating cyber investigation metrics..." />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Cyber Investigation Command Dashboard
            </h1>
            <Badge variant="Active" pulse>Live Ops</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time CDR/IPDR telecom intelligence for Rajasthan Police Cyber Crime Cell.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/upload')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            Upload Dumps
          </button>
          <button
            onClick={() => navigate('/network')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition flex items-center gap-1.5"
          >
            <Network className="w-4 h-4 text-amber-400" />
            Network Graph
          </button>
          <button
            onClick={() => navigate('/ai-assistant')}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-600/20 transition flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4" />
            Ask AI Assistant
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Investigation Cases"
          value={stats?.totalCases || '28'}
          subtitle={`${stats?.activeCases || '14'} Active • ${stats?.closedCases || '14'} Closed`}
          icon={Briefcase}
          color="indigo"
          trend={{ value: "+3 cases this week", isPositive: true }}
        />
        <StatCard
          title="Uploaded CDR Records"
          value={(stats?.totalCdrRecords || 86190).toLocaleString()}
          subtitle="Cell tower & caller logs ingested"
          icon={PhoneCall}
          color="cyan"
          trend={{ value: "+14.2k today", isPositive: true }}
        />
        <StatCard
          title="Uploaded IPDR Records"
          value={(stats?.totalIpdrRecords || 215860).toLocaleString()}
          subtitle="Internet protocol session logs"
          icon={Globe}
          color="emerald"
          trend={{ value: "+48.9k today", isPositive: true }}
        />
        <StatCard
          title="Suspect Entities Flagged"
          value={stats?.flaggedSuspectNumbers || '42'}
          subtitle={`${stats?.criticalAlerts || '7'} Critical risk nodes`}
          icon={ShieldAlert}
          color="rose"
          trend={{ value: "4 new high-risk hubs", isPositive: false }}
        />
      </div>

      {/* Middle Grid: Activity Timeline Chart + Frequent Contact List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2-Col: Call Activity Over Time Chart */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Call Activity & Anomalies Over 24h
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Hourly CDR call distribution with flagged suspicious late-night calls.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              IST Timeline
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="callColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="suspiciousColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="calls"
                  name="Total Calls"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#callColor)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="suspicious"
                  name="Suspicious (Flagged)"
                  stroke="#f43f5e"
                  fillOpacity={1}
                  fill="url(#suspiciousColor)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-end gap-5 mt-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Total Calls Ingested</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Suspicious Outliers</span>
            </div>
          </div>
        </div>

        {/* 1-Col: Frequently Contacted Numbers */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                Frequently Contacted Numbers
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Top recurring nodal entities.</p>
            </div>
            <button
              onClick={() => navigate('/analysis')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-72 flex-1 pr-1">
            {frequentNumbers.map((item) => (
              <div
                key={item.number}
                className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-white">
                    {formatPhoneNumber(item.number)}
                  </span>
                  <Badge variant={item.risk}>{item.risk}</Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                  <span className="truncate max-w-[150px]">{item.label}</span>
                  <span className="font-mono text-cyan-300 font-medium">
                    {item.totalCalls} calls ({formatDuration(item.totalDuration)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Investigations Table + Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2-Col: Recent Investigations */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                Recent Investigation Cases
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Active FIRs and cyber complaints undergoing telecom data correlation.
              </p>
            </div>
            <button
              onClick={() => navigate('/cases')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
            >
              All Cases <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="pb-2.5 font-medium">Case ID</th>
                  <th className="pb-2.5 font-medium">Title & Category</th>
                  <th className="pb-2.5 font-medium">District / PS</th>
                  <th className="pb-2.5 font-medium">Assigned Officer</th>
                  <th className="pb-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cases.slice(0, 4).map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/cases/${c.id}`)}
                    className="hover:bg-slate-800/40 cursor-pointer transition group"
                  >
                    <td className="py-3 font-mono font-semibold text-cyan-400 group-hover:underline">
                      {c.id}
                    </td>
                    <td className="py-3">
                      <div className="font-medium text-slate-200">{c.title}</div>
                      <div className="text-[10px] text-slate-400">{c.category}</div>
                    </td>
                    <td className="py-3 text-slate-300">{c.district}</td>
                    <td className="py-3 text-slate-400">{c.assignedTo}</td>
                    <td className="py-3">
                      <Badge variant={c.status}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 1-Col: Live Feed / Activity */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Recent System Activity
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="relative pl-5 border-l border-slate-800 pb-1">
                <span className="absolute -left-1 top-1 w-2 h-2 rounded-full bg-cyan-400" />
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-medium text-slate-200">{act.title}</h5>
                  <span className="text-[10px] text-slate-400">{timeAgo(act.timestamp)}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {act.description}
                </p>
                <div className="mt-1 text-[10px] text-cyan-500/80 font-mono">
                  By: {act.user}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
