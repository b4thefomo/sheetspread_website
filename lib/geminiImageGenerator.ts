import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "path";

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

class GeminiImageGenerator {
  private ai: GoogleGenAI;

  constructor(apiKey?: string) {
    this.ai = new GoogleGenAI({
      apiKey: apiKey || process.env.GEMINI_API_KEY
    });
  }

  private createImagePrompt(post: BlogPost): string {
    return `Cartoon illustration with thick black outlines and flat vibrant colors. 
    Style: Simple cartoon character with exaggerated features, round eyes, big smile, purple curly hair. 
    Character holding a magnifying glass and documents. 
    Background: Solid bright green or blue. 
    Floating elements: dollar signs, clocks, gears, construction crane, checklist icons, warning triangles, sparkles, and motion lines. 
    Bold flat colors: yellow, orange, pink, purple, blue. No gradients, no shadows. 
    Style similar to modern editorial illustrations, playful and approachable. 
    STRICT REQUIREMENT: This is a visual illustration only - absolutely NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS anywhere in the image.`;
  }

  async generateImage(post: BlogPost, outputDir: string = './public'): Promise<string | null> {
    try {
      const prompt = this.createImagePrompt(post);
      console.log(`🎨 Generating image for: ${post.title}`);
      console.log(`   Prompt: ${prompt.slice(0, 100)}...`);

      const response = await this.ai.models.generateImages({
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
          return null;
        }
        const imgBytes = generatedImage.image.imageBytes;
        const buffer = Buffer.from(imgBytes, "base64");
        
        // Convert to JPEG using Sharp to ensure proper format
        const sharp = require('sharp');
        const jpegBuffer = await sharp(buffer)
          .jpeg({ quality: 85 })
          .toBuffer();
        
        const fileName = `${post.id}.jpeg`;
        const filePath = path.join(outputDir, fileName);
        
        fs.writeFileSync(filePath, jpegBuffer);
        console.log(`✅ Image saved to ${filePath}`);
        
        return fileName;
      } else {
        console.log(`⚠️ No image generated for ${post.id}`);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error generating image for ${post.id}:`, error);
      return null;
    }
  }

  async generateBatchImages(posts: BlogPost[], outputDir: string = './public'): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    
    for (const post of posts) {
      if (post.status === 'Done' || post.status === 'Next') {
        const fileName = await this.generateImage(post, outputDir);
        if (fileName) {
          results.set(post.id, fileName);
        }
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    return results;
  }

  async generateFromCalendar(contentCalendarPath: string = './content-calendar.json'): Promise<void> {
    try {
      const data = fs.readFileSync(contentCalendarPath, 'utf-8');
      const calendar: ContentCalendar = JSON.parse(data);
      
      console.log(`📚 Found ${calendar.posts.length} posts in content calendar`);
      
      const postsToGenerate = calendar.posts.filter(p => 
        (p.status === 'Done' || p.status === 'Next') && p.id
      );
      
      console.log(`🎯 Generating images for ${postsToGenerate.length} posts...\n`);
      
      const results = await this.generateBatchImages(postsToGenerate);
      
      console.log(`\n✨ Image generation complete!`);
      console.log(`   Generated: ${results.size} images`);
      console.log(`   Failed: ${postsToGenerate.length - results.size} images`);
      
    } catch (error) {
      console.error('Error processing content calendar:', error);
    }
  }
}

export default GeminiImageGenerator;