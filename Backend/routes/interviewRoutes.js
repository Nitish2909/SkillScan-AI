import express from "express";
import authUser from "../middlewares/authMiddleware.js";
import {
  generateInterviewReportController,
  generateInterviewReportByIdController,
  getAllInterviewReportController,
  generateResumePdfController,
} from "../controllers/interviewController.js";
import upload from "../middlewares/fileMiddleware.js";

const router = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 **/
router.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterviewReportController,
);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */

router.get(
  "/report/:interviewId",
  authUser,
  generateInterviewReportByIdController,
);

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
router.get("/", authUser, getAllInterviewReportController);

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */

router.get(
  "/resume/pdf/:interviewReportId",
  authUser,
  generateResumePdfController,
);

export default router;
