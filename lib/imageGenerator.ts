import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

interface BlogPost {
  id: string;
  post: string;
  prompt: string;
  title: string;
  url: string;
  metaTitle: string;
  metaDescription: string;
  perspective: string;
  status: string;
}

interface ContentCalendar {
  posts: BlogPost[];
}

class ImageGenerator {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  private createImagePrompt(post: BlogPost): string {
    const basePrompt = `Create a professional, modern blog header image concept for: "${post.title}". `;
    
    const styleGuide = `The image should be clean, minimalist, and professional with abstract geometric shapes or icons. 
    Use a color palette of blues, teals, and subtle gradients. 
    Include subtle visual elements that represent ${post.perspective ? post.perspective + ' perspective' : 'project management and change orders'}. 
    The style should be corporate but approachable, suitable for a business blog about change order management.`;
    
    const specificElements = post.perspective 
      ? `Focus on elements that would resonate with a ${post.perspective}'s viewpoint in construction/project management.` 
      : `Include abstract representations of documents, workflows, or project timelines.`;

    return `${basePrompt}${styleGuide} ${specificElements} Describe the visual composition in detail for an AI image generator.`;
  }

  private async generateImagePromptWithGemini(post: BlogPost): Promise<string> {
    try {
      const prompt = this.createImagePrompt(post);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const imageGenPrompt = `Professional blog header illustration: ${text.slice(0, 500)}. 
      Minimal, modern design with abstract geometric shapes. 
      Color palette: blue, teal, white. 
      Corporate professional style, no text or words in image.`;
      
      return imageGenPrompt;
    } catch (error) {
      console.error('Error generating prompt with Gemini:', error);
      return this.getFallbackPrompt(post);
    }
  }

  private getFallbackPrompt(post: BlogPost): string {
    return `Abstract modern business illustration for "${post.title}", 
    geometric shapes, blue and teal gradient, minimalist professional design, 
    ${post.perspective ? post.perspective + ' perspective' : 'project management'} theme, 
    clean corporate style, no text`;
  }

  private async generateWithDalle3(prompt: string, postId: string): Promise<Buffer | null> {
    console.log(`Note: DALL-E 3 integration requires OpenAI API key and setup.`);
    console.log(`Would generate image for ${postId} with prompt:`, prompt.slice(0, 100) + '...');
    
    const placeholderWidth = 1200;
    const placeholderHeight = 630;
    
    const svg = `
      <svg width="${placeholderWidth}" height="${placeholderHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0891b2;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${placeholderWidth}" height="${placeholderHeight}" fill="url(#gradient)"/>
        <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle">
          ${postId.toUpperCase()}
        </text>
        <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.8">
          Blog Image Placeholder
        </text>
        <circle cx="20%" cy="30%" r="80" fill="white" opacity="0.1"/>
        <rect x="70%" y="60%" width="150" height="150" fill="white" opacity="0.1" transform="rotate(45 745 685)"/>
        <polygon points="200,450 250,350 300,450" fill="white" opacity="0.1"/>
      </svg>
    `;
    
    return sharp(Buffer.from(svg)).png().toBuffer();
  }

  private async generateWithStableDiffusion(prompt: string, postId: string): Promise<Buffer | null> {
    console.log(`Note: Stable Diffusion integration requires API key and setup.`);
    console.log(`Would generate image for ${postId} with prompt:`, prompt.slice(0, 100) + '...');
    return null;
  }

  private async generateWithMidjourney(prompt: string, postId: string): Promise<Buffer | null> {
    console.log(`Note: Midjourney integration requires Discord bot setup.`);
    console.log(`Would generate image for ${postId} with prompt:`, prompt.slice(0, 100) + '...');
    return null;
  }

  async generateImage(post: BlogPost, outputDir: string = './public'): Promise<string | null> {
    try {
      const enhancedPrompt = await this.generateImagePromptWithGemini(post);
      console.log(`Generated prompt for ${post.id}:`, enhancedPrompt.slice(0, 150) + '...');
      
      let imageBuffer = await this.generateWithDalle3(enhancedPrompt, post.id);
      
      if (!imageBuffer) {
        imageBuffer = await this.generateWithStableDiffusion(enhancedPrompt, post.id);
      }
      
      if (!imageBuffer) {
        imageBuffer = await this.generateWithMidjourney(enhancedPrompt, post.id);
      }
      
      if (imageBuffer) {
        const fileName = `${post.id}.png`;
        const filePath = path.join(outputDir, fileName);
        await fs.writeFile(filePath, imageBuffer);
        console.log(`✅ Image saved to ${filePath}`);
        return fileName;
      }
      
      console.log(`⚠️ No image generated for ${post.id}`);
      return null;
    } catch (error) {
      console.error(`Error generating image for ${post.id}:`, error);
      return null;
    }
  }

  async generateAllImages(contentCalendarPath: string = './content-calendar.json'): Promise<void> {
    try {
      const data = await fs.readFile(contentCalendarPath, 'utf-8');
      const calendar: ContentCalendar = JSON.parse(data);
      
      console.log(`📚 Found ${calendar.posts.length} posts in content calendar`);
      
      for (const post of calendar.posts) {
        if (post.status === 'Done' || post.status === 'Next') {
          console.log(`\n🎨 Generating image for: ${post.title}`);
          await this.generateImage(post);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log('\n✨ Image generation complete!');
    } catch (error) {
      console.error('Error reading content calendar:', error);
    }
  }
}

export default ImageGenerator;