const { GoogleGenAI } = require("@google/genai");
const fs = require("node:fs");
const path = require("path");
require('dotenv').config();

async function generateImagesForPosts(postIds) {
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
    
    for (const postId of postIds) {
      const post = calendar.posts.find(p => p.id === postId);
      
      if (!post) {
        console.error(`❌ Post ${postId} not found`);
        continue;
      }

      console.log(`📝 Generating image for: ${post.title}`);
      console.log(`   ID: ${post.id}`);
      console.log(`   Perspective: ${post.perspective || 'general'}`);
      
      // Create playful, simple prompt based on title
      const prompt = `Cartoon illustration with thick black outlines, flat vibrant colors. ${post.title}. 
      Style: Simple cartoon character with exaggerated features, round eyes, big smile, purple curly hair. 
      Character holding a magnifying glass and documents. 
      Background: Solid bright green or blue. Floating elements: dollar signs, clocks, gears, construction crane, 
      checklist icons, warning triangles, sparkles, and motion lines. 
      Bold flat colors: yellow, orange, pink, purple, blue. No gradients, no shadows. 
      Style similar to modern editorial illustrations, playful and approachable. No text or words in the image.`;

      console.log(`\n🎨 Generating image...\n`);

      try {
        const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
          },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          const generatedImage = response.generatedImages[0];
          if (!generatedImage.image || !generatedImage.image.imageBytes) {
            console.log(`⚠️ No image data for ${post.id}`);
            continue;
          }
          
          const imgBytes = generatedImage.image.imageBytes;
          const buffer = Buffer.from(imgBytes, "base64");
          
          const fileName = `${post.id}.png`;
          const filePath = path.join('./public', fileName);
          
          fs.writeFileSync(filePath, buffer);
          
          const stats = fs.statSync(filePath);
          console.log(`✅ Image saved successfully!`);
          console.log(`   File: ${filePath}`);
          console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB\n`);
        } else {
          console.log(`⚠️ No image was generated for ${post.id}\n`);
        }
      } catch (error) {
        console.error(`❌ Error generating image for ${post.id}:`, error.message || error);
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('✨ Image generation complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message || error);
  }
}

// Generate images for post-8 and post-9
generateImagesForPosts(['post-8', 'post-9']);