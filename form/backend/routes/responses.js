const express = require("express");
const router = express.Router();
const ResponseModel = require("../models/Response");

// Save a response
router.post("/", async (req, res) => {
  try {
    const { formId, answers } = req.body || {};
    if (!formId) return res.status(400).json({ error: "formId is required" });
    if (!answers || typeof answers !== "object")
      return res.status(400).json({ error: "answers object is required" });

    const resp = new ResponseModel({ formId, answers });
    await resp.save();
    res.status(201).json(resp);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all responses of a form
router.get("/form/:formId", async (req, res) => {
  const list = await ResponseModel.find({ formId: req.params.formId }).sort({
    createdAt: -1,
  });
  res.json(list);
});

module.exports = router;
