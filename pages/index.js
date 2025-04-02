import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [codingQuestion, setCodingQuestion] = useState("");
  const [behavioralQuestion, setBehavioralQuestion] = useState("");
  const [codingAnswer, setCodingAnswer] = useState("");
  const [behavioralAnswer, setBehavioralAnswer] = useState("");
  const [message, setMessage] = useState("");

  const fetchCodingQuestion = async () => {
    const response = await fetch("/api/coding-questions", {
      method: "POST",
      body: JSON.stringify({ difficulty: "easy" }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setCodingQuestion(data.question);
  };

  const fetchBehavioralQuestion = async () => {
    const response = await fetch("/api/behavioral-questions", {
      method: "POST",
    });
    const data = await response.json();
    setBehavioralQuestion(data.question);
  };

  const submitAnswer = async (category, question, answer) => {
    if (!answer) {
      setMessage("Answer cannot be empty");
      return;
    }
    const { error } = await supabase.from("answers").insert([
      { category, question, answer },
    ]);
    if (error) {
      setMessage("Failed to submit. Try again!");
    } else {
      setMessage("Answer submitted successfully!");
    }
  };

  useEffect(() => {
    fetchCodingQuestion();
    fetchBehavioralQuestion();
  }, []);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <a href="/" style={styles.navLink}>Home</a>
        <a href="/coding-test" style={styles.navLink}>Coding Test</a>
        <a href="/behavioral" style={styles.navLink}>Behavioral</a>
        <a href="/admin" style={styles.navLink}>Admin</a>
      </nav>

      <h1 style={styles.title}>Interview Prep</h1>

      {/* Coding Question Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Coding Question</h2>
        <p style={styles.questionText}>{codingQuestion || "Loading..."}</p>
        <textarea
          style={styles.textarea}
          placeholder="Write your answer here..."
          value={codingAnswer}
          onChange={(e) => setCodingAnswer(e.target.value)}
        ></textarea>
        <button
          style={styles.button}
          onClick={() => submitAnswer("coding", codingQuestion, codingAnswer)}
        >
          Submit Answer
        </button>
      </div>

      {/* Behavioral Question Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Behavioral Question</h2>
        <p style={styles.questionText}>{behavioralQuestion || "Loading..."}</p>
        <textarea
          style={styles.textarea}
          placeholder="Write your answer here..."
          value={behavioralAnswer}
          onChange={(e) => setBehavioralAnswer(e.target.value)}
        ></textarea>
        <button
          style={styles.button}
          onClick={() => submitAnswer("behavioral", behavioralQuestion, behavioralAnswer)}
        >
          Submit Answer
        </button>
      </div>

      {/* Message Box */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Inline CSS Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  navbar: {
    background: "#0070f3",
    width: "100%",
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    color: "white",
    fontWeight: "bold",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "0.3s",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    color: "#333",
  },
  section: {
    marginTop: "20px",
    width: "90%",
    maxWidth: "600px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#0070f3",
    marginBottom: "10px",
  },
  questionText: {
    fontSize: "18px",
    color: "#444",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    resize: "none",
    transition: "0.3s",
    fontSize: "16px",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "12px",
    background: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "10px",
  },
  buttonHover: {
    background: "#005bb5",
  },
  message: {
    textAlign: "center",
    fontSize: "16px",
    padding: "10px",
    color: "green",
    marginTop: "10px",
    fontWeight: "bold",
  },
};
