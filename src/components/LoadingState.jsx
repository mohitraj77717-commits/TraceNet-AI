import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = "Analyzing investigation records..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin" />
        <Loader2 className="w-5 h-5 text-cyan-400 absolute" />
      </div>
      <p className="text-xs font-medium text-slate-400 mt-4 tracking-wide uppercase font-mono">
        {message}
      </p>
    </div>
  );
}
