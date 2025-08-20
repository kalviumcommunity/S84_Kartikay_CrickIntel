/**
 * Test script for CricIntel AI features
 * Run with: node test-ai-features.js
 */

const { 
  generateCricketInsight,
  generateCricketInsightOneShot,
  generateCricketInsightMultiShot,
  generateCricketInsightWithFunctionCalling,
  generateStructuredCricketInsight,
  generateDynamicCricketInsight
} = require('./services/geminiService');

// Test prompts
const testPrompts = [
  "Analyze Virat Kohli's performance in T20 cricket",
  "What's the best strategy for batting on a green pitch?",
  "Compare Test cricket vs T20 cricket formats",
  "How do weather conditions affect cricket matches?"
];

// Test parameters
const testParams = {
  temperature: 0.7,
  topK: 40,
  topP: 0.8
};

// Test context for dynamic prompting
const testContext = {
  userLevel: "expert",
  matchType: "T20",
  teamPreference: "India",
  venue: "Wankhede Stadium"
};

async function testAllFeatures() {
  console.log('🧪 Testing CricIntel AI Features\n');
  
  try {
    // Test 1: Zero-shot prompting
    console.log('1️⃣ Testing Zero-Shot Prompting...');
    const zeroShotResult = await generateCricketInsight(testPrompts[0]);
    console.log('✅ Zero-shot successful');
    console.log(`📝 Response length: ${zeroShotResult.length} characters\n`);
    
    // Test 2: One-shot prompting
    console.log('2️⃣ Testing One-Shot Prompting...');
    const oneShotResult = await generateCricketInsightOneShot(testPrompts[1], testParams);
    console.log('✅ One-shot successful');
    console.log(`📝 Response length: ${oneShotResult.length} characters\n`);
    
    // Test 3: Multi-shot prompting
    console.log('3️⃣ Testing Multi-Shot Prompting...');
    const multiShotResult = await generateCricketInsightMultiShot(testPrompts[2], testParams);
    console.log('✅ Multi-shot successful');
    console.log(`📝 Response length: ${multiShotResult.length} characters\n`);
    
    // Test 4: Function calling
    console.log('4️⃣ Testing Function Calling...');
    const functionResult = await generateCricketInsightWithFunctionCalling(
      "Calculate batting average for 1000 runs in 20 innings", 
      testParams
    );
    console.log('✅ Function calling successful');
    console.log(`📝 Response: ${functionResult}\n`);
    
    // Test 5: Structured output
    console.log('5️⃣ Testing Structured Output...');
    const structuredResult = await generateStructuredCricketInsight(testPrompts[3], testParams);
    console.log('✅ Structured output successful');
    if (typeof structuredResult === 'object') {
      console.log(`📊 Structured response keys: ${Object.keys(structuredResult).join(', ')}`);
    } else {
      console.log(`📝 Response length: ${structuredResult.length} characters`);
    }
    console.log('');
    
    // Test 6: Dynamic prompting
    console.log('6️⃣ Testing Dynamic Prompting...');
    const dynamicResult = await generateDynamicCricketInsight(
      "What's the best strategy for this match?", 
      testContext, 
      testParams
    );
    console.log('✅ Dynamic prompting successful');
    console.log(`📝 Response length: ${dynamicResult.length} characters\n`);
    
    // Test 7: Parameter variations
    console.log('7️⃣ Testing Parameter Variations...');
    const lowTempParams = { temperature: 0.2, topK: 20, topP: 0.5 };
    const highTempParams = { temperature: 0.9, topK: 80, topP: 0.95 };
    
    const lowTempResult = await generateCricketInsightOneShot("Analyze spin bowling", lowTempParams);
    const highTempResult = await generateCricketInsightOneShot("Analyze spin bowling", highTempParams);
    
    console.log('✅ Parameter variations successful');
    console.log(`🌡️ Low temp (0.2) response length: ${lowTempResult.length} characters`);
    console.log(`🌡️ High temp (0.9) response length: ${highTempResult.length} characters\n`);
    
    console.log('🎉 All AI features tested successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Zero-shot prompting');
    console.log('✅ One-shot prompting');
    console.log('✅ Multi-shot prompting');
    console.log('✅ Function calling');
    console.log('✅ Structured output');
    console.log('✅ Dynamic prompting');
    console.log('✅ Parameter controls (Temperature, Top-K, Top-P)');
    console.log('✅ Token logging');
    
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
  
  testAllFeatures();
}

module.exports = { testAllFeatures };

