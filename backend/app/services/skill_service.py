from data.skills import SKILLS


def extract_skills(resume_text):
    resume_lower = resume_text.lower()

    detected_skills = []

    for skill in SKILLS:
        if skill.lower() in resume_lower:
            detected_skills.append(skill)

    return detected_skills