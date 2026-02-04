from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import core_engine
import ai_advisor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRequest(BaseModel):
    degree: str
    gpa: float
    major: str
    budget: float
    priority: str
    funding_source: Optional[str] = "Self"

@app.post("/api/recommend")
async def recommend_pathway(user: UserRequest):
    print(f"📥 Received Request: {user}")

    # 1. Setup Profile
    user_profile = core_engine.UserProfile(
        current_degree=user.degree,
        gpa=user.gpa,
        major_interest=user.major,
        budget_max_lakhs=user.budget,
        priority_goal=user.priority,
        funding_source=user.funding_source
    )

    # 2. Run Discovery Engine - Evaluate ALL countries
    strategies = core_engine.discover_strategies(user_profile)

    # 3. Empathy Engine - Context-aware advisor messages
    budget = user.budget
    if budget < 20:
        empathy_note = f"We know {budget}L is tight. The USA is risky, but these 'Safe Bets' let you study debt-free."
    elif budget <= 35:
        empathy_note = f"You have good options. You can choose between 'Safety' (Germany) or 'Speed' (Ireland)."
    else:
        empathy_note = f"Strong budget! You can afford the 'Moonshot' (USA), but check the Visa Risk first."

    # 4. Run AI Advisor for top result (if available)
    ai_note = empathy_note
    all_results = (strategies['safe_bets'] + strategies['fast_track'] + strategies['moonshots'])
    
    if all_results:
        top_country = sorted(all_results, key=lambda x: -x['match_score'])[0]
        # Get country data for AI advisor
        country_db_data = None
        for c in core_engine.COUNTRY_DB:
            if c['name'] == top_country['country']:
                country_db_data = c
                break
        
        if country_db_data:
            try:
                ai_generated = ai_advisor.get_ai_advice(user_profile, top_country, country_db_data)
                if ai_generated:
                    ai_note = ai_generated
            except Exception as e:
                print(f"AI Advisor failed: {e}")
                # Keep empathy note as fallback

    return {
        "status": "success",
        "strategies": strategies,
        "consultant_note": ai_note
    }
