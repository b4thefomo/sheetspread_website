const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class InfographicGenerator {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.templatePath = path.join(process.cwd(), 'resources', 'infographics', 'templates', 'infographic-template.html');
    this.outputDir = path.join(process.cwd(), 'public', 'resources', 'infographics');
  }

  async extractInfographicData(postContent, postTitle) {
    console.log(`🤖 Extracting infographic data for: ${postTitle}`);
    
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    
    const prompt = `Analyze this blog post content and extract data for an infographic:

Title: ${postTitle}
Content: ${postContent}

Extract the following in JSON format:
{
  "stats": [
    {"number": "3-5", "label": "Key Benefits"},
    {"number": "15%", "label": "Cost Reduction"},
    {"number": "24hrs", "label": "Processing Time"},
    {"number": "100%", "label": "Documentation"}
  ],
  "keyPoints": [
    {"icon": "⚡", "text": "Process changes quickly and efficiently"},
    {"icon": "💰", "text": "Control costs with proper documentation"},
    {"icon": "🎯", "text": "Focus on value-driven decisions"},
    {"icon": "🔄", "text": "Implement systematic workflows"},
    {"icon": "📊", "text": "Track performance metrics"},
    {"icon": "🤝", "text": "Maintain stakeholder relationships"}
  ]
}

Requirements:
- Extract 4 key statistics or metrics (can be numbers, percentages, timeframes)
- Create exactly 6 key points with relevant construction/management icons
- Focus on actionable insights and quantifiable benefits
- Use construction management terminology
- Keep text concise (under 50 characters per point)
- If no specific numbers exist, create reasonable estimates based on industry standards

Return only the JSON, no additional text.`;

    try {
      const result = await model.generateContent(prompt);
      const jsonText = result.response.text().trim();
      
      // Clean up the response to ensure it's valid JSON
      const cleanedJson = jsonText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .replace(/^\s*[\r\n]/gm, '');
      
      return JSON.parse(cleanedJson);
    } catch (error) {
      console.error(`❌ Error extracting infographic data: ${error.message}`);
      
      // Return fallback data
      return {
        stats: [
          {"number": "5+", "label": "Key Strategies"},
          {"number": "25%", "label": "Efficiency Gain"},
          {"number": "Fast", "label": "Implementation"},
          {"number": "Pro", "label": "Results"}
        ],
        keyPoints: [
          {"icon": "⚡", "text": "Streamline your processes"},
          {"icon": "💰", "text": "Control project costs"},
          {"icon": "🎯", "text": "Focus on outcomes"},
          {"icon": "🔄", "text": "Improve workflows"},
          {"icon": "📊", "text": "Measure performance"},
          {"icon": "🤝", "text": "Build relationships"}
        ]
      };
    }
  }

  generateStatsSection(stats) {
    return stats.map(stat => `
                <div class="stat-card">
                    <span class="stat-number">${stat.number}</span>
                    <span class="stat-label">${stat.label}</span>
                </div>`).join('');
  }

  generateKeyPointsSection(keyPoints) {
    return keyPoints.map(point => `
                    <div class="point-item">
                        <div class="point-icon">${point.icon}</div>
                        <div class="point-text">${point.text}</div>
                    </div>`).join('');
  }

  async generateInfographic(postSlug) {
    const postPath = path.join(process.cwd(), 'content', `${postSlug}.md`);
    
    if (!fs.existsSync(postPath)) {
      console.log(`❌ Post file not found: ${postPath}`);
      return false;
    }

    try {
      console.log(`🎯 Generating infographic for: ${postSlug}`);
      
      const postContent = fs.readFileSync(postPath, 'utf-8');
      const lines = postContent.split('\n');
      const postTitle = lines[0].trim().replace(/\[.*?\]/g, '').trim();
      
      // Extract infographic data using AI
      const infographicData = await this.extractInfographicData(postContent, postTitle);
      
      // Read template
      const template = fs.readFileSync(this.templatePath, 'utf-8');
      
      // Generate sections
      const statsSection = this.generateStatsSection(infographicData.stats);
      const keyPointsSection = this.generateKeyPointsSection(infographicData.keyPoints);
      
      // Replace placeholders
      let infographicHtml = template
        .replace(/{{POST_TITLE}}/g, postTitle)
        .replace(/{{POST_SLUG}}/g, postSlug)
        .replace(/{{STATS_SECTION}}/g, statsSection)
        .replace(/{{KEY_POINTS_SECTION}}/g, keyPointsSection);
      
      // Ensure output directory exists
      const outputPath = path.join(this.outputDir, postSlug);
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      // Save infographic
      const infographicPath = path.join(outputPath, 'infographic.html');
      fs.writeFileSync(infographicPath, infographicHtml);
      
      // Save data for reference
      const dataPath = path.join(outputPath, 'infographic-data.json');
      fs.writeFileSync(dataPath, JSON.stringify({
        title: postTitle,
        slug: postSlug,
        generatedAt: new Date().toISOString(),
        ...infographicData
      }, null, 2));
      
      console.log(`✅ Infographic generated: ${infographicPath}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Error generating infographic for ${postSlug}:`, error.message);
      return false;
    }
  }

  async generateAllInfographics() {
    console.log('🎯 Generating infographics for all posts...\n');
    
    const contentDir = path.join(process.cwd(), 'content');
    const postFiles = fs.readdirSync(contentDir)
      .filter(file => file.match(/^post-\d+\.md$/))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      });
    
    let successCount = 0;
    
    for (const file of postFiles) {
      const postSlug = file.replace('.md', '');
      const success = await this.generateInfographic(postSlug);
      if (success) successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n🎉 Infographic generation complete!`);
    console.log(`   Generated: ${successCount}/${postFiles.length} infographics`);
    
    return successCount;
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  const generator = new InfographicGenerator();
  
  if (args.length === 0) {
    console.log('📋 Usage:');
    console.log('  Generate all: node scripts/generateInfographics.js all');
    console.log('  Generate one: node scripts/generateInfographics.js post-15');
    return;
  }
  
  if (args[0] === 'all') {
    await generator.generateAllInfographics();
  } else {
    const postSlug = args[0];
    await generator.generateInfographic(postSlug);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { InfographicGenerator };