# 🌍 GlobalPathway.ai
### The Honest Study Abroad Mentor. Powered by Data, Not Hype.

![Status](https://img.shields.io/badge/Status-MVP_Complete-success) ![Tech](https://img.shields.io/badge/Stack-FastAPI_React_Azure-blue) ![Focus](https://img.shields.io/badge/Focus-Financial_Compliance-red)

---

## 🛑 The Problem: "The $50,000 Mistake"
International education decisions are broken. Students are bombarded with generic advice, biased consultant pushes, and "AI chatbots" that prioritize pleasing the user over financial safety. This leads to massive debt, visa rejections, and career mismatches.

## 🛡️ The Solution: Compliance-First Architecture
**GlobalPathway.ai** is not just a chatbot. It is a **Decision Support Engine**. 

We introduced a strictly typed **Stencil Logic Layer** that sits *in front* of the AI. Before any student profile is sent to GPT-4o, it must pass a deterministic financial and academic stress test. If the math doesn't add up, the AI is blocked from hallucinating a "Yes."

---

## 🚀 Key Capabilities

### 1. 📉 The "Financial Firewall"
* **Budget vs. Reality:** The system calculates the *real* Total Cost of Attendance (Tuition + Living).
* **The Penalty Mechanism:** If a user's budget has a shortfall (e.g., ₹30L budget for a ₹60L USA degree), the engine applies a **-50 Point Penalty**, effectively rejecting the country to protect the user from debt traps.

### 2. 🎓 Academic Integrity Check
* **GPA Validation:** We don't sell false hope. A GPA below the safety threshold (e.g., < 6.0) triggers a **-40 Point Penalty**, warning the user that admission chances are critically low.

### 3. 🧠 Strategic AI Analysis (Azure OpenAI)
* **Context-Aware Advice:** Only *after* a profile passes the logic checks (Green Card), the Azure GPT-4o layer explains *why* a specific path works (e.g., "Germany's Opportunity Card offers better ROI for your field").

---

## 🛠️ Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **React.js / Next.js** | "Refined Academic" Dark UI with Tailwind CSS |
| **Backend** | **Python (FastAPI)** | High-performance API hosting the Stencil Logic Engine |
| **AI Model** | **Azure OpenAI (GPT-4o)** | Strategic qualitative analysis and reasoning |
| **Logic Core** | **Deterministic Algorithms** | Weighted scoring system for Risk vs. ROI assessment |

---

## ⚙️ Local Installation
Follow these steps to deploy the decision engine locally.

### 1. Clone the Repository
```bash
git clone https://github.com/jaan2005/GlobalPathwayAi.git
cd GlobalPathwayAi
```
2. Backend Setup (Logic Engine)
```bash
cd backend
# Create virtual environment (Optional but recommended)
python -m venv venv
# Activate: source venv/bin/activate (Mac/Linux) or venv\Scripts\activate (Windows)

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI Server
uvicorn main:app --reload
```
Server will start at http://127.0.0.1:8000

3. Frontend Setup (UI)
```bash
cd frontend
# Install Node modules
npm install

# Run the Development Server
npm run dev
```
App will launch at http://localhost:5173

4. Environment Variables
Create a .env file in the backend/ directory:
```bash
AZURE_OPENAI_ENDPOINT="your-azure-endpoint"
AZURE_OPENAI_KEY="your-api-key"
AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4o"
```
---

👥 The Team : 
Built for the Global Pathways AI Challenge (Jan 2026).

**Tabrez Mukadam** - Decision Logic Engineer & Architect
* Designed the Stencil Logic Engine and Python Backend.

**Faizan Shaikh** - Full-Stack Integration
* Connected the React Frontend to the FastAPI Logic Layer.

**Arfat Shaikh** - AI Context & Pipeline
* Optimized Azure System Prompts for strategic reasoning.

**Alisha Shaikh** - User Experience & Narrative
* Designed the "Refined Academic" UI and Case Study flow.

---

License: MVP Submission - Confidential.
