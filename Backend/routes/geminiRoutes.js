const express = require("express");
const router = express.Router();
const { generateCricketInsight } = require("../services/geminiService");

router.post("/zero-shot", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const insight = await generateCricketInsight(prompt);
    res.json({ insight });
  } catch (error) {
    console.error("Error in zero-shot route:", error);
    res.status(500).json({ error: "Failed to generate cricket insight" });
  }
});

module.exports = router;
