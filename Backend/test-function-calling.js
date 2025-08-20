/**
 * Simple test script for function calling
 * Run with: node test-function-calling.js
 */

const { generateCricketInsightWithFunctionCalling } = require('./services/geminiService');

async function testFunctionCalling() {
  console.log('🧪 Testing Function Calling Fixes\n');
  
  try {
    // Test 1: Simple batting average calculation
    console.log('1️⃣ Testing Batting Average Calculation...');
    try {
      const result = await generateCricketInsightWithFunctionCalling(
        "Calculate batting average for 1000 runs in 20 innings"
      );
      console.log('✅ Success!');
      console.log(`📝 Result: ${result}`);
    } catch (error) {
      console.log('❌ Failed:', error.message);
      console.log('Stack trace:', error.stack);
    }
    console.log('');

    // Test 2: Form analysis
    console.log('2️⃣ Testing Form Analysis...');
    try {
      const result = await generateCricketInsightWithFunctionCalling(
        "Analyze form for Virat Kohli with scores 50, 75, 100, 25, 80"
      );
      console.log('✅ Success!');
      console.log(`📝 Result: ${result}`);
    } catch (error) {
      console.log('❌ Failed:', error.message);
      console.log('Stack trace:', error.stack);
    }
    console.log('');

    // Test 3: Regular cricket question (should use AI)
    console.log('3️⃣ Testing Regular Cricket Question...');
    try {
      const result = await generateCricketInsightWithFunctionCalling(
        "What makes a good opening batsman in Test cricket?"
      );
      console.log('✅ Success!');
      console.log(`📝 Result: ${result.substring(0, 100)}...`);
    } catch (error) {
      console.log('❌ Failed:', error.message);
      console.log('Stack trace:', error.stack);
    }
    console.log('');

    console.log('🎉 Function calling test completed!');
    
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
  
  testFunctionCalling();
}

module.exports = { testFunctionCalling };

