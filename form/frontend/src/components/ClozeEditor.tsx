"use client";
import { useEffect, useState } from "react";

export default function ClozeEditor({ data, onChange }: any) {
  const [words, setWords] = useState<{ text: string; isBlank?: boolean }[]>([]);

  useEffect(() => {
    const t = data.text || "Click words to toggle blanks";
    const arr = t.split(/\s+/).map((w: any) => ({ text: w }));
    setWords(arr);
  }, []);

  function toggleWord(i: number) {
    const cp = [...words];
    cp[i].isBlank = !cp[i].isBlank;
    setWords(cp);
    onChange({
      text: cp.map((w) => w.text).join(" "),
      blanks: cp.map((w) => (w.isBlank ? w.text : null)),
    });
  }

  function setRawText(e: any) {
    const t = e.target.value;
    const arr = t.split(/\s+/).map((w: any) => ({ text: w }));
    setWords(arr);
    onChange({ text: t, blanks: arr.map(() => null) });
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-xl">
      {/* Input for raw text */}
      <div>
        <label className="block mb-2 font-semibold text-lime-400">
          Cloze Text{" "}
          <span className="text-sm text-gray-300">
            (click words to make blanks)
          </span>
        </label>
        <textarea
          value={words.map((w) => w.text).join(" ")}
          onChange={setRawText}
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none shadow-lg transition"
          rows={3}
          placeholder="Type or paste your text here..."
        />
      </div>

      {/* Editor preview */}
      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <div className="mb-4 font-medium text-lime-400">
          Editor Preview — click to toggle blank
        </div>
        <div className="flex flex-wrap gap-2">
          {words.map((w, i) => (
            <button
              key={i}
              onClick={() => toggleWord(i)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium shadow-sm transition-all duration-150 ${
                w.isBlank
                  ? "bg-yellow-400 border-yellow-500 text-black hover:bg-yellow-300 hover:border-yellow-400"
                  : "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              }`}
            >
              {w.isBlank ? "____" : w.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
