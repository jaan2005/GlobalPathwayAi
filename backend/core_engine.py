from pydantic import BaseModel
from typing import List, Optional

# --- 1. The Input Contract ---
class UserProfile(BaseModel):
    current_degree: str
    gpa: float
    major_interest: str
    budget_max_lakhs: float
    priority_goal: str
    funding_source: Optional[str] = "Self" 

# --- 2. The Database ---
COUNTRY_DB = [
    {
        "name": "Germany",
        "flag": "🇩🇪",
        "archetype": "safe_bets",
        "tagline": "Zero Tuition, High Security",
        "avg_tuition": 0,
        "cost_of_living": 12,
        "total_cost": 12,
        "avg_salary": 65,
        "visa_risk": "Low",
        "tech_shortage": True,
        "min_gpa": 7.0,
        "pr_timeline": "Fast (21 Months)",
        "pr_risk_color": "green",
        "timeline_steps": ["Masters (2y)", "Job Search (18m)", "PR (Guaranteed)"],
        "roi_verdict": "Highest Safety",
        "trend_alert": "✅ New 'Chancenkarte' (Opportunity Card) makes job seeking easier."
    },
    {
        "name": "Australia",
        "flag": "🇦🇺",
        "archetype": "safe_bets",
        "tagline": "Points-Based PR System",
        "avg_tuition": 25,
        "cost_of_living": 18,
        "total_cost": 43,
        "avg_salary": 70,
        "visa_risk": "Medium",
        "tech_shortage": True,
        "min_gpa": 6.5,
        "pr_timeline": "Medium (2-3 Years)",
        "pr_risk_color": "yellow",
        "timeline_steps": ["Masters (2y)", "Job Search (1y)", "Points Test"],
        "roi_verdict": "Balanced Option",
        "trend_alert": "⚠️ Stricter English tests and Genuine Student tests introduced in 2024."
    },
    {
        "name": "Ireland",
        "flag": "🇮🇪",
        "archetype": "fast_track",
        "tagline": "Tech Hub, 1-Year Masters",
        "avg_tuition": 18,
        "cost_of_living": 15,
        "total_cost": 33,
        "avg_salary": 65,
        "visa_risk": "Low",
        "tech_shortage": True,
        "min_gpa": 7.0,
        "pr_timeline": "Fast (2 Years)",
        "pr_risk_color": "green",
        "timeline_steps": ["Masters (1y)", "Job Search (1y)", "PR (Stamp 4)"],
        "roi_verdict": "Speed Leader",
        "trend_alert": "✅ Growing tech sector with Google, Meta, Amazon presence."
    },
    {
        "name": "UK",
        "flag": "🇬🇧",
        "archetype": "fast_track",
        "tagline": "1-Year Masters, Established Universities",
        "avg_tuition": 30,
        "cost_of_living": 18,
        "total_cost": 48,
        "avg_salary": 60,
        "visa_risk": "Medium",
        "tech_shortage": False,
        "min_gpa": 6.5,
        "pr_timeline": "Long (5 Years)",
        "pr_risk_color": "yellow",
        "timeline_steps": ["Masters (1y)", "Work Visa (5y)", "ILR"],
        "roi_verdict": "Brand Value",
        "trend_alert": "⚠️ Restrictions on bringing dependents (family) enforced."
    },
    {
        "name": "USA",
        "flag": "🇺🇸",
        "archetype": "moonshots",
        "tagline": "Highest Salaries, H1B Lottery",
        "avg_tuition": 40,
        "cost_of_living": 20,
        "total_cost": 60,
        "avg_salary": 110,
        "visa_risk": "High",
        "tech_shortage": True,
        "min_gpa": 7.5,
        "pr_timeline": "Very Long (7+ Years)",
        "pr_risk_color": "red",
        "timeline_steps": ["Masters (2y)", "OPT (3y)", "H1B (Lottery ⚠️)"],
        "roi_verdict": "High Risk, High Reward",
        "trend_alert": "⚠️ H-1B Lottery remains highly competitive."
    }
]

# --- 3. The Risk Algorithm (ACADEMIC + FINANCIAL MODE) ---
def calculate_risk_score(user: UserProfile, country: dict):
    score = 100
    logs = []
    
    country_name = country['name']
    total_cost = country['total_cost']

    # A. Financial Viability
    if user.budget_max_lakhs >= total_cost:
        logs.append(f"✅ Budget fits (Cost: {total_cost}L vs Budget: {user.budget_max_lakhs}L)")
    elif user.budget_max_lakhs >= country['avg_tuition']:
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
        roi_ratio = country['avg_salary'] / (total_cost if total_cost > 0 else 1)
        if roi_ratio > 3.0:
            score += 10
            logs.append(f"📈 Excellent ROI ({roi_ratio:.1f}x). (+10 pts)")
    elif user.priority_goal == "Immigration":
        if country['visa_risk'] == "High":
            score -= 30
            logs.append("🚫 High Visa Risk. (-30 pts)")
        else:
            score += 10
            logs.append("🛂 Good Visa Policy. (+10 pts)")
    elif user.priority_goal == "Low Cost":
        if country['avg_tuition'] == 0:
            score += 20
            logs.append("💰 Free Tuition. (+20 pts)")

    # D. Skill/Major Checks
    # Normalize major to lowercase
    major_lower = user.major_interest.lower()
    
    # Tech Check
    is_tech = any(x in major_lower for x in ['cs', 'computer', 'data', 'cyber', 'it', 'tech', 'ai', 'software'])
    # Business Check
    is_business = any(x in major_lower for x in ['mba', 'business', 'management', 'finance', 'marketing', 'startup', 'entrepreneurship'])

    if country['tech_shortage'] and is_tech:
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
    trend = country.get('trend_alert', "")
    if "Cap" in trend or "Restrictions" in trend:
        score -= 10
        logs.append(f"📉 Policy Alert: {trend} (-10 pts)")
    elif "Chancenkarte" in trend:
        score += 10
        logs.append(f"🚀 Policy Win: {trend} (+10 pts)")

    final_score = max(0, min(100, score))
    
    # Calculate financial gap
    financial_gap = max(0, total_cost - user.budget_max_lakhs)
    
    return {
        "country": country_name,
        "flag": country['flag'],
        "tagline": country['tagline'],
        "match_score": final_score,
        "total_cost": total_cost,
        "financial_gap": financial_gap,
        "pr_timeline": country['pr_timeline'],
        "pr_risk_color": country['pr_risk_color'],
        "timeline_steps": country['timeline_steps'],
        "roi_verdict": country['roi_verdict'],
        "archetype": country['archetype'],
        "reasoning": logs
    }

def discover_strategies(user: UserProfile):
    """
    Discovery Mode: Evaluate ALL countries and bucket into strategic categories.
    This is NOT validation - it's discovery!
    """
    safe_bets = []
    fast_track = []
    moonshots = []
    
    for country in COUNTRY_DB:
        # Hard gate: GPA eligibility check
        if user.gpa < country['min_gpa']:
            # Skip countries where GPA is too low
            continue
        
        # Calculate risk score for this country
        result = calculate_risk_score(user, country)
        
        # Bucket into appropriate archetype
        if country['archetype'] == 'safe_bets':
            safe_bets.append(result)
        elif country['archetype'] == 'fast_track':
            fast_track.append(result)
        elif country['archetype'] == 'moonshots':
            moonshots.append(result)
    
    # Sort each bucket by match score
    safe_bets.sort(key=lambda x: -x['match_score'])
    fast_track.sort(key=lambda x: -x['match_score'])
    moonshots.sort(key=lambda x: -x['match_score'])
    
    return {
        "safe_bets": safe_bets,
        "fast_track": fast_track,
        "moonshots": moonshots
    }

def get_recommendations(user: UserProfile):
    """Legacy function - kept for backward compatibility but redirects to discover_strategies"""
    strategies = discover_strategies(user)
    
    # Flatten all results for legacy callers
    results = []
    results.extend(strategies['safe_bets'])
    results.extend(strategies['fast_track'])
    results.extend(strategies['moonshots'])
    
    return sorted(results, key=lambda x: (-x['match_score'], x['total_cost']))
