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

// If called directly from command line
if (require.main === module) {
  const postId = process.argv[2];
  if (!postId) {
    console.error('❌ Please provide a post ID: node postProcessBlog.js post-12');
    process.exit(1);
  }
  postProcessBlog(postId);
}

module.exports = { postProcessBlog };