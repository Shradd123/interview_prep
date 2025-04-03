import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase"; // ✅ Uses absolute path

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchSubmissions() {
      const { data, error } = await supabase.from("answers").select("*");
      if (error) console.error("Error fetching submissions:", error);
      else setSubmissions(data);
    }

    fetchSubmissions();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {submissions.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Category</th>
              <th className="border p-2">Question</th>
              <th className="border p-2">Answer</th>
              <th className="border p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((entry) => (
              <tr key={entry.id} className="border">
                <td className="p-2">{entry.category}</td>
                <td className="p-2">{entry.question}</td>
                <td className="p-2">{entry.answer}</td>
                <td className="p-2">{new Date(entry.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No submissions yet.</p>
      )}
    </div>
  );
}
