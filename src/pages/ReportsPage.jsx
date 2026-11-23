import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Download,
  Shield,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Calendar,
  Building,
  User,
  PhoneCall,
  Globe
} from 'lucide-react';
import Badge from '../components/Badge';
import { caseService } from '../services/caseService';
import { analysisService } from '../services/analysisService';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import { formatPhoneNumber, formatDuration, formatBytes } from '../utils/formatters';
import { MOCK_CASES } from '../data/mockCases';
import { triggerPrint } from '../utils/exportUtils';

export default function ReportsPage() {
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_CASES[0].id);
  const [caseDetails, setCaseDetails] = useState(MOCK_CASES[0]);
  const [frequentNumbers, setFrequentNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadReportData() {
      setLoading(true);
      try {
        const [cRes, freqRes] = await Promise.all([
          caseService.getCaseById(selectedCaseId),
          analysisService.getFrequentNumbers()
        ]);
        setCaseDetails(cRes.data);
        setFrequentNumbers(freqRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadReportData();
  }, [selectedCaseId]);

  const handlePrint = () => {
    triggerPrint();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden on print) */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Intelligence Dossier & Forensic Report
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Court-admissible cyber intelligence summary under Section 65B of Indian Evidence Act.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Case Selector */}
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none"
          >
            {MOCK_CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.title.slice(0, 24)}...
              </option>
            ))}
          </select>

          {/* Print / PDF Trigger */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Official Printable Report Sheet */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 text-slate-200 max-w-4xl mx-auto space-y-6 bg-[#0c1222] shadow-2xl print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        {/* Police Official Letterhead */}
        <div className="border-b-2 border-cyan-500/40 pb-5 text-center space-y-1">
          <div className="text-[11px] uppercase tracking-widest text-slate-400 print:text-slate-600 font-semibold">
            Government of Rajasthan • Police Department
          </div>
          <h2 className="text-lg font-bold text-white print:text-black tracking-wide uppercase">
            Office of the Superintendent of Police, Cyber Crime Cell
          </h2>
          <p className="text-xs text-cyan-400 print:text-blue-800 font-mono font-medium">
            SPECIAL TELECOM & INTERNET PROTOCOL FORENSIC REPORT
          </p>
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 print:text-slate-600 font-mono">
            <span>DISPATCH NO: RJ/CYBER/CDR/{caseDetails.id.replace('RJ-CYBER-', '')}</span>
            <span>DATE OF GENERATION: {formatDate(new Date().toISOString())}</span>
          </div>
        </div>

        {/* Security Classification Banner */}
        <div className="p-2 text-center bg-rose-500/10 border border-rose-500/30 text-rose-300 print:border-red-600 print:text-red-700 text-xs uppercase font-mono font-bold tracking-wider rounded-lg">
          CONFIDENTIAL // FOR OFFICIAL POLICE INVESTIGATION ONLY
        </div>

        {/* Case Meta Details Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            I. Case Registration & Investigation Scope
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-slate-100 print:border-slate-300">
            <div>
              <span className="text-slate-400 print:text-slate-600 font-medium">Case Number / FIR:</span>
              <p className="font-mono font-bold text-white print:text-black mt-0.5">{caseDetails.id}</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600 font-medium">Investigation Title:</span>
              <p className="font-semibold text-white print:text-black mt-0.5">{caseDetails.title}</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600 font-medium">Police District & Police Station:</span>
              <p className="text-slate-200 print:text-black mt-0.5">{caseDetails.district} ({caseDetails.station})</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600 font-medium">Investigating Officer (IO):</span>
              <p className="text-slate-200 print:text-black mt-0.5">{caseDetails.assignedTo}</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600 font-medium">Primary Target Mobile/IP:</span>
              <p className="font-mono font-bold text-cyan-400 print:text-blue-800 mt-0.5">
                {caseDetails.primaryTarget ? formatPhoneNumber(caseDetails.primaryTarget) : 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600 font-medium">Investigation Status & Priority:</span>
              <p className="text-slate-200 print:text-black mt-0.5">{caseDetails.status} ({caseDetails.priority} Priority)</p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            II. Executive Summary of Allegations & Modus Operandi
          </h3>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-slate-100 print:border-slate-300 text-xs leading-relaxed">
            {caseDetails.summary}
            {caseDetails.victim && (
              <p className="mt-2 font-medium text-slate-300 print:text-black">
                Complainant / Victim Entity: <strong>{caseDetails.victim}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Nodal Call Telemetry Matrix */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            III. Key Target Nodal Telemetry & Frequency Analysis
          </h3>
          <div className="overflow-x-auto border border-slate-800 print:border-slate-300 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 print:bg-slate-200 border-b border-slate-800 print:border-slate-300 text-[10px] uppercase text-slate-400 print:text-slate-700">
                <tr>
                  <th className="py-2.5 px-3 font-medium">Nodal Entity</th>
                  <th className="py-2.5 px-3 font-medium">Role / Profile</th>
                  <th className="py-2.5 px-3 font-medium">Total Calls</th>
                  <th className="py-2.5 px-3 font-medium">Total Duration</th>
                  <th className="py-2.5 px-3 font-medium">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-slate-300 font-mono text-[11px]">
                {frequentNumbers.slice(0, 5).map((num, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-3 font-bold text-white print:text-black">
                      {formatPhoneNumber(num.number)}
                    </td>
                    <td className="py-2 px-3 text-slate-300 print:text-black font-sans">{num.label}</td>
                    <td className="py-2 px-3 text-cyan-400 print:text-black">{num.totalCalls}</td>
                    <td className="py-2 px-3 text-slate-300 print:text-black">{formatDuration(num.totalDuration)}</td>
                    <td className="py-2 px-3 font-sans font-semibold">
                      <span className={num.risk === 'Critical' ? 'text-rose-400 print:text-red-700' : 'text-amber-400 print:text-amber-700'}>
                        {num.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IPDR Findings */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            IV. Internet Protocol Telemetry (IPDR) Anomaly Summary
          </h3>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-slate-100 print:border-slate-300 text-xs space-y-2">
            <p>
              • <strong>Tor Relay Tunneling:</strong> IP 103.212.43.19 transmitted 147 MB of TLS encrypted packets to Tor Exit Relay node (185.220.101.5) on 2026-11-23 at 23:55:12 IST.
            </p>
            <p>
              • <strong>Reverse Shell C2 Signature:</strong> Outbound socket connection to port 4444 (Metasploit default handler) identified on target server 192.168.104.22.
            </p>
          </div>
        </div>

        {/* Verification and Signatures */}
        <div className="pt-6 border-t border-slate-800 print:border-slate-300 grid grid-cols-2 gap-8 text-xs">
          <div>
            <p className="font-semibold text-slate-300 print:text-black">Investigating Officer:</p>
            <div className="h-12 border-b border-dashed border-slate-700 print:border-slate-400 mt-2" />
            <p className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
              {caseDetails.assignedTo}<br />
              Cyber Crime Police Station, Jaipur
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-slate-300 print:text-black">Supervising Authority:</p>
            <div className="h-12 border-b border-dashed border-slate-700 print:border-slate-400 mt-2" />
            <p className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
              Superintendent of Police (Cyber Crime)<br />
              Rajasthan Police Headquarters, Jaipur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
