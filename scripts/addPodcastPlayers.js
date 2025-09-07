#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Add podcast player placeholders to blog posts
 * Usage: npm run add-podcast-players [post-slug] (optional - if not provided, processes all posts)
 */

function createPodcastPlayerHTML(slug) {
  return `<div style="background: linear-gradient(135deg, #2D3748 0%, #4A5568 100%); padding: 20px; border-radius: 12px; margin: 24px 0; border: 1px solid #E2E8F0;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>
    <div>
      <h3 style="color: white; margin: 0; font-size: 18px; font-weight: bold;">Not enough time to read?</h3>
      <p style="color: #CBD5E0; margin: 0; font-size: 14px;">Listen in on this conversation to get the main takeaways</p>
    </div>
  </div>
  <audio controls style="width: 100%; background: #1A202C; border-radius: 6px;">
    <source src="/podcasts/audio/${slug}.wav" type="audio/wav">
    Your browser does not support the audio element.
  </audio>
  <div style="margin-top: 12px; text-align: center;">
    <a href="/podcasts/transcripts/${slug}-transcript.txt" 
       style="color: #667eea; text-decoration: none; font-size: 14px; display: inline-flex; align-items: center; gap: 4px;"
       target="_blank">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
      </svg>
      View Transcript
    </a>
  </div>
</div>

`;
}

function addPodcastPlayerToPost(filePath, slug) {
  try {
    console.log(`📝 Processing: ${slug}`);
    
    // Read the current post content
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Check if podcast player already exists
    if (content.includes('Not enough time to read?')) {
      console.log(`⏭️  Skipping ${slug} - podcast player already exists`);
      return false;
    }
    
    // Check if podcast audio file exists
    const audioPath = path.join(process.cwd(), 'public', 'podcasts', 'audio', `${slug}.wav`);
    const transcriptPath = path.join(process.cwd(), 'public', 'podcasts', 'transcripts', `${slug}-transcript.txt`);
    
    if (!fs.existsSync(audioPath) && !fs.existsSync(transcriptPath)) {
      console.log(`⚠️  Skipping ${slug} - no podcast files found`);
      return false;
    }
    
    // Find the insertion point (after title, before main content)
    let insertIndex = 1; // Default after title
    
    // Skip any empty lines after the title
    while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
      insertIndex++;
    }
    
    // Create the podcast player HTML
    const podcastPlayerHTML = createPodcastPlayerHTML(slug);
    
    // Insert the podcast player
    lines.splice(insertIndex, 0, '', podcastPlayerHTML.trim(), '');
    
    // Write the updated content back to the file
    const updatedContent = lines.join('\n');
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    
    console.log(`✅ Added podcast player to ${slug}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error processing ${slug}:`, error.message);
    return false;
  }
}

function processAllPosts() {
  const contentDir = path.join(process.cwd(), 'content');
  
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory not found');
    process.exit(1);
  }
  
  const files = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md'))
    .sort();
    
  if (files.length === 0) {
    console.log('📭 No markdown files found in content directory');
    return;
  }
  
  console.log(`🚀 Processing ${files.length} blog posts...`);
  
  let processed = 0;
  let added = 0;
  let skipped = 0;
  
  files.forEach(file => {
    const slug = file.replace('.md', '');
    const filePath = path.join(contentDir, file);
    
    processed++;
    const result = addPodcastPlayerToPost(filePath, slug);
    
    if (result) {
      added++;
    } else {
      skipped++;
    }
  });
  
  console.log(`\n📈 Summary:`);
  console.log(`   📝 Total posts processed: ${processed}`);
  console.log(`   ✅ Podcast players added: ${added}`);
  console.log(`   ⏭️  Posts skipped: ${skipped}`);
  console.log(`\n🎧 Podcast players have been added to posts with available audio/transcript files!`);
}

function processSinglePost(slug) {
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Post not found: ${slug}`);
    console.log('💡 Available posts:');
    
    const contentDir = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
      
    files.forEach(file => console.log(`   📝 ${file}`));
    process.exit(1);
  }
  
  console.log(`🎯 Processing single post: ${slug}`);
  const result = addPodcastPlayerToPost(filePath, slug);
  
  if (result) {
    console.log(`🎉 Podcast player added successfully to ${slug}!`);
  } else {
    console.log(`⚠️  No changes made to ${slug}`);
  }
}

function showUsage() {
  console.log('🎧 Podcast Player Integration Tool');
  console.log('');
  console.log('📖 Usage:');
  console.log('   npm run add-podcast-players              Add players to all posts with podcast files');
  console.log('   npm run add-podcast-players <post-slug>  Add player to specific post');
  console.log('');
  console.log('💡 Examples:');
  console.log('   npm run add-podcast-players');
  console.log('   npm run add-podcast-players post-8');
  console.log('');
  console.log('📋 Requirements:');
  console.log('   - Post file must exist in /content/');
  console.log('   - Audio file should exist in /public/podcasts/audio/');
  console.log('   - Or transcript file should exist in /public/podcasts/transcripts/');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'help' || command === '--help' || command === '-h') {
    showUsage();
    return;
  }
  
  if (command) {
    // Process single post
    processSinglePost(command);
  } else {
    // Process all posts
    processAllPosts();
  }
}

// Run the script
main();