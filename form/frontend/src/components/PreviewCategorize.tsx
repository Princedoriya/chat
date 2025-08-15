"use client";
import { useState } from "react";

export default function PreviewCategorize({ data, index }: any) {
  const { categories = [], items = [] } = data;
  const [sel, setSel] = useState(items.map((it:any)=> it.correctCategory || categories[0] || ""));

  return (
    <div>
      <h3 className="font-medium mb-2">Categorize</h3>
      <div data-qtype={`categorize-${index}`} className="space-y-2">
        {items.map((it:any, i:number) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-40 p-2 border rounded bg-white">{it.text}</div>
            <select value={sel[i]} onChange={(e)=> { const s = [...sel]; s[i] = e.target.value; setSel(s); }} className="p-1 border rounded">
              {categories.map((c:string,ci:number)=> <option key={ci} value={c}>{c}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
