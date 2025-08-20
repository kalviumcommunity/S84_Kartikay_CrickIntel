/**
 * Demo script for CricIntel AI features
 * Perfect for video tutorials and demonstrations
 * Run with: node demo-features.js
 */

const { 
  generateCricketInsight,
  generateCricketInsightOneShot,
  generateCricketInsightMultiShot,
  generateCricketInsightWithFunctionCalling,
  generateStructuredCricketInsight,
  generateDynamicCricketInsight
} = require('./services/geminiService');

// Demo configuration
const DEMO_CONFIG = {
  // Test prompts for different scenarios
  prompts: {
    playerAnalysis: "Analyze Virat Kohli's performance in T20 cricket",
    strategyQuestion: "What's the best bowling strategy for a green pitch?",
    formatComparison: "Compare Test cricket vs T20 cricket formats",
    weatherImpact: "How do weather conditions affect cricket matches?",
    functionCall: "Calculate batting average for 1000 runs in 20 innings",
    venueAnalysis: "How does Wankhede Stadium affect batting strategy?"
  },
  
  // Different parameter sets to demonstrate
  parameterSets: {
    focused: { temperature: 0.2, topK: 20, topP: 0.5 },
    balanced: { temperature: 0.7, topK: 40, topP: 0.8 },
    creative: { temperature: 0.9, topK: 80, topP: 0.95 }
  },
  
  // Context examples for dynamic prompting
  contexts: {
    beginner: {
      userLevel: "beginner",
      matchType: "T20",
      teamPreference: "India",
      venue: "Wankhede Stadium"
    },
    expert: {
      userLevel: "expert",
      matchType: "Test",
      teamPreference: "Australia",
      venue: "MCG"
    }
  }
};

async function runDemo() {
  console.log('🎬 CricIntel AI Features Demo\n');
  console.log('This demo showcases all the advanced AI features implemented in CricIntel.\n');
  
  try {
    // Demo 1: Zero-shot prompting
    console.log('🎯 Demo 1: Zero-Shot Prompting');
    console.log('Prompt:', DEMO_CONFIG.prompts.playerAnalysis);
    console.log('This demonstrates the AI generating a response without any examples.\n');
    
    const zeroShotResult = await generateCricketInsight(DEMO_CONFIG.prompts.playerAnalysis);
    console.log('✅ Response generated successfully!');
    console.log(`📝 Response length: ${zeroShotResult.length} characters`);
    console.log('📄 First 200 characters:', zeroShotResult.substring(0, 200) + '...\n');
    
    // Demo 2: One-shot prompting
    console.log('🎯 Demo 2: One-Shot Prompting');
    console.log('Prompt:', DEMO_CONFIG.prompts.strategyQuestion);
    console.log('This demonstrates the AI receiving one example to guide response format.\n');
    
    const oneShotResult = await generateCricketInsightOneShot(
      DEMO_CONFIG.prompts.strategyQuestion, 
      DEMO_CONFIG.parameterSets.balanced
    );
    console.log('✅ Response generated successfully!');
    console.log(`📝 Response length: ${oneShotResult.length} characters`);
    console.log('📄 First 200 characters:', oneShotResult.substring(0, 200) + '...\n');
    
    // Demo 3: Multi-shot prompting
    console.log('🎯 Demo 3: Multi-Shot Prompting');
    console.log('Prompt:', DEMO_CONFIG.prompts.formatComparison);
    console.log('This demonstrates the AI receiving multiple examples for better pattern recognition.\n');
    
    const multiShotResult = await generateCricketInsightMultiShot(
      DEMO_CONFIG.prompts.formatComparison, 
      DEMO_CONFIG.parameterSets.balanced
    );
    console.log('✅ Response generated successfully!');
    console.log(`📝 Response length: ${multiShotResult.length} characters`);
    console.log('📄 First 200 characters:', multiShotResult.substring(0, 200) + '...\n');
    
    // Demo 4: Function calling
    console.log('🎯 Demo 4: Function Calling');
    console.log('Prompt:', DEMO_CONFIG.prompts.functionCall);
    console.log('This demonstrates the AI executing predefined functions for calculations.\n');
    
    const functionResult = await generateCricketInsightWithFunctionCalling(
      DEMO_CONFIG.prompts.functionCall, 
      DEMO_CONFIG.parameterSets.focused
    );
    console.log('✅ Function executed successfully!');
    console.log(`📝 Result: ${functionResult}\n`);
    
    // Demo 5: Structured output
    console.log('🎯 Demo 5: Structured Output');
    console.log('Prompt:', DEMO_CONFIG.prompts.weatherImpact);
    console.log('This demonstrates the AI returning responses in structured JSON format.\n');
    
    const structuredResult = await generateStructuredCricketInsight(
      DEMO_CONFIG.prompts.weatherImpact, 
      DEMO_CONFIG.parameterSets.balanced
    );
    console.log('✅ Structured response generated successfully!');
    if (typeof structuredResult === 'object') {
      console.log('📊 Structured response structure:');
      Object.keys(structuredResult).forEach(key => {
        const value = structuredResult[key];
        if (Array.isArray(value)) {
          console.log(`  - ${key}: Array with ${value.length} items`);
        } else if (typeof value === 'string') {
          console.log(`  - ${key}: String (${value.length} characters)`);
        } else {
          console.log(`  - ${key}: ${typeof value} (${value})`);
        }
      });
    } else {
      console.log(`📝 Response: ${structuredResult.substring(0, 200)}...`);
    }
    console.log('');
    
    // Demo 6: Dynamic prompting with beginner context
    console.log('🎯 Demo 6: Dynamic Prompting (Beginner Context)');
    console.log('Prompt:', DEMO_CONFIG.prompts.venueAnalysis);
    console.log('Context:', JSON.stringify(DEMO_CONFIG.contexts.beginner, null, 2));
    console.log('This demonstrates the AI adapting prompts based on user context.\n');
    
    const dynamicBeginnerResult = await generateDynamicCricketInsight(
      DEMO_CONFIG.prompts.venueAnalysis, 
      DEMO_CONFIG.contexts.beginner, 
      DEMO_CONFIG.parameterSets.balanced
    );
    console.log('✅ Dynamic response generated successfully!');
    console.log(`📝 Response length: ${dynamicBeginnerResult.length} characters`);
    console.log('📄 First 200 characters:', dynamicBeginnerResult.substring(0, 200) + '...\n');
    
    // Demo 7: Dynamic prompting with expert context
    console.log('🎯 Demo 7: Dynamic Prompting (Expert Context)');
    console.log('Prompt:', DEMO_CONFIG.prompts.venueAnalysis);
    console.log('Context:', JSON.stringify(DEMO_CONFIG.contexts.expert, null, 2));
    console.log('This demonstrates how context changes the AI response.\n');
    
    const dynamicExpertResult = await generateDynamicCricketInsight(
      DEMO_CONFIG.prompts.venueAnalysis, 
      DEMO_CONFIG.contexts.expert, 
      DEMO_CONFIG.parameterSets.balanced
    );
    console.log('✅ Dynamic response generated successfully!');
    console.log(`📝 Response length: ${dynamicExpertResult.length} characters`);
    console.log('📄 First 200 characters:', dynamicExpertResult.substring(0, 200) + '...\n');
    
    // Demo 8: Parameter variations
    console.log('🎯 Demo 8: Parameter Variations');
    console.log('This demonstrates how different parameters affect AI responses.\n');
    
    console.log('🌡️ Testing with focused parameters (Temperature: 0.2, Top-K: 20, Top-P: 0.5)');
    const focusedResult = await generateCricketInsightOneShot(
      "Analyze spin bowling in cricket", 
      DEMO_CONFIG.parameterSets.focused
    );
    console.log(`📝 Focused response length: ${focusedResult.length} characters`);
    
    console.log('🌡️ Testing with creative parameters (Temperature: 0.9, Top-K: 80, Top-P: 0.95)');
    const creativeResult = await generateCricketInsightOneShot(
      "Analyze spin bowling in cricket", 
      DEMO_CONFIG.parameterSets.creative
    );
    console.log(`📝 Creative response length: ${creativeResult.length} characters\n`);
    
    // Summary
    console.log('🎉 Demo completed successfully!');
    console.log('\n📋 Features Demonstrated:');
    console.log('✅ Zero-shot prompting');
    console.log('✅ One-shot prompting');
    console.log('✅ Multi-shot prompting');
    console.log('✅ Function calling');
    console.log('✅ Structured output');
    console.log('✅ Dynamic prompting (beginner context)');
    console.log('✅ Dynamic prompting (expert context)');
    console.log('✅ Parameter variations (focused vs creative)');
    console.log('✅ Token logging (check console for token usage)');
    
    console.log('\n🔧 Technical Features:');
    console.log('✅ Temperature control (0.2 - 0.9)');
    console.log('✅ Top-K sampling (20 - 80)');
    console.log('✅ Top-P sampling (0.5 - 0.95)');
    console.log('✅ Context-aware prompting');
    console.log('✅ Function execution');
    console.log('✅ Structured JSON responses');
    
    console.log('\n💡 Use Cases:');
    console.log('• Player analysis and comparisons');
    console.log('• Strategy recommendations');
    console.log('• Format comparisons');
    console.log('• Weather impact analysis');
    console.log('• Statistical calculations');
    console.log('• Venue-specific insights');
    console.log('• Personalized responses based on user level');
    
    console.log('\n🚀 Ready for production use!');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  // Check if API key is available
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY environment variable not set');
    console.log('Please set your Gemini API key in the .env file');
    console.log('Example: GEMINI_API_KEY=your_api_key_here');
    process.exit(1);
  }
  
  runDemo();
}

module.exports = { runDemo, DEMO_CONFIG };

