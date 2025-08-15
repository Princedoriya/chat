const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
    
    answers: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Response || mongoose.model("Response", ResponseSchema);
