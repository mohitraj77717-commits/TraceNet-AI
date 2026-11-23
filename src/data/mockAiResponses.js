// Synthetic AI Investigation Assistant Responses
// Note: In compliance with hackathon guidelines, all responses are clearly labelled as
// SYNTHETIC PROTOTYPE RESPONSES until connected to the real Flask LLM backend.

export const SAMPLE_PROMPT_PILLS = [
  {
    label: "Highest number of connections",
    prompt: "Which number has the highest number of connections?"
  },
  {
    label: "Communication activity for suspect",
    prompt: "Show communication activity for target number +91 98290 14820."
  },
  {
    label: "Most frequent contacts",
    prompt: "Which contacts appear most frequently across all active CDR logs?"
  },
  {
    label: "Timeline between two numbers",
    prompt: "Show the timeline of communication between +91 98290 14820 and +91 99280 77314."
  },
  {
    label: "High-risk IPDR traffic",
    prompt: "Identify anomalous night-time IPDR sessions or connections to Tor exit nodes."
  }
];

export const MOCK_AI_RESPONSES = {
  highest_connections: {
    answer: "Based on topological network degree centrality computed across 86,190 synthetic CDR records, **+91 98290 14820** exhibits the highest number of direct connections (**6 distinct nodal contacts**, degree centrality score: **0.94**).\n\nIt functions as the primary hub bridging the Jodhpur relay, Mewat syndicate hub, and local burner SIM distribution nodes.",
    confidence: "High (Topological Graph Analysis)",
    isMock: true,
    supportingEvidence: [
      { type: "CDR", recordId: "CDR-10921", timestamp: "2026-11-23 22:14:10", details: "Outbound call to +91 94140 88219 (Duration: 382s, Cell: RJ-JPR-MS-401)" },
      { type: "CDR", recordId: "CDR-10923", timestamp: "2026-11-23 23:42:15", details: "Inbound call from Mewat Hub +91 99280 77314 (Duration: 512s)" },
      { type: "CDR", recordId: "CDR-10924", timestamp: "2026-11-24 00:15:22", details: "Outbound call to Cash Mule +91 96020 33418" },
      { type: "Graph Node", recordId: "NODE-9829014820", timestamp: "2026-11-24 01:00:00", details: "Total 184 calls logged across 6 nodes. Primary Suspect profile." }
    ],
    recommendations: [
      "Issue urgent Section 91 CrPC notice for subscriber verification & CAF details.",
      "Track live cell location tower RJ-JPR-MS-401 (Mansarovar Sector 4, Jaipur).",
      "Correlate IMEI 864192051284910 against CEIR stolen/blacklisted database."
    ]
  },

  activity_target: {
    answer: "Detailed communication audit for **Target +91 98290 14820** (Devendra G.):\n\n- **Total calls in corpus**: 184 calls\n- **Peak operational window**: 20:00 to 01:30 hrs IST (night-time clustering)\n- **Primary tower cluster**: Mansarovar Sector 4 (`RJ-JPR-MS-401`) and Sanganer Airport Road (`RJ-JPR-SD-210`)\n- **Key Interlocutors**: +91 94140 88219 (68 calls), +91 99280 77314 (54 calls), +91 97840 55192 (38 calls).\n\nAdditionally, simultaneous IPDR traces demonstrate concurrent encrypted TLS sessions to overseas relays while calls are active.",
    confidence: "High (Multi-parameter Correlation)",
    isMock: true,
    supportingEvidence: [
      { type: "CDR", recordId: "CDR-10921", timestamp: "2026-11-23 22:14:10", details: "Cell: RJ-JPR-MS-401 (Airtel, IMEI: 864192051284910)" },
      { type: "CDR", recordId: "CDR-10926", timestamp: "2026-11-24 00:33:10", details: "Call to Victim +91 91160 44921 (Duration: 640s, Critical Extortion Flag)" },
      { type: "IPDR", recordId: "IPDR-88201", timestamp: "2026-11-23 23:55:12", details: "IP 103.212.43.19 connected to Tor Exit Relay 185.220.101.5 (147 MB transfer)" }
    ],
    recommendations: [
      "Deploy surveillance team near Mansarovar Sector 4 tower radius.",
      "Freeze associated UPI accounts linked to victim calls."
    ]
  },

  frequent_contacts: {
    answer: "Cross-file frequency ranking across analyzed CDR dumps:\n\n1. **+91 98290 14820** — 184 calls (Primary suspect, Jaipur South)\n2. **+91 94140 88219** — 96 calls (Rahul B., Jodhpur Range)\n3. **+91 99280 77314** — 82 calls (Aslam K., Bharatpur / Mewat Cell)\n4. **+91 97840 55192** — 64 calls (Unregistered SIM Distributor)\n5. **+91 96020 33418** — 48 calls (Mule Account Handler, Udaipur)\n\nNumbers 1, 2, and 3 account for 74% of total cumulative communication minutes.",
    confidence: "High (Statistical Aggregation)",
    isMock: true,
    supportingEvidence: [
      { type: "CDR", recordId: "CDR-10921", timestamp: "2026-11-23 22:14:10", details: "68 mutual sessions logged between #1 and #2" },
      { type: "CDR", recordId: "CDR-10932", timestamp: "2026-11-22 21:40:00", details: "54 mutual sessions logged between #1 and #3" }
    ],
    recommendations: [
      "Cross-reference CAF documents for common fraudulent Aadhaar / photo usage.",
      "Check common handset IMEI hopping across all 5 numbers."
    ]
  },

  timeline_two_numbers: {
    answer: "Communication chronology between **+91 98290 14820** and **+91 99280 77314** (Mewat Hub):\n\n- **2026-11-22 16:20:00** — Outgoing call (410s) from Jaipur tower `RJ-JPR-MS-401` to Bharatpur.\n- **2026-11-22 21:40:00** — Outgoing call (310s) from Bharatpur tower `RJ-BHT-KG-102`.\n- **2026-11-23 23:42:15** — Inbound call (512s) to Jaipur Airport Road tower `RJ-JPR-SD-210`.\n- **Immediately following**: Target made outbound extortion call to complainant (CDR-10926) at 00:33:10 hrs.\n\n*Pattern Note*: Call frequency spikes immediately prior to fraudulent transaction demands.",
    confidence: "High (Chronological Sequence Analysis)",
    isMock: true,
    supportingEvidence: [
      { type: "CDR", recordId: "CDR-10934", timestamp: "2026-11-22 16:20:00", details: "Call duration: 410 seconds (Airtel to Jio)" },
      { type: "CDR", recordId: "CDR-10932", timestamp: "2026-11-22 21:40:00", details: "Call duration: 310 seconds (Bharatpur sector)" },
      { type: "CDR", recordId: "CDR-10923", timestamp: "2026-11-23 23:42:15", details: "Call duration: 512 seconds (Sanganer tower)" }
    ],
    recommendations: [
      "Coordinate with Bharatpur Special Cyber Task Force for simultaneous raid.",
      "Preserve IPDR records from both towers for the 22:00-01:00 window."
    ]
  },

  ipdr_anomaly: {
    answer: "IPDR anomaly detection flagged two high-criticality events:\n\n1. **IP 103.212.43.19**: Transferred 147 MB via TLS encrypted channel directly to known Tor Exit Node `185.220.101.5` on 2026-11-23 at 23:55:12.\n2. **IP 192.168.104.22**: Repeated outbound connections to port 4444 (`c2-control-relay.xyz`) followed by 400 MB SSH data dump to overseas storage between 03:00-04:00 AM.\n\nBoth activities deviate sharply from standard domestic consumer bandwidth baselines.",
    confidence: "High (Threat Intelligence Correlation)",
    isMock: true,
    supportingEvidence: [
      { type: "IPDR", recordId: "IPDR-88201", timestamp: "2026-11-23 23:55:12", details: "Tor exit relay: 185.220.101.5 (147 MB, Port 443)" },
      { type: "IPDR", recordId: "IPDR-88203", timestamp: "2026-11-23 22:15:30", details: "Port 4444 Metasploit C2 signature (85.2 MB)" },
      { type: "IPDR", recordId: "IPDR-88210", timestamp: "2026-11-23 03:15:00", details: "Mass SSH exfiltration 400 MB to backup-offsite-storage.ru" }
    ],
    recommendations: [
      "Issue urgent IP trace request to ISP Airtel & BSNL under Sec 91 CrPC.",
      "Isolate server 192.168.104.22 from internal network to contain exfiltration."
    ]
  }
};
