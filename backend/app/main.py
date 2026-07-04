from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import resume

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)


@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend is Running!"}