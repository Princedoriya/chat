"use client";

export default function PreviewComprehension({ data, index }: any) {
  return (
    <div data-qtype={`comprehension-${index}`}>
      <h3 className="font-medium mb-2">Comprehension</h3>
      <p className="mb-3 p-2 bg-gray-50 rounded">{data.paragraph}</p>
      <div className="space-y-3">
        {data.mcqs?.map((m:any, i:number) => (
          <div key={i} className="p-2 border rounded">
            <div className="mb-2">{m.q}</div>
            <div className="grid grid-cols-2 gap-2">
              {m.options.map((opt:any, oi:number) => (
                <label key={oi} className="flex items-center gap-2 p-1 border rounded">
                  <input type="radio" name={`comp-${index}-${i}`} value={oi} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
