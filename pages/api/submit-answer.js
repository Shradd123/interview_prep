import { supabase } from "../../utils/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer, category } = req.body;

  const { data, error } = await supabase
    .from("answers")
    .insert([{ question, answer, category }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Answer submitted successfully!", data }); // ✅ Fixing "dat" to "data"
}
