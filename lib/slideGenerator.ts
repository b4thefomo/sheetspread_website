import fs from 'fs'
import path from 'path'
import { SlideContent } from '../types/slides'
import { generateTitleSlide, generateContentSlide, generateEndSlide } from './slideTemplates'
import { extractAndSaveTakeaways, loadTakeaways } from './contentExtractor'

export class SlideGenerator {
  private outputDir: string

  constructor(outputDir: string = '/public/resources/slides') {
    this.outputDir = path.join(process.cwd(), outputDir)
    this.ensureOutputDir()
  }

  private ensureOutputDir(): void {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }
  }

  private ensurePostDir(postSlug: string): string {
    const postDir = path.join(this.outputDir, postSlug)
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true })
    }
    return postDir
  }

  async generateSlidesForPost(
    postSlug: string, 
    postTitle: string, 
    postContent: string,
    forceRegenerate: boolean = false
  ): Promise<string[]> {
    const postDir = this.ensurePostDir(postSlug)
    
    // Check if takeaways already exist
    let takeaways = !forceRegenerate ? loadTakeaways(postSlug) : null
    
    if (!takeaways) {
      console.log(`🤖 Generating takeaways for ${postSlug}...`)
      takeaways = await extractAndSaveTakeaways(postSlug, postContent, postTitle)
    } else {
      console.log(`📋 Using existing takeaways for ${postSlug}`)
    }

    const generatedFiles: string[] = []

    // Generate title slide
    const titleSlideHtml = generateTitleSlide(postTitle, postSlug)
    const titleSlidePath = path.join(postDir, '01-title.html')
    fs.writeFileSync(titleSlidePath, titleSlideHtml)
    generatedFiles.push(titleSlidePath)
    console.log(`✅ Generated title slide: ${titleSlidePath}`)

    // Generate content slides
    takeaways.forEach((slide, index) => {
      if (slide.type === 'content') {
        const contentSlideHtml = generateContentSlide(slide, index + 2)
        const contentSlidePath = path.join(postDir, `${String(index + 2).padStart(2, '0')}-content.html`)
        fs.writeFileSync(contentSlidePath, contentSlideHtml)
        generatedFiles.push(contentSlidePath)
        console.log(`✅ Generated content slide ${index + 2}: ${contentSlidePath}`)
      }
    })

    // Generate end slide
    const endSlideHtml = generateEndSlide(postSlug)
    const endSlidePath = path.join(postDir, `${String(takeaways.length + 2).padStart(2, '0')}-end.html`)
    fs.writeFileSync(endSlidePath, endSlideHtml)
    generatedFiles.push(endSlidePath)
    console.log(`✅ Generated end slide: ${endSlidePath}`)

    return generatedFiles
  }

  async generateBatchSlides(posts: Array<{slug: string, title: string, content: string}>): Promise<void> {
    console.log(`🚀 Starting batch slide generation for ${posts.length} posts...`)
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      try {
        console.log(`\n📄 Processing post ${i + 1}/${posts.length}: ${post.slug}`)
        await this.generateSlidesForPost(post.slug, post.title, post.content)
        
        // Add delay to respect API rate limits
        if (i < posts.length - 1) {
          console.log('⏳ Waiting 2 seconds before next post...')
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      } catch (error) {
        console.error(`❌ Error generating slides for ${post.slug}:`, error)
      }
    }
    
    console.log('\n🎉 Batch slide generation complete!')
  }

  listGeneratedSlides(): Record<string, string[]> {
    const slides: Record<string, string[]> = {}
    
    try {
      const postDirs = fs.readdirSync(this.outputDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

      postDirs.forEach(postSlug => {
        const postDir = path.join(this.outputDir, postSlug)
        const slideFiles = fs.readdirSync(postDir)
          .filter(file => file.endsWith('.html'))
          .sort()
        
        slides[postSlug] = slideFiles.map(file => path.join(postDir, file))
      })
    } catch (error) {
      console.error('Error listing slides:', error)
    }

    return slides
  }

  getSlideCount(postSlug: string): number {
    try {
      const postDir = path.join(this.outputDir, postSlug)
      if (!fs.existsSync(postDir)) return 0
      
      return fs.readdirSync(postDir)
        .filter(file => file.endsWith('.html'))
        .length
    } catch (error) {
      return 0
    }
  }

  hasSlidesGenerated(postSlug: string): boolean {
    return this.getSlideCount(postSlug) > 0
  }

  getSlidesUrl(postSlug: string): string {
    return `/resources/slides/${postSlug}/slides.pdf`
  }

  // Method to create a combined HTML file for easier PDF generation
  generateCombinedSlides(postSlug: string): string | null {
    try {
      const postDir = path.join(this.outputDir, postSlug)
      if (!fs.existsSync(postDir)) return null

      const slideFiles = fs.readdirSync(postDir)
        .filter(file => file.endsWith('.html'))
        .sort()

      if (slideFiles.length === 0) return null

      // Read all slide contents
      const slides = slideFiles.map(file => {
        const filePath = path.join(postDir, file)
        return fs.readFileSync(filePath, 'utf-8')
      })

      // Create combined HTML with page breaks
      const combinedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slides - ${postSlug}</title>
    <style>
        @page {
            margin: 0;
            size: landscape;
        }
        
        .slide {
            page-break-after: always;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        
        .slide:last-child {
            page-break-after: avoid;
        }
        
        /* Hide everything except the body content from individual slides */
        .slide * {
            margin: 0 !important;
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
${slides.map((slideHtml, index) => {
  // Extract the body content from each slide
  const bodyMatch = slideHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyContent = bodyMatch ? bodyMatch[1] : slideHtml
  return `    <div class="slide">${bodyContent}</div>`
}).join('\n')}
</body>
</html>
      `.trim()

      const combinedPath = path.join(postDir, 'combined.html')
      fs.writeFileSync(combinedPath, combinedHtml)
      console.log(`✅ Generated combined slides: ${combinedPath}`)
      
      return combinedPath
    } catch (error) {
      console.error(`Error generating combined slides for ${postSlug}:`, error)
      return null
    }
  }
}