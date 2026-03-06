import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import {
  FaRobot,
  FaFileAlt,
  FaLightbulb,
} from "react-icons/fa";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload resume 📄");
      return;
    }

    if (!jobDescription || !selfDescription) {
      toast.warning("Please fill all fields ⚠️");
      return;
    }

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    try {
      setLoading(true);

      toast.info("🤖 AI is generating your interview report...");

      // Example API call
      // await axios.post("/api/interview", formData)

      setTimeout(() => {
        setLoading(false);
        toast.success(" Interview Report Generated Successfully!");
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
      console.error(error);
    }
  };
// return (
//   <div className="min-h-screen bg-gray-50">

//     {/* Navbar */}
//     <Navbar />

//     {/* Main Content */}
//     <main className="flex flex-col">

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center py-24 px-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
//         <h2 className="text-5xl font-bold mb-6">
//           AI Powered Interview Analyzer
//         </h2>

//         <p className="text-lg max-w-2xl mb-8">
//           Upload your resume and job description to receive an AI powered
//           interview report including match score, skill gaps, technical
//           questions and preparation plan.
//         </p>

//         <Link
//           to="/interview"
//           className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
//         >
//           Generate Interview Report
//         </Link>
//       </section>

//       {/* Features */}
//       <section className="py-20 px-10 bg-white">
//         <h3 className="text-3xl font-bold text-center mb-12">
//           Features
//         </h3>

//         <div className="grid md:grid-cols-3 gap-10">
//           <div className="bg-gray-100 p-6 rounded-xl shadow">
//             <h4 className="text-xl font-semibold mb-3">
//               Resume Analysis
//             </h4>
//             <p className="text-gray-600">
//               AI scans your resume and compares it with the job description to
//               determine how well you match the role.
//             </p>
//           </div>

//           <div className="bg-gray-100 p-6 rounded-xl shadow">
//             <h4 className="text-xl font-semibold mb-3">
//               Interview Questions
//             </h4>
//             <p className="text-gray-600">
//               Automatically generate technical and behavioral interview
//               questions tailored to your profile.
//             </p>
//           </div>

//           <div className="bg-gray-100 p-6 rounded-xl shadow">
//             <h4 className="text-xl font-semibold mb-3">
//               Preparation Plan
//             </h4>
//             <p className="text-gray-600">
//               Get a step-by-step preparation roadmap to improve your chances
//               of clearing the interview.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Call To Action */}
//       <section className="bg-gray-100 py-20 text-center">
//         <h3 className="text-3xl font-bold mb-6">
//           Ready to improve your interview performance?
//         </h3>

//         <Link
//           to="/interview"
//           className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
//         >
//           Start Now
//         </Link>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black text-white py-8 text-center">
//         <p className="mb-2">
//           Built with AI to help developers succeed in interviews
//         </p>

//         <p className="text-gray-400 text-sm">
//           © 2026 SkillScan AI • All rights reserved
//         </p>
//       </footer>

//     </main>
//   </div>
return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-32">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI Powered Interview Analyzer
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Upload your resume and job description to generate an
            AI powered interview report including match score,
            skill gaps, technical questions and preparation plan.
          </p>

          <Link
            to="/interview"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Generate Interview Report
          </Link>

        </div>
      </section>

      {/* FEATURES SECTION */}

      <section className="py-24 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-16">
            Powerful AI Features
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {/* CARD 1 */}

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-xl transition">

              <FaFileAlt className="text-4xl text-blue-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Resume Analysis
              </h3>

              <p className="text-gray-600">
                AI scans your resume and compares it with the job
                description to determine how well you match the role.
              </p>

            </div>

            {/* CARD 2 */}

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-xl transition">

              <FaRobot className="text-4xl text-purple-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                AI Interview Questions
              </h3>

              <p className="text-gray-600">
                Automatically generate technical and behavioral
                interview questions tailored to your profile.
              </p>

            </div>

            {/* CARD 3 */}

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-xl transition">

              <FaLightbulb className="text-4xl text-yellow-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Preparation Plan
              </h3>

              <p className="text-gray-600">
                Get a step-by-step preparation roadmap to improve
                your chances of clearing the interview.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CALL TO ACTION */}

      <section className="py-24 bg-gray-100 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Ready to improve your interview performance?
        </h2>

        <Link
          to="/interview"
          className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
        >
          Start Now
        </Link>

      </section>

      {/* FOOTER */}

      <footer className="bg-black text-white py-10 text-center">

        <h3 className="text-lg font-semibold mb-2">
          SkillScan AI
        </h3>

        <p className="text-gray-400 mb-2">
          Built with AI to help developers succeed in interviews
        </p>

        <p className="text-gray-500 text-sm">
          © 2026 SkillScan AI • All rights reserved
        </p>

      </footer>

    </div>
  );
};

export default Home;


// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Home = () => {
//   const [jobDescription, setJobDescription] = useState("");
//   const [selfDescription, setSelfDescription] = useState("");
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume) {
//       toast.error("Please upload resume 📄");
//       return;
//     }

//     if (!jobDescription || !selfDescription) {
//       toast.warning("Please fill all fields ⚠️");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("jobDescription", jobDescription);
//     formData.append("selfDescription", selfDescription);
//     formData.append("resume", resume);

//     try {
//       setLoading(true);

//       toast.info("🤖 AI is generating your interview report...");

//       // Example API call
//       // await axios.post("/api/interview", formData)

//       setTimeout(() => {
//         setLoading(false);
//         toast.success(" Interview Report Generated Successfully!");
//       }, 3000);
//     } catch (error) {
//       setLoading(false);
//       toast.error("Something went wrong");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center">
//           SkillScan AI Interview Report
//         </h1>

//         {/* Job Description */}
//         <div>
//           <label className="font-semibold">Job Description</label>
//           <textarea
//             className="w-full mt-2 border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Paste Job Description..."
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//           />
//         </div>

//         {/* Resume Upload */}
//         <div>
//           <label className="font-semibold">Upload Resume</label>

//           <div className="border-2 border-dashed rounded-lg p-6 text-center mt-2">
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={(e) => setResume(e.target.files[0])}
//               className="mb-2"
//             />

//             {resume && (
//               <p className="text-green-600 text-sm">
//                 Uploaded: {resume.name}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Self Description */}
//         <div>
//           <label className="font-semibold">Self Description</label>
//           <textarea
//             className="w-full mt-2 border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Tell something about yourself..."
//             value={selfDescription}
//             onChange={(e) => setSelfDescription(e.target.value)}
//           />
//         </div>

//         {/* AI Loading */}
//         {loading && (
//           <div className="text-center text-blue-600 font-medium">
//             🤖 AI is analyzing your resume , job description and self description...
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 rounded-lg text-white font-semibold transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Generating Report..." : "Generate Interview Report"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Home;
