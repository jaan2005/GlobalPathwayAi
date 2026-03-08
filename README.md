# DecisionPath

Strategic Discovery Engine for international education and immigration pathways.

> **Status:** v2.1.0-final (FastAPI `/health` reports `2.1.0-final`)

## Overview
DecisionPath analyzes a student profile (GPA, major, budget, and priority) and returns a ranked set of study/immigration strategies across countries.

Instead of asking *"Where do you want to go?"* and validating a choice, the app runs a deterministic discovery engine to surface viable routes you may not have considered.

## What it does
- **Discovery Mode:** enter profile → engine scans pathways → returns recommendations
- **Strategic bucketing:**
  - **Safe Bets** (high PR success probability)
  - **Fast Track** (speed-to-ROI optimized)
  - **Moonshots** (high risk / high reward)
- **Cost + ROI analysis:** tuition/living/fees + break-even timeline
- **PR pathway branches:** multiple PR routes per destination
- **Policy updates + action timeline:** surfaced per destination (as returned by the engine)

## Architecture (high level)
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** FastAPI
- **Engine:** `core_engine` (deterministic discovery logic)

### Request/Response flow
1. User fills the form in the React UI (`frontend/src/App.jsx`).
2. Frontend POSTs to `http://localhost:8000/api/recommend` via Axios.
3. FastAPI (`backend/main.py`) builds a `core_engine.UserProfile` and calls `core_engine.discover_strategies(...)`.
4. Backend returns:
   - `strategies`: `{ safe_bets, fast_track, moonshots }`
   - `consultant_note` (human-friendly summary)
   - `risk_advisory`
   - `meta` counts
5. Frontend renders the three strategy columns and expands per-country details.

## API
### POST `/api/recommend`
**Body**
```json
{
  "degree": "Bachelors",
  "gpa": 7.5,
  "major": "Computer Science",
  "budget": 25,
  "priority": "High ROI",
  "funding_source": "Self",
  "target_intake": "Fall 2025"
}
```

**Response (shape)**
```json
{
  "status": "success",
  "strategies": {
    "safe_bets": [],
    "fast_track": [],
    "moonshots": []
  },
  "consultant_note": "...",
  "risk_advisory": "...",
  "meta": {
    "total_options": 0,
    "safe_count": 0,
    "fast_count": 0,
    "moonshot_count": 0
  }
}
```

### GET `/health`
Returns operational status and version.

## Local development
### Prerequisites
- **Python 3.10+** (recommended)
- **Node.js 18+**

### 1) Clone
```bash
git clone https://github.com/jaan2005/GlobalPathwayAi.git
cd GlobalPathwayAi
```

### 2) Backend (FastAPI)
```bash
cd backend
python -m venv venv
# macOS/Linux
source venv/bin/activate
# Windows (PowerShell)
# .\venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs on `http://localhost:8000`.

### 3) Frontend (Vite + React)
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (default Vite port).

> Note: the frontend currently calls the backend at `http://localhost:8000/api/recommend`. If you deploy, you will likely want to move this to an environment variable (e.g. `VITE_API_BASE_URL`).

## Repo structure
```text
backend/
  main.py            # FastAPI app + endpoints
  core_engine.py      # Discovery engine (business logic)
frontend/
  index.html          # Vite entry
  src/
    App.jsx           # Main UI
    main.jsx          # React entry
```

## Notes / known gaps
- CORS is currently wide-open (`allow_origins=["*"]`) for local dev. Tighten for production.
- The discovery logic lives in `core_engine`; update this README if the engine inputs/outputs change.

## License
See `LICENSE`. 
