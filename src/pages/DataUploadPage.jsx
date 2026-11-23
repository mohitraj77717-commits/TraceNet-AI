import React, { useState } from 'react';
import {
  UploadCloud,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  RefreshCw,
  Info
} from 'lucide-react';
import Badge from '../components/Badge';
import { uploadService } from '../services/uploadService';
import { formatBytes } from '../utils/formatters';
import { MOCK_CASES } from '../data/mockCases';

export default function DataUploadPage() {
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_CASES[0].id);
  const [dataType, setDataType] = useState('CDR'); // 'CDR' or 'IPDR'
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [validation, setValidation] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Pre-configured sample CSV generators for 1-click test evaluations
  const sampleCdrCsv = `caller,receiver,timestamp,duration,cell_id,tower_location,operator,imei\n+919829014820,+919414088219,2026-11-23 22:14:10,382,RJ-JPR-MS-401,Mansarovar Sector 4 Jaipur,Airtel,864192051284910\n+919829014820,+919784055192,2026-11-23 23:05:40,145,RJ-JPR-MS-401,Mansarovar Sector 4 Jaipur,Airtel,864192051284910\n+919928077314,+919829014820,2026-11-23 23:42:15,512,RJ-JPR-SD-210,Sanganer Airport Rd Jaipur,Reliance Jio,867821034928190\n+919829014820,+919602033418,2026-11-24 00:15:22,88,RJ-JPR-SD-210,Sanganer Airport Rd Jaipur,Airtel,864192051284910\n+919829014820,+919116044921,2026-11-24 00:33:10,640,RJ-JPR-MS-401,Mansarovar Sector 4 Jaipur,Airtel,864192051284910`;

  const sampleIpdrCsv = `source_ip,dest_ip,source_port,dest_port,timestamp,duration,protocol,data_bytes,domain,isp\n103.212.43.19,185.220.101.5,54128,443,2026-11-23 23:55:12,1840,HTTPS,154200000,tor-exit-amsterdam.relays.net,Airtel Broadband\n103.212.43.19,149.154.167.92,49102,443,2026-11-23 23:40:02,310,TCP,4200000,api.telegram.org,Airtel Broadband\n192.168.104.22,45.154.255.89,41200,4444,2026-11-23 22:15:30,980,TCP,89400000,c2-control-relay.xyz,BSNL FTTH\n103.212.43.19,103.22.201.44,51240,8080,2026-11-23 21:10:14,120,HTTP,840000,gateway.fastsmsrelay-voip.in,Airtel Broadband\n192.168.104.22,198.51.100.41,44102,22,2026-11-23 03:15:00,3600,TCP,420000000,backup-offsite-storage.ru,BSNL FTTH`;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    processSelectedFile(selected);
  };

  const processSelectedFile = (selected) => {
    setErrorMsg(null);
    setResult(null);

    if (!selected.name.endsWith('.csv') && !selected.type.includes('csv') && !selected.type.includes('text')) {
      setErrorMsg('Invalid file format. Please upload a structured .CSV dump file.');
      return;
    }

    setFile(selected);

    // Read content for preview and validation
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const firstLine = text.split('\n')[0] || '';
      const val = uploadService.validateHeaders(firstLine, dataType);
      setValidation(val);

      if (!val.isValid) {
        setErrorMsg(`Format mismatch: Uploaded CSV is missing expected ${dataType} headers (Required: ${val.missing.join(', ')}).`);
      }

      const parsed = uploadService.parseCsvPreview(text, 5);
      setPreview(parsed);
    };
    reader.readAsText(selected);
  };

  const loadSampleFile = (type) => {
    setDataType(type);
    const content = type === 'CDR' ? sampleCdrCsv : sampleIpdrCsv;
    const blob = new Blob([content], { type: 'text/csv' });
    const sampleFile = new File([blob], `Rajasthan_Cyber_${type}_Sample_Dump.csv`, { type: 'text/csv' });
    processSelectedFile(sampleFile);
  };

  const handleUploadSubmit = async () => {
    if (!file) return;
    setIsProcessing(true);
    setUploadProgress(0);

    const uploadRes = await uploadService.uploadFile(
      file,
      selectedCaseId,
      dataType,
      (progress) => setUploadProgress(progress)
    );

    setIsProcessing(false);
    setResult(uploadRes);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-cyan-400" />
          Data Ingestion & Telecom Dump Processing
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Ingest raw Call Detail Records (CDR) and IP Detail Records (IPDR) for forensic correlation.
        </p>
      </div>

      {/* Backend vs Prototype Notice */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Hackathon Testing Notice:</strong> You can upload real/synthetic CSV dumps or click the sample buttons below to test the ingestion pipeline without external files.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1-Col: Configuration & Upload Box */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-white">Ingestion Parameters</h3>

          {/* Target Case */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Associate with Case ID
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3 py-2 border border-slate-700"
            >
              {MOCK_CASES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.title.slice(0, 28)}...
                </option>
              ))}
            </select>
          </div>

          {/* Dump Type Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Dump Telemetry Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setDataType('CDR'); if (file) processSelectedFile(file); }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  dataType === 'CDR'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                CDR (Voice / SMS)
              </button>
              <button
                type="button"
                onClick={() => { setDataType('IPDR'); if (file) processSelectedFile(file); }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  dataType === 'IPDR'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                IPDR (Data / IP)
              </button>
            </div>
          </div>

          {/* 1-Click Sample Ingestion buttons */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Instant Hackathon Test Samples:
            </span>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => loadSampleFile('CDR')}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-medium border border-slate-700 transition"
              >
                Load Sample CDR
              </button>
              <button
                type="button"
                onClick={() => loadSampleFile('IPDR')}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-medium border border-slate-700 transition"
              >
                Load Sample IPDR
              </button>
            </div>
          </div>

          {/* Dropzone */}
          <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 text-center transition cursor-pointer bg-slate-900/40">
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center">
              <UploadCloud className="w-8 h-8 text-cyan-400 mb-2" />
              <p className="text-xs font-semibold text-slate-200">
                Click or drag & drop CSV file
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Standard Airtel, Jio, Vi, or BSNL telecom format (.csv)
              </p>
            </div>
          </div>

          {/* Selected File Details */}
          {file && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-200 truncate max-w-[180px]">{file.name}</span>
                <span className="text-slate-400 font-mono text-[11px]">{formatBytes(file.size)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Target Type:</span>
                <span className="font-semibold text-cyan-400">{dataType} Dump</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            disabled={!file || (validation && !validation.isValid) || isProcessing}
            onClick={handleUploadSubmit}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Dump ({uploadProgress}%)...</span>
              </>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                <span>Parse & Ingest Into Case</span>
              </>
            )}
          </button>
        </div>

        {/* Right 2-Col: Validation Status & Record Preview Table */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Ingestion Telemetry Preview</h3>
            {validation && (
              <Badge variant={validation.isValid ? 'Verified' : 'Critical'}>
                {validation.isValid ? 'Schema Validated' : 'Schema Error'}
              </Badge>
            )}
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          {/* Processing Progress Bar */}
          {isProcessing && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-medium">Parsing & Normalizing Telecom Rows...</span>
                <span className="font-mono text-slate-300">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success Banner */}
          {result && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{result.data?.status || 'Processing Complete!'}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200">
                  {result.isMock ? 'Synthetic Ingest' : 'Flask Backend'}
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Successfully processed <strong>{result.data?.recordsIngested?.toLocaleString()}</strong> records for case <strong>{selectedCaseId}</strong>.
                ({result.data?.validRecords?.toLocaleString()} valid records, {result.data?.invalidRecords} anomalies flagged).
              </p>
            </div>
          )}

          {/* CSV Header and Record Preview */}
          {preview ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Detected Headers: {preview.headers.join(', ')}</span>
                <span className="font-mono">Previewing top 5 sample records</span>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 text-[10px] uppercase font-medium">
                    <tr>
                      {preview.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {preview.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        {preview.headers.map((h, i) => (
                          <td key={i} className="py-2 px-3 whitespace-nowrap text-slate-300">
                            {row[h] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl text-slate-400 text-xs">
              <FileSpreadsheet className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p>No file selected yet. Select a CSV or click sample load above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
