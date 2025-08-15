require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const formsRoute = require("./routes/forms");
const responsesRoute = require("./routes/responses");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true }));

// Routes
app.use("/forms", formsRoute);
app.use("/responses", responsesRoute);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
