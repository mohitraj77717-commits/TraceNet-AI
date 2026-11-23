# TraceNet AI — Rajasthan Police Cyber Security Hackathon
## CDR / IPDR Forensic Analysis Dashboard with AI Investigation Assistant

TraceNet AI is an investigation dashboard built for the **Rajasthan Police Cyber Security Hackathon**. It provides cyber crime investigators with real-time analysis tools for Call Detail Records (CDR), IP Detail Records (IPDR), topological communication networks (powered by Cytoscape.js), and an interactive AI investigation assistant for intelligence correlation.

---

## 1. Project Folder Structure

```
Tracenet AI/
├── public/
│   └── shield.svg                # Rajasthan Cyber Crime badge & favicon
├── src/
│   ├── assets/                   # Static icons & branding assets
│   ├── components/               # Reusable UI component library
│   │   ├── Badge.jsx             # Status pills (Critical, High, Active, etc.)
│   │   ├── DataTable.jsx         # Sortable, styled forensic table
│   │   ├── EmptyState.jsx        # Handled states for zero search results
│   │   ├── LoadingState.jsx      # Cyber radar pulse loader
│   │   ├── Modal.jsx             # Reusable modal for case creation
│   │   ├── Navbar.jsx            # Top bar with case selector, search, notifications
│   │   ├── Sidebar.jsx           # Dark navy navigation with police branding
│   │   └── StatCard.jsx          # Metric cards with glow & trend badges
│   ├── data/                     # Dedicated synthetic datasets (isolated from UI)
│   │   ├── mockCases.js          # Rajasthan Police cyber crime dossiers
│   │   ├── mockCdr.js            # Synthetic CDR records (Airtel, Jio, Vi, BSNL)
│   │   ├── mockIpdr.js           # Synthetic IPDR records (ports, IPs, protocols)
│   │   ├── mockNetwork.js        # Graph nodes & edges for Cytoscape.js
│   │   └── mockAiResponses.js    # Pre-calibrated investigative prompt responses
│   ├── layouts/
│   │   └── MainLayout.jsx        # Desktop-first shell with disclaimer banner
│   ├── pages/                    # Core investigation modules
│   │   ├── LoginPage.jsx         # Demo investigator authentication portal
│   │   ├── DashboardPage.jsx     # High-level overview, call timeline, frequent numbers
│   │   ├── CasesPage.jsx         # Case registry with filtering & creation modal
│   │   ├── CaseDetailsPage.jsx   # Case dossier, FIR scope, target profiles
│   │   ├── DataUploadPage.jsx    # CDR/IPDR CSV ingestion with header validator
│   │   ├── AnalysisPage.jsx      # Multi-tab CDR and IPDR deep scan tables & charts
│   │   ├── NetworkGraphPage.jsx  # Interactive Cytoscape.js communication graph
│   │   ├── AiAssistantPage.jsx   # Chat-style AI investigator with evidence citations
│   │   └── ReportsPage.jsx       # Official printable court-admissible dossier report
│   ├── services/                 # Modular API client layer for Flask backend
│   │   ├── api.js                # Axios client with base URL & interceptors
│   │   ├── caseService.js        # Case endpoints with reactive mock fallback
│   │   ├── analysisService.js    # Telemetry retrieval & filter logic
│   │   ├── uploadService.js      # CSV parser, validation & upload pipeline
│   │   └── aiService.js          # AI Assistant query resolution service
│   ├── utils/                    # Data formatters and export helpers
│   │   ├── formatters.js         # Phone formatting, bytes, duration, colors
│   │   ├── dateUtils.js          # Date formatters & relative time
│   │   └── exportUtils.js        # CSV exporter & print dialog trigger
│   ├── App.jsx                   # React Router routing configuration
│   ├── index.css                 # Tailwind directives & cyber grid aesthetics
│   └── main.jsx                  # Application entry point
├── index.html                    # HTML document root with Inter & Mono fonts
├── package.json                  # Dependencies (React, Vite, Cytoscape, Recharts)
├── tailwind.config.js            # Dark navy / charcoal police theme palette
├── postcss.config.js             # PostCSS configuration
├── vite.config.js                # Vite build and dev server config
└── .gitignore                    # Node modules & build artifacts ignore
```

---

## 2. How to Install Dependencies & Run the Frontend

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### Step 3: Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

### Step 4: Preview Production Build
```bash
npm run preview
```

---

## 3. Implemented Pages & Features

1. **Investigator Login Page (`/login`)**:
   - Styled police authentication interface with demo credentials.
   - 1-click access to the investigation dashboard without hard blocking.

2. **Command Dashboard (`/`)**:
   - **Key Metrics**: Total Cases (28), Ingested CDR Records (86k+), Ingested IPDR Records (215k+), Suspect Entities Flagged (42).
   - **Hourly Call Activity Chart**: Recharts area chart showing 24h call volumes and flagged suspicious night-time calls.
   - **Frequently Contacted Numbers**: Quick ranking of top recurrent phone numbers with risk levels.
   - **Recent Cases & Live Feed**: Direct access to ongoing FIRs and telemetry processing logs.

3. **Case Management (`/cases` & `/cases/:id`)**:
   - Filterable case registry (by status, priority, district).
   - **"Register New Case" Modal**: Full form to create new cases with instant local persistence.
   - **Case Dossier Details (`/cases/:id`)**: Displays FIR scope, complainant/victim entity, tags, and cross-module launch buttons.

4. **Data Ingestion & Processing (`/upload`)**:
   - Dual-mode CDR and IPDR CSV dump upload.
   - **1-Click Test Sample Buttons**: "Load Sample CDR" and "Load Sample IPDR" allow judges to test without external files.
   - **Header Validation**: Verifies essential telecom fields (e.g., caller, receiver, timestamp, IP, port).
   - **Live Telemetry Preview**: Shows top parsed rows directly in the browser.
   - **Progress Simulation**: Realistic progress bar distinguishing mock ingestion from backend uploads.

5. **CDR / IPDR Forensic Analysis (`/analysis`)**:
   - **Tabbed Interface**: Dedicated tabs for CDR and IPDR telemetry.
   - **Multi-parameter Filtering**: Search across phone numbers, IPs, call types (Incoming, Outgoing, Missed), protocols (TCP, UDP, HTTPS, DNS), and risk statuses.
   - **Analytical Visualizations**: Hourly distributions and operator market share (Airtel, Jio, Vi, BSNL).
   - **Export to CSV**: Instant export of filtered forensic tables.

6. **Cytoscape Communication Network Graph (`/network`)**:
   - Full **Cytoscape.js** interactive graph rendering.
   - Nodes represent suspect numbers, color-coded by threat level (Critical=Rose, High=Amber, Medium=Cyan, Low=Emerald).
   - Edges represent communication links, with thickness weighted by call frequency.
   - Controls: Zoom in, Zoom out, Fit to screen, and Layout switcher (Force-Directed CoSE, Hierarchical, Concentric).
   - **Node Inspection Drawer**: Clicking any node opens suspect details (IMEI, IMSI, nodal degree, call count, and quick links to CDR or AI queries).

7. **AI Cyber Investigation Assistant (`/ai-assistant`)**:
   - Chat-style intelligence interface.
   - **Pre-configured Prompt Pills** for hackathon queries:
     - *"Which number has the highest number of connections?"*
     - *"Show communication activity for target number +91 98290 14820."*
     - *"Which contacts appear most frequently across all active CDR logs?"*
     - *"Show the timeline of communication between two numbers."*
     - *"Identify anomalous night-time IPDR sessions or connections to Tor exit nodes."*
   - Cites concrete **Record IDs** (`CDR-10921`, `IPDR-88201`, etc.) and timestamps.
   - Provides recommended police procedural actions (Section 91 CrPC notices, CAF verification, IMEI blacklisting).

8. **Intelligence Dossier & Reports (`/reports`)**:
   - Court-admissible investigation summary under Section 65B of the Indian Evidence Act.
   - Formal police letterhead styling with confidentiality classification.
   - Nodal frequency tables, IPDR exfiltration findings, and investigator signature blocks.
   - **Print / Save to PDF Button**: Uses browser print styles with clean margins and headers.

---

## 4. Features Currently Using Mock Data

In accordance with prototype development standards, all dummy data is isolated in `src/data/`:
- **Cases List**: `src/data/mockCases.js` (Simulated FIRs from Jaipur South, Jodhpur, Kota, Bharatpur).
- **CDR Telemetry**: `src/data/mockCdr.js` (Synthetic call detail records with varying operator fields).
- **IPDR Telemetry**: `src/data/mockIpdr.js` (Synthetic IP sessions, Tor relays, C2 connections).
- **Network Graph Topology**: `src/data/mockNetwork.js` (Synthetic node and edge relationships).
- **AI Assistant Responses**: `src/data/mockAiResponses.js` (Pre-calibrated heuristic responses).

---

## 5. Flask Backend Integration Points

The frontend is built with a dedicated service layer (`src/services/`) ready to consume a Flask REST API:

| Frontend Service Method | Expected Flask Route | Payload / Query |
|---|---|---|
| `caseService.getCases()` | `GET /api/cases` | Returns list of case objects |
| `caseService.getCaseById(id)` | `GET /api/cases/<id>` | Returns single case dossier |
| `caseService.createCase(data)` | `POST /api/cases` | JSON with title, priority, suspect details |
| `analysisService.getCdrRecords(filters)` | `GET /api/cdr` | Query params: `search`, `callType`, `status` |
| `analysisService.getIpdrRecords(filters)` | `GET /api/ipdr` | Query params: `search`, `protocol`, `status` |
| `analysisService.getNetworkGraph(caseId)` | `GET /api/network-graph` | Cytoscape elements array |
| `uploadService.uploadFile(formData)` | `POST /api/upload` | Multipart form data with `.csv` dump |
| `aiService.askQuestion(query, caseId)` | `POST /api/ai/query` | `{ query: string, caseId: string }` |

To connect a live Flask backend:
1. Create a `.env` file in the root folder.
2. Set `VITE_API_BASE_URL=http://localhost:5000/api`.
3. If the backend is offline, the services automatically fall back to the synthetic datasets with zero UI breakage.

---

## 6. Honest Limitations & Incomplete Features

- **Demo Authentication**: The login page simulates an investigator session with sample credentials; it does not connect to a real LDAP, SSO, or JWT auth server.
- **Client-Side CSV Parsing**: The CSV validation in the frontend checks schema headers and renders sample rows; high-throughput parsing of multi-gigabyte CDR dumps must be performed by the backend database/worker pool.
- **PDF Generation**: PDF export triggers the browser's native `window.print()` dialog with dedicated print styling, rather than a server-rendered headless PDF binary.
- **Synthetic AI Disclaimer**: AI queries currently use rule-based correlation against ingested synthetic records rather than a connected live LLM agent (like Gemini or Llama). All responses are explicitly badged as synthetic.
