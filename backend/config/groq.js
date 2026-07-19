import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

// Single shared Groq client instance used across the backend.
// The API key never leaves the server (never exposed to frontend).
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const TEXT_MODEL = process.env.GROQ_TEXT_MODEL || "llama-3.3-70b-versatile";
export const VISION_MODEL = process.env.GROQ_VISION_MODEL || "llama-3.2-90b-vision-preview";

export default groq;
