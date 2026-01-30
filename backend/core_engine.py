from pydantic import BaseModel
from typing import List, Optional

# --- 1. The Input Contract ---
class UserProfile(BaseModel):
    current_degree: str
    gpa: float
    major_interest: str
    budget_max_lakhs: float
    priority_goal: str
    preferred_countries: List[str]
    funding_source: Optional[str] = "Self" 

# --- 2. The Database ---
COUNTRY_DB = {
    "Germany": {
        "avg_tuition": 0, "cost_of_living": 12, "avg_salary": 65, "visa_risk": "Low", "tech_shortage": True,
        "trend_alert": "✅ New 'Chancenkarte' (Opportunity Card) makes job seeking easier."
    },
    "Australia": {
        "avg_tuition": 25, "cost_of_living": 18, "avg_salary": 70, "visa_risk": "Medium", "tech_shortage": True,
        "trend_alert": "⚠️ Stricter English tests and Genuine Student tests introduced in 2024."
    },
    "USA": {
        "avg_tuition": 40, "cost_of_living": 20, "avg_salary": 110, "visa_risk": "High", "tech_shortage": True,
        "trend_alert": "⚠️ H-1B Lottery remains highly competitive."
    },
    "UK": {
        "avg_tuition": 30, "cost_of_living": 18, "avg_salary": 60, "visa_risk": "Medium", "tech_shortage": False,
        "trend_alert": "⚠️ Restrictions on bringing dependents (family) enforced."
    },
    "Canada": {
        "avg_tuition": 20, "cost_of_living": 15, "avg_salary": 60, "visa_risk": "High", "tech_shortage": True,
        "trend_alert": "📉 2025 Cap on International Student Permits implemented."
    }
}

# --- 3. The Risk Algorithm (ACADEMIC + FINANCIAL MODE) ---
def calculate_risk_score(user: UserProfile, country_name: str, country_data: dict):
    score = 100
    logs = []

    # A. Financial Viability
    total_cost = country_data['avg_tuition'] + country_data['cost_of_living']
    
    if user.budget_max_lakhs >= total_cost:
        logs.append(f"✅ Budget fits (Cost: {total_cost}L vs Budget: {user.budget_max_lakhs}L)")
    elif user.budget_max_lakhs >= country_data['avg_tuition']:
        score -= 25  
        logs.append(f"⚠️ Partial Budget. Living costs need loan. (-25 pts)")
    else:
        score -= 50  
        logs.append(f"❌ Budget Mismatch. Short by {total_cost - user.budget_max_lakhs}L. (-50 pts)")

    # Funding Source Check
    if user.funding_source == "Education Loan":
        score -= 5
        logs.append("🏦 Loan dependency increases financial pressure. (-5 pts)")

    # B. ACADEMIC LOGIC (New!)
    # GPA Checks
    if user.gpa < 6.0:
        score -= 40
        logs.append(f"🎓 Critical GPA ({user.gpa}). Admission highly unlikely. (-40 pts)")
    elif user.gpa < 7.0:
        score -= 15
        logs.append(f"⚠️ Low GPA ({user.gpa}). Limited university options. (-15 pts)")
    elif user.gpa >= 8.5:
        score += 5
        logs.append(f"🌟 High GPA. Scholarship eligibility increased. (+5 pts)")

    # Degree Level Check
    if user.current_degree == "Masters":
        score += 5
        logs.append("🎓 Masters applicants often yield higher ROI. (+5 pts)")

    # C. Priority Goals
    if user.priority_goal == "High ROI":
        roi_ratio = country_data['avg_salary'] / (total_cost if total_cost > 0 else 1)
        if roi_ratio > 3.0:
            score += 10
            logs.append(f"📈 Excellent ROI ({roi_ratio:.1f}x). (+10 pts)")
    elif user.priority_goal == "Immigration":
        if country_data['visa_risk'] == "High":
            score -= 30
            logs.append("🚫 High Visa Risk. (-30 pts)")
        else:
            score += 10
            logs.append("🛂 Good Visa Policy. (+10 pts)")
    elif user.priority_goal == "Low Cost":
        if country_data['avg_tuition'] == 0:
            score += 20
            logs.append("💰 Free Tuition. (+20 pts)")

    # D. Skill/Major Checks
    # Normalize major to lowercase
    major_lower = user.major_interest.lower()
    
    # Tech Check
    is_tech = any(x in major_lower for x in ['cs', 'computer', 'data', 'cyber', 'it', 'tech', 'ai', 'software'])
    # Business Check
    is_business = any(x in major_lower for x in ['mba', 'business', 'management', 'finance', 'marketing', 'startup', 'entrepreneurship'])

    if country_data['tech_shortage'] and is_tech:
        score += 15
        logs.append(f"🔥 Skill Shortage List Match (Tech). (+15 pts)")
    elif is_business and country_name in ["USA", "UK", "Germany"]:
        # USA/UK/Germany are good for Business
        score += 5
        logs.append(f"💼 Business Hub (Strong Industry). (+5 pts)")
    elif not is_tech and not is_business:
        # Penalize obscure majors slightly if they aren't in demand
        logs.append(f"ℹ️ Major '{user.major_interest}' not on critical shortage lists.")

    # E. Trend Alerts
    trend = country_data.get('trend_alert', "")
    if "Cap" in trend or "Restrictions" in trend:
        score -= 10
        logs.append(f"📉 Policy Alert: {trend} (-10 pts)")
    elif "Chancenkarte" in trend:
        score += 10
        logs.append(f"🚀 Policy Win: {trend} (+10 pts)")

    final_score = max(0, min(100, score))
    
    return {
        "country": country_name,
        "match_score": final_score,
        "total_cost": total_cost, 
        "reasoning": logs
    }

def get_recommendations(user: UserProfile):
    results = []
    targets = user.preferred_countries if user.preferred_countries else ["USA", "Germany", "UK", "Australia", "Canada"]
    
    for country in targets:
        if country in COUNTRY_DB:
            data = COUNTRY_DB[country]
            results.append(calculate_risk_score(user, country, data))
    
    # SORT LOGIC: Match Score > Cost
    return sorted(results, key=lambda x: (-x['match_score'], x['total_cost']))
