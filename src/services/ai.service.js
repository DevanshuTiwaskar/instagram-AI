import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/config.js";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text()
}

export { model }; 
export default generateContent;