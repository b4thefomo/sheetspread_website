const { GoogleGenAI } = require("@google/genai");
const fs = require("node:fs");
const path = require("path");
require('dotenv').config();

async function generateInfographic(topic, perspective, fileName) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.error('⚠️  Please set your GEMINI_API_KEY in .env file');
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const perspectiveText = perspective ? `from a ${perspective}'s perspective` : '';
    
    const prompt = `Create a clean, professional infographic ${perspectiveText} about: ${topic}.
    
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

    console.log(`📊 Generating infographic for: ${topic}`);
    if (perspective) {
      console.log(`   Perspective: ${perspective}`);
    }
    console.log(`   Style: Professional business infographic\n`);

    const response = await ai.models.generateImages({
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
      
      // Ensure directory exists
      const outputDir = './public/infographics';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(filePath, jpegBuffer);
      
      const stats = fs.statSync(filePath);
      console.log(`✅ Infographic saved successfully!`);
      console.log(`   File: ${filePath}`);
      console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB\n`);
      
      return fileName;
    } else {
      console.log(`⚠️ No infographic was generated\n`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error generating infographic:`, error.message || error);
    return null;
  }
}

async function generateTestInfographics() {
  console.log('🚀 Starting infographic generation tests...\n');
  console.log('=' .repeat(60) + '\n');
  
  // Test 1: Supplier perspective infographic
  const supplier = await generateInfographic(
    'Change Order Management Best Practices: Cost Recovery, Documentation Requirements, and Negotiation Strategies',
    'supplier',
    'change-order-supplier-infographic.jpeg'
  );
  
  // Add delay between requests
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test 2: Project Manager perspective infographic  
  const projectManager = await generateInfographic(
    'Change Order Management Workflow: Planning, Tracking, Communication, and Risk Mitigation Strategies',
    'project manager',
    'change-order-pm-infographic.jpeg'
  );
  
  console.log('=' .repeat(60));
  console.log('\n🎉 Infographic generation tests complete!');
  
  const results = [];
  if (supplier) results.push(`   ✅ Supplier infographic: public/infographics/${supplier}`);
  if (projectManager) results.push(`   ✅ Project Manager infographic: public/infographics/${projectManager}`);
  
  if (results.length > 0) {
    console.log('\nGenerated infographics:');
    results.forEach(r => console.log(r));
  }
}

// Export for use in other scripts
module.exports = { generateInfographic };

// Run if called directly
if (require.main === module) {
  generateTestInfographics();
}