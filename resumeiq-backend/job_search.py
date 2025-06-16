# job_search.py
import os
import logging
from serpapi import GoogleSearch
from dotenv import load_dotenv

load_dotenv()
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def clean_and_flatten_skills(skills):
    import re
    cleaned = set()
    for skill in skills:
        # Remove non-alphanum except # + . and spaces, split by , or newlines
        parts = re.split(r'[,/;\n]+', skill)
        for part in parts:
            cleaned_skill = re.sub(r'[^a-zA-Z0-9+#.\s]', '', part).strip().lower()
            if cleaned_skill and len(cleaned_skill) > 1:
                cleaned.add(cleaned_skill)
    return sorted(cleaned)

def search_jobs(skills, location="India", max_results=10, language="en", country="in"):
    """
    Search jobs via SerpAPI Google Jobs engine based on skills and location.
    Returns a list of job dicts (not formatted strings!).
    """
    if not SERPAPI_API_KEY:
        logger.error("SERPAPI_API_KEY not set in environment.")
        return []

    if not skills:
        logger.error("No skills provided for job search")
        return []

    skills = clean_and_flatten_skills(skills)
    if not skills:
        logger.warning("No valid skills after cleaning.")
        return []

    # Limit skills to 5 for best results
    query_skills = skills[:5]
    query = " OR ".join([f'"{skill}"' for skill in query_skills]) + " jobs"

    params = {
        "q": query,
        "location": location,
        "engine": "google_jobs",
        "api_key": SERPAPI_API_KEY,
        "hl": language,
        "gl": country,
        "num": max_results
    }

    logger.info(f"Searching jobs with query: {query} | Location: {location}")

    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        jobs_results = results.get("jobs_results", {})
        if isinstance(jobs_results, dict):
            jobs_list = jobs_results.get("jobs", [])
        elif isinstance(jobs_results, list):
            jobs_list = jobs_results
        else:
            logger.warning("Unexpected jobs_results format.")
            jobs_list = []

        extracted = []
        for job in jobs_list[:max_results]:
            link = job.get("link") or job.get("share_link")
            if not link and job.get("apply_options"):
                if isinstance(job["apply_options"], list) and job["apply_options"]:
                    link = job["apply_options"][0].get("link")
            if not link:
                continue
            extracted.append({
                "title": job.get("title", "N/A"),
                "company_name": job.get("company_name", "N/A"),
                "location": job.get("location", "N/A"),
                "link": link,
                "posted_at": job.get("detected_extensions", {}).get("posted_at"),
                "schedule_type": job.get("detected_extensions", {}).get("schedule_type")
            })
        logger.info(f"Extracted {len(extracted)} jobs.")
        return extracted

    except Exception as e:
        logger.error(f"Error in search_jobs: {e}")
        return []

# Optionally, keep a formatting function for API/testing use
def format_job_results(jobs, skills):
    if not jobs:
        return "No jobs found matching your criteria."
    formatted_output = [f"\n🔍 Found {len(jobs)} jobs matching: {', '.join(skills[:5])}", "="*80]
    for idx, job in enumerate(jobs, 1):
        job_entry = [
            f"\n📌 Job #{idx}",
            f"🏢 Company: {job['company_name']}",
            f"💼 Position: {job['title']}",
            f"📍 Location: {job['location']}",
            f"📅 Posted: {job.get('posted_at', 'Not specified')}",
            f"⏰ Schedule: {job.get('schedule_type', 'Not specified')}",
            f"🔗 Apply: {job['link']}",
            "-"*60
        ]
        formatted_output.extend(job_entry)
    return "\n".join(formatted_output)
