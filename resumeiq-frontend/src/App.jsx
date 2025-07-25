import React, { useState } from "react";
import SkillsChips from "./components/SkillsChips";
import FeedbackMarkdown from "./components/FeedbackMarkdown";
import JobCards from "./components/JobCards";
import GoogleDrivePicker from "./components/GoogleDrivePicker";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleDrivePick = (driveFile) => {
    setFile(driveFile);
    setFileName(driveFile.name);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setResult(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Upload failed! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed! Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="animated-background flex flex-col items-center justify-center px-2 sm:px-4 funnel-display">
      {/* Main content */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen max-w-4xl mx-auto py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-4 w-full flex-nowrap">
            <img src="/logo.png" alt="Logo" className="h-[5rem] w-auto object-contain" />
            <h1 className="large-heading font-bold leading-none bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent limelight-regular m-0">
              Resume Analyzer
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium dm-serif-text-regular">
            Upload your resume to get personalized feedback and job matches
          </p>
        </div>

        {/* Upload Card */}
        <div className="upload-card-container mb-8 w-full">
          {/* Animated gradient border */}
          <div className="upload-card-border">
            {/* Card content */}
            <div className="upload-card-content p-4 sm:p-8">
              <div className="flex flex-col items-center">
                {/* File Upload Area */}
                <div className="w-full mb-4 sm:mb-6 flex flex-col gap-2">
                  {/* Local file upload */}
                  <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-indigo-200 rounded-xl cursor-pointer bg-white hover:bg-indigo-50 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-4 pb-4">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-1 text-xs sm:text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PDF or DOCX (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {/* Google Drive upload */}
                  <GoogleDrivePicker onPick={handleDrivePick} disabled={uploading} />
                </div>

                {/* Selected File Info */}
                {fileName && (
                  <div className="w-full mb-4 sm:mb-6 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-xs">
                          {fileName}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setFile(null);
                          setFileName("");
                        }}
                        className="text-gray-300 hover:text-gray-500 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className={`w-full px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-white transition-all duration-300 text-sm sm:text-base ${
                    !file || uploading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-sm hover:shadow-md"
                  }`}
                >
                  {uploading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin fallback-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-white"></div>
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : (
                    "Analyze Resume"
                  )}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-2 sm:p-3 bg-red-50 text-red-600 rounded-lg w-full text-center animate-fade-in border border-red-100 text-xs sm:text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 space-y-8 animate-fade-in-up w-full">
            <div className="upload-card-container w-full">
              <div className="upload-card-border">
                <div className="upload-card-content p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 delius-regular">
                    Your Skills
                  </h2>
                  <SkillsChips skills={result.skills} />
                </div>
              </div>
            </div>

            <div className="upload-card-container w-full">
              <div className="upload-card-border">
                <div className="upload-card-content p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center delius-regular">
                    Feedback
                  </h2>
                  <FeedbackMarkdown feedback={result.feedback} />
                </div>
              </div>
            </div>

            <div className="upload-card-container w-full">
              <div className="upload-card-border">
                <div className="upload-card-content p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 delius-regular">
                    Recommended Jobs
                  </h2>
                  <JobCards jobs={result.matched_jobs} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
