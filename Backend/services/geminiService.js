const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Zero-shot prompting
async function generateCricketInsight(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating cricket insight:", error);
    throw new Error("Failed to generate cricket insight. Please try again.");
  }
}

// One-shot prompting
async function generateCricketInsightOneShot(prompt, customParams = {}) {
  try {
    const example = `
Q: Who won the ICC Cricket World Cup 2019?
A: England won the 2019 ICC Cricket World Cup by defeating New Zealand in the final at Lord’s, decided by a Super Over.

Now answer this:
Q: ${prompt}
    `;

    const result = await model.generateContent(example, customParams);
    return result.response.text();
  } catch (error) {
    console.error("Error generating one-shot cricket insight:", error);
    throw new Error("Failed to generate one-shot cricket insight.");
  }
}

// Multi-shot prompting
async function generateCricketInsightMultiShot(prompt, customParams = {}) {
  try {
    const examples = `
Q: Who won the ICC Cricket World Cup 2019?
A: England won the 2019 ICC Cricket World Cup by defeating New Zealand in the final at Lord’s, decided by a Super Over.

Q: Who is the highest run scorer in Test cricket?
A: Sachin Tendulkar is the highest run scorer in Test cricket with 15,921 runs.

Q: Who has taken the most wickets in T20 internationals?
A: Shakib Al Hasan holds the record for the most wickets in T20 internationals.

Now answer this:
Q: ${prompt}
    `;

    const result = await model.generateContent(examples, customParams);
    return result.response.text();
  } catch (error) {
    console.error("Error generating multi-shot cricket insight:", error);
    throw new Error("Failed to generate multi-shot cricket insight.");
  }
}

// Function calling (stub for now)
async function generateCricketInsightWithFunctionCalling(prompt, customParams = {}) {
  try {
    const result = await model.generateContent(prompt, customParams);
    return result.response.text();
  } catch (error) {
    console.error("Error generating function calling cricket insight:", error);
    throw new Error("Failed to generate cricket insight with function calling.");
  }
}

// Structured output
async function generateStructuredCricketInsight(prompt, customParams = {}) {
  try {
    const result = await model.generateContent(prompt, customParams);
    return {
      question: prompt,
      answer: result.response.text()
    };
  } catch (error) {
    console.error("Error generating structured cricket insight:", error);
    throw new Error("Failed to generate structured cricket insight.");
  }
}

// Dynamic prompting
async function generateDynamicCricketInsight(prompt, context = {}, customParams = {}) {
  try {
    const dynamicPrompt = `
Context: ${JSON.stringify(context)}
Question: ${prompt}
    `;
    const result = await model.generateContent(dynamicPrompt, customParams);
    return result.response.text();
  } catch (error) {
    console.error("Error generating dynamic cricket insight:", error);
    throw new Error("Failed to generate dynamic cricket insight.");
  }
}

module.exports = {
  generateCricketInsight,
  generateCricketInsightOneShot,
  generateCricketInsightMultiShot,
  generateCricketInsightWithFunctionCalling,
  generateStructuredCricketInsight,
  generateDynamicCricketInsight,
};
