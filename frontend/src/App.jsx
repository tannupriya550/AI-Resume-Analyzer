import DownloadButton from "./components/DownloadButton";
import { useState } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import ScoreCard from "./components/ScoreCard";
import SkillList from "./components/SkillList";
import Suggestions from "./components/Suggestions";
import OverallScore from "./components/OverallScore";
import StatsCards from "./components/StatsCards";
import LoadingScreen from "./components/LoadingScreen";
import AIReview from "./components/AIReview";

import API from "./services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async (resume, jobDescription) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", resume);
      formData.append("job_description", jobDescription);

      const response = await API.post(
        "/upload-resume",
        formData
      );

      setResult(response.data);

      toast.success("Resume analyzed successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />

      <Navbar />

      <div className="container">

        {/* Hero */}
        <div className="hero">
          <h1>🤖 AI Resume Analyzer</h1>

          <p>
            Upload your resume and compare it with any job description using AI.
          </p>
        </div>

        {/* Upload Form */}
        <UploadForm onAnalyze={analyzeResume} />

        {/* Loading */}
        {loading && <LoadingScreen />}

        {/* Results */}
        {result && (
          <>
            <hr />

            {/* Overall Score */}
            <OverallScore
              score={result.final_ai_score}
            />

            {/* Statistics */}
            <StatsCards result={result} />

            {/* Individual Scores */}
            <div className="score-container">

              <ScoreCard
                title="Keyword Score"
                score={result.keyword_score}
              />

              <ScoreCard
                title="Semantic Score"
                score={result.semantic_score}
              />

              <ScoreCard
                title="Final AI Score"
                score={result.final_ai_score}
              />

            </div>

            {/* Skills */}
            <SkillList
              title="Resume Skills"
              skills={result.resume_skills}
            />

            <SkillList
              title="Matched Skills"
              skills={result.matched_skills}
            />

            <SkillList
              title="Missing Skills"
              skills={result.missing_skills}
            />

            {/* Suggestions */}
            <Suggestions
  suggestions={result.suggestions}
/>

{result.ai_review && (
  <>
    <AIReview review={result.ai_review} />

    <DownloadButton result={result} />
  </>
)}
          </>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </>
  );
}

export default App;