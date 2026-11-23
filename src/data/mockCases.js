// Synthetic Mock Cases for Rajasthan Police Cyber Cell Investigation

export const MOCK_CASES = [
  {
    id: "RJ-CYBER-2026-0812",
    title: "SIM Box Relay & Financial Extortion Ring",
    category: "Telecom Fraud & Extortion",
    district: "Jaipur Commissionerate",
    station: "Cyber Police Station, Jaipur South",
    status: "Under Investigation",
    priority: "Critical",
    assignedTo: "DSP Vikramaditya Singh Rathore",
    createdAt: "2026-11-12T10:30:00Z",
    updatedAt: "2026-11-23T14:45:00Z",
    primaryTarget: "+91 98290 14820",
    totalCdrRecords: 14280,
    totalIpdrRecords: 48920,
    summary: "Investigation into unauthorized VoIP gateways and illegal SIM boxes operating out of Mansarovar, Jaipur, routing international calls through local SIMs for ransom extortion.",
    suspectsCount: 6,
    victim: "State Financial Co-operative Bank & HNI Individuals",
    tags: ["SIM Box", "VoIP", "Extortion", "CDR Deep Scan"]
  },
  {
    id: "RJ-CYBER-2026-0744",
    title: "Cyber Syndicate Darknet Data Exfiltration",
    category: "Data Breach & Ransomware",
    district: "Jodhpur Range",
    station: "Cyber Crime Police Station, Jodhpur",
    status: "Active",
    priority: "High",
    assignedTo: "Inspector Ananya Shekhawat",
    createdAt: "2026-11-05T09:15:00Z",
    updatedAt: "2026-11-22T18:20:00Z",
    primaryTarget: "192.168.104.22 / +91 94140 88219",
    totalCdrRecords: 8940,
    totalIpdrRecords: 92340,
    summary: "Suspicious continuous night-time data tunneling detected towards anonymous Tor exit nodes originating from a local municipal server IP cluster.",
    suspectsCount: 4,
    victim: "Jodhpur Municipal Infrastructure Portal",
    tags: ["IPDR", "Tor Exit", "Data Exfiltration", "Malware"]
  },
  {
    id: "RJ-CYBER-2026-0619",
    title: "Instant Loan App Harassment & OTP Redirection",
    category: "Financial Cyber Crime",
    district: "Kota Range",
    station: "Cyber Cell, Nayapura, Kota",
    status: "Active",
    priority: "High",
    assignedTo: "SI Rajesh Meena",
    createdAt: "2026-10-28T16:00:00Z",
    updatedAt: "2026-11-21T11:10:00Z",
    primaryTarget: "+91 97840 55192",
    totalCdrRecords: 22400,
    totalIpdrRecords: 31200,
    summary: "Syndicate operating fake instant micro-lending apps blackmails victims after gaining access to their contact lists. Call routing traced to multiple burner numbers.",
    suspectsCount: 9,
    victim: "Students and young professionals across coaching hub Kota",
    tags: ["Predatory Lending", "Burner SIMs", "IMEI Hop"]
  },
  {
    id: "RJ-CYBER-2026-0501",
    title: "Mewat Region Sextortion & UPI Scam Nexus",
    category: "Organized Cyber Extortion",
    district: "Bharatpur / Alwar Border",
    station: "Special Cyber Task Force, Bharatpur",
    status: "Pending Analysis",
    priority: "Critical",
    assignedTo: "Inspector Harphool Choudhary",
    createdAt: "2026-10-14T08:45:00Z",
    updatedAt: "2026-11-20T17:30:00Z",
    primaryTarget: "+91 99280 77314",
    totalCdrRecords: 34150,
    totalIpdrRecords: 14500,
    summary: "Large cluster of fraudulent WhatsApp accounts created on recycled SIMs used to trap victims in video call scams, coercing immediate UPI fund transfers.",
    suspectsCount: 14,
    victim: "Senior citizens and retired government personnel",
    tags: ["Sextortion", "WhatsApp Spoof", "Mewat Nexus", "UPI Mule"]
  },
  {
    id: "RJ-CYBER-2026-0392",
    title: "Cryptocurrency Mule Accounts & P2P Laundering",
    category: "Crypto Money Laundering",
    district: "Udaipur Range",
    station: "Cyber Cell, Udaipur Central",
    status: "Closed",
    priority: "Medium",
    assignedTo: "DSP Vikramaditya Singh Rathore",
    createdAt: "2026-09-18T14:20:00Z",
    updatedAt: "2026-11-10T12:00:00Z",
    primaryTarget: "+91 96020 33418",
    totalCdrRecords: 6420,
    totalIpdrRecords: 28900,
    summary: "Investigation completed. Layered P2P Binance crypto purchase network linked to fraudulent bank accounts dismantled. Chargesheet filed under IT Act 66D.",
    suspectsCount: 3,
    victim: "Private Investment Traders",
    tags: ["Crypto Mule", "P2P", "Resolved"]
  }
];

export const MOCK_STATISTICS = {
  totalCases: 28,
  activeCases: 14,
  closedCases: 14,
  totalCdrRecords: 86190,
  totalIpdrRecords: 215860,
  flaggedSuspectNumbers: 42,
  flaggedIps: 128,
  criticalAlerts: 7
};

export const MOCK_RECENT_ACTIVITIES = [
  {
    id: "act-1",
    type: "upload",
    title: "New CDR File Processed",
    description: "File 'Airtel_CDR_Jaipur_Mansarovar_Nov23.csv' (4,200 records) linked to RJ-CYBER-2026-0812.",
    timestamp: "2026-11-24T00:45:00Z",
    user: "DSP Vikramaditya Singh Rathore"
  },
  {
    id: "act-2",
    type: "ai_analysis",
    title: "AI Pattern Detected: High Commonality",
    description: "Number +91 98290 14820 found in common call logs of 3 active criminal files.",
    timestamp: "2026-11-23T23:10:00Z",
    user: "TraceNet AI Engine"
  },
  {
    id: "act-3",
    type: "network",
    title: "Network Node Classified as Hub",
    description: "Cytoscape topological scan elevated Node +91 94140 88219 degree centrality to 0.89.",
    timestamp: "2026-11-23T21:30:00Z",
    user: "Inspector Ananya Shekhawat"
  },
  {
    id: "act-4",
    type: "ipdr",
    title: "Suspicious Port Activity Flagged",
    description: "Repeated port 4444 (Metasploit default) connections logged from IP 103.212.43.19.",
    timestamp: "2026-11-23T19:15:00Z",
    user: "SI Rajesh Meena"
  }
];
