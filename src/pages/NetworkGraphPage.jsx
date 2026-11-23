import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import {
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  ShieldAlert,
  User,
  PhoneCall,
  Clock,
  Filter,
  Info,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/Badge';
import { analysisService } from '../services/analysisService';
import { formatPhoneNumber, formatDuration } from '../utils/formatters';

export default function NetworkGraphPage() {
  const navigate = useNavigate();
  const cyContainerRef = useRef(null);
  const cyRef = useRef(null);

  const [graphElements, setGraphElements] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [minCalls, setMinCalls] = useState(0);
  const [riskFilter, setRiskFilter] = useState('All');
  const [layoutName, setLayoutName] = useState('cose');

  // Load graph elements
  useEffect(() => {
    async function fetchGraphData() {
      try {
        const res = await analysisService.getNetworkGraph();
        setGraphElements(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchGraphData();
  }, []);

  // Initialize or re-render Cytoscape
  useEffect(() => {
    if (!cyContainerRef.current || !graphElements.length) return;

    // Filter elements based on UI controls
    const filteredNodes = graphElements.filter(el => {
      if (el.data.source && el.data.target) return false; // is edge
      if (riskFilter !== 'All' && el.data.risk !== riskFilter) return false;
      return true;
    });

    const validNodeIds = new Set(filteredNodes.map(n => n.data.id));

    const filteredEdges = graphElements.filter(el => {
      if (!el.data.source || !el.data.target) return false; // not edge
      if (!validNodeIds.has(el.data.source) || !validNodeIds.has(el.data.target)) return false;
      if (el.data.callCount < minCalls) return false;
      return true;
    });

    // Destroy existing instance if any
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    // Initialize Cytoscape
    const cy = cytoscape({
      container: cyContainerRef.current,
      elements: [...filteredNodes, ...filteredEdges],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#f8fafc',
            'font-size': '11px',
            'font-family': 'JetBrains Mono, monospace',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'background-color': 'data(color)',
            'width': 'data(size)',
            'height': 'data(size)',
            'border-width': 3,
            'border-color': '#0f172a',
            'overlay-opacity': 0
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#38bdf8',
            'shadow-blur': 25,
            'shadow-color': '#38bdf8',
            'shadow-opacity': 0.8
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 'data(weight)',
            'line-color': '#334155',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '9px',
            'font-family': 'Inter, sans-serif',
            'color': '#94a3b8',
            'text-rotation': 'autorotate',
            'text-background-opacity': 0.85,
            'text-background-color': '#0b1120',
            'text-background-padding': '2px',
            'arrow-scale': 0.8
          }
        },
        {
          selector: 'edge[riskLevel="Critical"]',
          style: {
            'line-color': '#f43f5e',
            'target-arrow-color': '#f43f5e'
          }
        },
        {
          selector: 'edge[riskLevel="High"]',
          style: {
            'line-color': '#f59e0b',
            'target-arrow-color': '#f59e0b'
          }
        }
      ],
      layout: {
        name: layoutName,
        animate: true,
        animationDuration: 500,
        padding: 50
      }
    });

    // Handle node click
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      setSelectedNode(node.data());
    });

    // Unselect on background click
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedNode(null);
      }
    });

    cyRef.current = cy;

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [graphElements, minCalls, riskFilter, layoutName]);

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit(undefined, 50);
  const handleReset = () => {
    cyRef.current?.reset();
    cyRef.current?.layout({ name: layoutName, animate: true }).run();
  };

  return (
    <div className="space-y-4 h-[calc(100vh-140px)] flex flex-col">
      {/* Top Controls Bar */}
      <div className="glass-card p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white tracking-tight">
              Communication Network Topology (Cytoscape.js)
            </h1>
          </div>
          <Badge variant="Active">Live Interactivity</Badge>
        </div>

        {/* Filters and Layout controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Min calls slider */}
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Min Calls: <strong>{minCalls}</strong></span>
            <input
              type="range"
              min="0"
              max="50"
              value={minCalls}
              onChange={(e) => setMinCalls(parseInt(e.target.value, 10))}
              className="w-20 accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-slate-900 text-slate-300 text-xs rounded-xl px-2.5 py-1.5 border border-slate-800 focus:outline-none"
          >
            <option value="All">All Risk Nodes</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Only</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low (Victims)</option>
          </select>

          {/* Layout Selector */}
          <select
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
            className="bg-slate-900 text-slate-300 text-xs rounded-xl px-2.5 py-1.5 border border-slate-800 focus:outline-none"
          >
            <option value="cose">Force-Directed (CoSE)</option>
            <option value="circle">Concentric Circle</option>
            <option value="breadthfirst">Hierarchical Tree</option>
            <option value="grid">Grid</option>
          </select>

          {/* Canvas Actions */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={handleZoomIn}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleFit}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Fit View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Reset Layout"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas + Side Panel */}
      <div className="flex-1 flex gap-4 min-h-0 relative">
        {/* Cytoscape Container */}
        <div className="flex-1 glass-card rounded-2xl border border-slate-800 relative overflow-hidden bg-[#070b16]">
          <div ref={cyContainerRef} className="w-full h-full" />

          {/* Graph Legend Overlay */}
          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] space-y-1.5 pointer-events-none">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Node Legend:</span>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Primary Suspect / Hub (Critical)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Key Associate / SIM Vendor (High)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Cash Mule / Intermediary (Medium)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Complainant / Victim (Low)</span>
            </div>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div className="w-80 glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between overflow-y-auto animate-fade-in shrink-0">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Suspect Profile</span>
                  <h3 className="text-base font-bold text-white font-mono mt-0.5">
                    {formatPhoneNumber(selectedNode.label)}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">{selectedNode.name}</p>
                </div>
                <Badge variant={selectedNode.risk}>{selectedNode.risk}</Badge>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Identified Role:</span>
                  <span className="text-cyan-300 font-medium text-right max-w-[140px] truncate">
                    {selectedNode.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jurisdiction:</span>
                  <span className="text-slate-200">{selectedNode.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Operator:</span>
                  <span className="text-slate-200">{selectedNode.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Calls Logged:</span>
                  <span className="text-white font-mono font-bold">{selectedNode.totalCalls} calls</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nodal Degree:</span>
                  <span className="text-amber-400 font-mono font-bold">{selectedNode.degree} links</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Forensic Telemetry Identifiers
                </h4>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">IMEI:</span>
                    <span className="text-slate-200">{selectedNode.imei || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">IMSI:</span>
                    <span className="text-slate-200">{selectedNode.imsi || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">First Active:</span>
                    <span className="text-slate-300">{selectedNode.firstSeen}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions for this node */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => navigate(`/analysis?q=${selectedNode.label.replace(/\D/g, '')}`)}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                View Call Records in CDR
              </button>
              <button
                onClick={() => navigate(`/ai-assistant?prompt=${encodeURIComponent(`Show communication activity for target number ${selectedNode.label}`)}`)}
                className="w-full py-2 px-3 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 text-xs font-semibold rounded-xl border border-cyan-500/40 transition flex items-center justify-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                Query AI Assistant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
