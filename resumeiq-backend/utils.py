import re

def clean_skills(skills):
    """
    Cleans and deduplicates a list of skills: trims, lowercases, removes junk.
    """
    if not skills:
        return []

    cleaned = set()
    for skill in skills:
        skill = skill.replace('\n', ' ').replace('\r', '').replace('', '').replace('', '')
        skill = skill.replace('*', '').replace('(', '').replace(')', '')
        skill = skill.replace('–', '-')
        skill = skill.strip().lower()
        if len(skill) > 1 and not skill.isspace():
            cleaned.add(skill)
    return sorted(cleaned)
