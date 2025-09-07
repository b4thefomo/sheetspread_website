#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import our modules
async function main() {
  try {    
    // Import the podcast generator
    const { PodcastGenerator } = require('../lib/podcastGenerator.js');
    const { getAllPosts, getPostBySlug } = require('../lib/posts.js');

    // Check for required API key
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ Error: GOOGLE_API_KEY or GEMINI_API_KEY environment variable is required');
      console.log('💡 Add your Google API key to .env file:');
      console.log('   GOOGLE_API_KEY=your_api_key_here');
      console.log('   or GEMINI_API_KEY=your_api_key_here');
      process.exit(1);
    }

    // Initialize podcast generator
    const podcastGenerator = new PodcastGenerator(apiKey);

    // Parse command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    const postSlug = args[1];

    switch (command) {
      case 'generate':
        if (!postSlug) {
          console.error('❌ Error: Post slug is required');
          console.log('📖 Usage: npm run generate-podcast generate post-8');
          process.exit(1);
        }
        await generateSinglePodcast(podcastGenerator, postSlug, getPostBySlug, getAllPosts);
        break;

      case 'generate-all':
        await generateAllPodcasts(podcastGenerator, getAllPosts);
        break;

      case 'test':
        await testPodcastGeneration(podcastGenerator);
        break;

      case 'list':
        await listAvailablePosts(getAllPosts);
        break;

      default:
        showUsage();
        break;
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

/**
 * Generate podcast for a single post
 */
async function generateSinglePodcast(podcastGenerator, slug, getPostBySlug, getAllPosts) {
  try {
    console.log(`🎯 Generating podcast for post: ${slug}`);
    
    const post = getPostBySlug(slug);
    
    if (!post) {
      console.error(`❌ Post not found: ${slug}`);
      console.log('💡 Available posts:');
      await listAvailablePosts(getAllPosts);
      return;
    }

    // Generate podcast
    const result = await podcastGenerator.generatePodcastFromPost(
      post.title,
      post.content,
      post.slug
    );

    console.log('\n🎉 Podcast generation completed!');
    console.log(`📁 Files created:`);
    console.log(`   🔊 Audio: /public/podcasts/audio/${path.basename(result.audioPath || 'N/A')}`);
    console.log(`   📝 Transcript: /public/podcasts/transcripts/${path.basename(result.transcriptPath)}`);
    console.log(`⏱️  Estimated duration: ${Math.round(result.duration / 60)} minutes ${Math.round(result.duration % 60)} seconds`);

  } catch (error) {
    console.error('❌ Error generating podcast:', error.message);
    throw error;
  }
}

/**
 * Generate podcasts for all posts
 */
async function generateAllPodcasts(podcastGenerator, getAllPosts) {
  try {
    console.log('🚀 Generating podcasts for all posts...');
    
    const posts = getAllPosts();
    
    if (posts.length === 0) {
      console.log('⚠️  No posts found in content directory');
      return;
    }

    console.log(`📊 Found ${posts.length} posts to process`);
    
    let successful = 0;
    let failed = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      console.log(`\n[${i + 1}/${posts.length}] Processing: ${post.slug}`);
      
      try {
        // Check if podcast already exists
        const audioPath = path.join(process.cwd(), 'public', 'podcasts', 'audio', `${post.slug}.wav`);
        if (fs.existsSync(audioPath)) {
          console.log(`⏭️  Skipping ${post.slug} - podcast already exists`);
          continue;
        }

        const result = await podcastGenerator.generatePodcastFromPost(
          post.title,
          post.content,
          post.slug
        );
        
        console.log(`✅ Success: ${post.slug}`);
        successful++;
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ Failed: ${post.slug} - ${error.message}`);
        failed++;
      }
    }

    console.log(`\n📈 Generation Summary:`);
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📁 Audio files: /public/podcasts/audio/`);
    console.log(`   📝 Transcripts: /public/podcasts/transcripts/`);

  } catch (error) {
    console.error('❌ Error in batch generation:', error.message);
    throw error;
  }
}

/**
 * Test podcast generation with sample content
 */
async function testPodcastGeneration(podcastGenerator) {
  console.log('🧪 Testing podcast generation with sample content...');
  
  const testTitle = "Test Podcast Generation";
  const testContent = `
    <p><b>Testing TTS System</b></p>
    <p>This is a test of our text-to-speech podcast generation system. We're converting blog content into conversational audio format.</p>
    <ul>
      <li><b>Key feature:</b> Multi-speaker voice generation</li>
      <li><b>Output format:</b> WAV audio files with transcripts</li>
      <li><b>Use case:</b> Converting technical blog posts into accessible podcast content</li>
    </ul>
    <p>The system should create engaging dialogue between our two hosts discussing the main points of the content.</p>
  `;
  
  try {
    const result = await podcastGenerator.generatePodcastFromPost(
      testTitle,
      testContent,
      'test-podcast'
    );
    
    console.log('\n✅ Test completed successfully!');
    console.log('🔊 Test audio file:', path.basename(result.audioPath));
    console.log('📝 Test transcript:', path.basename(result.transcriptPath));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  }
}

/**
 * List available posts
 */
async function listAvailablePosts(getAllPosts) {
  try {
    const posts = getAllPosts();
    
    if (posts.length === 0) {
      console.log('📭 No posts found in content directory');
      return;
    }

    console.log('📚 Available posts:');
    posts.forEach((post, index) => {
      const podcastExists = fs.existsSync(
        path.join(process.cwd(), 'public', 'podcasts', 'audio', `${post.slug}.wav`)
      );
      const status = podcastExists ? '🎧' : '📝';
      console.log(`   ${status} ${post.slug} - ${post.title}`);
    });
    
    console.log('\n🎧 = Podcast exists | 📝 = No podcast yet');
    
  } catch (error) {
    console.error('❌ Error listing posts:', error.message);
  }
}

/**
 * Show usage information
 */
function showUsage() {
  console.log('🎙️  SailsMaps Podcast Generator');
  console.log('');
  console.log('📖 Usage:');
  console.log('   npm run generate-podcast generate <post-slug>  Generate podcast for specific post');
  console.log('   npm run generate-podcast generate-all         Generate podcasts for all posts');
  console.log('   npm run generate-podcast test                 Test with sample content');
  console.log('   npm run generate-podcast list                 List available posts');
  console.log('');
  console.log('💡 Examples:');
  console.log('   npm run generate-podcast generate post-8');
  console.log('   npm run generate-podcast generate-all');
  console.log('   npm run generate-podcast list');
  console.log('');
  console.log('🔑 Requirements:');
  console.log('   - GOOGLE_API_KEY environment variable must be set');
  console.log('   - Google AI Studio API access with TTS enabled');
}

// Run the main function
main().catch(error => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});