const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

async function listModels() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    console.log('🔍 Fetching available models...\n');
    
    const models = await ai.models.list();
    
    console.log('Available models:');
    for (const model of models) {
      console.log(`- ${model.name}`);
      if (model.supportedGenerationMethods) {
        console.log(`  Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message || error);
  }
}

listModels();