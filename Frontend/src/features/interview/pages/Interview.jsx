import React, { useState, useRef } from "react";
import { UploadCloud, Star } from "lucide-react";
import useInterview from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar2";

const Interview = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);

  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const { generateReport, loading } = useInterview();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files[0];

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (data?._id) {
      navigate(`/interviewReport/${data._id}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobDescription) {
      alert("Job description is required");
      return;
    }

    if (!resume && !selfDescription) {
      alert("Upload resume or add self description");
      return;
    }

    handleGenerateReport();
  };

  if (loading) {
    return (
     <main className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-pink-500 border-t-transparent mb-6"></div>
  
  <p className="text-lg font-semibold">
    Generating your interview strategy...
  </p>

  <p className="text-gray-400 text-sm mt-2">
    Analyzing resume, matching skills, and preparing questions
  </p>
</main>
    );
  }

  return (
    
    // <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] text-white flex flex-col items-center px-4 py-10">
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black text-white flex flex-col items-center px-4 py-10">
      <Navbar/>
      {/* Heading */}
     
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold">
          Create Your Custom{" "}
          <span className="text-purple-500">Interview Plan</span>
        </h1>

        <p className="text-gray-400 mt-3 text-sm md:text-base">
          {/* Let our AI analyze the job requirements and your profile to build a winning strategy. */}
          Our AI analyzes the job description and your profile to generate a
          personalized interview strategy
        </p>
      </div>

      {/* Card */}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        // className="w-full max-w-6xl bg-[#0b1220] border border-gray-800 rounded-2xl p-5 md:p-8 shadow-lg"
        className="w-full max-w-6xl mx-auto bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-blue-500/10"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Section */}

          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">Target Job Description</h2>
              <span className="text-xs bg-pink-500/20 text-red-400 px-2 py-1 rounded">
                REQUIRED
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full h-64 md:h-72 bg-[#020617] border border-gray-700 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-pink-500"
              maxLength={5000}
            />

            <p className="text-right text-gray-500 text-sm mt-2">
              {jobDescription.length} / 5000 chars
            </p>
          </div>

          {/* Right Section */}

          <div>
            {/* Upload Resume */}

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Upload Resume</h2>
                <span className="text-xs bg-pink-500/20 text-red-400 px-2 py-1 rounded">
                  Resume Required
                </span>
              </div>

              <label className="border border-dashed border-gray-700 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-pink-500">
                <UploadCloud size={36} />

                <p className="mt-3 text-sm md:text-base">
                  Click to upload or drag & drop
                </p>

                <p className="text-xs md:text-sm text-gray-500">
                  PDF or DOCX (Max 5MB)
                </p>

                <input
                  ref={resumeInputRef}
                  type="file"
                  name="resume"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>

              {resume && (
                <p className="text-green-400 mt-2 text-sm">
                  {resume.name} uploaded
                </p>
              )}
            </div>

            {/* Divider */}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="text-gray-400 text-sm">AND</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Self Description */}

            <div>
              <div className="flex justify-between items-center mb-3">
                 <h2 className="font-semibold mb-2">Quick Self Description</h2>
              <span className="text-xs bg-pink-500/20 text-red-400 px-2 py-1 rounded">
                   REQUIRED
                </span>
              </div>
             

              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Briefly describe your experience, key skills..."
                className="w-full h-32 bg-[#020617] border border-pink-500/40 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-pink-500"
              />

              <div className="bg-blue-900/30 text-blue-300 text-sm p-3 rounded-lg mt-4">
                Either a <b>Resume</b> or a <b>Self Description</b> is required.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-8 border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-sm">
            AI-Powered Strategy Generation • Approx 50s
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold disabled:opacity-60"
          >
            <Star size={18} />
            {loading ? "Generating..." : "Generate My Interview Strategy"}
          </button>
        </div>
      </form>

      {/* Bottom Links */}

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-500 text-sm mt-6">
        <p className="cursor-pointer hover:text-white">Privacy Policy</p>
        <p className="cursor-pointer hover:text-white">Terms of Service</p>
        <p className="cursor-pointer hover:text-white">Help Center</p>
      </div>
    </div>
  );
};

export default Interview;
