# TraceNet AI — Wireframe Specification & UI Architecture
**Rajasthan Police Cyber Security Hackathon**

This document outlines the wireframe blueprints, layout geometry, grid hierarchy, and UX flows for **TraceNet AI**.

---

## 1. Global Layout Grid Hierarchy

TraceNet AI uses a **Desktop-First (1440px / 1920px)** responsive grid layout:

```
+-----------------------------------------------------------------------------------------+
| [LOGO] TraceNet AI        [ Search Phone, IP, Cell Tower, IMEI... ]      [Case: RJ-...] [VR]|
+-----------------------------------------------------------------------------------------+
| [SIDEBAR (260px)]  | [MAIN CONTENT VIEWPORT (calc(100vw - 260px))]                      |
|                    |                                                                    |
|  * Command Center  |  +---------------------------------------------------------------+  |
|  * Cases (5)       |  | PROTOTYPE DISCLAIMER BANNER: Synthetic CDR/IPDR Engine        |  |
|  * Data Ingestion  |  +---------------------------------------------------------------+  |
|  * CDR/IPDR Scan   |                                                                    |
|  * Network Graph   |  [ SCREEN-SPECIFIC VIEW (Dashboard / Analysis / Network / AI) ]    |
|  * AI Investigator |                                                                    |
|  * Formal Reports  |                                                                    |
|                    |                                                                    |
|  [STATUS FEED]     |                                                                    |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Page Wireframe Blueprints

### A. Command Dashboard (`/`)

```
+-----------------------------------------------------------------------------------------+
| [Stat: Total Cases: 28] [Stat: Ingested CDR: 86k] [Stat: IPDR: 215k] [Stat: Suspects: 42]|
+-----------------------------------------------------------------------------------------+
| [ HOURLY CALL ACTIVITY OVER TIME (8 Cols) ]           | [ FREQUENT CONTACTS (4 Cols) ]   |
|                                                       |                                 |
|   Calls ^                                             | 1. +91 98290 14820 (184 calls)  |
|         |     /---\                                   |    Role: Primary Suspect        |
|         |    /     \      /----\                      | 2. +91 94140 88219 (96 calls)   |
|         +---/-------\----/------\-----> 24h Time      |    Role: Jodhpur Associate      |
|       (Flagged Night Peaks: 22:00 - 02:00 IST)        | 3. +91 99280 77314 (82 calls)   |
+-------------------------------------------------------+---------------------------------+
| [ RECENT CASES TABLE (8 Cols) ]                       | [ LIVE SYSTEM LOG (4 Cols) ]    |
| * RJ-CYBER-2026-0812 | SIM Box Relay & Extortion      | * New CDR batch ingested        |
| * RJ-CYBER-2026-0744 | Darknet Data Exfiltration      | * High commonality detected     |
| * RJ-CYBER-2026-0619 | Instant Loan Harassment        | * Port 4444 C2 flagged          |
+-----------------------------------------------------------------------------------------+
```

---

### B. Case Management & New Dossier Modal (`/cases`)

```
+-----------------------------------------------------------------------------------------+
| [ SEARCH: Keyword / Target / IO ]  [ Status: All ▼ ]  [ Priority: All ▼ ]  [+ New Case] |
+-----------------------------------------------------------------------------------------+
| CASE ID             | INVESTIGATION TITLE       | TARGET        | IO OFFICER   | STATUS |
+---------------------+---------------------------+---------------+--------------+--------+
| RJ-CYBER-2026-0812  | SIM Box Relay Extortion   | +91 98290...  | DSP Rathore  | Active |
| RJ-CYBER-2026-0744  | Darknet Exfiltration      | 192.168.10... | Insp. Ananya | Active |
| RJ-CYBER-2026-0619  | Predatory Loan App Scam   | +91 97840...  | SI Meena     | Active |
+-----------------------------------------------------------------------------------------+

  MODAL: [ REGISTER NEW CASE ]
  +---------------------------------------------------------------+
  | Title:       [ e.g., SIM Box Relay & Financial Extortion    ] |
  | Category:    [ Telecom Fraud & Extortion                  ▼ ] |
  | Target:      [ +91 98290 14820                              ] |
  | Priority:    [ Critical                                   ▼ ] |
  | IO Officer:  [ DSP Vikramaditya Singh Rathore               ] |
  | Summary:     [ Allegations and initial suspect numbers...   ] |
  |              [ Cancel ]             [ Register Dossier ]      |
  +---------------------------------------------------------------+
```

---

### C. CDR & IPDR Forensic Telemetry (`/analysis`)

```
+-----------------------------------------------------------------------------------------+
| [TAB: CDR Voice & SMS Records]    [TAB: IP Detail Records (IPDR)]    [📥 Export CSV]    |
+-----------------------------------------------------------------------------------------+
| [Search Phone/IP/IMEI]  [Type: Outgoing ▼]  [Carrier: Airtel ▼]  [Status: Critical ▼]   |
+-----------------------------------------------------------------------------------------+
| ID        | CALLER        | RECEIVER      | TIME       | DUR  | CELL TOWER  | STATUS    |
+-----------+---------------+---------------+------------+------+-------------+-----------+
| CDR-10921 | +91 98290...  | +91 94140...  | 22:14:10   | 382s | RJ-JPR-MS401| Flagged   |
| CDR-10923 | +91 99280...  | +91 98290...  | 23:42:15   | 512s | RJ-JPR-SD210| Critical  |
| CDR-10926 | +91 98290...  | +91 91160...  | 00:33:10   | 640s | RJ-JPR-MS401| Extortion |
+-----------------------------------------------------------------------------------------+
```

---

### D. Cytoscape.js Network Graph (`/network`)

```
+-----------------------------------------------------------------------------------------+
| [CANVAS: CoSE Force-Directed] [Min Calls: ━━●━━] [Zoom: + - Fit] [Layout: Concentric ▼] |
+-----------------------------------------------------------------------------------------+
| [ CYTOSCAPE 2D INTERACTIVE GRAPH CANVAS (8 Cols) ]    | [ SUSPECT DOSSIER (4 Cols) ]    |
|                                                       |                                 |
|             (Rahul B.)                                | TARGET: +91 98290 14820         |
|              +91 94140                                | Name: Devendra G.               |
|                 \  (68 calls)                         | Role: Primary Suspect (SIM Box) |
|                  \                                    | Risk: [CRITICAL]                |
|                   ●-------------------●               | Carrier: Airtel Rajasthan       |
|            (Devendra G. Hub)      (Mewat Hub)         | Nodal Degree: 6 links           |
|              +91 98290             +91 99280          | Total Calls: 184 calls          |
|                  / \                                  | IMEI: 864192051284910           |
|                 /   \                                 |                                 |
|                ●     ●                                | [ Filter in CDR Table ]         |
|           +91 97840  +91 96020                        | [ Ask AI Assistant About Node ] |
|          (SIM Vendor) (Mule Acc)                      |                                 |
+-------------------------------------------------------+---------------------------------+
```

---

### E. AI Investigation Assistant (`/ai-assistant`)

```
+-----------------------------------------------------------------------------------------+
| Active Dossier Context: [ RJ-CYBER-2026-0812 ▼ ]             [Heuristic Inference Ready]|
+-----------------------------------------------------------------------------------------+
| [CONVERSATION STREAM]                                                                   |
|                                                                                         |
|  [USER]: "Which number has the highest number of connections?"                          |
|                                                                                         |
|  [AI INVESTIGATOR]:                                                                     |
|  "Based on topological degree centrality across 86,190 records, +91 98290 14820         |
|   exhibits the highest nodal density (6 distinct contacts, degree score 0.94).          |
|                                                                                         |
|   SUPPORTING CITATIONS:                                                                 |
|   - CDR-10921: Call to +91 94140 88219 (Cell: RJ-JPR-MS-401, 382s)                      |
|   - CDR-10923: Inbound from Mewat Hub +91 99280 77314 (512s)                            |
|                                                                                         |
|   RECOMMENDED POLICE ACTION:                                                            |
|   1. Issue Section 91 CrPC notice for Customer Acquisition Form (CAF).                  |
|   2. Track live cell radius around Mansarovar Sector 4 tower."                          |
+-----------------------------------------------------------------------------------------+
| [SUGGESTED PILLS]: [Highest Connections] [Target Activity] [Timeline Between 2 Numbers]  |
| [INPUT]: [ Ask forensic question...                                        ] [Send ➔]   |
+-----------------------------------------------------------------------------------------+
```

---

## 3. How to Create & Present Wireframes for Your Hackathon Submission

1. **Option 1: Interactive Wireframe Viewer (Already Built)**
   - Open [`C:\Users\ASUS\.gemini\antigravity\brain\7d2aa9b6-c2d6-49eb-b4ea-89b37fc8cd76\wireframe_presentation.html`](file:///C:/Users/ASUS/.gemini/antigravity/brain/7d2aa9b6-c2d6-49eb-b4ea-89b37fc8cd76/wireframe_presentation.html) in any browser.
   - It contains interactive tabbed blueprint screens for all 6 core pages. Click **Print / Export** to save them as PDFs or slides!

2. **Option 2: Live Screenshots of Your Working Website**
   - Run `npm run dev` and navigate to `http://localhost:3000`.
   - Take crisp screenshots of the Dashboard, Network Graph, and AI Assistant. Live high-fidelity prototypes score significantly higher than static sketches in hackathon judging!

3. **Option 3: Figma or Whimsical (If digital vector file required)**
   - Use the ASCII block blueprints above as the layout structure.
   - Standard 12-column grid: 3-column sidebar + 9-column content viewport.
