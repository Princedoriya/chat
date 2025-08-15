"use client";
import { useState } from "react";

export default function PreviewCloze({ data, index }: any) {
  
  const words = (data.text || "").split(/\s+/);
  const blankIndices = (data.blanks || []).map((b:any, i:number) => b ? i : null).filter((x:any)=> x!==null);

  const [inputs, setInputs] = useState<string[]>(words.map(()=> ""));

  return (
    <div>
      <h3 className="font-medium mb-2">Cloze</h3>
      <div data-qtype={`cloze-${index}`} className="flex flex-wrap gap-2">
        {words.map((w:string,i:number) => {
          const isBlank = data.blanks && data.blanks[i] !== null && data.blanks[i] !== undefined && data.blanks[i] !== "";
          return isBlank ? (
            <input key={i} placeholder="..." value={inputs[i]} onChange={(e)=> { const cp = [...inputs]; cp[i] = e.target.value; setInputs(cp); }} className="p-1 border rounded w-28" />
          ) : (
            <span key={i} className="p-1">{w}</span>
          );
        })}
      </div>
    </div>
  );
}
