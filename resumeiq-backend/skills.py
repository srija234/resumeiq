import spacy

nlp = spacy.load("en_core_web_sm")

SKILL_KEYWORDS = [
    "python", "java", "c++", "c#", "javascript", "typescript", "html", "css",
    "aws", "azure", "gcp", "docker", "kubernetes", "git", "github",
    "react", "node.js", "sql", "nosql", "mongodb", "postgresql", "mysql",
    "linux", "machine learning", "deep learning", "nlp", "django", "flask",
    "tableau", "power bi", "spark", "hadoop", "pandas", "numpy"
]

def keyword_skills(text: str):
    text = text.lower()
    found = [skill for skill in SKILL_KEYWORDS if skill in text]
    return list(set(found))

def nlp_skill_phrases(text: str):
    doc = nlp(text)
    candidates = [chunk.text.lower() for chunk in doc.noun_chunks if len(chunk.text) <= 30]
    found = []
    for c in candidates:
        if any(kw in c for kw in SKILL_KEYWORDS) and c not in found:
            found.append(c)
    return found

def extract_skills(text: str):
    keywords = keyword_skills(text)
    nlp_phrases = nlp_skill_phrases(text)
    all_skills = list(set(keywords + nlp_phrases))
    return all_skills
