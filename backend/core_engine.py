from pydantic import BaseModel
from typing import Optional

class UserProfile(BaseModel):
    current_degree: str
    gpa: float
    major_interest: str
    budget_max_lakhs: float
    priority_goal: str
    funding_source: Optional[str] = "Self"
    target_intake: Optional[str] = "Fall 2025"

COUNTRY_DB = [
    {
        "name": "Germany",
        "flag": "🇩🇪",
        "archetype": "safe_bets",
        "tagline": "Zero Tuition, Guaranteed PR",
        "costs": {
            "tuition": 0,
            "living": 10,
            "visa_fees": 0.5,
            "insurance": 1.5
        },
        "total_cost": 12,
        "min_gpa": 7.0,
        "avg_salary_post_grad": 55,
        "break_even_months": 14,
        "pr_risk_color": "green",
        "pr_success_rate": 94,
        "timeline_steps": ["Masters (2y)", "Job Search (18m)", "PR (Guaranteed)"],
        "pr_branches": [
            {"path": "EU Blue Card", "timeline": "21 months", "success": "94%", "color": "green"},
            {"path": "Permanent Settlement Permit", "timeline": "33 months", "success": "89%", "color": "green"},
        ],
        "policy_alerts": [
            {"type": "positive", "text": "Chancenkarte (Opportunity Card) launched 2024 - easier job seeking visa"},
            {"type": "neutral", "text": "German language (B1) beneficial for certain PR routes"},
        ],
        "action_deadlines": {
            "Fall 2025": [
                {"task": "University applications open", "date": "Dec 2024"},
                {"task": "Blocked account proof (€11,208)", "date": "Apr 2025"},
                {"task": "Visa appointment", "date": "May 2025"},
                {"task": "Semester begins", "date": "Oct 2025"},
            ],
            "Spring 2026": [
                {"task": "University applications open", "date": "Jun 2025"},
                {"task": "Blocked account proof", "date": "Dec 2025"},
                {"task": "Visa appointment", "date": "Jan 2026"},
                {"task": "Semester begins", "date": "Mar 2026"},
            ],
            "Fall 2026": [
                {"task": "University applications open", "date": "Dec 2025"},
                {"task": "Blocked account proof", "date": "Apr 2026"},
                {"task": "Visa appointment", "date": "May 2026"},
                {"task": "Semester begins", "date": "Oct 2026"},
            ]
        },
        "insider_insight": "Germany offers zero tuition at public universities. With the new Chancenkarte (Opportunity Card), job-seeking after graduation is significantly easier. Best ROI for budget-conscious students."
    },
    {
        "name": "Ireland",
        "flag": "🇮🇪",
        "archetype": "fast_track",
        "tagline": "1-Year Masters, Tech Hub, Fast ROI",
        "costs": {
            "tuition": 18,
            "living": 6,
            "visa_fees": 0.3,
            "insurance": 0.7
        },
        "total_cost": 25,
        "min_gpa": 6.5,
        "avg_salary_post_grad": 50,
        "break_even_months": 18,
        "pr_risk_color": "green",
        "pr_success_rate": 87,
        "timeline_steps": ["Masters (1y)", "Stay Back (2y)", "Stamp 4 PR"],
        "pr_branches": [
            {"path": "Stamp 1G → Stamp 4", "timeline": "24 months", "success": "87%", "color": "green"},
            {"path": "Critical Skills Permit", "timeline": "12 months", "success": "92%", "color": "green"},
            {"path": "Startup Founder Visa", "timeline": "Variable", "success": "65%", "color": "yellow"},
        ],
        "policy_alerts": [
            {"type": "positive", "text": "2-year stay-back visa guaranteed for all Masters graduates"},
            {"type": "positive", "text": "No lottery system - merit-based work permits"},
        ],
        "action_deadlines": {
            "Fall 2025": [
                {"task": "Applications open (Rolling basis)", "date": "Now"},
                {"task": "Scholarship deadlines", "date": "Feb 2025"},
                {"task": "Visa application", "date": "Jun 2025"},
                {"task": "Semester begins", "date": "Sep 2025"},
            ],
            "Spring 2026": [
                {"task": "Applications open", "date": "Jul 2025"},
                {"task": "Visa application", "date": "Nov 2025"},
                {"task": "Semester begins", "date": "Jan 2026"},
            ],
            "Fall 2026": [
                {"task": "Applications open", "date": "Oct 2025"},
                {"task": "Scholarship deadlines", "date": "Feb 2026"},
                {"task": "Visa application", "date": "Jun 2026"},
                {"task": "Semester begins", "date": "Sep 2026"},
            ]
        },
        "insider_insight": "Ireland's 1-year Masters with 2-year stay-back offers the fastest path to positive ROI in Europe. No lottery, no uncertainty - merit-based work permits."
    },
    {
        "name": "United Kingdom",
        "flag": "🇬🇧",
        "archetype": "fast_track",
        "tagline": "1-Year Prestige, Global Brand Value",
        "costs": {
            "tuition": 25,
            "living": 8,
            "visa_fees": 0.8,
            "insurance": 1.2
        },
        "total_cost": 35,
        "min_gpa": 6.0,
        "avg_salary_post_grad": 48,
        "break_even_months": 26,
        "pr_risk_color": "yellow",
        "pr_success_rate": 61,
        "timeline_steps": ["Masters (1y)", "Graduate Visa (2y)", "Skilled Worker Route"],
        "pr_branches": [
            {"path": "Graduate → Skilled Worker → ILR", "timeline": "5 years", "success": "61%", "color": "yellow"},
            {"path": "High Potential Individual Visa", "timeline": "2 years", "success": "78%", "color": "green"},
            {"path": "Global Talent Visa", "timeline": "3 years", "success": "45%", "color": "red"},
        ],
        "policy_alerts": [
            {"type": "negative", "text": "Dependents restricted for most student visas (Jan 2024)"},
            {"type": "neutral", "text": "Minimum salary threshold increased to £38,700 for settlement"},
        ],
        "action_deadlines": {
            "Fall 2025": [
                {"task": "UCAS/Direct applications", "date": "Jan 2025"},
                {"task": "CAS letter from university", "date": "May 2025"},
                {"task": "Visa biometrics", "date": "Jul 2025"},
                {"task": "Semester begins", "date": "Sep 2025"},
            ],
            "Spring 2026": [
                {"task": "Applications", "date": "Aug 2025"},
                {"task": "CAS letter", "date": "Nov 2025"},
                {"task": "Visa biometrics", "date": "Dec 2025"},
                {"task": "Semester begins", "date": "Jan 2026"},
            ],
            "Fall 2026": [
                {"task": "UCAS/Direct applications", "date": "Jan 2026"},
                {"task": "CAS letter", "date": "May 2026"},
                {"task": "Visa biometrics", "date": "Jul 2026"},
                {"task": "Semester begins", "date": "Sep 2026"},
            ]
        },
        "insider_insight": "UK offers unmatched brand value and a 1-year program, but the PR path is longer (5 years) and the new £38,700 salary floor makes settlement harder. Best for those prioritizing prestige over immigration."
    },
    {
        "name": "USA",
        "flag": "🇺🇸",
        "archetype": "moonshots",
        "tagline": "Highest Salaries, Lottery-Based PR",
        "costs": {
            "tuition": 35,
            "living": 12,
            "visa_fees": 1.5,
            "insurance": 1.5
        },
        "total_cost": 50,
        "min_gpa": 6.0,
        "avg_salary_post_grad": 95,
        "break_even_months": 20,
        "pr_risk_color": "red",
        "pr_success_rate": 27,
        "timeline_steps": ["Masters (2y)", "OPT (3y)", "H1B Lottery ⚠️"],
        "pr_branches": [
            {"path": "H1B → Green Card (EB2/EB3)", "timeline": "6-10 years", "success": "27%", "color": "red"},
            {"path": "O1 Extraordinary Ability", "timeline": "Variable", "success": "15%", "color": "red"},
            {"path": "EB1 (PhD/Research)", "timeline": "3-5 years", "success": "52%", "color": "yellow"},
            {"path": "Startup (E2/L1)", "timeline": "Variable", "success": "35%", "color": "yellow"},
        ],
        "policy_alerts": [
            {"type": "negative", "text": "H1B lottery success rate: ~27% (2024 data)"},
            {"type": "negative", "text": "Green Card backlog for India-born: 50+ years (EB2/EB3)"},
            {"type": "positive", "text": "STEM OPT extension allows 3 years total work authorization"},
        ],
        "action_deadlines": {
            "Fall 2025": [
                {"task": "GRE/TOEFL scores ready", "date": "Oct 2024"},
                {"task": "Application deadlines (Top 50)", "date": "Dec 2024"},
                {"task": "I-20 received", "date": "Apr 2025"},
                {"task": "SEVIS + Visa interview", "date": "Jun 2025"},
                {"task": "Semester begins", "date": "Aug 2025"},
            ],
            "Spring 2026": [
                {"task": "GRE/TOEFL ready", "date": "May 2025"},
                {"task": "Applications", "date": "Aug 2025"},
                {"task": "I-20 received", "date": "Nov 2025"},
                {"task": "Visa interview", "date": "Dec 2025"},
                {"task": "Semester begins", "date": "Jan 2026"},
            ],
            "Fall 2026": [
                {"task": "GRE/TOEFL ready", "date": "Oct 2025"},
                {"task": "Applications", "date": "Dec 2025"},
                {"task": "I-20 received", "date": "Apr 2026"},
                {"task": "Visa interview", "date": "Jun 2026"},
                {"task": "Semester begins", "date": "Aug 2026"},
            ]
        },
        "insider_insight": "USA offers the highest salaries globally, but the H1B lottery (~27% success) and 50+ year Green Card backlog for Indians make it a calculated gamble. Only pursue if you have a backup plan."
    },
    {
        "name": "Canada",
        "flag": "🇨🇦",
        "archetype": "safe_bets",
        "tagline": "Immigration-Friendly, Express Entry",
        "costs": {
            "tuition": 22,
            "living": 10,
            "visa_fees": 1,
            "insurance": 2
        },
        "total_cost": 35,
        "min_gpa": 6.5,
        "avg_salary_post_grad": 52,
        "break_even_months": 24,
        "pr_risk_color": "yellow",
        "pr_success_rate": 73,
        "timeline_steps": ["Masters (2y)", "PGWP (3y)", "Express Entry"],
        "pr_branches": [
            {"path": "PGWP → Express Entry (CEC)", "timeline": "3-4 years", "success": "73%", "color": "green"},
            {"path": "Provincial Nominee (PNP)", "timeline": "2-3 years", "success": "81%", "color": "green"},
            {"path": "Quebec Immigration (PEQ)", "timeline": "2 years", "success": "68%", "color": "yellow"},
        ],
        "policy_alerts": [
            {"type": "negative", "text": "2024-2025: Student permit cap introduced (35% reduction)"},
            {"type": "neutral", "text": "PGWP now requires job offer in field of study"},
            {"type": "positive", "text": "Express Entry draws resumed for all categories"},
        ],
        "action_deadlines": {
            "Fall 2025": [
                {"task": "Check DLI eligibility (new caps)", "date": "Now"},
                {"task": "Provincial attestation letter", "date": "Feb 2025"},
                {"task": "Study permit application", "date": "Apr 2025"},
                {"task": "Biometrics", "date": "May 2025"},
                {"task": "Semester begins", "date": "Sep 2025"},
            ],
            "Spring 2026": [
                {"task": "DLI check", "date": "Jul 2025"},
                {"task": "Attestation letter", "date": "Sep 2025"},
                {"task": "Study permit", "date": "Oct 2025"},
                {"task": "Semester begins", "date": "Jan 2026"},
            ],
            "Fall 2026": [
                {"task": "DLI eligibility check", "date": "Dec 2025"},
                {"task": "Attestation letter", "date": "Feb 2026"},
                {"task": "Study permit", "date": "Apr 2026"},
                {"task": "Semester begins", "date": "Sep 2026"},
            ]
        },
        "insider_insight": "Canada's Express Entry remains one of the clearest PR paths globally. However, the 2024 student permit cap (35% reduction) means you must apply early and to approved DLI institutions only."
    },
    {
        "name": "Australia",
        "flag": "🇦🇺",
        "archetype": "safe_bets",
        "tagline": "High Quality of Life, Points-Based PR",
        "costs": {
            "tuition": 28,
            "living": 10,
            "visa_fees": 1.5,
            "insurance": 0.5
        },
        "total_cost": 40,
        "min_gpa": 6.5,
        "avg_salary_post_grad": 58,
        "break_even_months": 25,
        "pr_risk_color": "yellow",
        "pr_success_rate": 68,
        "timeline_steps": ["Masters (2y)", "485 Visa (2-4y)", "Points Test PR"],
        "pr_branches": [
            {"path": "Skilled Independent (189)", "timeline": "3-4 years", "success": "68%", "color": "yellow"},
            {"path": "State Nominated (190)", "timeline": "2-3 years", "success": "74%", "color": "green"},
            {"path": "Regional Pathway (491→191)", "timeline": "4-5 years", "success": "82%", "color": "green"},
        ],
        "policy_alerts": [
            {"type": "negative", "text": "Genuine Student (GS) test significantly tightened (Mar 2024)"},
            {"type": "negative", "text": "Post-study work visa reduced from 4 to 2 years (Jul 2024)"},
            {"type": "neutral", "text": "Points threshold effectively 80+ now (officially 65)"},
        ],
        "action_deadlines": {
            "Fall 2025": [
                {"task": "IELTS/PTE score ready", "date": "Oct 2024"},
                {"task": "University applications", "date": "Dec 2024"},
                {"task": "GS statement preparation", "date": "Feb 2025"},
                {"task": "Visa lodgement", "date": "May 2025"},
                {"task": "Semester begins", "date": "Jul 2025"},
            ],
            "Spring 2026": [
                {"task": "IELTS/PTE ready", "date": "Jun 2025"},
                {"task": "Applications", "date": "Aug 2025"},
                {"task": "GS statement", "date": "Oct 2025"},
                {"task": "Visa lodgement", "date": "Dec 2025"},
                {"task": "Semester begins", "date": "Feb 2026"},
            ],
            "Fall 2026": [
                {"task": "IELTS/PTE ready", "date": "Oct 2025"},
                {"task": "Applications", "date": "Dec 2025"},
                {"task": "GS statement", "date": "Feb 2026"},
                {"task": "Visa lodgement", "date": "May 2026"},
                {"task": "Semester begins", "date": "Jul 2026"},
            ]
        },
        "insider_insight": "Australia's post-study visa was cut from 4 to 2 years in 2024, and points requirements have increased. Regional pathways (491→191) now offer the best PR odds at 82% success rate."
    }
]

def discover_strategies(user: UserProfile):
    strategies = {
        "safe_bets": [],
        "fast_track": [],
        "moonshots": []
    }
    
    for country in COUNTRY_DB:
        if user.gpa < country['min_gpa']:
            continue

        gap = country['total_cost'] - user.budget_max_lakhs
        is_moonshot = country['archetype'] == 'moonshots'
        
        # Financial status logic
        if gap <= 0:
            # Special handling for moonshots - money doesn't eliminate lottery risk
            if is_moonshot:
                financial_status = "Budget OK"
            else:
                financial_status = "Fully Covered"
            financial_health = "excellent"
        elif gap <= 10:
            financial_status = f"Gap: ₹{gap:.1f}L"
            financial_health = "manageable"
        else:
            financial_status = f"Gap: ₹{gap:.1f}L"
            financial_health = "stretch"

        # ROI Calculation
        annual_salary = country['avg_salary_post_grad']
        roi_percentage = ((annual_salary * 2) - country['total_cost']) / country['total_cost'] * 100
        
        country_data = {
            **country,
            "financial_status": financial_status,
            "financial_health": financial_health,
            "gap_value": gap,
            "roi_percentage": round(roi_percentage, 1),
            "deadlines": country['action_deadlines'].get(user.target_intake, [])
        }

        archetype = country['archetype']
        if archetype in strategies:
            strategies[archetype].append(country_data)

    return strategies
