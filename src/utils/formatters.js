// Utility formatters for Rajasthan Police Cyber Cell Dashboard

export function formatPhoneNumber(num) {
  if (!num) return '-';
  const clean = String(num).replace(/\D/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  if (clean.length === 12 && clean.startsWith('91')) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 7)} ${clean.slice(7)}`;
  }
  return num;
}

export function formatDuration(seconds) {
  if (seconds === undefined || seconds === null) return '-';
  const s = parseInt(seconds, 10);
  if (isNaN(s)) return '-';
  if (s < 60) return `${s}s`;
  const mins = Math.floor(s / 60);
  const remSec = s % 60;
  if (mins < 60) return `${mins}m ${remSec}s`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hrs}h ${remMins}m`;
}

export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getStatusColor(status) {
  const map = {
    'Active': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    'Under Investigation': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    'Critical': 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    'Closed': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    'Pending Analysis': 'text-slate-400 bg-slate-500/10 border-slate-500/30',
    'Verified': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    'Unverified': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    'High': 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    'Medium': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    'Low': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  };
  return map[status] || 'text-slate-400 bg-slate-500/10 border-slate-500/30';
}
