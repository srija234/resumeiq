import re

def clean_skills(skills):
    """
    Cleans and deduplicates a list of skills: trims, lowercases, removes junk.
    """
    if not skills:
        return []

    cleaned = set()
    for skill in skills:
        # Remove non-printable and weird chars, strip whitespace, lowercase
        skill = skill.replace('\n', ' ').replace('\r', '').replace('', '').replace('', '')
        skill = skill.replace('*', '').replace('(', '').replace(')', '')
        skill = skill.replace('–', '-')
        skill = skill.strip().lower()
        # Optionally remove empty or 1-char skills
        if len(skill) > 1 and not skill.isspace():
            cleaned.add(skill)
    # Remove obvious duplicates
    return sorted(cleaned)
