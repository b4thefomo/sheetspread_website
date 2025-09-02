const fs = require('fs');
const path = require('path');

/**
 * Sanitizes content by removing unwanted formatting
 * Can be run standalone or called from other scripts
 */
function sanitizeContent(content) {
  // Remove -- (double dashes) that appear in the content
  let sanitized = content;
  
  // Replace standalone -- with single dash
  sanitized = sanitized.replace(/\s--\s/g, ' - ');
  
  // Replace -- at beginning of lines with bullet points
  sanitized = sanitized.replace(/^--\s/gm, '• ');
  
  // Replace remaining -- with single dash
  sanitized = sanitized.replace(/--/g, '-');
  
  // Additional sanitization can be added here
  // For example:
  // - Remove extra whitespace
  sanitized = sanitized.replace(/\s{3,}/g, '  ');
  // - Ensure proper spacing around punctuation
  sanitized = sanitized.replace(/\s+([.,!?;:])/g, '$1');
  // - Fix spacing after punctuation
  sanitized = sanitized.replace(/([.,!?;:])([A-Za-z])/g, '$1 $2');
  
  return sanitized;
}

/**
 * Sanitizes a single file
 */
function sanitizeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const sanitized = sanitizeContent(content);
    
    if (content !== sanitized) {
      fs.writeFileSync(filePath, sanitized);
      console.log(`✅ Sanitized: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⏭️  No changes needed: ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error sanitizing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Sanitizes all markdown files in the content directory
 */
function sanitizeAllContent() {
  console.log('🧹 Starting content sanitization...\n');
  
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
  
  let sanitizedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    if (sanitizeFile(filePath)) {
      sanitizedCount++;
    }
  }
  
  console.log(`\n✨ Sanitization complete!`);
  console.log(`   Files processed: ${files.length}`);
  console.log(`   Files modified: ${sanitizedCount}`);
}

/**
 * Sanitizes content for a specific post ID
 * Useful when called from createNextPost.js
 */
function sanitizePost(postId) {
  const filePath = `./content/${postId}.md`;
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Post file not found: ${filePath}`);
    return false;
  }
  
  console.log(`🧹 Sanitizing ${postId}...`);
  return sanitizeFile(filePath);
}

// Export for use in other scripts
module.exports = {
  sanitizeContent,
  sanitizeFile,
  sanitizePost,
  sanitizeAllContent
};

// Run if called directly
if (require.main === module) {
  // Check if a specific post ID was provided
  const args = process.argv.slice(2);
  
  if (args.length > 0 && args[0]) {
    // Sanitize specific post
    sanitizePost(args[0]);
  } else {
    // Sanitize all content
    sanitizeAllContent();
  }
}