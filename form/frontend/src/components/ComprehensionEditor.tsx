"use client";
import { useState } from "react";

export default function ComprehensionEditor({ data, onChange }: any) {
  const [paragraph, setParagraph] = useState(data.paragraph || "");
  const [mcqs, setMcqs] = useState(data.mcqs || []);

  function addMcq() {
    const n = [
      ...mcqs,
      { q: "New question", options: ["A", "B", "C", "D"], correct: 0 },
    ];
    setMcqs(n);
    onChange({ paragraph, mcqs: n });
  }

  function updateMcq(i: number, obj: any) {
    const n = [...mcqs];
    n[i] = { ...n[i], ...obj };
    setMcqs(n);
    onChange({ paragraph, mcqs: n });
  }

  return (
    <div className="space-y-6">
      {/* Paragraph Input */}
      <div>
        <label className="block mb-2 font-semibold text-lime-400">Paragraph</label>
        <textarea
          value={paragraph}
          onChange={(e) => {
            setParagraph(e.target.value);
            onChange({ paragraph: e.target.value, mcqs });
          }}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          rows={4}
        ></textarea>
      </div>

      {/* MCQs Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <strong className="text-lg text-lime-400">MCQs</strong>
          <button
            onClick={addMcq}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            + Add MCQ
          </button>
        </div>

        <div className="space-y-4">
          {mcqs.map((m: any, i: number) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              {/* Question Input */}
              <input
                value={m.q}
                onChange={(e) => updateMcq(i, { q: e.target.value })}
                className="w-full text-gray-800 p-2 border rounded-lg mb-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter question"
              />

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-3">
                {m.options.map((opt: any, oi: number) => (
                  <div
                    key={oi}
                    className="flex items-center gap-2 p-2 bg-white border rounded-lg shadow-sm"
                  >
                    <input
                      value={opt}
                      onChange={(e) => {
                        const opts = [...m.options];
                        opts[oi] = e.target.value;
                        updateMcq(i, { options: opts });
                      }}
                      className="p-2 border text-gray-800 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                      placeholder={`Option ${oi + 1}`}
                    />
                    <label className="text-sm text-gray-600 whitespace-nowrap">
                      Correct
                    </label>
                    <input
                      type="radio"
                      checked={m.correct === oi}
                      onChange={() => updateMcq(i, { correct: oi })}
                      className="h-4 w-4 accent-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
