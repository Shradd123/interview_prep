import { useState } from "react";

export default function CodingTest({ question }) {
  const [answer, setAnswer] = useState("");

  const submitAnswer = async () => {
    const res = await fetch("/api/submit-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, category: "coding" }),
    });

    if (res.ok) {
      alert("Answer submitted successfully!");
      setAnswer(""); // Clear the input after submission
    } else {
      alert("Error submitting answer.");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">{question}</h3>
      <textarea
        className="w-full border p-2 mt-2 rounded"
        rows="3"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={submitAnswer}
      >
        Submit Answer
      </button>
    </div>
  );
}