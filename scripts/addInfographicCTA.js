const fs = require('fs');
const path = require('path');

// Define which posts get which infographic CTAs
const infographicCTAs = {
  'post-8': {
    text: 'Download our Project Manager\'s Change Order Infographic',
    link: '/resources/infographics#project-manager'
  },
  'post-9': {
    text: 'Download our Supplier\'s Change Order Infographic',
    link: '/resources/infographics#supplier'
  },
  'post-10': {
    text: 'Download our Change Order Management Infographic',
    link: '/resources/infographics'
  },
  'post-11': {
    text: 'Download our Procurement Change Order Infographic',
    link: '/resources/infographics'
  },
  'post-12': {
    text: 'Download our Change Order Impact Infographic',
    link: '/resources/infographics'
  },
  'post-13': {
    text: 'Download our Change Order Process Infographic',
    link: '/resources/infographics'
  },
  'post-14': {
    text: 'Download our Change Order Drivers Infographic',
    link: '/resources/infographics'
  },
  'post-15': {
    text: 'Download our Hidden Costs Infographic',
    link: '/resources/infographics'
  }
};

function createInfographicCTA(ctaInfo) {
  return `
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin: 32px 0; text-align: center;">
  <p style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 12px;">📊 Visual Learning Resource</p>
  <p style="color: rgba(255,255,255,0.9); margin-bottom: 20px;">${ctaInfo.text} - perfect for team meetings and presentations!</p>
  <a href="${ctaInfo.link}" style="display: inline-block; background: white; color: #667eea; padding: 12px 32px; border-radius: 8px; font-weight: bold; text-decoration: none;">Download Infographic →</a>
</div>`;
}

async function addInfographicCTAs() {
  try {
    console.log('📊 Adding infographic CTAs to blog posts...\n');
    
    const contentDir = './content';
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const postId = path.basename(file, '.md');
      const filePath = path.join(contentDir, file);
      
      // Read current content
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Check if infographic CTA already exists
      if (content.includes('Visual Learning Resource')) {
        console.log(`⏭️  ${postId}: Infographic CTA already exists, skipping`);
        continue;
      }
      
      // Get CTA info for this post
      const ctaInfo = infographicCTAs[postId];
      if (!ctaInfo) {
        console.log(`⚠️  ${postId}: No infographic CTA defined, skipping`);
        continue;
      }
      
      // Add infographic CTA before Related Articles section
      const infographicCTA = createInfographicCTA(ctaInfo);
      
      // Find the Related Articles section and insert before it
      if (content.includes('<p><b>Related Articles</b></p>')) {
        content = content.replace('<p><b>Related Articles</b></p>', infographicCTA + '\n<p><b>Related Articles</b></p>');
      } else if (content.includes('<p><b>Conclusion</b></p>')) {
        // If no related articles, add before conclusion
        content = content.replace('<p><b>Conclusion</b></p>', infographicCTA + '\n<p><b>Conclusion</b></p>');
      } else {
        // If neither exists, add at the end
        content = content.trim() + infographicCTA;
      }
      
      // Write updated content
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${postId}: Added infographic CTA`);
    }
    
    console.log('\n🎉 Infographic CTAs added to all posts!');
    
  } catch (error) {
    console.error('❌ Error adding infographic CTAs:', error.message || error);
  }
}

addInfographicCTAs();