import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCodingQuestion(difficulty) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Use the latest supported model
    const prompt = `Generate a ${difficulty} level coding question along with its solution.`;

    const result = await model.generateContent([prompt]); // Pass prompt as an array
    const response = await result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate coding question.");
  }
}

export async function generateBehavioralQuestion() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Ensure correct model
    const prompt = "Generate a behavioral interview question.";

    const result = await model.generateContent([prompt]); // Pass prompt as an array
    const response = await result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate behavioral question.");
  }
}