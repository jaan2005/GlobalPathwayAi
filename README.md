# 🌍 GlobalPathways.ai
### Strategic Discovery Engine for International Education

![Status](https://img.shields.io/badge/Status-v2.1.0_Final-success) ![Tech](https://img.shields.io/badge/Stack-FastAPI_React-blue) ![Mode](https://img.shields.io/badge/Mode-Discovery_Engine-green)

---

## 🚀 The Shift: From Gatekeeper to Discovery

Most study abroad platforms ask: *"Where do you want to go?"* — then validate your choice.

**We ask a different question:** *"What if the best path is one you never considered?"*

GlobalPathways.ai is a **Strategic Discovery Engine**. It doesn't validate preferences. It discovers opportunities.

---

## 🎯 What Makes This Different

| Traditional Platforms | GlobalPathways.ai |
|----------------------|-------------------|
| User selects countries | System discovers all viable paths |
| Pass/Fail validation | Strategic bucketing (Safe / Fast / Risky) |
| Generic advice | Personalized ROI + PR probability |
| Hidden risks | Transparent policy alerts |
| "Where do you want to go?" | "Here's where you *should* go" |

---

## 🧠 Core Features

### 1. Discovery Mode
No country pre-selection. Enter your profile → System scans ALL immigration pathways globally → Returns ranked strategies.

### 2. Strategic Bucketing
Every pathway is categorized:
- **🛡️ Safe Bets** — 70%+ PR success rate (Germany, Canada, Australia)
- **⚡ Fast Track** — Optimized for speed-to-ROI (Ireland, UK)
- **🎯 Moonshots** — High reward, high risk (USA with H1B lottery)

### 3. PR Pathway Visualization
Not just one route — multiple branching paths from each visa:
- Student → Work Visa → PR
- Alternative routes (Critical Skills, Express Entry, State Nomination)
- Success rates for each path

### 4. Financial Intelligence
- **Cost Breakdown** — Tuition + Living + Visa + Insurance
- **ROI Calculator** — Break-even timeline in months
- **Gap Analysis** — Clear budget shortfall warnings

### 5. Policy Alerts (2024-2025)
Real immigration updates:
- 🇺🇸 H1B lottery: ~27% success rate
- 🇨🇦 Student permit cap: 35% reduction
- 🇬🇧 Dependent restrictions enforced
- 🇩🇪 Chancenkarte (Opportunity Card) launched
- 🇦🇺 Post-study visa cut from 4 to 2 years

### 6. Personalized Action Timeline
Deadlines customized to your target intake:
- Application windows
- Scholarship cutoffs
- Visa appointment timing
- Semester start dates

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Python (FastAPI) |
| **Logic Engine** | Deterministic Discovery Algorithm |
| **Data** | Curated immigration intelligence |

---

## ⚙️ Local Installation

### 1. Clone the Repository
```bash
git clone https://github.com/jaan2005/GlobalPathwayAi.git
cd GlobalPathwayAi
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install fastapi uvicorn pydantic

# Run the server
uvicorn main:app --reload
```
Server runs at: `http://127.0.0.1:8000`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```
App runs at: `http://localhost:5173`

### 4. That's It
**No API keys required.** No `.env` file needed. Fully self-contained.

---

## 🧪 Test Cases

| Input | Expected Output |
|-------|-----------------|
| GPA: 7.5, Budget: ₹25L | 6 paths across all 3 buckets |
| GPA: 7.5, Budget: ₹15L | Limited paths, risk warning |
| GPA: 7.5, Budget: ₹100L | All paths unlocked, USA still shows lottery risk |
| GPA: 5.0, Budget: ₹25L | Zero paths, GPA guidance message |

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│         React + Tailwind (Dark Mode UI)             │
└─────────────────────┬───────────────────────────────┘
                      │ POST /api/recommend
                      ▼
┌─────────────────────────────────────────────────────┐
│                 FASTAPI BACKEND                     │
│                                                     │
│  ┌───────────────┐    ┌──────────────────────────┐  │
│  │ Input Guard   │───▶│  Discovery Engine       │  │
│  │ (Validation)  │    │  - GPA filtering         │  │
│  └───────────────┘    │  - Budget gap calc       │  │
│                       │  - ROI computation       │  │
│                       │  - Archetype bucketing   │  │
│                       └──────────────────────────┘  │
│                                  │                  │
│                                  ▼                  │
│                       ┌──────────────────────────┐  │
│                       │  Empathy Engine          │  │
│                       │  - Tone-aware messaging  │  │
│                       │  - Risk advisory         │  │
│                       └──────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              CURATED DATA LAYER                     │
│  - Country costs, PR timelines, success rates       │
│  - Policy alerts (2024-2025)                        │
│  - Action deadlines by intake                       │
│  (Deterministic, auditable, no AI hallucination)    │
└─────────────────────────────────────────────────────┘
```

---

## 💡 Design Philosophy

### Why Deterministic Logic Over AI Generation?

The discovery logic is **fully dynamic** — bucketing, financial gaps, ROI calculations all compute in real-time based on user input.

What's static is **reference data** — country costs, visa timelines, PR success rates. This is intentional:

| Approach | Benefit |
|----------|---------|
| **Accuracy** | Immigration data is verified, not hallucinated |
| **Speed** | Zero API latency, instant results |
| **Reliability** | No rate limits, no auth failures |
| **Auditability** | Every recommendation is traceable |
| **Cost** | No per-query token charges at scale |

AI excels at open-ended conversation. For **decision-critical immigration data**, deterministic logic beats probabilistic generation.

---

## 🔮 Future Roadmap

AI integration where it adds value (without compromising core accuracy):

- **SOP Generation** — AI drafts personalized statements of purpose
- **University Matching** — AI ranks universities within chosen country
- **Interview Prep** — AI simulates visa interview questions
- **Document Review** — AI checks application completeness

The core discovery engine remains deterministic and auditable.

---

## 👥 Team

Built for the GlobalPathways AI Challenge (Feb 2026).

| Name | Role |
|------|------|
| **Tabrez Mukadam** | Decision Logic Architect |
| **Faizan Shaikh** | Full-Stack Integration |
| **Arfat Shaikh** | Data Pipeline & QA |
| **Alisha Shaikh** | UX & Narrative Design |

---

## 📄 License

MIT License - Open for review and collaboration.

---

## 🚀 Try It

```bash
# Clone
git clone https://github.com/jaan2005/GlobalPathwayAi.git

# Backend
cd GlobalPathwayAi/backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload

# Frontend (new terminal)
cd GlobalPathwayAi/frontend
npm install
npm run dev

# Open http://localhost:5173
```

**No API keys. No configuration. Just run.**
