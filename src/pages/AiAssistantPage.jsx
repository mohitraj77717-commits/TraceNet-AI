import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bot,
  Send,
  User,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import Badge from '../components/Badge';
import { aiService } from '../services/aiService';
import { SAMPLE_PROMPT_PILLS } from '../data/mockAiResponses';
import { formatDateTime } from '../utils/dateUtils';
import { MOCK_CASES } from '../data/mockCases';

export default function AiAssistantPage() {
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || '';

  const [selectedCaseId, setSelectedCaseId] = useState('RJ-CYBER-2026-0812');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Namaste Officer Rathore. I am the **TraceNet Cyber AI Assistant** for Rajasthan Police.\n\nI can correlate Call Detail Records (CDR), IPDR telemetry, and network graph topologies for your active cases. Choose an investigative question below or enter your own query.",
      timestamp: new Date().toISOString(),
      isMock: true,
      supportingEvidence: [],
      recommendations: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState(initialPrompt);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, []);

  const handleSend = async (queryToSend) => {
    const query = (queryToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const aiResponse = await aiService.askQuestion(query, selectedCaseId);
      const botMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse.answer,
        timestamp: aiResponse.timestamp || new Date().toISOString(),
        isMock: aiResponse.isMock,
        confidence: aiResponse.confidence,
        supportingEvidence: aiResponse.supportingEvidence || [],
        recommendations: aiResponse.recommendations || []
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: "Error communicating with AI intelligence inference layer. Please verify backend connection.",
          timestamp: new Date().toISOString(),
          isMock: true,
          supportingEvidence: []
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-4 h-[calc(100vh-140px)] flex flex-col">
      {/* Header Bar */}
      <div className="glass-card p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              AI Cyber Investigation Assistant
              <Badge variant="Active">Inference Ready</Badge>
            </h1>
            <p className="text-[11px] text-slate-400">
              Heuristic & topological correlation for telecommunication logs.
            </p>
          </div>
        </div>

        {/* Case Context Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Target Dossier Context:</span>
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="bg-slate-900 text-slate-200 font-mono text-xs rounded-xl px-3 py-1.5 border border-slate-700 focus:outline-none"
          >
            {MOCK_CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.title.slice(0, 24)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandatory Prototype Disclaimer Bar */}
      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2 shrink-0">
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
        <span>
          <strong>Ethical AI Guardrail:</strong> Responses are generated from synthetic hackathon data and clearly labeled as mock inferences until the production Flask LLM backend is integrated.
        </span>
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 glass-card rounded-2xl border border-slate-800 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 space-y-3'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800/60 mb-2">
                <span>{msg.sender === 'user' ? 'Investigating Officer' : 'TraceNet Forensic Engine'}</span>
                <span>{formatDateTime(msg.timestamp)}</span>
              </div>

              {/* Main Text Content */}
              <div className="prose prose-invert prose-xs leading-relaxed whitespace-pre-line">
                {msg.text}
              </div>

              {/* Confidence & Mock tag */}
              {msg.sender === 'ai' && msg.confidence && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    Confidence: <strong className="text-cyan-300">{msg.confidence}</strong>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    Synthetic Evidence Model
                  </span>
                </div>
              )}

              {/* Supporting Evidence Citations */}
              {msg.supportingEvidence && msg.supportingEvidence.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Supporting Ingested Telemetry Records:
                  </span>
                  <div className="space-y-1">
                    {msg.supportingEvidence.map((ev, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono text-[11px] flex items-start justify-between gap-2"
                      >
                        <div>
                          <span className="text-cyan-400 font-bold mr-2">{ev.recordId}</span>
                          <span className="text-slate-300 font-sans">{ev.details}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{ev.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Procedural Recommendations */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-emerald-400 block">
                    Recommended Police Investigative Actions:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-[11px]">
                    {msg.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Scanning CDR nodal matrices and IPDR packet records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className="text-[10px] text-slate-400 uppercase font-semibold whitespace-nowrap">
          Suggested Queries:
        </span>
        {SAMPLE_PROMPT_PILLS.map((pill, i) => (
          <button
            key={i}
            onClick={() => handleSend(pill.prompt)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs whitespace-nowrap border border-slate-800 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>{pill.label}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="glass-card p-2 rounded-2xl border border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a forensic question (e.g. 'Which contacts appear most frequently?', 'Show timeline of +91 98290 14820')..."
          className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-400 px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="p-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl shadow-lg transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
