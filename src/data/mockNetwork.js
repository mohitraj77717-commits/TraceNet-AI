// Synthetic Cytoscape Communication Graph Elements
// For Rajasthan Police Cyber Cell Network Analysis Module

export const MOCK_GRAPH_ELEMENTS = [
  // Nodes
  {
    data: {
      id: "9829014820",
      label: "+91 98290 14820",
      name: "Devendra G.",
      role: "Primary Suspect (SIM Box Operator)",
      risk: "Critical",
      district: "Jaipur South",
      operator: "Airtel",
      totalCalls: 184,
      degree: 6,
      imei: "864192051284910",
      imsi: "404450128934101",
      firstSeen: "2026-10-01",
      lastSeen: "2026-11-24",
      status: "Active Surveillance",
      color: "#f43f5e", // Rose
      size: 65
    }
  },
  {
    data: {
      id: "9414088219",
      label: "+91 94140 88219",
      name: "Rahul B.",
      role: "Key Associate (Jodhpur Link)",
      risk: "High",
      district: "Jodhpur",
      operator: "BSNL",
      totalCalls: 96,
      degree: 4,
      imei: "861928475928172",
      imsi: "404640192837465",
      firstSeen: "2026-10-15",
      lastSeen: "2026-11-23",
      status: "Flagged",
      color: "#f59e0b", // Amber
      size: 52
    }
  },
  {
    data: {
      id: "9928077314",
      label: "+91 99280 77314",
      name: "Aslam K.",
      role: "Syndicate Coordinator (Mewat Hub)",
      risk: "Critical",
      district: "Bharatpur",
      operator: "Reliance Jio",
      totalCalls: 82,
      degree: 4,
      imei: "867821034928190",
      imsi: "404400981273612",
      firstSeen: "2026-09-20",
      lastSeen: "2026-11-23",
      status: "High Alert",
      color: "#f43f5e", // Rose
      size: 56
    }
  },
  {
    data: {
      id: "9784055192",
      label: "+91 97840 55192",
      name: "Unknown Vendor",
      role: "Illegal SIM Supplier / Distributor",
      risk: "High",
      district: "Kota / Jaipur",
      operator: "Airtel",
      totalCalls: 64,
      degree: 3,
      imei: "862938475610293",
      imsi: "404450918273645",
      firstSeen: "2026-10-22",
      lastSeen: "2026-11-23",
      status: "Unverified Entity",
      color: "#f59e0b",
      size: 46
    }
  },
  {
    data: {
      id: "9602033418",
      label: "+91 96020 33418",
      name: "Sunil P.",
      role: "Mule Account Handler / Cash Pickup",
      risk: "Medium",
      district: "Udaipur Central",
      operator: "Vi (Vodafone Idea)",
      totalCalls: 48,
      degree: 2,
      imei: "869102938475612",
      imsi: "404200874192837",
      firstSeen: "2026-11-01",
      lastSeen: "2026-11-24",
      status: "Under Investigation",
      color: "#06b6d4", // Cyan
      size: 42
    }
  },
  {
    data: {
      id: "9460023118",
      label: "+91 94600 23118",
      name: "Burner SIM #1",
      role: "Burner Line (Jaipur Vaishali)",
      risk: "High",
      district: "Jaipur West",
      operator: "Reliance Jio",
      totalCalls: 39,
      degree: 2,
      imei: "869283746152431",
      imsi: "404400192837465",
      firstSeen: "2026-11-18",
      lastSeen: "2026-11-23",
      status: "Active Burner",
      color: "#f59e0b",
      size: 38
    }
  },
  {
    data: {
      id: "9116044921",
      label: "+91 91160 44921",
      name: "Shri Mahaveer P.",
      role: "Complainant Victim (Trader)",
      risk: "Low",
      district: "Jaipur Mansarovar",
      operator: "Vi (Vodafone Idea)",
      totalCalls: 12,
      degree: 1,
      imei: "359120485918234",
      imsi: "404200874192837",
      firstSeen: "2026-11-24",
      lastSeen: "2026-11-24",
      status: "Victim / Witness",
      color: "#10b981", // Emerald
      size: 36
    }
  },
  {
    data: {
      id: "9352011984",
      label: "+91 93520 11984",
      name: "Dr. R. Sharma",
      role: "Complainant Victim (Doctor)",
      risk: "Low",
      district: "Ajmer",
      operator: "Airtel",
      totalCalls: 4,
      degree: 1,
      imei: "351982736450192",
      imsi: "404450192837465",
      firstSeen: "2026-11-23",
      lastSeen: "2026-11-23",
      status: "Victim / Complainant",
      color: "#10b981", // Emerald
      size: 34
    }
  },

  // Edges
  {
    data: {
      id: "e-9829014820-9414088219",
      source: "9829014820",
      target: "9414088219",
      callCount: 68,
      totalDuration: 7420,
      label: "68 calls",
      weight: 6,
      lastContact: "2026-11-23T22:14:10",
      riskLevel: "High"
    }
  },
  {
    data: {
      id: "e-9829014820-9928077314",
      source: "9829014820",
      target: "9928077314",
      callCount: 54,
      totalDuration: 11200,
      label: "54 calls",
      weight: 5,
      lastContact: "2026-11-23T23:42:15",
      riskLevel: "Critical"
    }
  },
  {
    data: {
      id: "e-9829014820-9784055192",
      source: "9829014820",
      target: "9784055192",
      callCount: 38,
      totalDuration: 2840,
      label: "38 calls",
      weight: 4,
      lastContact: "2026-11-23T23:05:40",
      riskLevel: "High"
    }
  },
  {
    data: {
      id: "e-9829014820-9602033418",
      source: "9829014820",
      target: "9602033418",
      callCount: 29,
      totalDuration: 2100,
      label: "29 calls",
      weight: 3,
      lastContact: "2026-11-24T00:15:22",
      riskLevel: "Medium"
    }
  },
  {
    data: {
      id: "e-9829014820-9460023118",
      source: "9829014820",
      target: "9460023118",
      callCount: 24,
      totalDuration: 1180,
      label: "24 calls",
      weight: 3,
      lastContact: "2026-11-23T21:10:44",
      riskLevel: "High"
    }
  },
  {
    data: {
      id: "e-9829014820-9116044921",
      source: "9829014820",
      target: "9116044921",
      callCount: 8,
      totalDuration: 940,
      label: "8 calls",
      weight: 2,
      lastContact: "2026-11-24T00:33:10",
      riskLevel: "Critical"
    }
  },
  {
    data: {
      id: "e-9414088219-9784055192",
      source: "9414088219",
      target: "9784055192",
      callCount: 18,
      totalDuration: 1450,
      label: "18 calls",
      weight: 2,
      lastContact: "2026-11-23T19:40:11",
      riskLevel: "Medium"
    }
  },
  {
    data: {
      id: "e-9928077314-9352011984",
      source: "9928077314",
      target: "9352011984",
      callCount: 4,
      totalDuration: 480,
      label: "4 calls",
      weight: 1,
      lastContact: "2026-11-23T14:12:30",
      riskLevel: "Critical"
    }
  }
];
