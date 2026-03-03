import Groq from "groq-sdk";
import z from "zod";
import ZodToJsonSchema from "zod-to-json-schema";
import puppeteer from "puppeteer";



const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const interviewReportSchema = z.object({
    
})