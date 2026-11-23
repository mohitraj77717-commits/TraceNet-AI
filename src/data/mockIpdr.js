// Synthetic IPDR Records for Rajasthan Police Cyber Investigation Prototype
// Note: IPDR fields capture Internet Protocol sessions, source/dest IPs, ports, bytes, protocol, and domains.

export const MOCK_IPDR_RECORDS = [
  {
    id: "IPDR-88201",
    caseId: "RJ-CYBER-2026-0812",
    sourceIp: "103.212.43.19",
    destIp: "185.220.101.5",
    sourcePort: 54128,
    destPort: 443,
    timestamp: "2026-11-23T23:55:12",
    duration: 1840,
    protocol: "HTTPS",
    dataVolumeBytes: 154200000, // 147 MB
    domain: "tor-exit-amsterdam.relays.net",
    isp: "Airtel Broadband Jaipur",
    cellId: "RJ-JPR-MS-401",
    status: "Critical",
    notes: "High volume TLS encrypted stream to confirmed Tor exit node"
  },
  {
    id: "IPDR-88202",
    caseId: "RJ-CYBER-2026-0812",
    sourceIp: "103.212.43.19",
    destIp: "149.154.167.92",
    sourcePort: 49102,
    destPort: 443,
    timestamp: "2026-11-23T23:40:02",
    duration: 310,
    protocol: "TCP",
    dataVolumeBytes: 4200000, // 4.2 MB
    domain: "api.telegram.org",
    isp: "Airtel Broadband Jaipur",
    cellId: "RJ-JPR-MS-401",
    status: "Flagged",
    notes: "Continuous Telegram bot API polling with large payload upload"
  },
  {
    id: "IPDR-88203",
    caseId: "RJ-CYBER-2026-0744",
    sourceIp: "192.168.104.22",
    destIp: "45.154.255.89",
    sourcePort: 41200,
    destPort: 4444,
    timestamp: "2026-11-23T22:15:30",
    duration: 980,
    protocol: "TCP",
    dataVolumeBytes: 89400000, // 85.2 MB
    domain: "c2-control-relay.xyz",
    isp: "BSNL FTTH Jodhpur",
    cellId: "RJ-JOD-PS-108",
    status: "Critical",
    notes: "Reverse shell signature on port 4444 (Metasploit default C2)"
  },
  {
    id: "IPDR-88204",
    caseId: "RJ-CYBER-2026-0812",
    sourceIp: "103.212.43.19",
    destIp: "103.22.201.44",
    sourcePort: 51240,
    destPort: 8080,
    timestamp: "2026-11-23T21:10:14",
    duration: 120,
    protocol: "HTTP",
    dataVolumeBytes: 840000, // 840 KB
    domain: "gateway.fastsmsrelay-voip.in",
    isp: "Airtel Broadband Jaipur",
    cellId: "RJ-JPR-MS-401",
    status: "Critical",
    notes: "SIM box SMS relay gateway interaction"
  },
  {
    id: "IPDR-88205",
    caseId: "RJ-CYBER-2026-0619",
    sourceIp: "49.36.192.81",
    destIp: "172.67.182.201",
    sourcePort: 58910,
    destPort: 443,
    timestamp: "2026-11-23T19:35:45",
    duration: 450,
    protocol: "HTTPS",
    dataVolumeBytes: 12400000, // 11.8 MB
    domain: "ap-south-1.fastloan-cdn.live",
    isp: "Reliance Jio Kota",
    cellId: "RJ-KTA-NY-301",
    status: "Flagged",
    notes: "Unregistered loan APK telemetry sync"
  },
  {
    id: "IPDR-88206",
    caseId: "RJ-CYBER-2026-0501",
    sourceIp: "49.36.110.14",
    destIp: "157.240.23.63",
    sourcePort: 52109,
    destPort: 443,
    timestamp: "2026-11-23T18:12:00",
    duration: 1420,
    protocol: "UDP",
    dataVolumeBytes: 45000000, // 42.9 MB
    domain: "media.fdel3-1.fna.whatsapp.net",
    isp: "Reliance Jio Bharatpur",
    cellId: "RJ-BHT-KG-102",
    status: "Flagged",
    notes: "High bandwidth WhatsApp video stream (coincides with CDR call #10931)"
  },
  {
    id: "IPDR-88207",
    caseId: "RJ-CYBER-2026-0392",
    sourceIp: "117.247.88.90",
    destIp: "52.84.162.29",
    sourcePort: 60124,
    destPort: 443,
    timestamp: "2026-11-23T15:20:18",
    duration: 210,
    protocol: "HTTPS",
    dataVolumeBytes: 2100000,
    domain: "api.binance.me",
    isp: "Vi Rajasthan Udaipur",
    cellId: "RJ-UDP-CT-201",
    status: "Normal",
    notes: "Crypto API authenticated socket"
  },
  {
    id: "IPDR-88208",
    caseId: "RJ-CYBER-2026-0812",
    sourceIp: "103.212.43.19",
    destIp: "8.8.8.8",
    sourcePort: 53210,
    destPort: 53,
    timestamp: "2026-11-23T14:02:11",
    duration: 2,
    protocol: "DNS",
    dataVolumeBytes: 1200,
    domain: "dns.google",
    isp: "Airtel Broadband Jaipur",
    cellId: "RJ-JPR-MS-401",
    status: "Normal",
    notes: "Standard DNS resolution query"
  },
  {
    id: "IPDR-88209",
    caseId: "RJ-CYBER-2026-0812",
    sourceIp: "103.212.43.19",
    destIp: "185.190.140.22",
    sourcePort: 59810,
    destPort: 443,
    timestamp: "2026-11-23T13:40:55",
    duration: 620,
    protocol: "HTTPS",
    dataVolumeBytes: 19800000,
    domain: "mail.proton.me",
    isp: "Airtel Broadband Jaipur",
    cellId: "RJ-JPR-MS-401",
    status: "Flagged",
    notes: "Encrypted Swiss mail provider access"
  },
  {
    id: "IPDR-88210",
    caseId: "RJ-CYBER-2026-0744",
    sourceIp: "192.168.104.22",
    destIp: "198.51.100.41",
    sourcePort: 44102,
    destPort: 22,
    timestamp: "2026-11-23T03:15:00",
    duration: 3600,
    protocol: "TCP",
    dataVolumeBytes: 420000000, // 400 MB
    domain: "backup-offsite-storage.ru",
    isp: "BSNL FTTH Jodhpur",
    cellId: "RJ-JOD-PS-108",
    status: "Critical",
    notes: "Mass SSH exfiltration during 03:00-04:00 AM window"
  }
];

export const MOCK_IPDR_TIMELINE = [
  { hour: "00:00", volumeMB: 380, sessions: 42 },
  { hour: "02:00", volumeMB: 840, sessions: 28 }, // Night anomaly
  { hour: "04:00", volumeMB: 920, sessions: 19 }, // Data dump
  { hour: "06:00", volumeMB: 120, sessions: 15 },
  { hour: "08:00", volumeMB: 210, sessions: 54 },
  { hour: "10:00", volumeMB: 450, sessions: 120 },
  { hour: "12:00", volumeMB: 580, sessions: 160 },
  { hour: "14:00", volumeMB: 620, sessions: 145 },
  { hour: "16:00", volumeMB: 710, sessions: 190 },
  { hour: "18:00", volumeMB: 890, sessions: 220 },
  { hour: "20:00", volumeMB: 1100, sessions: 280 },
  { hour: "22:00", volumeMB: 1450, sessions: 310 },
];
