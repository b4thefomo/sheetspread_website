const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

class SlideLinksReplacer {
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
      
      // Fallback: check if slides directory exists
      const postSlidesDir = path.join(this.slidesDir, postSlug)
      if (fs.existsSync(postSlidesDir)) {
        return 14 // Default count if we can't determine exact
      }
      
      return 0
    } catch (error) {
      console.error(`Error getting slide count for ${postSlug}:`, error)
      return 0
    }
  }

  extractPostTitle(content) {
    // Extract title from first line of content if present
    const firstLine = content.split('\n')[0]
    return firstLine.replace(/^#\s*/, '').replace(/\[.*?\]/g, '').trim()
  }

  createSlideLink(postSlug, slideCount, postTitle) {
    const titlePart = postTitle ? postTitle.split(' ').slice(0, 3).join(' ') : 'Construction Management'
    
    return `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin: 32px 0; text-align: center;">
  <p style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 12px;">📊 Downloadable Presentation Slides</p>
  <p style="color: rgba(255,255,255,0.9); margin-bottom: 20px;">Get our comprehensive ${slideCount}-slide presentation with key takeaways and actionable insights!</p>
  <a href="/resources/slides/${postSlug}/slides.html" style="display: inline-block; background: white; color: #667eea; padding: 12px 32px; border-radius: 8px; font-weight: bold; text-decoration: none;" target="_blank">View Presentation (${slideCount} slides) →</a>
</div>`
  }

  replaceLinksInPost(postSlug) {
    const postPath = path.join(this.contentDir, `${postSlug}.md`)
    
    if (!fs.existsSync(postPath)) {
      console.log(`❌ Post file not found: ${postPath}`)
      return false
    }

    const slideCount = this.getSlideCount(postSlug)
    if (slideCount === 0) {
      console.log(`⚠️ No slides found for ${postSlug}, skipping`)
      return false
    }

    try {
      const fileContent = fs.readFileSync(postPath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      const postTitle = this.extractPostTitle(content)
      let updatedContent = content
      let replacementsMade = 0

      // Pattern 1: Replace "Visual Learning Resource" infographic links
      const infographicPattern = /<div style="background: linear-gradient\(135deg, #667eea 0%, #764ba2 100%\)[^>]*>[\s\S]*?📊 Visual Learning Resource[\s\S]*?<\/div>/g
      
      if (infographicPattern.test(updatedContent)) {
        updatedContent = updatedContent.replace(infographicPattern, this.createSlideLink(postSlug, slideCount, postTitle))
        replacementsMade++
        console.log(`  ✓ Replaced Visual Learning Resource link`)
      }

      // Pattern 2: Replace "Construction Takeaways" slide embeds (if they're duplicates)
      const takeawaysPattern = /<div style="background: linear-gradient\(135deg, #667eea 0%, #764ba2 100%\)[^>]*>[\s\S]*?📊 Construction Takeaways[\s\S]*?<\/div>/g
      
      const takeawaysMatches = updatedContent.match(takeawaysPattern)
      if (takeawaysMatches && takeawaysMatches.length > 1) {
        // Keep only the first one, replace with updated version
        let firstReplaced = false
        updatedContent = updatedContent.replace(takeawaysPattern, (match) => {
          if (!firstReplaced) {
            firstReplaced = true
            replacementsMade++
            console.log(`  ✓ Updated Construction Takeaways link`)
            return this.createSlideLink(postSlug, slideCount, postTitle)
          }
          return '' // Remove duplicates
        })
      } else if (takeawaysMatches && takeawaysMatches.length === 1) {
        // Update the single instance with correct slide count
        updatedContent = updatedContent.replace(takeawaysPattern, this.createSlideLink(postSlug, slideCount, postTitle))
        replacementsMade++
        console.log(`  ✓ Updated Construction Takeaways link`)
      }

      // Pattern 3: Look for any remaining infographic links to /resources/infographics
      const genericInfographicPattern = /href="\/resources\/infographics[^"]*"/g
      if (genericInfographicPattern.test(updatedContent)) {
        // Find and replace the containing div block
        const divPattern = /<div[^>]*>[\s\S]*?href="\/resources\/infographics[^"]*"[\s\S]*?<\/div>/g
        updatedContent = updatedContent.replace(divPattern, (match) => {
          if (match.includes('📊') || match.includes('Infographic') || match.includes('Visual')) {
            replacementsMade++
            console.log(`  ✓ Replaced generic infographic link`)
            return this.createSlideLink(postSlug, slideCount, postTitle)
          }
          return match
        })
      }

      if (replacementsMade === 0) {
        // No existing links found, add slide link before "Related Articles" or "Conclusion"
        const slideLink = this.createSlideLink(postSlug, slideCount, postTitle)
        
        if (updatedContent.includes('<p><b>Related Articles</b></p>')) {
          updatedContent = updatedContent.replace(
            '<p><b>Related Articles</b></p>',
            `${slideLink}\n<p><b>Related Articles</b></p>`
          )
          replacementsMade++
          console.log(`  ✓ Added slide link before Related Articles`)
        } else if (updatedContent.includes('<p><b>Conclusion</b></p>')) {
          updatedContent = updatedContent.replace(
            '<p><b>Conclusion</b></p>',
            `${slideLink}\n<p><b>Conclusion</b></p>`
          )
          replacementsMade++
          console.log(`  ✓ Added slide link before Conclusion`)
        }
      }

      if (replacementsMade > 0) {
        // Save the updated file
        const updatedFile = matter.stringify(updatedContent, data)
        fs.writeFileSync(postPath, updatedFile)
        console.log(`✅ Updated ${postSlug}: ${replacementsMade} replacement(s) made`)
        return true
      } else {
        console.log(`ℹ️ No changes needed for ${postSlug}`)
        return false
      }
      
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
    console.log('🔄 Replacing industry report links with slide presentation links...\n')

    let updated = 0
    let skipped = 0
    let errors = 0

    posts.forEach(postSlug => {
      console.log(`📄 Processing ${postSlug}...`)
      
      const result = this.replaceLinksInPost(postSlug)
      if (result === true) {
        updated++
      } else if (result === false) {
        skipped++
      } else {
        errors++
      }
      
      console.log('') // Add spacing between posts
    })

    console.log('🎉 Processing complete!')
    console.log(`📊 Summary:`)
    console.log(`  - Total posts: ${posts.length}`)
    console.log(`  - Updated: ${updated}`)
    console.log(`  - Skipped: ${skipped}`)
    console.log(`  - Errors: ${errors}`)
  }

  processSpecificPost(postSlug) {
    console.log(`🎯 Processing specific post: ${postSlug}\n`)
    
    const result = this.replaceLinksInPost(postSlug)
    if (result === true) {
      console.log('\n✅ Successfully updated post')
    } else {
      console.log('\n⚠️ Post was not updated')
    }
  }

  checkPostsStatus() {
    if (!fs.existsSync(this.contentDir)) {
      console.log('❌ Content directory not found')
      return
    }

    const posts = fs.readdirSync(this.contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.basename(file, '.md'))
      .sort()

    console.log('📋 Posts status:\n')
    
    posts.forEach(postSlug => {
      const slideCount = this.getSlideCount(postSlug)
      const hasSlides = slideCount > 0
      
      // Check if post has infographic links
      const postPath = path.join(this.contentDir, `${postSlug}.md`)
      const fileContent = fs.readFileSync(postPath, 'utf-8')
      const hasInfographicLinks = fileContent.includes('/resources/infographics') || fileContent.includes('Visual Learning Resource')
      const hasSlideLinks = fileContent.includes('/resources/slides/')
      
      const slideStatus = hasSlides ? `✅ ${slideCount} slides` : '❌ No slides'
      const linkStatus = hasSlideLinks ? '🔗 Has slide links' : (hasInfographicLinks ? '📊 Has infographic links' : '➖ No links')
      
      console.log(`  ${postSlug}: ${slideStatus} | ${linkStatus}`)
    })
  }
}

// Main execution
async function main() {
  const command = process.argv[2] || 'replace-all'
  const replacer = new SlideLinksReplacer()

  switch (command) {
    case 'replace-all':
      replacer.processAllPosts()
      break

    case 'replace-post':
      const postSlug = process.argv[3]
      if (!postSlug) {
        console.log('❌ Please provide a post slug')
        console.log('Usage: node scripts/replaceReportLinksWithSlides.js replace-post post-15')
        return
      }
      replacer.processSpecificPost(postSlug)
      break

    case 'status':
      replacer.checkPostsStatus()
      break

    default:
      console.log('Usage:')
      console.log('  node scripts/replaceReportLinksWithSlides.js replace-all    # Replace links in all posts')
      console.log('  node scripts/replaceReportLinksWithSlides.js replace-post [slug] # Replace in specific post')
      console.log('  node scripts/replaceReportLinksWithSlides.js status        # Check posts status')
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { SlideLinksReplacer }