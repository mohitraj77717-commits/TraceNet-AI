import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Shield,
  ArrowUpRight,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import { caseService } from '../services/caseService';
import { formatDate } from '../utils/dateUtils';
import { formatPhoneNumber } from '../utils/formatters';

export default function CasesPage() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Case Form state
  const [newCase, setNewCase] = useState({
    title: '',
    category: 'Telecom Fraud & Extortion',
    district: 'Jaipur Commissionerate',
    station: 'Cyber Police Station, Jaipur South',
    priority: 'High',
    status: 'Active',
    assignedTo: 'DSP Vikramaditya Singh Rathore',
    primaryTarget: '',
    summary: '',
    tags: 'SIM Box, Extortion'
  });

  const loadCases = async () => {
    setLoading(true);
    try {
      const res = await caseService.getCases();
      setCases(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleCreateCase = async (e) => {
    e.preventDefault();
    const formattedTags = newCase.tags.split(',').map(t => t.trim()).filter(Boolean);
    const res = await caseService.createCase({
      ...newCase,
      tags: formattedTags
    });
    setIsModalOpen(false);
    // Refresh case list
    await loadCases();
    navigate(`/cases/${res.data.id}`);
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
      (c.primaryTarget && c.primaryTarget.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            Case Management & Dossiers
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain Rajasthan Police cyber investigation records, targets, and evidence links.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-600/20 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Register New Case
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Case ID, title, target number, or officer..."
            className="w-full bg-slate-900/90 text-xs text-slate-200 placeholder-slate-400 rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Pending Analysis">Pending Analysis</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-900 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/60"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      {loading ? (
        <LoadingState message="Fetching active investigation dossiers..." />
      ) : filteredCases.length === 0 ? (
        <EmptyState
          title="No cases match your filters"
          description="Try modifying search keywords or clearing status filters."
          actionLabel="Clear Filters"
          onAction={() => { setSearch(''); setStatusFilter('All'); setPriorityFilter('All'); }}
        />
      ) : (
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-medium">Case ID</th>
                  <th className="py-3 px-4 font-medium">Investigation Title</th>
                  <th className="py-3 px-4 font-medium">Primary Target</th>
                  <th className="py-3 px-4 font-medium">District & Station</th>
                  <th className="py-3 px-4 font-medium">Assigned Officer</th>
                  <th className="py-3 px-4 font-medium">Records Ingested</th>
                  <th className="py-3 px-4 font-medium">Priority</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCases.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-800/40 transition group cursor-pointer"
                    onClick={() => navigate(`/cases/${c.id}`)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition">
                        {c.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{c.category}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                      {c.primaryTarget ? formatPhoneNumber(c.primaryTarget) : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      <div>{c.district}</div>
                      <div className="text-[10px] text-slate-400">{c.station}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {c.assignedTo}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                      <span className="text-cyan-400 font-medium">{(c.totalCdrRecords || 0).toLocaleString()}</span> CDR /{' '}
                      <span className="text-emerald-400 font-medium">{(c.totalIpdrRecords || 0).toLocaleString()}</span> IPDR
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={c.priority}>{c.priority}</Badge>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={c.status}>{c.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300 text-xs font-medium">
                        Dossier <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Cyber Crime Investigation"
      >
        <form onSubmit={handleCreateCase} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Investigation Title / FIR Subject *
            </label>
            <input
              type="text"
              required
              value={newCase.title}
              onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
              placeholder="e.g. SIM Box Relay & Extortion Ring"
              className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Crime Category
              </label>
              <select
                value={newCase.category}
                onChange={(e) => setNewCase({ ...newCase, category: e.target.value })}
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700"
              >
                <option value="Telecom Fraud & Extortion">Telecom Fraud & Extortion</option>
                <option value="Data Breach & Ransomware">Data Breach & Ransomware</option>
                <option value="Financial Cyber Crime">Financial Cyber Crime</option>
                <option value="Organized Cyber Extortion">Organized Cyber Extortion</option>
                <option value="Dark Web Nexus">Dark Web Nexus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Police District
              </label>
              <select
                value={newCase.district}
                onChange={(e) => setNewCase({ ...newCase, district: e.target.value })}
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700"
              >
                <option value="Jaipur Commissionerate">Jaipur Commissionerate</option>
                <option value="Jodhpur Range">Jodhpur Range</option>
                <option value="Kota Range">Kota Range</option>
                <option value="Bharatpur / Mewat Border">Bharatpur / Mewat Border</option>
                <option value="Udaipur Range">Udaipur Range</option>
                <option value="Bikaner Range">Bikaner Range</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Target Phone Number / IP
              </label>
              <input
                type="text"
                value={newCase.primaryTarget}
                onChange={(e) => setNewCase({ ...newCase, primaryTarget: e.target.value })}
                placeholder="+91 98290 XXXXX"
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Priority Level
              </label>
              <select
                value={newCase.priority}
                onChange={(e) => setNewCase({ ...newCase, priority: e.target.value })}
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Assigned Investigating Officer (IO)
            </label>
            <input
              type="text"
              required
              value={newCase.assignedTo}
              onChange={(e) => setNewCase({ ...newCase, assignedTo: e.target.value })}
              className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Case Brief / Allegations
            </label>
            <textarea
              rows={3}
              value={newCase.summary}
              onChange={(e) => setNewCase({ ...newCase, summary: e.target.value })}
              placeholder="Summary of complaint, initial suspect numbers, and telecom analysis objectives..."
              className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl p-3 border border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Investigation Tags (Comma separated)
            </label>
            <input
              type="text"
              value={newCase.tags}
              onChange={(e) => setNewCase({ ...newCase, tags: e.target.value })}
              placeholder="e.g. SIM Box, VoIP, Extortion, CDR Deep Scan"
              className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-semibold rounded-xl shadow transition"
            >
              Initialize Dossier
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
