"use client";
import { useState } from "react";
import CategorizeEditor from "@/components/CategorizeEditor";
import ClozeEditor from "@/components/ClozeEditor";
import ComprehensionEditor from "@/components/ComprehensionEditor";

export default function FormBuilder() {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);

  function addQuestion(type: string) {
    const base = { id: Date.now().toString(), type, data: {} };
    if (type === "categorize") base.data = { categories: ["Category 1"], items: [] };
    if (type === "cloze") base.data = { text: "Click words to toggle blanks", blanks: [] };
    if (type === "comprehension") base.data = { paragraph: "", mcqs: [] };
    setQuestions((s) => [...s, base]);
  }

  function updateQuestion(id: string, newData: any) {
    setQuestions((s) => s.map((q) => (q.id === id ? { ...q, data: newData } : q)));
  }

  async function saveForm() {
    const payload = { title, headerImage, questions };
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Form saved. ID: " + data._id + "\nPreview: /preview/" + data._id);
    } else {
      alert("Error: " + (data.error || "unknown"));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Form Title Section */}
        <div className="p-8 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700">
          <label className="block mb-2 mt-4 font-semibold text-lime-300 text-2xl">Form Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your form title"
            className="w-full p-3 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <label className="block mt-4 mb-2 font-semibold text-lime-300 text-2xl">Header Image URL (optional)</label>
          <input
            value={headerImage}
            onChange={(e) => setHeaderImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Question Buttons */}
        <div className="p-6 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 flex flex-wrap gap-3">
          <button
            onClick={() => addQuestion("categorize")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium shadow-md transition"
          >
            + Add Categorize
          </button>
          <button
            onClick={() => addQuestion("cloze")}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium shadow-md transition"
          >
            + Add Cloze
          </button>
          <button
            onClick={() => addQuestion("comprehension")}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium shadow-md transition"
          >
            + Add Comprehension
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-6 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-lime-300">{q.type.toUpperCase()}</h3>
                <button
                  onClick={() => setQuestions((s) => s.filter((x) => x.id !== q.id))}
                  className="text-red-400 hover:text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>

              {q.type === "categorize" && (
                <CategorizeEditor data={q.data} onChange={(d: any) => updateQuestion(q.id, d)} />
              )}
              {q.type === "cloze" && (
                <ClozeEditor data={q.data} onChange={(d: any) => updateQuestion(q.id, d)} />
              )}
              {q.type === "comprehension" && (
                <ComprehensionEditor data={q.data} onChange={(d: any) => updateQuestion(q.id, d)} />
              )}
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveForm}
            className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg shadow-lg transition"
          >
            💾 Save Form
          </button>
        </div>
      </div>
    </div>
  );
}
