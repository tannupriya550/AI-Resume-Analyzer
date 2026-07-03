from fastapi import APIRouter, UploadFile, File, Form
import os
import shutil

from app.services.pdf_service import extract_text_from_pdf
from app.services.skill_service import extract_skills
from app.services.ats import calculate_ats_score
from app.services.semantic_match import semantic_similarity

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    # Save uploaded resume
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from resume
    extracted_text = extract_text_from_pdf(file_path)

    # Extract skills
    detected_skills = extract_skills(extracted_text)

    # Calculate ATS score
    ats_result = calculate_ats_score(extracted_text, job_description)
    semantic_score = semantic_similarity(
    extracted_text,
    job_description
)

    return {
        "message": "Resume uploaded successfully!",
        "filename": file.filename,
        "resume_skills": detected_skills,
        "ats_score": ats_result["ats_score"],
        "semantic_score": semantic_score,
        "matched_skills": ats_result["matched_skills"],
        "missing_skills": ats_result["missing_skills"]
    }