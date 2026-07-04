import { useState } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import ScoreCard from "./components/ScoreCard";
import SkillList from "./components/SkillList";
import Suggestions from "./components/Suggestions";
import OverallScore from "./components/OverallScore";
import StatsCards from "./components/StatsCards";
import API from "./services/api";

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
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />

      <Navbar />

      <div className="container">

        {/* Hero Section */}
        <div className="hero">
          <h1>🤖 AI Resume Analyzer</h1>

          <p>
            Upload your resume and compare it with any job description using AI.
          </p>
        </div>

        {/* Upload Form */}
        <UploadForm onAnalyze={analyzeResume} />

        {/* Loading */}
        {loading && (
          <h2
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Analyzing Resume...
          </h2>
        )}

        {/* Results */}
        {result && (
          <>
            <hr />

            <OverallScore
              score={result.final_ai_score}
            />

            <StatsCards result={result} />

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

            <Suggestions
              suggestions={result.suggestions}
            />
          </>
        )}

      </div>
    </>
  );
}

export default App;