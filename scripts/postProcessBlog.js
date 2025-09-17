const fs = require('fs');
const path = require('path');

async function postProcessBlog(postId) {
  try {
    console.log(`🔗 Starting post-processing for ${postId}...\n`);
    
    const filePath = `./content/${postId}.md`;
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Post file not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Get available resources
    const resources = getAvailableResources();
    console.log(`📚 Found ${resources.length} available resources:`);
    resources.forEach(r => console.log(`   - ${r.title} (${r.slug})`));
    
    // Get other blog posts for internal linking
    const otherPosts = getOtherBlogPosts(postId);
    console.log(`\n📝 Found ${otherPosts.length} other blog posts for internal linking`);
    
    // Replace resource placeholders
    content = replaceResourcePlaceholders(content, resources);
    
    // Replace internal link placeholders  
    content = replaceInternalLinkPlaceholders(content, otherPosts);
    
    // Note: Image references are handled by Next.js dynamic routing - no inline images in post content
    
    // Add slide links automatically
    content = await addSlideLinksToContent(content, postId);
    
    // Add infographic links automatically
    content = await addInfographicLinksToContent(content, postId);

    // Add chart embeds automatically
    content = await addChartEmbedsToContent(content, postId);

    // Save processed content
    fs.writeFileSync(filePath, content);
    console.log(`\n✅ Post-processing complete for ${postId}`);
    console.log(`   Updated: ${filePath}`);
    
  } catch (error) {
    console.error('❌ Error in post-processing:', error.message || error);
  }
}

function getAvailableResources() {
  const resourcesDir = './resources';
  if (!fs.existsSync(resourcesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(resourcesDir).filter(f => f.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(resourcesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const title = lines[0].replace(/^#\s*/, '').trim();
    const slug = file.replace(/\.md$/, '');
    
    // Extract description from first paragraph
    let description = '';
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() && !lines[i].startsWith('#')) {
        description = lines[i].trim().substring(0, 150) + '...';
        break;
      }
    }
    
    return { slug, title, description };
  });
}

function getOtherBlogPosts(currentPostId) {
  const contentDir = './content';
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.md') && f !== `${currentPostId}.md`);
    
  return files.map(file => {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const title = lines[0].trim();
    const slug = file.replace(/\.md$/, '');
    
    return { slug, title };
  }).slice(0, 5); // Limit to 5 other posts
}

function replaceResourcePlaceholders(content, resources) {
  const resourceTemplates = [
    {
      placeholder: '{{RESOURCE_PLACEHOLDER_1}}',
      template: (resource) => `
<div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 24px; margin: 24px 0;">
<h4 style="color: #0891b2; margin: 0 0 12px 0;">📊 Free Resource</h4>
<h3 style="margin: 0 0 8px 0;"><a href="/resources/${resource.slug}" style="color: #1f2937; text-decoration: none;">${resource.title}</a></h3>
<p style="color: #6b7280; margin: 0 0 16px 0; font-size: 14px;">${resource.description}</p>
<a href="/resources/${resource.slug}" style="background: #0891b2; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 500; display: inline-block;">Download Free Resource →</a>
</div>`
    },
    {
      placeholder: '{{RESOURCE_PLACEHOLDER_2}}',
      template: (resource) => `
<p><b>💡 Related Resource:</b> <a href="/resources/${resource.slug}">${resource.title}</a> - ${resource.description}</p>`
    },
    {
      placeholder: '{{RESOURCE_PLACEHOLDER_3}}',
      template: (resource) => `
<div style="border-left: 4px solid #0891b2; padding-left: 16px; margin: 20px 0;">
<p><b>📋 Helpful Tool:</b></p>
<p><a href="/resources/${resource.slug}" style="color: #0891b2; font-weight: 500;">${resource.title}</a></p>
<p style="font-size: 14px; color: #6b7280;">${resource.description}</p>
</div>`
    }
  ];
  
  console.log('\n🔄 Replacing resource placeholders...');
  
  resourceTemplates.forEach((template, index) => {
    if (content.includes(template.placeholder) && resources[index]) {
      const resourceHtml = template.template(resources[index]);
      content = content.replace(template.placeholder, resourceHtml);
      console.log(`   ✅ Replaced ${template.placeholder} with ${resources[index].title}`);
    }
  });
  
  return content;
}

function replaceInternalLinkPlaceholders(content, otherPosts) {
  const linkTemplates = [
    {
      placeholder: '{{INTERNAL_LINK_1}}',
      template: (post) => `<p>For more insights, see our guide on <a href="/posts/${post.slug}">${post.title}</a>.</p>`
    },
    {
      placeholder: '{{INTERNAL_LINK_2}}',
      template: (post) => `<p>Related reading: <a href="/posts/${post.slug}">${post.title}</a></p>`
    }
  ];
  
  console.log('\n🔗 Replacing internal link placeholders...');
  
  linkTemplates.forEach((template, index) => {
    if (content.includes(template.placeholder) && otherPosts[index]) {
      const linkHtml = template.template(otherPosts[index]);
      content = content.replace(template.placeholder, linkHtml);
      console.log(`   ✅ Replaced ${template.placeholder} with link to ${otherPosts[index].title}`);
    }
  });
  
  return content;
}

// Image references removed - Next.js handles images via dynamic routing in /public directory
// Post thumbnails are automatically displayed by the blog layout component

// If called directly from command line
if (require.main === module) {
  const postId = process.argv[2];
  if (!postId) {
    console.error('❌ Please provide a post ID: node postProcessBlog.js post-12');
    process.exit(1);
  }
  postProcessBlog(postId);
}

async function addSlideLinksToContent(content, postId) {
  console.log('\n🎯 Adding slide links...');
  
  try {
    // Import the SlideLinksAdder functionality
    const { SlideLinksAdder } = require('./addSlideLinks');
    const adder = new SlideLinksAdder();
    
    // Check if slides exist for this post
    const slideCount = adder.getSlideCount(postId);
    if (slideCount === 0) {
      console.log(`   ⚠️ No slides found for ${postId}, skipping slide link addition`);
      return content;
    }
    
    // Check if slide links already exist
    if (content.includes('/resources/slides/')) {
      console.log(`   ✅ ${postId} already has slide links`);
      return content;
    }
    
    // Extract post title for slide section
    const postTitle = adder.extractPostTitle(content);
    const slideSection = adder.createSlideSection(postId, slideCount, postTitle);
    
    // Find a good place to insert slides early in the content
    // Look for the 2nd or 3rd major section (after introduction)
    const sectionPattern = /<p><b>[^<]+<\/b><\/p>/g;
    const sections = [...content.matchAll(sectionPattern)];
    
    if (sections.length >= 2) {
      // Insert after the 2nd major section
      const insertPoint = sections[1].index + sections[1][0].length;
      const beforeSlides = content.substring(0, insertPoint);
      const afterSlides = content.substring(insertPoint);
      content = beforeSlides + '\n\n' + slideSection + '\n' + afterSlides;
      console.log(`   ✅ Added slide links after 2nd section in ${postId}`);
    } else if (sections.length >= 1) {
      // Insert after the 1st major section if only 1 exists
      const insertPoint = sections[0].index + sections[0][0].length;
      const beforeSlides = content.substring(0, insertPoint);
      const afterSlides = content.substring(insertPoint);
      content = beforeSlides + '\n\n' + slideSection + '\n' + afterSlides;
      console.log(`   ✅ Added slide links after 1st section in ${postId}`);
    } else {
      // Fallback: add before "Related Articles" or "Conclusion"
      if (content.includes('<p><b>Related Articles</b></p>')) {
        content = content.replace(
          '<p><b>Related Articles</b></p>',
          `${slideSection}\n<p><b>Related Articles</b></p>`
        );
        console.log(`   ✅ Added slide links before Related Articles in ${postId}`);
      } else if (content.includes('<p><b>Conclusion</b></p>')) {
        content = content.replace(
          '<p><b>Conclusion</b></p>',
          `${slideSection}\n<p><b>Conclusion</b></p>`
        );
        console.log(`   ✅ Added slide links before Conclusion in ${postId}`);
      } else {
        // Add at the end if no standard sections found
        content = content.trim() + '\n\n' + slideSection;
        console.log(`   ✅ Added slide links to end of ${postId}`);
      }
    }
    
    return content;
    
  } catch (error) {
    console.error(`   ❌ Error adding slide links to ${postId}:`, error.message);
    return content; // Return original content if there's an error
  }
}

async function addInfographicLinksToContent(content, postId) {
  console.log('\n📊 Adding infographic links...');
  
  try {
    // Check if infographic exists for this post
    const infographicPath = `./public/resources/infographics/${postId}/infographic.html`;
    if (!fs.existsSync(infographicPath)) {
      console.log(`   ⚠️ No infographic found for ${postId}, skipping infographic link addition`);
      return content;
    }
    
    // Check if infographic links already exist
    if (content.includes('/resources/infographics/')) {
      console.log(`   ✅ ${postId} already has infographic links`);
      return content;
    }
    
    // Extract post title for infographic section
    const lines = content.split('\n');
    const postTitle = lines[0].trim();
    
    // Create infographic section
    const infographicSection = `
<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 2px solid #FF6600; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
<h4 style="color: #FF6600; margin: 0 0 12px 0; font-family: 'Courier New', monospace;">🏗️ Visual Summary</h4>
<h3 style="color: #ffffff; margin: 0 0 16px 0;">Quick Reference Infographic</h3>
<p style="color: #FEFCE8; margin: 0 0 20px 0; opacity: 0.9;">Get the key takeaways from this article in a visual format perfect for sharing or quick reference.</p>
<a href="/resources/infographics/${postId}/infographic.html" style="background: linear-gradient(135deg, #FF6600 0%, #FF8533 100%); color: #0f172a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 8px rgba(255, 102, 0, 0.3);">View Infographic →</a>
</div>`;
    
    // Add infographic section at the end, before Related Articles or Conclusion if they exist
    if (content.includes('<p><b>Related Articles</b></p>')) {
      content = content.replace(
        '<p><b>Related Articles</b></p>',
        `${infographicSection}\n<p><b>Related Articles</b></p>`
      );
      console.log(`   ✅ Added infographic links before Related Articles in ${postId}`);
    } else if (content.includes('<p><b>Conclusion</b></p>')) {
      content = content.replace(
        '<p><b>Conclusion</b></p>',
        `${infographicSection}\n<p><b>Conclusion</b></p>`
      );
      console.log(`   ✅ Added infographic links before Conclusion in ${postId}`);
    } else {
      // Add at the very end
      content = content.trim() + '\n\n' + infographicSection;
      console.log(`   ✅ Added infographic links to end of ${postId}`);
    }
    
    return content;
    
  } catch (error) {
    console.error(`   ❌ Error adding infographic links to ${postId}:`, error.message);
    return content; // Return original content if there's an error
  }
}

async function addChartEmbedsToContent(content, postId) {
  console.log('\n📊 Adding AI-powered chart embeds...');

  try {
    // Check if charts already exist
    if (content.includes('<!-- charts-generated -->')) {
      console.log(`   ✅ ${postId} already has AI-generated charts`);
      return content;
    }

    // Use AI-powered chart generation
    const { AIChartGenerator } = require('./generateAICharts');
    const generator = new AIChartGenerator();

    // Save the content temporarily to a file for AI processing
    const fs = require('fs');
    const matter = require('gray-matter');
    const postPath = `./content/${postId}.md`;

    // Read the current file to get frontmatter
    const currentContent = fs.readFileSync(postPath, 'utf-8');
    const { data } = matter(currentContent);

    // Save the updated content temporarily
    const tempFile = matter.stringify(content, data);
    fs.writeFileSync(postPath, tempFile);

    // Generate charts with AI
    const result = await generator.generateChartsWithAI(postId);

    if (result) {
      // Read back the updated content with charts
      const updatedContent = fs.readFileSync(postPath, 'utf-8');
      const { content: newContent } = matter(updatedContent);
      console.log(`   ✅ AI successfully generated charts for ${postId}`);
      return newContent;
    } else {
      console.log(`   ℹ️ No suitable charts generated for ${postId}`);
      return content;
    }

  } catch (error) {
    console.error(`   ❌ Error adding AI chart embeds to ${postId}:`, error.message);

    // Fallback to simple chart generation if AI fails
    try {
      console.log('   🔄 Attempting fallback chart generation...');
      const { ChartEmbedder } = require('./addChartEmbeds');
      const embedder = new ChartEmbedder();

      const chartableData = embedder.extractChartableData(content);
      if (chartableData.length > 0) {
        let updatedContent = content;
        const chartsToAdd = chartableData.slice(0, 2);

        for (const chartData of chartsToAdd) {
          const chartHtml = embedder.generateChartHtml(chartData, postId);
          const insertPoint = embedder.findInsertionPoint(updatedContent, chartData.placement);

          const beforeChart = updatedContent.substring(0, insertPoint);
          const afterChart = updatedContent.substring(insertPoint);

          updatedContent = beforeChart + '\n\n' + chartHtml + '\n' + afterChart;
        }

        if (!updatedContent.includes('chart.js')) {
          const chartjsCdn = `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`;
          updatedContent = chartjsCdn + '\n\n' + updatedContent;
        }

        console.log(`   ✅ Fallback: Added ${chartsToAdd.length} chart(s) to ${postId}`);
        return updatedContent;
      }
    } catch (fallbackError) {
      console.error(`   ❌ Fallback also failed:`, fallbackError.message);
    }

    return content; // Return original content if all attempts fail
  }
}

module.exports = { postProcessBlog };