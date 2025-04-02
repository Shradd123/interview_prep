import { generateBehavioralQuestion } from "../../utils/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const question = await generateBehavioralQuestion();
    res.json({ question });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate behavioral question." });
  }
}