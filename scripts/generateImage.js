const { GoogleGenAI } = require("@google/genai");
const fs = require("node:fs");
const path = require("path");
require('dotenv').config();

async function generateSingleImage() {
  try {
    // Check if API key is set
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.error('⚠️  Please set your GEMINI_API_KEY in .env file');
      console.log('Get your API key from: https://aistudio.google.com/app/apikey');
      return;
    }

    console.log('🚀 Starting image generation with Gemini Imagen...\n');
    
    const ai = new GoogleGenAI({
      apiKey: apiKey
    });

    // Read content calendar
    const contentData = fs.readFileSync('./content-calendar.json', 'utf-8');
    const calendar = JSON.parse(contentData);
    
    // Find a test post
    const testPost = calendar.posts.find(p => p.id === 'post-10');
    
    if (!testPost) {
      console.error('Test post not found');
      return;
    }

    console.log(`📝 Generating image for: ${testPost.title}`);
    console.log(`   Perspective: ${testPost.perspective || 'general'}`);
    
    // Create playful, simple prompt based on title
    const prompt = `Cartoon illustration with thick black outlines, flat vibrant colors. ${testPost.title}. 
    Style: Simple cartoon character with exaggerated features, round eyes, big smile. 
    Character should reflect the topic. 
    Background: Solid bright green or blue. Floating elements that match the topic/industry being discussed, 
    checklist icons, warning triangles, sparkles, and motion lines. 
    Bold flat colors: yellow, orange, pink, purple, blue, red. No gradients, no shadows. 
    Style similar to modern editorial illustrations, playful and approachable. NO TITLE TEXT OR WORDS IN THE IMAGE.`;

    console.log(`\n🎨 Prompt: ${prompt.slice(0, 150)}...\n`);

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const generatedImage = response.generatedImages[0];
      const imgBytes = generatedImage.image.imageBytes;
      const buffer = Buffer.from(imgBytes, "base64");
      
      const fileName = `${testPost.id}.jpeg`;
      const filePath = path.join('./public', fileName);
      
      fs.writeFileSync(filePath, buffer);
      
      const stats = fs.statSync(filePath);
      console.log(`✅ Image saved successfully!`);
      console.log(`   File: ${filePath}`);
      console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log('⚠️ No image was generated');
    }
    
  } catch (error) {
    console.error('❌ Error generating image:', error.message || error);
    
    if (error.message && error.message.includes('API key')) {
      console.log('\n💡 Make sure your GEMINI_API_KEY is valid and has access to Imagen.');
      console.log('   Get your API key from: https://aistudio.google.com/app/apikey');
    }
  }
}

generateSingleImage();