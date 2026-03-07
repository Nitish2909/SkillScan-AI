import React, { useContext, useEffect } from "react";
import {useParams} from "react-router";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReport,
  generateResumePdf,
} from "../services/interviewApi";
import { InterviewContext } from "../interviewContext";
import { toast } from "react-toastify";

const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    toast.error("useInterview must be used within an interviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.data);
      
    return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };

  const getReportById = async (interviewId) => {
    setLoading(true);

    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
       return response.interviewReport;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
   
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReport();
      setReports(response.interviewReports);
        return response.interviewReports;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    try {
      const response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("Download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(interviewId){
        getReportById(interviewId)
    }
else{
    getReports();
}
  },[interviewId])

  return {loading,report,reports,generateReport,getReportById,getReports,getResumePdf}
};

export default useInterview;
