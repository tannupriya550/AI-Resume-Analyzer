from fastapi import FastAPI
from app.routers import resume

app = FastAPI()

app.include_router(resume.router)

@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend is Running!"}