import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../interview/components/Footer";
import Navbar from "../interview/components/Navbar";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white overflow-hidden">
<Navbar/>
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-600 blur-[150px] opacity-20 rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600 blur-[150px] opacity-20 rounded-full bottom-[-100px] right-[-100px]" />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
      >
        AI Powered{" "}
        <span className="text-pink-500">Interview Analyzer</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-2xl text-gray-300 text-lg mb-10"
      >
        Let our AI analyze your Resume, Job Description, and Profile to
        generate a personalized interview strategy with skill gap
        analysis, interview questions, and preparation roadmap.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link
          to="/register"
          className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-xl font-semibold transition shadow-lg"
        >
          Get Started 🚀
        </Link>
      </motion.div>

      {/* Floating Cards */}
      <div className="mt-20 grid md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 border border-gray-800 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">
            Resume Analysis
          </h3>
          <p className="text-gray-400 text-sm">
            AI scans your resume and evaluates your match with the job role.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 border border-gray-800 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">
            Skill Gap Detection
          </h3>
          <p className="text-gray-400 text-sm">
           This feature identifies missing skills that are required for the job but not present in the resume.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 border border-gray-800 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">
            Interview Questions
          </h3>
          <p className="text-gray-400 text-sm">
            Get personalized technical and HR interview questions.
          </p>
        </motion.div>

         <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 border border-gray-800 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">
           Job Description Matching
          </h3>
          <p className="text-gray-400 text-sm">
           SkillScan AI compares the user's resume with the job description to measure how well the candidate fits the role.
          </p>
        </motion.div>

         <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 border border-gray-800 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">
           Interview Preparation Strategy
          </h3>
          <p className="text-gray-400 text-sm">
            SkillScan AI creates a step-by-step strategy to help the candidate prepare for the interview.
          </p>
        </motion.div>

         <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 border border-gray-800 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">
           AI Generated Interview Report
          </h3>
          <p className="text-gray-400 text-sm">
           After analysis, SkillScan AI generates a detailed report about the candidate’s readiness.
          </p>
        </motion.div>

      </div>
<Footer/>
    </section>
  );
};

export default HeroSection;
