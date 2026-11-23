import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, CheckCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('dsp.rathore@police.rajasthan.gov.in');
  const [password, setPassword] = useState('cybercell2026');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Demo login simulation
    setTimeout(() => {
      localStorage.setItem('tracenet_auth_user', JSON.stringify({
        name: 'DSP Vikramaditya Singh Rathore',
        role: 'Deputy Superintendent of Police',
        station: 'Cyber Crime Police Station, Jaipur South',
        badge: 'RJ-CYBER-884'
      }));
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070b16] cyber-grid flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-700/80 shadow-2xl relative z-10">
        {/* Rajasthan Police Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-3 border border-cyan-400/30">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            TraceNet <span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
            Rajasthan Police Cyber Crime Unit
          </p>
          <div className="mt-2 text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            CDR / IPDR Forensic Intelligence Portal
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Demo Access Mode:</strong> No real authentication required. Click sign in below to enter the investigation workspace.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Investigator Official Email / ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="officer@police.rajasthan.gov.in"
                className="w-full bg-slate-900/90 text-xs text-slate-200 rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Security Token / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900/90 text-xs text-slate-200 rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-400">
            For Rajasthan Police Hackathon Evaluation • Restricted Official Use
          </p>
        </div>
      </div>
    </div>
  );
}
