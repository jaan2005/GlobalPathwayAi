from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import core_engine

app = FastAPI(title="GlobalPathways AI - Strategic Discovery Engine")

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
    target_intake: Optional[str] = "Fall 2025"

@app.post("/api/recommend")
async def recommend_pathway(user: UserRequest):
    user_profile = core_engine.UserProfile(
        current_degree=user.degree,
        gpa=user.gpa,
        major_interest=user.major,
        budget_max_lakhs=user.budget,
        priority_goal=user.priority,
        funding_source=user.funding_source,
        target_intake=user.target_intake
    )

    strategies = core_engine.discover_strategies(user_profile)

    total_options = sum(len(v) for v in strategies.values())
    safe_count = len(strategies['safe_bets'])
    fast_count = len(strategies['fast_track'])
    moonshot_count = len(strategies['moonshots'])

    # ========== ZERO-PATHS HANDLER ==========
    if total_options == 0:
        if user.gpa < 6.0:
            advisor_msg = (
                f"With a GPA of {user.gpa}, most graduate programs have minimum requirements that aren't met. "
                "This doesn't mean your goals are impossible—consider pathway programs, diploma courses, "
                "or countries with more flexible academic requirements."
            )
            risk_note = (
                "🎓 Suggestion: Many countries accept GPA 6.0+. Focus on improving academics or "
                "explore alternative entry routes like portfolio-based admissions."
            )
        elif user.budget < 12:
            advisor_msg = (
                f"With ₹{user.budget}L, even the most affordable destinations (like Germany at ~₹12L) "
                "become challenging. Consider scholarships, education loans, or part-time work options."
            )
            risk_note = (
                "💰 Suggestion: Germany offers zero tuition but requires ~₹12L for living costs. "
                "Look into DAAD scholarships or sponsored programs."
            )
        else:
            advisor_msg = (
                f"With GPA {user.gpa} and budget ₹{user.budget}L, no pathways currently meet "
                "all thresholds. This usually means one constraint is blocking discovery."
            )
            risk_note = (
                "🔍 Suggestions: Try adjusting your budget slightly, or check if your GPA meets "
                "minimum requirements (most countries need 6.0-7.0+)."
            )
        
        return {
            "status": "success",
            "strategies": strategies,
            "consultant_note": advisor_msg,
            "risk_advisory": risk_note,
            "meta": {
                "total_options": 0,
                "safe_count": 0,
                "fast_count": 0,
                "moonshot_count": 0
            }
        }
    # ========== END ZERO-PATHS HANDLER ==========

    # ========== EMPATHY ENGINE (TONE-AWARE) ==========
    has_safe_options = safe_count > 0
    
    if user.budget < 15:
        if has_safe_options:
            advisor_msg = (
                f"With ₹{user.budget}L, we've identified {total_options} realistic paths. "
                "Germany's zero-tuition model could be your strongest play—graduate debt-free with a clear PR route."
            )
        else:
            advisor_msg = (
                f"With ₹{user.budget}L, options are limited but not zero. "
                f"You have {total_options} path(s) available, though they carry higher risk. "
                "Consider increasing budget to unlock safer routes like Germany."
            )
    elif user.budget < 30:
        if has_safe_options:
            advisor_msg = (
                f"₹{user.budget}L opens {total_options} strategic paths. You're in the sweet spot—"
                "Ireland's 1-year ROI vs Germany's debt-free route are both viable. Consider your risk appetite."
            )
        else:
            advisor_msg = (
                f"₹{user.budget}L opens {total_options} paths, but none in the 'Safe Bets' category yet. "
                "The options available are faster but carry more uncertainty. A small budget increase could unlock Germany."
            )
    elif user.budget < 45:
        if has_safe_options:
            advisor_msg = (
                f"Strong position with ₹{user.budget}L. You qualify for {total_options} countries "
                "including premium destinations. Weigh brand value against PR timeline—they don't always align."
            )
        else:
            advisor_msg = (
                f"With ₹{user.budget}L, you have {total_options} options but they're skewed toward higher-risk paths. "
                "Check if your GPA (currently {user.gpa}) meets requirements for safer countries."
            )
    else:
        advisor_msg = (
            f"With ₹{user.budget}L, all doors are open. But remember: highest investment doesn't mean "
            "highest return. A 94% PR rate often beats a 27% lottery."
        )
    # ========== END EMPATHY ENGINE ==========

    # ========== RISK ADVISORY ==========
    if moonshot_count > 0 and safe_count > 0:
        risk_note = (
            f"📊 Your profile matches {safe_count} high-probability paths and {moonshot_count} "
            "high-reward option(s). We recommend securing a safe bet before betting on moonshots."
        )
    elif moonshot_count > 0 and safe_count == 0:
        risk_note = (
            "⚠️ Currently, your profile primarily matches higher-risk paths. "
            "Consider increasing budget or exploring GPA improvement options."
        )
    elif fast_count > 0 and safe_count == 0:
        risk_note = (
            f"⚡ You have {fast_count} fast-track option(s) available. These offer speed but moderate uncertainty. "
            "A small budget increase could unlock safer alternatives."
        )
    else:
        risk_note = f"✅ Strong match. You have {safe_count + fast_count} paths with 60%+ PR success rates."
    # ========== END RISK ADVISORY ==========

    return {
        "status": "success",
        "strategies": strategies,
        "consultant_note": advisor_msg,
        "risk_advisory": risk_note,
        "meta": {
            "total_options": total_options,
            "safe_count": safe_count,
            "fast_count": fast_count,
            "moonshot_count": moonshot_count
        }
    }

@app.get("/health")
async def health():
    return {"status": "operational", "version": "2.1.0-final"}
