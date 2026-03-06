// import { GoogleGenAI } from "@google/genai";
import OpenAi from "openai"
import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import puppeteer from "puppeteer";
import { config } from "dotenv";
config();

// Initialize Gemini AI with API key from .env file
// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_GENAI_API_KEY,
// });

const ai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.chatanywhere.tech/v1",
});

// Define the structure of Interview Report using Zod
// This forces AI to return structured JSON
const interviewReportSchema = z.object({
  // Match score between candidate and job
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  // List of technical questions
  technicalQuestions: z.array(z.object({
        question: z.string().min(1).describe("The technical question asked in interview"),
        intention: z.string().min(1).describe("The intention behind the question asked by interviewer"),
        answer: z.string().min(1).describe("Answer the quesstion that is asked in the interview"),
      }),
    ).min(3).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
  // List of behavioral questions
  behavioralQuestions: z.array(z.object({
        question: z.string().min(1).describe("The behavioral questions asked in interview"),
        intention: z.string().min(1).describe("The intention the interviewer behind asking tis question"),
        answer: z.string().min(1).describe("How to answer this question, what points to cover, what approach to take etc."),
      }),
    ).min(3).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
  // Skill gaps in candidate profile

  skillGaps: z
    .array(
      z.object({
        skill: z.string().min(1).describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  // Preparation plan day-wise
  preparationPlan: z.array(z.object({day: z.number().describe("The day number in the preparation plan, starting from 1"),
    focus: z.string().describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),

  // Job title
  title: z.string().describe( "The title of the job for which the interview report is generated"),
});

// =======================================
// FUNCTION 1: Generate Interview Report
// =======================================

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                Return ONLY valid JSON.

Follow this JSON schema strictly:
${JSON.stringify(zodToJsonSchema(interviewReportSchema), null, 2)}

Rules:
- Do not add explanations
- Do not add markdown
- Do not wrap in \`\`\`
- Every field must follow the schema
- matchScore must be between 0 and 100
`;

  // const response = await ai.models.generateContent({
  //   // model: "gemini-3-flash-preview",
  //   model: 'gemini-2.5-flash-lite',
  //   contents: prompt,
  //   config: {
  //     responseMimeType: "application/json",
  //     responseSchema: zodToJsonSchema(interviewReportSchema),
  //   },
  // });

  // return JSON.parse(response.text);

   const response = await ai.chat.completions.create({
      // model: "gpt-3.5-turbo"
     model: "gpt-5-mini",
      messages: [{ role: "system", content: prompt }],
      response_format: { type: "json_object" },
    });
    let rawText = response.choices[0].message.content;
     const parsed = JSON.parse(rawText);
     return parsed
    console.log(rawText);

};

// ===============================
// FUNCTION 2: Convert HTML -> PDF
// ===============================

const generatePdfFromHtml = async (htmlContent) => {
  // Launch headless Chrome browser
  const browser = await puppeteer.launch();

  // Open new page
  const page = await browser.newPage();

  // Load HTML content inside browser
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Generate PDF from loaded page
  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  // Close browser to free memory
  await browser.close();

  // Return PDF as buffer
  return pdfBuffer;
};

// ===============================
// FUNCTION 3: Generate Resume PDF
// ===============================

const generateResumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  // Schema for resume response (must contain HTML)
  const resumePdfSchema = z.object({
    html: z
      .string()()
      .describe("HTML content of resume which will be converted to PDF"),
  });
  // Detailed prompt for resume generation
  const prompt = `
    Generate resume for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}

    The response should be a JSON object with a single field "html".
    The resume should:
    - Be tailored to job description
    - Highlight strengths
    - Be ATS friendly
    - Be professional and simple
    - Not sound AI generated
    - Be 1-2 pages long
  `;
  // Call Gemini AI to generate HTML resume
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  // Parse AI JSON response
  const jsonContent = JSON.parse(response.text);

  // Convert generated HTML to PDF
  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  // Return PDF file buffer
  return pdfBuffer;
};

// Export functions for use in routes/controllers

export { generateInterviewReport, generateResumePdf };
