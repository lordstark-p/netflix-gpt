import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINIAI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINIAI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;
