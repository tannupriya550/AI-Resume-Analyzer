import { useState } from "react";

function UploadForm({ onAnalyze }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    onAnalyze(resume, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>AI Resume Analyzer</h2>

      <label>Upload Resume (PDF)</label>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <label>Job Description</label>

      <textarea
        rows="10"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button type="submit">
        Analyze Resume
      </button>
    </form>
  );
}

export default UploadForm;