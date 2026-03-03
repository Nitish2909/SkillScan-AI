import pdfParse from "pdf-parse";
import interviewReportModal from "../models/interviewReport.model.js";

/**
 * @name generateInterviewReportController
 * @description  generate interview report based on user self description,resume,job description.
 * @route POST /api/interview/
 * @access Public
 **/
// Controller to generate interview report using uploaded resume + AI
const generateInterviewReportController = async (req, res) => {
  // Extract text from uploaded PDF resume
  // req.file.buffer comes from Multer (memoryStorage)
  // Convert buffer → Uint8Array → Parse PDF → Extract text
  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();

  // Extract additional fields sent from frontend
  // selfDescription → Candidate's self summary
  // jobDescription → Job details
  const { selfDescription, jobDescription } = req.body;

  const interViewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  // Save the generated report into MongoDB
  // req.user.id comes from authentication middleware (JWT decoded user)
  // Spread operator (...) inserts all AI-generated fields into document
  const interviewReport = await interviewReportModal.create({
    user: req.user.id, // Reference to logged-in user
    resume: resumeContent.text, // Store extracted resume text
    selfDescription,
    jobDescription,
    ...interViewReportByAi, // AI-generated data (matchScore, questions, etc.)
  });
};

//Send success response to client
res.status(201).json({
  message: "Interview Report Generated Successfully",
  interviewReport,
});

/**
 * @description Controller to get interview report by interviewId.
 */

export {generateInterviewReportController,}
