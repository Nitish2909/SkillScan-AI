import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import useInterview from "../hooks/useInterview";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

/* ---------------- Question Card ---------------- */

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0b1220] border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 md:p-5 text-left hover:bg-gray-900 transition"
      >
        <div className="flex gap-3 md:gap-4 items-start">
          <span className="text-green-500 font-semibold">Q{index + 1}</span>
          <p className="text-gray-200 text-sm md:text-base">{item.question}</p>
        </div>

        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-4 md:px-5 pb-5 text-gray-400 text-sm space-y-4">
          <div>
            <span className="text-blue-400 text-xs font-semibold">
              Intention
            </span>
            <p>{item.intention}</p>
          </div>

          <div>
            <span className="text-green-400 text-xs font-semibold">
              Model Answer
            </span>
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Roadmap Card ---------------- */

const RoadMapDay = ({ day }) => {
  return (
    <div className="bg-[#0b1220] border border-gray-800 rounded-xl p-4 md:p-5">
      <div className="flex items-center gap-4 mb-3">
        <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-xs">
          Day {day.day}
        </span>

        <h3 className="text-white font-semibold">{day.focus}</h3>
      </div>

      <ul className="space-y-2 text-gray-400 text-sm">
        {day.tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full mt-2"></span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------------- Main Page ---------------- */

const InterviewReport = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const [search, setSearch] = useState("");

  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { handleLogout } = useAuth();

  const handleLogoutbtn = () => {
    handleLogout();
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading) {
    return (
      <h1 className="flex items-center justify-center min-h-screen text-white">
        Loading your interview plan...
      </h1>
    );
  }

  if (!report) {
    return (
      <main className="flex items-center justify-center min-h-screen text-white">
        No interview report found.
      </main>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "border-green-500 text-green-400"
      : report.matchScore >= 60
        ? "border-yellow-500 text-yellow-400"
        : "border-red-500 text-red-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white lg:grid lg:grid-cols-[250px_1fr_300px]">
      {/* LEFT NAV */}

      <aside className="border-b lg:border-b-0 lg:border-r border-gray-800 p-4 md:p-6">
        <p className="text-gray-400 text-sm mb-4 uppercase">Sections</p>

        <div className="flex lg:flex-col gap-2 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeNav === item.id
                  ? "bg-pink-600/20 text-orange-400"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => getResumePdf(interviewId)}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 "
        >
          Download Resume
        </button>

        <div className="flex items-center mt-10 space-x-4">
          <button
            onClick={handleLogoutbtn}
            className="px-5 py-2  w-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>

        <div className="flex items-center mt-10 space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center justify-center px-6 py-2 w-full md:w-auto text-sm font-medium 
             text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-sm 
             transition transform hover:-translate-y-1 hover:shadow-md duration-200"
          >
            <span className="mr-2">←</span>
            Back
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="p-4 md:p-8 overflow-y-auto">
        {(activeNav === "technical" || activeNav === "behavioral") && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0b1220] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
          </div>
        )}

        {activeNav === "technical" && (
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Technical Questions
            </h2>

            <div className="space-y-4">
              {report.technicalQuestions
                .filter((q) =>
                  q.question.toLowerCase().includes(search.toLowerCase()),
                )
                .map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
            </div>
          </section>
        )}

        {activeNav === "behavioral" && (
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Behavioral Questions
            </h2>

            <div className="space-y-4">
              {report.behavioralQuestions
                .filter((q) =>
                  q.question.toLowerCase().includes(search.toLowerCase()),
                )
                .map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
            </div>
          </section>
        )}

        {activeNav === "roadmap" && (
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Preparation Road Map
            </h2>

            <div className="space-y-4">
              {report.preparationPlan.map((day) => (
                <RoadMapDay key={day.day} day={day} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* RIGHT SIDEBAR */}

      <aside className="border-t lg:border-t-0 lg:border-l border-gray-800 p-6">
        <div className="mb-10 text-center">
          <p className="text-gray-400 text-sm mb-4">MATCH SCORE</p>

          <div
            className={`w-34 h-32 mx-auto rounded-full border-[8px] flex items-center justify-center text-2xl font-bold ${scoreColor}`}
          >
            {report.matchScore}%{/* Small label below the circle */}
            <p className="mt-2 text-xs text-gray-300 font-medium">
              {report.matchScore >= 75
                ? "Strong Match"
                : report.matchScore >= 50
                  ? "Moderate Match"
                  : "Needs Improvement"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-4">SKILL GAPS</p>

          <div className="flex flex-wrap gap-2">
            {report.skillGaps.map((gap, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-lg text-xs ${
                  gap.severity === "high"
                    ? "bg-red-500/20 text-red-400"
                    : gap.severity === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {gap.skill}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default InterviewReport;
