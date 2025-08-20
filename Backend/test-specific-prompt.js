/**
 * Test script for the specific prompt that was failing
 * Run with: node test-specific-prompt.js
 */

const { generateCricketInsightWithFunctionCalling } = require('./services/geminiService');

async function testSpecificPrompt() {
  console.log('🧪 Testing the Specific Prompt That Was Failing\n');
  
  try {
    // Test the exact prompt that was failing
    console.log('1️⃣ Testing the failing prompt: "give average for 1000 runs in 15 innings"');
    try {
      const result = await generateCricketInsightWithFunctionCalling(
        "give average for 1000 runs in 15 innings"
      );
      console.log('✅ Success!');
      console.log(`📝 Result: ${result}`);
    } catch (error) {
      console.log('❌ Failed:', error.message);
      console.log('Stack trace:', error.stack);
    }
    console.log('');

    // Test similar variations
    console.log('2️⃣ Testing similar variations...');
    
    const testPrompts = [
      "calculate average for 1000 runs in 15 innings",
      "what's the average for 1000 runs in 15 innings",
      "batting average for 1000 runs in 15 innings",
      "1000 runs in 15 innings average",
      "runs 1000 innings 15 average"
    ];

    for (let i = 0; i < testPrompts.length; i++) {
      const prompt = testPrompts[i];
      console.log(`   Testing: "${prompt}"`);
      try {
        const result = await generateCricketInsightWithFunctionCalling(prompt);
        console.log(`   ✅ Success: ${result.substring(0, 50)}...`);
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
      }
    }
    console.log('');

    // Test edge cases
    console.log('3️⃣ Testing edge cases...');
    
    const edgeCases = [
      "average 1000 runs 15 innings",
      "runs: 1000, innings: 15, average?",
      "1000 runs divided by 15 innings",
      "batting average calculation 1000 runs 15 innings"
    ];

    for (let i = 0; i < edgeCases.length; i++) {
      const prompt = edgeCases[i];
      console.log(`   Testing: "${prompt}"`);
      try {
        const result = await generateCricketInsightWithFunctionCalling(prompt);
        console.log(`   ✅ Success: ${result.substring(0, 50)}...`);
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
      }
    }
    console.log('');

    console.log('🎉 Specific prompt testing completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  // Check if API key is available
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY environment variable not set');
    console.log('Please set your Gemini API key in the .env file');
    process.exit(1);
  }
  
  testSpecificPrompt();
}

module.exports = { testSpecificPrompt };

