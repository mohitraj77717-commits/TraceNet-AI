import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Info } from 'lucide-react';

export default function MainLayout() {
  const [selectedCaseId, setSelectedCaseId] = useState('RJ-CYBER-2026-0812');

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1d] text-slate-100">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <Navbar
          selectedCaseId={selectedCaseId}
          onSelectCase={setSelectedCaseId}
        />

        {/* Hackathon Prototype Notice Bar */}
        <div className="bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-blue-950/60 border-b border-cyan-500/20 px-6 py-1.5 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-cyan-300 font-medium">Rajasthan Police Cyber Hackathon Prototype</strong> — Running in synthetic test mode with mock CDR/IPDR telecom telemetry.
            </span>
          </div>
          <span className="hidden md:inline font-mono text-[10px] text-slate-400">
            Target Station: Cyber PS Jaipur South • IT Act Sec 66D/43
          </span>
        </div>

        {/* Page View with Context */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0a0f1d] cyber-grid">
          <Outlet context={{ selectedCaseId, setSelectedCaseId }} />
        </main>
      </div>
    </div>
  );
}
