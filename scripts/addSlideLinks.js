const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

class SlideLinksAdder {
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

  createSlideSection(postSlug, slideCount, postTitle) {
    const titlePart = postTitle ? postTitle.split(' ').slice(0, 3).join(' ') : 'Construction Management'
    
    return `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin: 32px 0; text-align: center;">
  <p style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 12px;">📊 Downloadable Presentation Slides</p>
  <p style="color: rgba(255,255,255,0.9); margin-bottom: 20px;">Get our comprehensive ${slideCount}-slide presentation with key takeaways and actionable insights!</p>
  <a href="/resources/slides/${postSlug}/slides.html" style="display: inline-block; background: white; color: #667eea; padding: 12px 32px; border-radius: 8px; font-weight: bold; text-decoration: none;" target="_blank">View Presentation (${slideCount} slides) →</a>
</div>`
  }

  addSlideLinksToPost(postSlug) {
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

      // Check if slide links already exist
      if (updatedContent.includes('/resources/slides/')) {
        console.log(`✅ ${postSlug} already has slide links`)
        return true
      }

      // Check if there's an infographic/visual learning section to replace
      const visualLearningPattern = /<div style="background: linear-gradient\(135deg, #667eea 0%, #764ba2 100%\)[^>]*>[\s\S]*?📊[\s\S]*?<\/div>/g
      
      if (visualLearningPattern.test(updatedContent)) {
        // Replace existing visual learning sections
        updatedContent = updatedContent.replace(visualLearningPattern, this.createSlideSection(postSlug, slideCount, postTitle))
        console.log(`✅ Replaced visual learning section with slide links in ${postSlug}`)
      } else {
        // Add slide section before "Related Articles" or "Conclusion"
        const slideSection = this.createSlideSection(postSlug, slideCount, postTitle)
        
        if (updatedContent.includes('<p><b>Related Articles</b></p>')) {
          updatedContent = updatedContent.replace(
            '<p><b>Related Articles</b></p>',
            `${slideSection}\n<p><b>Related Articles</b></p>`
          )
          console.log(`✅ Added slide links before Related Articles in ${postSlug}`)
        } else if (updatedContent.includes('<p><b>Conclusion</b></p>')) {
          updatedContent = updatedContent.replace(
            '<p><b>Conclusion</b></p>',
            `${slideSection}\n<p><b>Conclusion</b></p>`
          )
          console.log(`✅ Added slide links before Conclusion in ${postSlug}`)
        } else {
          // Add at the end if no standard sections found
          const lines = updatedContent.split('\n')
          const lastParagraphIndex = lines.lastIndexOf(lines.filter(l => l.startsWith('<p>')).pop())
          if (lastParagraphIndex > -1) {
            lines.splice(lastParagraphIndex, 0, slideSection)
            updatedContent = lines.join('\n')
          } else {
            updatedContent = updatedContent.trim() + '\n\n' + slideSection
          }
          console.log(`✅ Added slide links to ${postSlug}`)
        }
      }

      // Save the updated file
      const updatedFile = matter.stringify(updatedContent, data)
      fs.writeFileSync(postPath, updatedFile)
      return true
      
    } catch (error) {
      console.error(`❌ Error processing ${postSlug}:`, error.message)
      return false
    }
  }

  processPost(postSlug) {
    console.log(`🎯 Processing post: ${postSlug}`)
    
    const result = this.addSlideLinksToPost(postSlug)
    if (result) {
      console.log(`✅ Successfully processed ${postSlug}`)
    } else {
      console.log(`⚠️ Could not process ${postSlug}`)
    }
    
    return result
  }
}

// Main execution
async function main() {
  const postSlug = process.argv[2]
  
  if (!postSlug) {
    console.log('❌ Please provide a post slug')
    console.log('Usage: node scripts/addSlideLinks.js post-15')
    return
  }

  const adder = new SlideLinksAdder()
  adder.processPost(postSlug)
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { SlideLinksAdder }