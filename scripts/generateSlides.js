const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Since we can't directly import TS modules in Node.js, we'll create a JS version
class SlideGeneratorJS {
  constructor(outputDir = '/public/resources/slides') {
    this.outputDir = path.join(process.cwd(), outputDir)
    this.ensureOutputDir()
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }
  }

  ensurePostDir(postSlug) {
    const postDir = path.join(this.outputDir, postSlug)
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true })
    }
    return postDir
  }

  async generateSlidesForPost(postSlug, postTitle, postContent, forceRegenerate = false) {
    console.log(`🔄 Processing ${postSlug}...`)
    
    // For now, we'll create placeholder slides until we can properly integrate the TS modules
    const postDir = this.ensurePostDir(postSlug)
    
    // Create interactive slide deck
    const slideDeckHtml = this.createInteractiveSlideDeck(postTitle, postSlug)
    const slidePath = path.join(postDir, 'slides.html')
    fs.writeFileSync(slidePath, slideDeckHtml)
    
    console.log(`✅ Generated slides for ${postSlug}`)
    return [slidePath]
  }

  createInteractiveSlideDeck(title, postSlug) {
    // Create mock slide data for now
    const mockSlides = [
      {
        type: 'content',
        title: 'KEY CONSTRUCTION INSIGHTS',
        points: [
          'Implement proper change order management processes',
          'Use technology to streamline construction workflows',
          'Focus on proactive risk management and communication'
        ]
      },
      {
        type: 'content', 
        title: 'BEST PRACTICES',
        points: [
          'Establish clear documentation standards',
          'Train teams on effective change management',
          'Monitor performance metrics continuously'
        ]
      }
    ]

    return this.generateSlideDeckHTML(title, postSlug, mockSlides)
  }

  generateSlideDeckHTML(title, postSlug, slides) {
    const slideHtmlArray = []
    
    // Title slide
    slideHtmlArray.push(this.generateTitleSlideHTML(title, postSlug))
    
    // Content slides
    slides.forEach((slide, index) => {
      if (slide.type === 'content') {
        slideHtmlArray.push(this.generateContentSlideHTML(slide, index + 2))
      }
    })
    
    // End slide
    slideHtmlArray.push(this.generateEndSlideHTML(postSlug))
    
    return this.generateFullPresentation(title, slideHtmlArray, slides.length + 2)
  }

  generateTitleSlideHTML(title, postSlug) {
    return `
      <div class="slide" data-slide="1">
        <header class="header">
          <div class="header-left">CONSTRUCTION HQ NETWORK</div>
          <div class="header-right">
            <div class="status-indicator"></div>
            <div class="status-text">SECURE</div>
          </div>
        </header>
        
        <main class="main-content">
          <div class="title-card">
            <div class="title-header">
              <span>CONSTRUCTION BLUEPRINT</span>
              <span class="post-type">TYPE: POST</span>
            </div>
            <h1 class="main-title">${title}</h1>
            <p class="subtitle">// CONSTRUCTION MANAGEMENT INTELLIGENCE SYSTEM //</p>
          </div>
          
          <div class="construction-elements">
            <div class="element">001</div>
            <div class="element">ACTIVE</div>
            <div class="element">LOADED</div>
          </div>
        </main>
        
        <footer class="footer">
          <div class="footer-text">
            // LOWEDA CONSTRUCTION BLOG - CONSTRUCTION PROTOCOLS VERIFIED //
          </div>
        </footer>
      </div>
    `
  }

  generateContentSlideHTML(content, slideNumber) {
    return `
      <div class="slide" data-slide="${slideNumber}">
        <header class="header">
          <div class="header-left">CONSTRUCTION PROTOCOLS</div>
          <div class="header-right">
            <div class="status-indicator"></div>
            <div class="status-text">VERIFIED</div>
            <div class="slide-number">[${String(slideNumber).padStart(3, '0')}]</div>
          </div>
        </header>
        
        <main class="main-content">
          <div class="content-card">
            <div class="section-header">
              <span>CONSTRUCTION INTEL</span>
              <span style="color: #FF6600;">CLASSIFIED</span>
            </div>
            <h1 class="section-title">${content.title}</h1>
            <ul class="points-list">
              ${content.points?.map((point, index) => `
                <li class="point-item">
                  <div class="point-marker">${index + 1}</div>
                  <div class="point-text">${point}</div>
                </li>
              `).join('') || ''}
            </ul>
          </div>
        </main>
        
        <footer class="footer">
          <div class="footer-text">
            // CONSTRUCTION MANAGEMENT INTELLIGENCE SYSTEM //
          </div>
        </footer>
      </div>
    `
  }

  generateEndSlideHTML(postSlug) {
    return `
      <div class="slide" data-slide="end">
        <div class="construction-grid">
          <div class="grid-line grid-vertical"></div>
          <div class="grid-line grid-vertical-2"></div>
          <div class="grid-line grid-vertical-3"></div>
          <div class="grid-line grid-horizontal"></div>
          <div class="grid-line grid-horizontal-2"></div>
          <div class="grid-line grid-horizontal-3"></div>
        </div>
        
        <header class="header">
          <div class="header-left">CONSTRUCTION BLUEPRINT COMPLETE</div>
          <div class="header-right">
            <div class="status-indicator"></div>
            <div class="status-text">SUCCESS</div>
          </div>
        </header>
        
        <main class="main-content">
          <div class="cta-card">
            <div class="cta-header">
              <span>CONSTRUCTION MANAGEMENT HQ</span>
              <span style="color: #FF6600;">MISSION COMPLETE</span>
            </div>
            <h1 class="brand-title">LOWEDA<br/>CONSTRUCTION<br/>BLOG</h1>
            <p class="tagline">BUILD BETTER. MANAGE SMARTER.</p>
            
            <div class="cta-buttons">
              <a href="#" class="cta-button" onclick="window.open('/', '_blank')">VISIT CONSTRUCTION HQ &gt;&gt;</a>
              <a href="#" class="cta-button" onclick="window.open('/resources', '_blank')">ACCESS RESOURCES &gt;&gt;</a>
            </div>
            
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-label">SYSTEM STATUS</div>
                <div class="contact-value">OPERATIONAL</div>
              </div>
              <div class="contact-item">
                <div class="contact-label">ACCESS LEVEL</div>
                <div class="contact-value">AUTHORIZED</div>
              </div>
              <div class="contact-item">
                <div class="contact-label">DATA INTEGRITY</div>
                <div class="contact-value">VERIFIED</div>
              </div>
            </div>
          </div>
        </main>
        
        <footer class="footer">
          <div class="footer-text">
            // CONSTRUCTION MANAGEMENT INTELLIGENCE SYSTEM 2024 //
          </div>
        </footer>
      </div>
    `
  }

  generateFullPresentation(title, slideHtmlArray, totalSlides) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Construction Slides</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
            background: #FEFCE8;
            overflow: hidden;
            height: 100vh;
            position: relative;
        }
        
        .slide-container {
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .slide {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: none;
            flex-direction: column;
            transition: opacity 0.3s ease-in-out;
        }
        
        .slide.active {
            display: flex;
        }
        
        .header {
            background: #000000;
            color: #FFFFFF;
            padding: 24px;
            border-bottom: 2px solid black;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header-left {
            font-size: 20px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .header-right {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        .status-indicator {
            width: 10px;
            height: 10px;
            background: #FF6600;
            border: 1px solid #FFFFFF;
        }
        
        .status-text {
            color: #FF6600;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .slide-number {
            color: #FFFFFF;
            font-size: 14px;
            font-weight: bold;
            margin-left: 16px;
        }
        
        .main-content {
            flex: 1;
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
        }
        
        .title-card, .content-card, .cta-card {
            background: #FFFFFF;
            border: 2px solid black;
            box-shadow: 4px 4px 0px 0px black;
            padding: 60px;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
        }
        
        .title-header, .section-header, .cta-header {
            background: #000000;
            color: #FFFFFF;
            padding: 24px;
            margin: -60px -60px 32px -60px;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .post-type {
            color: #FF6600;
        }
        
        .main-title {
            font-size: 48px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.3;
            margin-bottom: 24px;
            text-align: center;
        }
        
        .subtitle, .tagline {
            font-size: 18px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
            text-align: center;
        }
        
        .section-title {
            font-size: 36px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.3;
            margin-bottom: 32px;
        }
        
        .points-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }
        
        .point-item {
            display: flex;
            align-items: flex-start;
            gap: 24px;
        }
        
        .point-marker {
            width: 24px;
            height: 24px;
            background: #FF6600;
            border: 2px solid #000000;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            color: #000000;
            margin-top: 4px;
        }
        
        .point-text {
            font-size: 24px;
            color: #000000;
            line-height: 1.4;
            font-weight: normal;
        }
        
        .construction-elements {
            position: absolute;
            top: 50%;
            right: 60px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .element {
            width: 60px;
            height: 60px;
            background: #FF6600;
            border: 2px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
        }
        
        .brand-title {
            font-size: 48px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 1.2;
            margin-bottom: 24px;
            text-align: center;
        }
        
        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 24px;
            flex-wrap: wrap;
            margin: 32px 0;
        }
        
        .cta-button {
            background: #FF6600;
            color: #000000;
            border: 2px solid black;
            padding: 16px 24px;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.2s;
        }
        
        .cta-button:hover {
            box-shadow: 6px 6px 0px 0px black;
            transform: translate(-2px, -2px);
        }
        
        .contact-info {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 2px solid #000000;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 24px;
        }
        
        .contact-item {
            text-align: center;
        }
        
        .contact-label {
            font-size: 14px;
            color: #FF6600;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .contact-value {
            font-size: 16px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .footer {
            background: #FFFFFF;
            border-top: 2px solid black;
            padding: 24px;
            text-align: center;
        }
        
        .footer-text {
            font-size: 14px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .construction-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            opacity: 0.1;
        }
        
        .grid-line {
            position: absolute;
            background: #000000;
        }
        
        .grid-vertical { width: 1px; height: 100%; left: 25%; }
        .grid-vertical-2 { width: 1px; height: 100%; left: 50%; }
        .grid-vertical-3 { width: 1px; height: 100%; left: 75%; }
        .grid-horizontal { height: 1px; width: 100%; top: 25%; }
        .grid-horizontal-2 { height: 1px; width: 100%; top: 50%; }
        .grid-horizontal-3 { height: 1px; width: 100%; top: 75%; }
        
        /* Navigation Controls */
        .navigation {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #FFFFFF;
            border: 2px solid black;
            box-shadow: 4px 4px 0px 0px black;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 1000;
        }
        
        .nav-button {
            background: #FF6600;
            color: #000000;
            border: 2px solid #000000;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: ui-monospace, SFMono-Regular, monospace;
        }
        
        .nav-button:hover:not(:disabled) {
            box-shadow: 4px 4px 0px 0px black;
            transform: translate(-1px, -1px);
        }
        
        .nav-button:disabled {
            background: #ccc;
            color: #666;
            cursor: not-allowed;
            opacity: 0.5;
        }
        
        .slide-counter {
            color: #000000;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
            padding: 0 16px;
            border-left: 2px solid #000000;
            border-right: 2px solid #000000;
        }
        
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: #FF6600;
            transition: width 0.3s ease;
            z-index: 1001;
        }
        
        .keyboard-hint {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            opacity: 0.7;
        }
        
        @media print {
            body { margin: 0; overflow: visible; }
            .slide { 
                display: flex !important; 
                position: static !important; 
                page-break-after: always; 
                height: 100vh;
            }
            .slide:last-child { page-break-after: avoid; }
            .navigation, .keyboard-hint, .progress-bar { display: none !important; }
        }
        
        @media (max-width: 768px) {
            .main-title { font-size: 32px; }
            .section-title { font-size: 28px; }
            .point-text { font-size: 18px; }
            .construction-elements { display: none; }
            .navigation { bottom: 10px; padding: 12px 16px; }
            .nav-button { padding: 6px 12px; font-size: 12px; }
        }
    </style>
</head>
<body>
    <div class="progress-bar" id="progressBar"></div>
    <div class="keyboard-hint">Use ← → arrow keys or buttons to navigate</div>
    
    <div class="slide-container">
        ${slideHtmlArray.join('\n')}
    </div>
    
    <nav class="navigation">
        <button class="nav-button" id="prevBtn" onclick="previousSlide()">‹ PREV</button>
        <div class="slide-counter">
            <span id="currentSlide">1</span> / <span id="totalSlides">${totalSlides}</span>
        </div>
        <button class="nav-button" id="nextBtn" onclick="nextSlide()">NEXT ›</button>
    </nav>

    <script>
        let currentSlideIndex = 0;
        const totalSlides = ${totalSlides};
        const slides = document.querySelectorAll('.slide');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            document.getElementById('currentSlide').textContent = index + 1;
            const progress = ((index + 1) / totalSlides) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('prevBtn').disabled = index === 0;
            document.getElementById('nextBtn').disabled = index === totalSlides - 1;
        }
        
        function nextSlide() {
            if (currentSlideIndex < totalSlides - 1) {
                currentSlideIndex++;
                showSlide(currentSlideIndex);
            }
        }
        
        function previousSlide() {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                showSlide(currentSlideIndex);
            }
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                previousSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                currentSlideIndex = 0;
                showSlide(currentSlideIndex);
            } else if (e.key === 'End') {
                e.preventDefault();
                currentSlideIndex = totalSlides - 1;
                showSlide(currentSlideIndex);
            }
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
        }
        
        showSlide(0);
        
        setTimeout(() => {
            const hint = document.querySelector('.keyboard-hint');
            if (hint) hint.style.opacity = '0.3';
        }, 5000);
    </script>
</body>
</html>`
  }

  async generateBatchSlides(posts) {
    console.log(`🚀 Starting slide generation for ${posts.length} posts...`)
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      try {
        console.log(`\n📄 Processing post ${i + 1}/${posts.length}: ${post.slug}`)
        await this.generateSlidesForPost(post.slug, post.title, post.content)
        
        // Add delay to be respectful
        if (i < posts.length - 1) {
          console.log('⏳ Waiting 1 second before next post...')
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      } catch (error) {
        console.error(`❌ Error generating slides for ${post.slug}:`, error)
      }
    }
    
    console.log('\n🎉 Slide generation complete!')
  }

  listGeneratedSlides() {
    const slides = {}
    
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

  getSlideCount(postSlug) {
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
}

// Function to get all posts
function getAllPosts() {
  const contentDir = path.join(process.cwd(), 'content')
  
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory not found:', contentDir)
    return []
  }

  const posts = []
  const files = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md'))
    .sort()

  files.forEach(file => {
    try {
      const filePath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      const slug = path.basename(file, '.md')
      
      // Extract title from content (first line) if not in frontmatter
      const title = data.title || content.split('\n')[0] || `Post ${slug}`
      
      posts.push({
        slug,
        title: title.replace(/^#\s*/, ''), // Remove markdown heading
        content,
        ...data
      })
    } catch (error) {
      console.error(`❌ Error reading ${file}:`, error.message)
    }
  })

  return posts
}

// Main execution
async function main() {
  const command = process.argv[2] || 'generate-all'
  const slideGenerator = new SlideGeneratorJS()

  switch (command) {
    case 'generate-all':
      const posts = getAllPosts()
      if (posts.length === 0) {
        console.log('❌ No posts found to process')
        return
      }
      
      console.log(`📚 Found ${posts.length} posts to process`)
      await slideGenerator.generateBatchSlides(posts)
      break

    case 'generate-post':
      const postSlug = process.argv[3]
      if (!postSlug) {
        console.log('❌ Please provide a post slug')
        console.log('Usage: node scripts/generateSlides.js generate-post post-15')
        return
      }
      
      const postsForTarget = getAllPosts()
      const targetPost = postsForTarget.find(post => post.slug === postSlug)
      
      if (!targetPost) {
        console.log(`❌ Post not found: ${postSlug}`)
        return
      }
      
      console.log(`🎯 Generating slides for: ${postSlug}`)
      await slideGenerator.generateSlidesForPost(targetPost.slug, targetPost.title, targetPost.content)
      break

    case 'list':
      const slides = slideGenerator.listGeneratedSlides()
      console.log('📋 Generated slides:')
      Object.entries(slides).forEach(([slug, files]) => {
        console.log(`  ${slug}: ${files.length} slides`)
      })
      break

    case 'count':
      const postsForCount = getAllPosts()
      console.log('📊 Slide generation status:')
      postsForCount.forEach(post => {
        const count = slideGenerator.getSlideCount(post.slug)
        const status = count > 0 ? '✅' : '❌'
        console.log(`  ${status} ${post.slug}: ${count} slides`)
      })
      break

    default:
      console.log('Usage:')
      console.log('  node scripts/generateSlides.js generate-all  # Generate slides for all posts')
      console.log('  node scripts/generateSlides.js list         # List generated slides')  
      console.log('  node scripts/generateSlides.js count        # Show generation status')
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { SlideGeneratorJS }