const express = require("express");
const router = express.Router();
const Form = require("../models/Form");


function validateFormPayload(body) {
  if (!body || typeof body !== "object") return "Invalid payload";
  if (!Array.isArray(body.questions)) return "questions must be an array";
  for (const q of body.questions) {
    if (!q.type) return "Each question needs a type";
    if (!q.data) return "Each question needs data";
  }
  return null;
}

// Create form
router.post("/", async (req, res) => {
  try {
    const err = validateFormPayload(req.body);
    if (err) return res.status(400).json({ error: err });

    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get form by id
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: "Form not found" });
    res.json(form);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


router.get("/", async (_req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 });
  res.json(forms);
});

module.exports = router;
