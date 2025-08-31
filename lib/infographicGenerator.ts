import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "path";

interface InfographicOptions {
  topic: string;
  perspective?: string;
  fileName?: string;
  outputDir?: string;
}

class InfographicGenerator {
  private ai: GoogleGenAI;

  constructor(apiKey?: string) {
    this.ai = new GoogleGenAI({
      apiKey: apiKey || process.env.GEMINI_API_KEY
    });
  }

  private createInfographicPrompt(topic: string, perspective?: string): string {
    const perspectiveText = perspective ? `from a ${perspective}'s perspective` : '';
    
    return `Create a clean, professional infographic ${perspectiveText} about: ${topic}.
    
    Visual style requirements:
    - Clean, modern infographic design with structured layout
    - Use a grid-based composition with clear sections
    - Color palette: Professional blues, teals, and accent colors (orange/green for highlights)
    - Include icons, charts, graphs, flowcharts, or diagrams
    - Use geometric shapes and clean lines
    - Visual hierarchy with different sized elements
    - Data visualization elements (pie charts, bar graphs, process flows)
    - Professional business style, not cartoon
    - Minimalist with plenty of white space
    - Include visual representations of concepts (NOT text)
    - Use symbols, icons, and visual metaphors
    - Modern flat design aesthetic
    
    CRITICAL: This must be a VISUAL infographic using only graphics, icons, charts, and visual elements. 
    ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS, NO LABELS anywhere in the image.
    Create visual representations of data and concepts through icons, symbols, and graphics only.`;
  }

  async generateInfographic(options: InfographicOptions): Promise<string | null> {
    try {
      const { topic, perspective, fileName, outputDir = './public/infographics' } = options;
      
      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const prompt = this.createInfographicPrompt(topic, perspective);
      
      console.log(`📊 Generating infographic for: ${topic}`);
      if (perspective) {
        console.log(`   Perspective: ${perspective}`);
      }
      console.log(`   Style: Professional business infographic`);

      const response = await this.ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: '3:4', // Vertical infographic format
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const generatedImage = response.generatedImages[0];
        if (!generatedImage.image || !generatedImage.image.imageBytes) {
          console.log(`⚠️ No image data received`);
          return null;
        }
        
        const imgBytes = generatedImage.image.imageBytes;
        const buffer = Buffer.from(imgBytes, "base64");
        
        // Convert to JPEG using Sharp
        const sharp = require('sharp');
        const jpegBuffer = await sharp(buffer)
          .jpeg({ quality: 90 })
          .toBuffer();
        
        // Generate filename based on topic and perspective
        const sanitizedTopic = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
        const sanitizedPerspective = perspective ? `-${perspective.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : '';
        const timestamp = Date.now();
        const finalFileName = fileName || `infographic-${sanitizedTopic}${sanitizedPerspective}-${timestamp}.jpeg`;
        
        const filePath = path.join(outputDir, finalFileName);
        
        fs.writeFileSync(filePath, jpegBuffer);
        
        const stats = fs.statSync(filePath);
        console.log(`✅ Infographic saved successfully!`);
        console.log(`   File: ${filePath}`);
        console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
        
        return finalFileName;
      } else {
        console.log(`⚠️ No infographic was generated`);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error generating infographic:`, error);
      return null;
    }
  }

  async generateBatchInfographics(topics: InfographicOptions[]): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    
    for (const topicOptions of topics) {
      const fileName = await this.generateInfographic(topicOptions);
      if (fileName) {
        const key = `${topicOptions.topic}-${topicOptions.perspective || 'general'}`;
        results.set(key, fileName);
      }
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    return results;
  }
}

export default InfographicGenerator;