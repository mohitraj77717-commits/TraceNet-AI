import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  ShieldAlert,
  PhoneCall,
  Globe,
  Network,
  Bot,
  FileSpreadsheet,
  FileText,
  UploadCloud,
  CheckCircle2,
  Tag
} from 'lucide-react';
import Badge from '../components/Badge';
import LoadingState from '../components/LoadingState';
import { caseService } from '../services/caseService';
import { formatDateTime } from '../utils/dateUtils';
import { formatPhoneNumber } from '../utils/formatters';

export default function CaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCase() {
      setLoading(true);
      try {
        const res = await caseService.getCaseById(id);
        setCaseData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading case intelligence dossier..." />;
  }

  if (!caseData) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Case not found.</p>
        <button
          onClick={() => navigate('/cases')}
          className="mt-4 px-3 py-1.5 bg-slate-800 text-cyan-400 rounded-lg text-xs"
        >
          Return to Case List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button and title */}
      <div>
        <button
          onClick={() => navigate('/cases')}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 mb-2 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all investigation cases
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-base font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                {caseData.id}
              </span>
              <h1 className="text-xl font-bold text-white tracking-tight">{caseData.title}</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>{caseData.district}</span> • <span>{caseData.station}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={caseData.priority}>{caseData.priority} Priority</Badge>
            <Badge variant={caseData.status} pulse>{caseData.status}</Badge>
          </div>
        </div>
      </div>

      {/* Case Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Assigned Officer</p>
          <p className="text-sm font-semibold text-slate-100 mt-1">{caseData.assignedTo}</p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Primary Suspect Target</p>
          <p className="text-sm font-semibold font-mono text-cyan-400 mt-1">
            {caseData.primaryTarget ? formatPhoneNumber(caseData.primaryTarget) : 'N/A'}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Ingested CDR Dumps</p>
          <p className="text-sm font-semibold font-mono text-slate-100 mt-1">
            {(caseData.totalCdrRecords || 14280).toLocaleString()} calls
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Ingested IPDR Dumps</p>
          <p className="text-sm font-semibold font-mono text-emerald-400 mt-1">
            {(caseData.totalIpdrRecords || 48920).toLocaleString()} sessions
          </p>
        </div>
      </div>

      {/* Main Dossier Content & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2-Col: Summary & Findings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-semibold text-white mb-2">Investigation Summary & FIR Scope</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {caseData.summary || "Case initialized for comprehensive telecom and internet protocol correlation."}
            </p>

            {caseData.victim && (
              <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400 font-medium">Complainant / Victim Entity: </span>
                <span className="text-slate-200">{caseData.victim}</span>
              </div>
            )}

            {caseData.tags && caseData.tags.length > 0 && (
              <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                {caseData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Investigation Modules */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-semibold text-white mb-3">Target Investigation Modules</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/analysis')}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-left transition group"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <FileSpreadsheet className="w-4 h-4" />
                  CDR / IPDR Deep Scan
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Filter call timestamps, cell towers, and suspect IP sessions.
                </p>
              </button>

              <button
                onClick={() => navigate('/network')}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 text-left transition group"
              >
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                  <Network className="w-4 h-4" />
                  Cytoscape Network Graph
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Inspect caller topological centrality and syndicate clusters.
                </p>
              </button>

              <button
                onClick={() => navigate('/ai-assistant')}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 text-left transition group"
              >
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs">
                  <Bot className="w-4 h-4" />
                  AI Investigation Assistant
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Query call patterns, common contacts, and timeline anomalies.
                </p>
              </button>

              <button
                onClick={() => navigate('/reports')}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-left transition group"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <FileText className="w-4 h-4" />
                  Intelligence Dossier Report
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Generate formal police court report with findings and charts.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* 1-Col: Case Timeline & Meta */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-white">Dossier Chronology</h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-start justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Date Registered:</span>
              <span className="font-mono text-slate-200">{formatDateTime(caseData.createdAt)}</span>
            </div>
            <div className="flex items-start justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Last Telemetry Sync:</span>
              <span className="font-mono text-slate-200">{formatDateTime(caseData.updatedAt)}</span>
            </div>
            <div className="flex items-start justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Identified Suspects:</span>
              <span className="font-mono text-rose-400 font-semibold">{caseData.suspectsCount || 6} Nodal Targets</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/upload')}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              Ingest More CSV Dumps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
