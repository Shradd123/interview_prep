import { generateCodingQuestion } from "../../utils/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { difficulty } = req.body;

  try {
    const question = await generateCodingQuestion(difficulty);
    res.json({ question });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate question." });
  }
}