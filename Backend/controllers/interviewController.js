import pdfParse from "pdf-parse";
import {
  generateInterviewReport,
  generateResumePdf,
} from "../services/aiService.js";
import interviewReportModal from "../models/interviewReport.model.js";

/**
 * @name generateInterviewReportController
 * @description  generate interview report based on user self description,resume,job description.
 * @route POST /api/interview/
 * @access
 **/
// Controller to generate interview report using uploaded resume + AI
const generateInterviewReportController = async (req, res) => {
  try {
    // 1.) Validate File Upload
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF file is required",
      });
    }
    // 2.) Extract text from PDF
    const parsed = await pdfParse(req.file.buffer);
    const resumeContent = parsed.text?.trim();

    if (!resumeContent) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from resume",
      });
    }
    // 3.) Get Additional Fields
    const { selfDescription, jobDescription } = req.body;
    if (!selfDescription?.trim() || !jobDescription?.trim()) {
      return res.status(400).json({
        success: false,
        message: "selfDescription and jobDescription are required",
      });
    }

    // 4.) Generate AI report
    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    // 5.) Save in DB
    const interviewReport = await interviewReportModal.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      success: true,
      message: "Interview Report Generated Successfully",
      data: interviewReport,
    });
  } catch (error) {
    console.error("Interview Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate interview report",
    });
  }
};

/**
 * @name generateInterviewByIdController
 * @description Controller to get interview report by interviewId.
 * @route GET /api/interview/:interviewId
 */

const generateInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModal.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview Report Not Found",
    });
  }

  res.status(200).json({
    message: "Interview Report Fetched Successfully ",
    interviewReport,
  });
};

/**
 * @name generateInterviewByIdController
 * @description Controller to get all interview reports of logged in user.
 * @route GET /api/interview/:interviewId
 */

const getAllInterviewReportController = async (req, res) => {
  const interviewReports = (
    await interviewReportModal.find({ user: req.user.id })
  )
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview Reports Fetched Successfully.",
    interviewReports,
  });
};

/**
 * @name generateResumePdfController
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 * @route
 */

const generateResumePdfController = async (req, res) => {
  const { interviewReportId } = req.params;

  const interviewReport =
    await interviewReportModal.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview Report Not Found",
    });
  }
  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });
  res.send(pdfBuffer);
};

export {
  generateInterviewReportController,
  generateInterviewReportByIdController,
  getAllInterviewReportController,
  generateResumePdfController,
};
