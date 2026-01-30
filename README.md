# 🌍 GlobalPathway.ai

### *Your Honest Study Abroad Mentor. Powered by Data, Not Hype.*

> **The Struggle:** Choosing a career path abroad is overwhelming. Students are bombarded with generic advice, aggressive consultants, and "AI chatbots" that suggest popular destinations without checking if you can actually afford them.
>
> **Our Promise:** GlobalPathway.ai is your **Unbiased Career Guardian**. We don't just "generate text"—we first mathematically verify if a path is safe for your wallet and your career goals. We help you build a future, not just get a visa.

---

## 🚀 How We Help You

### 1. 🛡️ Financial & Academic Reality Check
Before giving you advice, our system acts like a responsible mentor:
* **Debt Risk Protection:** We analyze the *real* cost of living. If a destination requires a risky loan that might burden your family, we warn you immediately.
* **Admission Probability:** We don't sell false hope. If your GPA makes admission unlikely in a specific country, we honestly tell you so you don't waste money on applications.

### 2. 🧭 Personalized Career Roadmap (Azure AI)
* Once the risks are checked, our **Azure GPT-4o** AI steps in as your counselor.
* It doesn't just list countries; it explains *why* a specific destination fits your career goals (e.g., "Germany is better for your ROI because of the new Opportunity Card").

### 3. ⚖️ Unbiased Comparisons
* **Find Your Best Fit:** We allow you to compare countries side-by-side.
* **Smart Recommendations:** If your dream country is too risky, we automatically suggest safer, high-quality alternatives (like shifting from USA to Germany) that match your career ambitions.
---

## 🛠️ The Technology Behind the Mentorship

* **Frontend:** React.js (Vite), Tailwind CSS, Lucide Icons
* **Backend:** Python (FastAPI), Pydantic
* **AI Core:** Azure OpenAI (GPT-4o)
* **Safety Logic:** Custom "Stencil" Algorithm (Deterministic State Machine)
---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```
git clone https://github.com/HunterX461/GlobalPathway-AI.git
cd GlobalPathway-AI
```
### 2. Backend Setup (Python)
Navigate to the backend folder and set up the environment.
```
cd backend
```
#### Create virtual environment
```
python -m venv venv
```
#### Activate (Windows)
```
venv\Scripts\activate
```
#### Activate (Mac/Linux)
```
source venv/bin/activate
```
#### Install dependencies
```
pip install -r requirements.txt
```
#### 🔐 Configure Environment Variables
Create a file named .env inside the backend/ folder and add your Azure OpenAI credentials:

##### backend/.env
```
AZURE_OPENAI_ENDPOINT="https://YOUR_RESOURCE_[NAME.openai.azure.com/](https://NAME.openai.azure.com/)"
AZURE_OPENAI_KEY="YOUR_AZURE_KEY"
AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4o"
AZURE_OPENAI_API_VERSION="2024-06-01"
```
### 3. Frontend Setup (React)

Open a new terminal and navigate to the frontend folder.
```
cd frontend
```
#### Install Node modules
```
npm install
```

#### Start the Development Server
```
npm run dev
```
---
## 📜 License
This project was built for GlobalPathwaysAI.
