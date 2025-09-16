const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

class SlideEmbedder {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'content')
    this.slidesDir = path.join(process.cwd(), 'public', 'resources', 'slides')
  }

  getSlideCount(postSlug) {
    try {
      // Try to get accurate count from takeaways file first
      const takeawaysPath = path.join(process.cwd(), 'resources', 'slides', `${postSlug}-takeaways.json`)
      if (fs.existsSync(takeawaysPath)) {
        const takeawaysData = JSON.parse(fs.readFileSync(takeawaysPath, 'utf-8'))
        return takeawaysData.slideCount || takeawaysData.slides?.length + 2 || 0
      }
      
      // Fallback to counting HTML files
      const postSlidesDir = path.join(this.slidesDir, postSlug)
      if (!fs.existsSync(postSlidesDir)) return 0
      
      return fs.readdirSync(postSlidesDir)
        .filter(file => file.endsWith('.html'))
        .length
    } catch (error) {
      return 0
    }
  }

  hasSlides(postSlug) {
    return this.getSlideCount(postSlug) > 0
  }

  createSlideEmbed(postSlug, slideCount) {
    return `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin: 32px 0; text-align: center;">
  <p style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 12px;">📊 Construction Takeaways</p>
  <p style="color: rgba(255,255,255,0.9); margin-bottom: 20px;">Download our key insights slides - perfect for team meetings and presentations!</p>
  <a href="/resources/slides/${postSlug}/slides.html" style="display: inline-block; background: white; color: #667eea; padding: 12px 32px; border-radius: 8px; font-weight: bold; text-decoration: none;" target="_blank">View Slides (${slideCount} slides) →</a>
</div>`
  }

  hasSlideEmbed(content) {
    return content.includes('📊 Construction Takeaways') || content.includes('/resources/slides/')
  }

  addSlideEmbedToPost(postSlug) {
    const postPath = path.join(this.contentDir, `${postSlug}.md`)
    
    if (!fs.existsSync(postPath)) {
      console.log(`❌ Post file not found: ${postPath}`)
      return false
    }

    const slideCount = this.getSlideCount(postSlug)
    if (slideCount === 0) {
      console.log(`⚠️ No slides found for ${postSlug}`)
      return false
    }

    try {
      const fileContent = fs.readFileSync(postPath, 'utf-8')
      const { data, content } = matter(fileContent)

      // Check if slide embed already exists
      if (this.hasSlideEmbed(content)) {
        console.log(`✅ Slide embed already exists in ${postSlug}`)
        return true
      }

      // Find the best place to insert the slide embed
      // Look for the "Related Articles" section or conclusion
      const slideEmbed = this.createSlideEmbed(postSlug, slideCount)
      
      let updatedContent = content
      
      // Try to insert before "Related Articles" section
      if (content.includes('<p><b>Related Articles</b></p>')) {
        updatedContent = content.replace(
          '<p><b>Related Articles</b></p>',
          `${slideEmbed}\n<p><b>Related Articles</b></p>`
        )
      }
      // Try to insert before "Conclusion" section
      else if (content.includes('<p><b>Conclusion</b></p>')) {
        updatedContent = content.replace(
          '<p><b>Conclusion</b></p>',
          `${slideEmbed}\n<p><b>Conclusion</b></p>`
        )
      }
      // Insert near the end, before the last paragraph
      else {
        const paragraphs = content.split('\n\n')
        if (paragraphs.length > 2) {
          // Insert before the last 2 paragraphs
          const insertIndex = Math.max(paragraphs.length - 2, 1)
          paragraphs.splice(insertIndex, 0, slideEmbed)
          updatedContent = paragraphs.join('\n\n')
        } else {
          // Just append at the end
          updatedContent = content + '\n\n' + slideEmbed
        }
      }

      // Reconstruct the file with frontmatter
      const updatedFile = matter.stringify(updatedContent, data)
      fs.writeFileSync(postPath, updatedFile)
      
      console.log(`✅ Added slide embed to ${postSlug} (${slideCount} slides)`)
      return true
      
    } catch (error) {
      console.error(`❌ Error processing ${postSlug}:`, error.message)
      return false
    }
  }

  processAllPosts() {
    if (!fs.existsSync(this.contentDir)) {
      console.log('❌ Content directory not found')
      return
    }

    const posts = fs.readdirSync(this.contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.basename(file, '.md'))
      .sort()

    console.log(`📚 Found ${posts.length} posts to process`)

    let processed = 0
    let added = 0
    let skipped = 0

    posts.forEach(postSlug => {
      console.log(`\n📄 Processing ${postSlug}...`)
      
      if (!this.hasSlides(postSlug)) {
        console.log(`⚠️ Skipping ${postSlug} - no slides generated`)
        skipped++
        return
      }

      processed++
      const success = this.addSlideEmbedToPost(postSlug)
      if (success) added++
    })

    console.log('\n🎉 Processing complete!')
    console.log(`📊 Summary:`)
    console.log(`  - Total posts: ${posts.length}`)
    console.log(`  - Processed: ${processed}`)
    console.log(`  - Embeds added: ${added}`)
    console.log(`  - Skipped (no slides): ${skipped}`)
  }

  processSpecificPost(postSlug) {
    console.log(`🎯 Processing specific post: ${postSlug}`)
    
    if (!this.hasSlides(postSlug)) {
      console.log(`❌ No slides found for ${postSlug}`)
      return
    }

    this.addSlideEmbedToPost(postSlug)
  }

  listPostsWithSlides() {
    if (!fs.existsSync(this.contentDir)) {
      console.log('❌ Content directory not found')
      return
    }

    const posts = fs.readdirSync(this.contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.basename(file, '.md'))
      .sort()

    console.log('📋 Posts and slide status:')
    posts.forEach(postSlug => {
      const slideCount = this.getSlideCount(postSlug)
      const hasEmbed = this.hasSlideEmbedInPost(postSlug)
      const status = slideCount > 0 ? '✅' : '❌'
      const embedStatus = hasEmbed ? '🔗' : '➖'
      console.log(`  ${status} ${embedStatus} ${postSlug}: ${slideCount} slides`)
    })
    
    console.log('\nLegend:')
    console.log('  ✅ = Slides generated')
    console.log('  ❌ = No slides')
    console.log('  🔗 = Embed present')
    console.log('  ➖ = No embed')
  }

  hasSlideEmbedInPost(postSlug) {
    try {
      const postPath = path.join(this.contentDir, `${postSlug}.md`)
      if (!fs.existsSync(postPath)) return false
      
      const content = fs.readFileSync(postPath, 'utf-8')
      return this.hasSlideEmbed(content)
    } catch (error) {
      return false
    }
  }
}

// Main execution
async function main() {
  const command = process.argv[2] || 'add-all'
  const embedder = new SlideEmbedder()

  switch (command) {
    case 'add-all':
      embedder.processAllPosts()
      break

    case 'add-post':
      const postSlug = process.argv[3]
      if (!postSlug) {
        console.log('❌ Please provide a post slug')
        console.log('Usage: node scripts/addSlideEmbeds.js add-post post-15')
        return
      }
      embedder.processSpecificPost(postSlug)
      break

    case 'list':
      embedder.listPostsWithSlides()
      break

    default:
      console.log('Usage:')
      console.log('  node scripts/addSlideEmbeds.js add-all      # Add embeds to all posts with slides')
      console.log('  node scripts/addSlideEmbeds.js add-post [slug] # Add embed to specific post')
      console.log('  node scripts/addSlideEmbeds.js list        # List posts and slide status')
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { SlideEmbedder }