const { GoogleGenAI } = require("@google/genai");
const fs = require("node:fs");
const path = require("path");
require('dotenv').config();

async function createNextPost() {
  try {
    console.log('🚀 Starting automated post creation...\n');
    
    // Check if API key is set
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.error('⚠️  Please set your GEMINI_API_KEY in .env file');
      console.log('Get your API key from: https://aistudio.google.com/app/apikey');
      return;
    }

    // Read content calendar
    const contentData = fs.readFileSync('./content-calendar.json', 'utf-8');
    const calendar = JSON.parse(contentData);
    
    // Find next post to create (first one without "Done" status)
    const nextPost = calendar.posts.find(post => !post.status || post.status !== 'Done');
    
    if (!nextPost) {
      console.log('✅ All posts in the content calendar are complete!');
      return;
    }

    console.log(`📝 Creating next post: ${nextPost.title}`);
    console.log(`   ID: ${nextPost.id}`);
    console.log(`   Perspective: ${nextPost.perspective || 'general'}\n`);

    // Generate blog content using Gemini
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    console.log('✍️  Generating blog content...');
    
    const contentPrompt = `Write a comprehensive blog post about "${nextPost.title}" from a ${nextPost.perspective || 'general'} perspective. 

    Format requirements:
    - Start with the title as plain text (no markdown heading)
    - MUST include this exact image tag on line 3: <img src="/public/${nextPost.id}.jpeg" style="width: 500px; max-width: 100%; height: auto" />
    - Add two blank lines after the image
    - Start with an italicized introduction paragraph in <p><i>...</i></p> tags
    - Use <p><b>Section Headings</b></p> for main sections
    - Use HTML <p>, <ul>, <li>, <b>, <i> tags throughout (no markdown)
    - Include 6-8 main sections with practical, actionable content
    - Add 3 resource placeholders throughout the content: {{RESOURCE_PLACEHOLDER_1}}, {{RESOURCE_PLACEHOLDER_2}}, {{RESOURCE_PLACEHOLDER_3}}
    - Add internal linking placeholders: {{INTERNAL_LINK_1}}, {{INTERNAL_LINK_2}}
    - End with a <p><b>Conclusion</b></p> section
    - Write in professional, authoritative tone
    - Include specific examples, tips, and best practices
    - Make it comprehensive (2000+ words)
    
    Topic: ${nextPost.title}
    Perspective: ${nextPost.perspective || 'general'}
    
    Write the complete blog post now:`;

    const contentResult = await model.generateContent(contentPrompt);
    const blogContent = contentResult.response.text();

    // Save markdown file
    const markdownPath = `./content/${nextPost.id}.md`;
    fs.writeFileSync(markdownPath, blogContent);
    console.log(`✅ Blog post saved to ${markdownPath}`);

    // Generate image
    console.log('\n🎨 Generating image...');
    
    const prompt = `Cartoon illustration with thick black outlines and flat vibrant colors. 
    Style: Simple cartoon character with exaggerated features, round eyes, big smile, purple curly hair. 
    Character holding a magnifying glass examining documents. 
    Background: Solid bright green or blue. 
    Floating elements: dollar signs, clocks, gears, construction crane, checklist icons, warning triangles, sparkles, and motion lines. 
    Bold flat colors: yellow, orange, pink, purple, blue. No gradients, no shadows. 
    Style similar to modern editorial illustrations, playful and approachable. 
    IMPORTANT: This is a visual illustration only - absolutely NO TEXT, NO WORDS, NO LETTERS, NO TITLES, NO NUMBERS anywhere in the image.`;

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const imageResponse = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
      const generatedImage = imageResponse.generatedImages[0];
      if (!generatedImage.image || !generatedImage.image.imageBytes) {
        console.log(`⚠️ No image data for ${nextPost.id}`);
      } else {
        const imgBytes = generatedImage.image.imageBytes;
        const buffer = Buffer.from(imgBytes, "base64");
        
        // Convert to JPEG using Sharp to ensure proper format
        const sharp = require('sharp');
        const jpegBuffer = await sharp(buffer)
          .jpeg({ quality: 85 })
          .toBuffer();
        
        const fileName = `${nextPost.id}.jpeg`;
        const filePath = path.join('./public', fileName);
        
        fs.writeFileSync(filePath, jpegBuffer);
        
        const stats = fs.statSync(filePath);
        console.log(`✅ Image saved to ${filePath}`);
        console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
      }
    } else {
      console.log(`⚠️ No image was generated for ${nextPost.id}`);
    }

    // Update content calendar to mark as Done
    console.log('\n📅 Updating content calendar...');
    
    const updatedCalendar = {
      ...calendar,
      posts: calendar.posts.map(post => 
        post.id === nextPost.id 
          ? { ...post, status: 'Done' }
          : post
      )
    };
    
    fs.writeFileSync('./content-calendar.json', JSON.stringify(updatedCalendar, null, 2));
    console.log(`✅ Content calendar updated - ${nextPost.id} marked as Done`);

    // Run post-processing for internal linking and resources
    console.log('\n🔄 Running post-processing...');
    const { postProcessBlog } = require('./postProcessBlog');
    await postProcessBlog(nextPost.id);

    // Run content sanitization
    console.log('\n🧹 Running content sanitization...');
    const { sanitizePost } = require('./sanitizeContent');
    sanitizePost(nextPost.id);

    console.log('\n🎉 Post creation complete!');
    console.log(`   Blog: content/${nextPost.id}.md`);
    console.log(`   Image: public/${nextPost.id}.jpeg`);
    console.log(`   Status: Updated in content-calendar.json`);
    
  } catch (error) {
    console.error('❌ Error creating post:', error.message || error);
  }
}

createNextPost();