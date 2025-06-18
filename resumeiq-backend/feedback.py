import os
from dotenv import load_dotenv
import google.generativeai as genai 

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def resume_feedback(skills: list, text: str) -> str:
    skills_str = ", ".join(skills) if skills else "None detected"
    prompt = f"""
You are a professional resume reviewer. Provide concise, actionable feedback on the resume below.

**Resume Text:**
```
{text}
```

**Detected Skills:**
{skills_str}

Provide feedback using this EXACT format with brief, clear points. Do NOT use any emojis anywhere in your response:

**Strengths**
- → [One key strength]
- → [One key strength]
- → [One key strength]

**Improvements Needed**
- → [One specific improvement]
- → [One specific improvement]
- → [One specific improvement]

**Quick Tips**
- → [One actionable tip]
- → [One actionable tip]

**Rating: [X]/10**

[One sentence summary]

---

**Rules:**
- Do NOT include any section or heading called "Resume Analysis" or "📊 Resume Analysis".
- Do NOT use any emojis anywhere in your response.
- Each bullet point must start with '- →'.
- Keep each bullet point to 1-2 lines maximum
- Be specific but concise
- Use simple, clear language
- Focus on the most important points only
- No lengthy explanations
"""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error from Gemini: {e}"
