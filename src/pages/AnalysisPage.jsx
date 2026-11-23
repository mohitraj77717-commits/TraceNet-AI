import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Download,
  PhoneCall,
  Globe,
  Radio,
  Clock,
  ShieldAlert,
  Calendar,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import { analysisService } from '../services/analysisService';
import { formatPhoneNumber, formatDuration, formatBytes } from '../utils/formatters';
import { formatDateTime } from '../utils/dateUtils';
import { exportToCSV } from '../utils/exportUtils';

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [activeTab, setActiveTab] = useState('CDR'); // 'CDR' or 'IPDR'
  const [search, setSearch] = useState(initialQuery);
  const [callTypeFilter, setCallTypeFilter] = useState('All');
  const [protocolFilter, setProtocolFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [cdrRecords, setCdrRecords] = useState([]);
  const [ipdrRecords, setIpdrRecords] = useState([]);
  const [callTimeline, setCallTimeline] = useState([]);
  const [ipdrTimeline, setIpdrTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cdrRes, ipdrRes, callTimeRes, ipdrTimeRes] = await Promise.all([
          analysisService.getCdrRecords({ search, callType: callTypeFilter, status: statusFilter }),
          analysisService.getIpdrRecords({ search, protocol: protocolFilter, status: statusFilter }),
          analysisService.getCallTimeline(),
          analysisService.getIpdrTimeline()
        ]);
        setCdrRecords(cdrRes.data);
        setIpdrRecords(ipdrRes.data);
        setCallTimeline(callTimeRes.data);
        setIpdrTimeline(ipdrTimeRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, callTypeFilter, protocolFilter, statusFilter]);

  const handleExport = () => {
    if (activeTab === 'CDR') {
      exportToCSV(cdrRecords, `Rajasthan_Police_CDR_Analysis_${Date.now()}.csv`);
    } else {
      exportToCSV(ipdrRecords, `Rajasthan_Police_IPDR_Analysis_${Date.now()}.csv`);
    }
  };

  const operatorColors = ['#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];
  const operatorData = [
    { name: 'Airtel', value: 48 },
    { name: 'Reliance Jio', value: 32 },
    { name: 'BSNL', value: 12 },
    { name: 'Vi', value: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            CDR & IPDR Forensic Telemetry Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deep packet inspection and call detail record correlation for suspect numbers and IPs.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          Export Filtered Records (CSV)
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('CDR')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'CDR'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call Detail Records (CDR)</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
            {cdrRecords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('IPDR')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'IPDR'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>IP Detail Records (IPDR)</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
            {ipdrRecords.length}
          </span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              activeTab === 'CDR'
                ? "Filter by phone number, contact name, cell tower, IMEI..."
                : "Filter by source IP, destination IP, domain, ISP, port..."
            }
            className="w-full bg-slate-900/90 text-xs text-slate-200 placeholder-slate-400 rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {activeTab === 'CDR' ? (
            <select
              value={callTypeFilter}
              onChange={(e) => setCallTypeFilter(e.target.value)}
              className="bg-slate-900 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="All">All Call Types</option>
              <option value="Outgoing">Outgoing</option>
              <option value="Incoming">Incoming</option>
              <option value="Missed">Missed</option>
            </select>
          ) : (
            <select
              value={protocolFilter}
              onChange={(e) => setProtocolFilter(e.target.value)}
              className="bg-slate-900 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="All">All Protocols</option>
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="HTTPS">HTTPS</option>
              <option value="DNS">DNS</option>
            </select>
          )}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60"
          >
            <option value="All">All Statuses</option>
            <option value="Critical">Critical</option>
            <option value="Flagged">Flagged</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Analytics Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-1">
            {activeTab === 'CDR' ? 'Hourly Call Volume & Outliers' : 'Hourly Data Transfer Volume (MB)'}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {activeTab === 'CDR' ? 'Call frequency pattern highlighting late night activity' : 'Data transmission spikes indicative of exfiltration sessions'}
          </p>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'CDR' ? (
                <BarChart data={callTimeline} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  />
                  <Bar dataKey="calls" name="Total Calls" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="suspicious" name="Suspicious" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={ipdrTimeline} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  />
                  <Bar dataKey="volumeMB" name="Data Volume (MB)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operator distribution */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Operator Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">Carrier coverage in analyzed logs.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={operatorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {operatorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={operatorColors[index % operatorColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800">
            {operatorData.map((op, i) => (
              <div key={op.name} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: operatorColors[i] }} />
                <span>{op.name}: <strong>{op.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Records Table */}
      {loading ? (
        <LoadingState message="Filtering telemetry rows..." />
      ) : activeTab === 'CDR' ? (
        cdrRecords.length === 0 ? (
          <EmptyState
            title="No CDR records found"
            description="No call logs match your query. Try resetting filters."
            actionLabel="Reset Search"
            onAction={() => { setSearch(''); setCallTypeFilter('All'); setStatusFilter('All'); }}
          />
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4 font-medium">Record ID</th>
                    <th className="py-3 px-4 font-medium">Caller (A-Party)</th>
                    <th className="py-3 px-4 font-medium">Receiver (B-Party)</th>
                    <th className="py-3 px-4 font-medium">Timestamp</th>
                    <th className="py-3 px-4 font-medium">Duration</th>
                    <th className="py-3 px-4 font-medium">Type</th>
                    <th className="py-3 px-4 font-medium">Cell Tower & Location</th>
                    <th className="py-3 px-4 font-medium">Operator / IMEI</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {cdrRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-semibold text-cyan-400 whitespace-nowrap">{r.id}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-white font-medium">{formatPhoneNumber(r.caller)}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{r.callerName || 'Unknown Subscriber'}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-slate-200">{formatPhoneNumber(r.receiver)}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{r.receiverName || 'Unknown Entity'}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-300 whitespace-nowrap">{formatDateTime(r.timestamp)}</td>
                      <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">{formatDuration(r.duration)}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans ${
                          r.callType === 'Outgoing' ? 'bg-blue-500/10 text-blue-400' :
                          r.callType === 'Incoming' ? 'bg-emerald-500/10 text-emerald-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {r.callType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                        <div>{r.cellId || 'N/A'}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{r.towerLocation || '-'}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                        <div>{r.operator || 'Unknown Operator'}</div>
                        <div className="text-[10px] text-slate-400">{r.imei || 'IMEI N/A'}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-sans">
                        <Badge variant={r.status}>{r.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        /* IPDR Table */
        ipdrRecords.length === 0 ? (
          <EmptyState
            title="No IPDR records found"
            description="No IP telemetry records match your parameters."
            actionLabel="Reset Search"
            onAction={() => { setSearch(''); setProtocolFilter('All'); setStatusFilter('All'); }}
          />
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4 font-medium">Session ID</th>
                    <th className="py-3 px-4 font-medium">Source IP & Port</th>
                    <th className="py-3 px-4 font-medium">Destination IP & Port</th>
                    <th className="py-3 px-4 font-medium">Timestamp</th>
                    <th className="py-3 px-4 font-medium">Protocol</th>
                    <th className="py-3 px-4 font-medium">Data Volume</th>
                    <th className="py-3 px-4 font-medium">Domain / Destination Service</th>
                    <th className="py-3 px-4 font-medium">ISP Provider</th>
                    <th className="py-3 px-4 font-medium">Status / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {ipdrRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-semibold text-emerald-400 whitespace-nowrap">{r.id}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-white font-medium">{r.sourceIp}</span>
                        <span className="text-slate-400">:{r.sourcePort}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-slate-200">{r.destIp}</span>
                        <span className="text-slate-400">:{r.destPort}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 whitespace-nowrap">{formatDateTime(r.timestamp)}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-sans">
                          {r.protocol}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">
                        {formatBytes(r.dataVolumeBytes)}
                      </td>
                      <td className="py-3 px-4 text-cyan-300 whitespace-nowrap max-w-[200px] truncate">
                        {r.domain || '-'}
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap font-sans">{r.isp || '-'}</td>
                      <td className="py-3 px-4 whitespace-nowrap font-sans">
                        <div className="flex items-center gap-1.5">
                          <Badge variant={r.status}>{r.status}</Badge>
                        </div>
                        {r.notes && (
                          <div className="text-[10px] text-slate-400 mt-0.5 max-w-[220px] truncate">
                            {r.notes}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}
