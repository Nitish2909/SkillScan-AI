import express from "express";

const router = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 **/
router.post("/");

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */

router.get("/report/:interviewId");

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
router.get("/",);
