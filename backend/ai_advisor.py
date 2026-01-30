import os
from dotenv import load_dotenv
from openai import AzureOpenAI

# 1. Load the secrets
load_dotenv()

def get_ai_advice(profile, country_data, db_data):
    try:
        # Initialize Azure Client
        client = AzureOpenAI(
            azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"), 
            api_key=os.getenv("AZURE_OPENAI_KEY"),  
            api_version=os.getenv("AZURE_OPENAI_API_VERSION")
        )

        # The Prompt
        prompt = f"""
        Act as a Senior Study Abroad Consultant.
        Write a short, strategic 2-sentence note for a student.

        Student: {profile.major_interest} | Budget: {profile.budget_max_lakhs}L
        Target: {country_data['country']} (Risk Score: {country_data['match_score']}/100)
        Trend Alert: {db_data.get('trend_alert', 'None')}
        Risks: {", ".join(country_data['reasoning'])}

        Advice:
        """

        # Call GPT-4o
        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"), 
            messages=[
                {"role": "system", "content": "You are a helpful, concise academic advisor."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=100
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Azure Error: {e}")
        return "AI Consultant is offline. Rely on the Risk Score above."
