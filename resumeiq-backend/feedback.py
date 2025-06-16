import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def resume_feedback(skills: list, text: str) -> str:
    skills_str = ", ".join(skills) if skills else "None detected"
    prompt = f"""
You are a world-class resume reviewer.

Below is the extracted resume text, enclosed in triple backticks.
Also provided is a list of detected technical skills: [{skills_str}].

Please review and provide feedback with the following structure, using **bold section headings** and Markdown bullets (no asterisks for bold, use '-' for bullets):

**1. Major Strengths**
- List 2-3 bullet points highlighting the candidate's key strengths.

**2. Areas for Improvement and Suggestions**
- List 2-3 bullet points with actionable feedback on how to improve the resume.

**3. Missing Skills (if any)**
- If any important skills in the resume are not in the detected list, mention them here.
- Otherwise, write 'No important skills missing from detected list.'

**4. Overall Recommendation**
- Provide a short, encouraging summary.

Do NOT include any introductory or closing remarks. Only return the feedback in clean, readable Markdown as shown above.

Resume Text:
```{text}```

Detected Skills:
{skills_str}
"""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error from Gemini: {e}"
