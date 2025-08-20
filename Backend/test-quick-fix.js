/**
 * Quick test to verify the function calling fix
 * Run with: node test-quick-fix.js
 */

const { generateCricketInsightWithFunctionCalling } = require('./services/geminiService');

async function quickTest() {
  console.log('🧪 Quick Test of Function Calling Fix\n');
  
  try {
    // Test the exact prompt that was failing
    console.log('Testing: "give average for 1000 runs in 15 innings"');
    
    const result = await generateCricketInsightWithFunctionCalling(
      "give average for 1000 runs in 15 innings"
    );
    
    console.log('✅ Success!');
    console.log(`📝 Result: ${result}`);
    
  } catch (error) {
    console.log('❌ Failed:', error.message);
    if (error.stack) {
      console.log('Stack trace:', error.stack);
    }
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  quickTest();
}

module.exports = { quickTest };

