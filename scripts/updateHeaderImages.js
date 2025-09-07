#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Update header images to add "TYPE: POST" and reading time
 * Usage: npm run update-header-images [post-slug] (optional)
 */

// Function to calculate reading time based on post content
function calculateReadingTime(content) {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTimeMinutes} MIN READ`;
}

// Function to get post content and calculate reading time
function getPostReadingTime(slug) {
  try {
    const contentPath = path.join(process.cwd(), 'content', `${slug}.md`);
    if (!fs.existsSync(contentPath)) {
      return '5 MIN READ'; // Default fallback
    }
    
    const content = fs.readFileSync(contentPath, 'utf8');
    return calculateReadingTime(content);
  } catch (error) {
    console.warn(`⚠️  Could not calculate reading time for ${slug}, using default`);
    return '5 MIN READ';
  }
}

// Function to create text overlay using SVG
function createTextOverlay(readingTime) {
  const width = 800;
  const height = 400;
  
  // Create SVG with text overlays
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Top right: TYPE: POST -->
      <text x="${width - 20}" y="40" 
            font-family="Arial, sans-serif" 
            font-size="14" 
            font-weight="bold" 
            fill="white" 
            text-anchor="end">TYPE: POST</text>
      
      <!-- Bottom left: Reading time -->
      <text x="20" y="${height - 20}" 
            font-family="Arial, sans-serif" 
            font-size="16" 
            font-weight="bold" 
            fill="white" 
            text-anchor="start">${readingTime}</text>
    </svg>
  `;
  
  return Buffer.from(svg);
}

async function updateHeaderImage(slug) {
  const originalImagePath = path.join(process.cwd(), 'public', `${slug}.jpeg`);
  const backupImagePath = path.join(process.cwd(), 'public', `${slug}_original.jpeg`);
  
  try {
    console.log(`🖼️  Processing: ${slug}`);
    
    // Check if original image exists
    if (!fs.existsSync(originalImagePath)) {
      console.log(`⚠️  Skipping ${slug} - image not found`);
      return false;
    }
    
    // Create backup if it doesn't exist
    if (!fs.existsSync(backupImagePath)) {
      fs.copyFileSync(originalImagePath, backupImagePath);
      console.log(`💾 Created backup: ${slug}_original.jpeg`);
    }
    
    // Get reading time for this post
    const readingTime = getPostReadingTime(slug);
    
    // Create text overlay
    const textOverlay = createTextOverlay(readingTime);
    
    // Process the image
    const image = sharp(originalImagePath);
    const metadata = await image.metadata();
    
    // Create the text overlay as a separate layer
    const overlayImage = await sharp(textOverlay)
      .resize(metadata.width, metadata.height)
      .png()
      .toBuffer();
    
    // Composite the overlay onto the original image
    await image
      .composite([{
        input: overlayImage,
        blend: 'over'
      }])
      .jpeg({ quality: 90 })
      .toFile(originalImagePath + '.tmp');
    
    // Replace the original with the updated version
    fs.renameSync(originalImagePath + '.tmp', originalImagePath);
    
    console.log(`✅ Updated header image for ${slug} (${readingTime})`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error processing ${slug}:`, error.message);
    return false;
  }
}

async function processAllImages() {
  const publicDir = path.join(process.cwd(), 'public');
  
  // Find all post images
  const files = fs.readdirSync(publicDir)
    .filter(file => file.match(/^post-\d+\.jpeg$/))
    .sort();
    
  if (files.length === 0) {
    console.log('📭 No post header images found');
    return;
  }
  
  console.log(`🚀 Processing ${files.length} header images...`);
  
  let processed = 0;
  let updated = 0;
  let failed = 0;
  
  for (const file of files) {
    const slug = file.replace('.jpeg', '');
    processed++;
    
    try {
      const result = await updateHeaderImage(slug);
      if (result) {
        updated++;
      }
    } catch (error) {
      console.error(`❌ Failed to process ${slug}:`, error.message);
      failed++;
    }
    
    // Small delay to avoid overwhelming the system
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n📈 Summary:`);
  console.log(`   📝 Total images processed: ${processed}`);
  console.log(`   ✅ Images updated: ${updated}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`\n🖼️  Header images have been updated with TYPE: POST and reading times!`);
}

async function processSingleImage(slug) {
  console.log(`🎯 Processing single image: ${slug}`);
  
  const result = await updateHeaderImage(slug);
  
  if (result) {
    console.log(`🎉 Header image updated successfully for ${slug}!`);
  } else {
    console.log(`⚠️  No changes made to ${slug}`);
  }
}

function showUsage() {
  console.log('🖼️  Header Image Update Tool');
  console.log('');
  console.log('📖 Usage:');
  console.log('   npm run update-header-images              Update all post header images');
  console.log('   npm run update-header-images <post-slug>  Update specific post image');
  console.log('');
  console.log('💡 Examples:');
  console.log('   npm run update-header-images');
  console.log('   npm run update-header-images post-8');
  console.log('');
  console.log('📋 What it does:');
  console.log('   - Adds "TYPE: POST" to top right corner');
  console.log('   - Calculates and adds reading time to bottom left');
  console.log('   - Creates backup copies as *_original.jpeg');
  console.log('   - Preserves original image quality');
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'help' || command === '--help' || command === '-h') {
    showUsage();
    return;
  }
  
  try {
    if (command) {
      // Process single image
      await processSingleImage(command);
    } else {
      // Process all images
      await processAllImages();
    }
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();