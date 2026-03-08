import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://skillscan-ai-gacu.onrender.com/api",

  withCredentials: true,
});

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
    console.log(resumeFile);
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  console.log(formData)
  const response = await axiosInstance.post("/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await axiosInstance.get(`/interview/report/${interviewId}`);

  return response.data;
};

/**
 * @description Service to get all interview reports of logged in user.
 */

export const getAllInterviewReport = async () => {
  const response = await axiosInstance.get("/interview/");
  return response.data;
};

/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  const response = await axiosInstance.get(
    `/interview/resume/pdf/${interviewReportId}`,
    null,
    {
      responseType: "blob",
    },
  );

  return new Blob([response.data]);
};
