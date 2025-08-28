import ImageGenerator from '../lib/imageGenerator';
import * as dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

async function testSingleImageGeneration() {
  try {
    console.log('🚀 Starting image generation test...\n');
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.error('⚠️  Please set your GEMINI_API_KEY in .env file');
      console.log('Get your API key from: https://makersuite.google.com/app/apikey');
      return;
    }
    
    const generator = new ImageGenerator(apiKey);
    
    const contentData = await fs.readFile('./content-calendar.json', 'utf-8');
    const calendar = JSON.parse(contentData);
    
    const testPost = calendar.posts.find((p: any) => p.status === 'Done') || calendar.posts[0];
    
    if (testPost) {
      console.log(`📝 Testing with post: ${testPost.title}`);
      console.log(`   ID: ${testPost.id}`);
      console.log(`   Perspective: ${testPost.perspective || 'general'}\n`);
      
      const imagePath = await generator.generateImage(testPost, './public');
      
      if (imagePath) {
        console.log(`\n✅ Test successful! Image generated: ${imagePath}`);
        const fullPath = path.join(process.cwd(), 'public', imagePath);
        console.log(`📁 Full path: ${fullPath}`);
        
        const stats = await fs.stat(fullPath);
        console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
      } else {
        console.log('\n⚠️  No image was generated');
      }
    } else {
      console.log('❌ No posts found in content calendar');
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSingleImageGeneration();