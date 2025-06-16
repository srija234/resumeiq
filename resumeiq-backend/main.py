from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parser import parse_resume
from skills import extract_skills
from feedback import resume_feedback
from job_search import search_jobs
from utils import clean_skills   

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    resume_text = parse_resume(file)
    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from resume.")

    raw_skills = extract_skills(resume_text)   # As before
    skills = clean_skills(raw_skills)          # CLEANED and deduped

    feedback = resume_feedback(skills, resume_text)
    jobs = search_jobs(skills)
    return {
        "skills": skills,
        "feedback": feedback,
        "matched_jobs": jobs
    }
