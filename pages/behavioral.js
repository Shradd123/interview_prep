import { useState, useEffect } from "react";
import BehavioralQuestions from "@/components/BehaviorQuestions"; // ✅ Uses absolute path


export default function BehavioralTestPage() {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    async function fetchQuestion() {
      const res = await fetch("/api/behavioral-questions", { method: "POST" });
      const data = await res.json();
      setQuestion(data.question);
    }

    fetchQuestion();
  }, []);
return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Behavioral Questions</h1>
      {question ? <BehavioralQuestions question={question} /> : <p>Loading...</p>}
    </div>
  );
}
