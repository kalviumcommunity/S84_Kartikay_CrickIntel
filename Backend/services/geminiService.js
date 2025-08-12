const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateCricketInsight(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error generating cricket insight:", error);
    throw new Error("Failed to generate cricket insight. Please try again.");
  }
}

module.exports = { generateCricketInsight };
