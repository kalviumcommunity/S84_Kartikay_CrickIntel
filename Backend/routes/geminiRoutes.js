const express = require("express");
const router = express.Router();
const { 
  generateCricketInsight,
  generateCricketInsightOneShot,
  generateCricketInsightMultiShot,
  generateCricketInsightWithFunctionCalling,
  generateStructuredCricketInsight,
  generateDynamicCricketInsight
} = require("../services/geminiService");

// Zero-shot prompting route (existing)
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

// One-shot prompting route
router.post("/one-shot", async (req, res) => {
  try {
    const { prompt, temperature, topK, topP } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const customParams = { temperature, topK, topP };
    const insight = await generateCricketInsightOneShot(prompt, customParams);
    res.json({ insight });
  } catch (error) {
    console.error("Error in one-shot route:", error);
    res.status(500).json({ error: "Failed to generate one-shot cricket insight" });
  }
});

// Multi-shot prompting route
router.post("/multi-shot", async (req, res) => {
  try {
    const { prompt, temperature, topK, topP } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const customParams = { temperature, topK, topP };
    const insight = await generateCricketInsightMultiShot(prompt, customParams);
    res.json({ insight });
  } catch (error) {
    console.error("Error in multi-shot route:", error);
    res.status(500).json({ error: "Failed to generate multi-shot cricket insight" });
  }
});

// Function calling route
router.post("/function-calling", async (req, res) => {
  try {
    const { prompt, temperature, topK, topP } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const customParams = { temperature, topK, topP };
    const insight = await generateCricketInsightWithFunctionCalling(prompt, customParams);
    res.json({ insight });
  } catch (error) {
    console.error("Error in function calling route:", error);
    res.status(500).json({ error: "Failed to generate function calling cricket insight" });
  }
});

// Structured output route
router.post("/structured", async (req, res) => {
  try {
    const { prompt, temperature, topK, topP } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const customParams = { temperature, topK, topP };
    const insight = await generateStructuredCricketInsight(prompt, customParams);
    res.json({ insight });
  } catch (error) {
    console.error("Error in structured output route:", error);
    res.status(500).json({ error: "Failed to generate structured cricket insight" });
  }
});

// Dynamic prompting route
router.post("/dynamic", async (req, res) => {
  try {
    const { prompt, context, temperature, topK, topP } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const customParams = { temperature, topK, topP };
    const insight = await generateDynamicCricketInsight(prompt, context, customParams);
    res.json({ insight });
  } catch (error) {
    console.error("Error in dynamic prompting route:", error);
    res.status(500).json({ error: "Failed to generate dynamic cricket insight" });
  }
});

// Advanced parameters route with all features
router.post("/advanced", async (req, res) => {
  try {
    const { 
      prompt, 
      method = "zero-shot", 
      context = {}, 
      temperature = 0.7, 
      topK = 40, 
      topP = 0.8 
    } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const customParams = { temperature, topK, topP };
    let insight;

    switch (method) {
      case "one-shot":
        insight = await generateCricketInsightOneShot(prompt, customParams);
        break;
      case "multi-shot":
        insight = await generateCricketInsightMultiShot(prompt, customParams);
        break;
      case "function-calling":
        insight = await generateCricketInsightWithFunctionCalling(prompt, customParams);
        break;
      case "structured":
        insight = await generateStructuredCricketInsight(prompt, customParams);
        break;
      case "dynamic":
        insight = await generateDynamicCricketInsight(prompt, context, customParams);
        break;
      default:
        insight = await generateCricketInsight(prompt);
    }

    res.json({ 
      insight, 
      method, 
      parameters: { temperature, topK, topP },
      context: method === "dynamic" ? context : null
    });
  } catch (error) {
    console.error("Error in advanced route:", error);
    res.status(500).json({ error: "Failed to generate advanced cricket insight" });
  }
});

module.exports = router;
