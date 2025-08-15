const mongoose = require("mongoose");


const QuestionSchema = new mongoose.Schema(
  {
    id: String, 
    type: { type: String, required: true, enum: ["categorize", "cloze", "comprehension"] },
    data: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

const FormSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Untitled Form" },
    headerImage: { type: String, default: "" }, 
    questions: { type: [QuestionSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Form || mongoose.model("Form", FormSchema);
