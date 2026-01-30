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
    countries: List[str]

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
        funding_source=user.funding_source,
        preferred_countries=user.countries
    )

    # 2. Run Logic Engine
    results = core_engine.get_recommendations(user_profile)

    # 3. Run AI Advisor (Only for top result)
    ai_note = ""
    if results:
        top_country = results[0]
        country_db_data = core_engine.COUNTRY_DB.get(top_country['country'], {})
        ai_note = ai_advisor.get_ai_advice(user_profile, top_country, country_db_data)

    return {
        "status": "success",
        "recommendations": results,
        "consultant_note": ai_note
    }
