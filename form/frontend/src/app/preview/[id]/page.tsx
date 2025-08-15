import PreviewCategorize from "@/components/PreviewCategorize";
import PreviewCloze from "@/components/PreviewCloze";
import PreviewComprehension from "@/components/PreviewComprehension";

export default async function Page({ params }: any) {
  const id = params.id;
  
  const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/forms/" + id);
  const form = await res.json();

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">{form.title || "Untitled Form"}</h1>
      {form.headerImage && <img src={form.headerImage} alt="Header" className="w-full h-48 object-cover rounded mb-4" />}
      <FormRenderer form={form} />
    </main>
  );
}

function FormRenderer({ form }: any) {
  return (
    <div className="space-y-6">
      {form.questions.map((q:any, idx:number) => (
        <div key={q._id || q.id} className="p-4 bg-white rounded shadow">
          {q.type === "categorize" && <PreviewCategorize data={q.data} index={idx} />}
          {q.type === "cloze" && <PreviewCloze data={q.data} index={idx} />}
          {q.type === "comprehension" && <PreviewComprehension data={q.data} index={idx} />}
        </div>
      ))}
      <SubmitSection formId={form._id} questions={form.questions} />
    </div>
  );
}

function SubmitSection({ formId, questions }: any) {
  async function handleSubmit(e: any) {
    e.preventDefault();
    // collect answers from DOM
    const answers:any = {};
    questions.forEach((q:any, i:number) => {
      if (q.type === "categorize") {
        
        const nodes = document.querySelectorAll(`[data-qtype="categorize-${i}"] select`);
        const arr:any[] = [];
        nodes.forEach((n:any)=> arr.push(n.value));
        answers[q.id || q._id || i] = arr;
      }
      if (q.type === "cloze") {
        const inputs = document.querySelectorAll(`[data-qtype="cloze-${i}"] input`);
        answers[q.id || q._id || i] = Array.from(inputs).map((inp:any)=> inp.value);
      }
      if (q.type === "comprehension") {
        const chosen:any[] = [];
        const nodes = document.querySelectorAll(`[data-qtype="comprehension-${i}"] input[type="radio"]:checked`);
        nodes.forEach((n:any)=> chosen.push(n.value));
        answers[q.id || q._id || i] = chosen;
      }
    });

    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/responses", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ formId, answers })
    });
    if (res.ok) alert("Submitted");
    else alert("Error saving response");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
      <button className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
    </form>
  );
}
