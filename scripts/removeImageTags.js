const fs = require('fs');
const path = require('path');

/**
 * Removes image tags from blog post content
 */
function removeImageTags(content) {
  // Remove various patterns of image tags that might appear
  let cleaned = content;
  
  // Remove <img src="/public/post-*.jpeg" ... /> pattern
  cleaned = cleaned.replace(/<img\s+src="\/public\/post-[^"]*\.[^"]*"[^>]*\/?>/gi, '');
  
  // Remove <img src="/public/post-*.png" ... /> pattern  
  cleaned = cleaned.replace(/<img\s+src="\/public\/post-[^"]*\.[^"]*"[^>]*\/?>/gi, '');
  
  // Remove generic image placeholders
  cleaned = cleaned.replace(/<img\s+src="{{IMAGE_PLACEHOLDER}}"[^>]*\/?>/gi, '');
  
  // Remove alt text image tags
  cleaned = cleaned.replace(/<img\s+src="[^"]*"\s+alt="[^"]*"[^>]*\/?>/gi, '');
  
  // Clean up any extra whitespace left behind
  cleaned = cleaned.replace(/^\s*$/gm, ''); // Remove empty lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n'); // Replace multiple newlines with double newlines
  
  return cleaned.trim();
}

/**
 * Remove image tags from all blog posts
 */
function removeImageTagsFromPosts() {
  console.log('🖼️  Removing image tags from blog posts...\n');
  
  const contentDir = './content';
  
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory not found');
    return;
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('⚠️  No markdown files found in content directory');
    return;
  }
  
  let modifiedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const postId = path.basename(file, '.md');
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const cleanedContent = removeImageTags(content);
      
      if (content !== cleanedContent) {
        fs.writeFileSync(filePath, cleanedContent);
        console.log(`✅ ${postId}: Removed image tags`);
        modifiedCount++;
      } else {
        console.log(`⏭️  ${postId}: No image tags found`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${postId}:`, error.message);
    }
  }
  
  console.log(`\n✨ Image tag removal complete!`);
  console.log(`   Files processed: ${files.length}`);
  console.log(`   Files modified: ${modifiedCount}`);
}

// Export for use in other scripts
module.exports = { removeImageTags, removeImageTagsFromPosts };

// Run if called directly
if (require.main === module) {
  removeImageTagsFromPosts();
}