const ImageGenerator = require('../lib/imageGenerator').default;
require('dotenv').config({ path: '.env.local' });

async function test() {
  console.log('Testing image generation...');
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.log('\n⚠️  GEMINI_API_KEY not configured.');
    console.log('This demo will generate placeholder images instead.\n');
  }
  
  const generator = new ImageGenerator(process.env.GEMINI_API_KEY || 'demo_key');
  
  const testPost = {
    id: 'post-10',
    title: '7 tips from clients about change orders',
    prompt: 'Generate a blog post about change order management from a clients perspective',
    perspective: 'client',
    status: 'Done'
  };
  
  console.log(`Generating image for: ${testPost.title}`);
  await generator.generateImage(testPost, './public');
}

test().catch(console.error);