import { SlideContent, STYLE_GUIDE } from './slideTemplates'

export function generateSlideDeck(
  postTitle: string,
  postSlug: string,
  slides: SlideContent[]
): string {
  // Create individual slide HTML
  const slideHtmlArray = []
  
  // Title slide
  slideHtmlArray.push(generateTitleSlideHTML(postTitle, postSlug))
  
  // Content slides
  slides.forEach((slide, index) => {
    if (slide.type === 'content') {
      slideHtmlArray.push(generateContentSlideHTML(slide, index + 2))
    }
  })
  
  // End slide
  slideHtmlArray.push(generateEndSlideHTML(postSlug))
  
  return generateFullPresentation(postTitle, slideHtmlArray, slides.length + 2)
}

function generateTitleSlideHTML(title: string, postSlug: string): string {
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

function generateContentSlideHTML(content: SlideContent, slideNumber: number): string {
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
            <span style="color: ${STYLE_GUIDE.colors.accentColor};">CLASSIFIED</span>
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

function generateEndSlideHTML(postSlug: string): string {
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
            <span style="color: ${STYLE_GUIDE.colors.accentColor};">MISSION COMPLETE</span>
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

function generateFullPresentation(title: string, slideHtmlArray: string[], totalSlides: number): string {
  return `
<!DOCTYPE html>
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
            font-family: ${STYLE_GUIDE.fonts.primary};
            background: ${STYLE_GUIDE.colors.background};
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
            background: ${STYLE_GUIDE.colors.primaryText};
            color: ${STYLE_GUIDE.colors.cardBackground};
            padding: ${STYLE_GUIDE.spacing.large};
            border-bottom: ${STYLE_GUIDE.effects.border};
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header-left {
            font-size: 20px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .header-right {
            display: flex;
            align-items: center;
            gap: ${STYLE_GUIDE.spacing.medium};
        }
        
        .status-indicator {
            width: 10px;
            height: 10px;
            background: ${STYLE_GUIDE.colors.accentColor};
            border: 1px solid ${STYLE_GUIDE.colors.cardBackground};
        }
        
        .status-text {
            color: ${STYLE_GUIDE.colors.accentColor};
            font-size: 14px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .slide-number {
            color: ${STYLE_GUIDE.colors.cardBackground};
            font-size: 14px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            margin-left: ${STYLE_GUIDE.spacing.medium};
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
            background: ${STYLE_GUIDE.colors.cardBackground};
            border: ${STYLE_GUIDE.effects.border};
            box-shadow: ${STYLE_GUIDE.effects.shadow};
            padding: 60px;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
        }
        
        .title-header, .section-header, .cta-header {
            background: ${STYLE_GUIDE.colors.primaryText};
            color: ${STYLE_GUIDE.colors.cardBackground};
            padding: ${STYLE_GUIDE.spacing.large};
            margin: -60px -60px ${STYLE_GUIDE.spacing.xlarge} -60px;
            font-size: 16px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            text-transform: uppercase;
            letter-spacing: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .post-type {
            color: ${STYLE_GUIDE.colors.accentColor};
        }
        
        .main-title {
            font-size: 48px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.3;
            margin-bottom: ${STYLE_GUIDE.spacing.large};
            text-align: center;
        }
        
        .subtitle, .tagline {
            font-size: 18px;
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
            text-align: center;
        }
        
        .section-title {
            font-size: 36px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.3;
            margin-bottom: ${STYLE_GUIDE.spacing.xlarge};
        }
        
        .points-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: ${STYLE_GUIDE.spacing.large};
        }
        
        .point-item {
            display: flex;
            align-items: flex-start;
            gap: ${STYLE_GUIDE.spacing.large};
        }
        
        .point-marker {
            width: 24px;
            height: 24px;
            background: ${STYLE_GUIDE.colors.accentColor};
            border: 2px solid ${STYLE_GUIDE.colors.primaryText};
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            margin-top: 4px;
        }
        
        .point-text {
            font-size: 24px;
            color: ${STYLE_GUIDE.colors.primaryText};
            line-height: 1.4;
            font-weight: ${STYLE_GUIDE.fonts.weight.normal};
        }
        
        .construction-elements {
            position: absolute;
            top: 50%;
            right: 60px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: ${STYLE_GUIDE.spacing.medium};
        }
        
        .element {
            width: 60px;
            height: 60px;
            background: ${STYLE_GUIDE.colors.accentColor};
            border: ${STYLE_GUIDE.effects.border};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
        }
        
        .brand-title {
            font-size: 48px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 1.2;
            margin-bottom: ${STYLE_GUIDE.spacing.large};
            text-align: center;
        }
        
        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: ${STYLE_GUIDE.spacing.large};
            flex-wrap: wrap;
            margin: ${STYLE_GUIDE.spacing.xlarge} 0;
        }
        
        .cta-button {
            background: ${STYLE_GUIDE.colors.accentColor};
            color: ${STYLE_GUIDE.colors.primaryText};
            border: ${STYLE_GUIDE.effects.border};
            padding: ${STYLE_GUIDE.spacing.medium} ${STYLE_GUIDE.spacing.large};
            font-size: 16px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
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
            margin-top: ${STYLE_GUIDE.spacing.xlarge};
            padding-top: ${STYLE_GUIDE.spacing.large};
            border-top: 2px solid ${STYLE_GUIDE.colors.primaryText};
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: ${STYLE_GUIDE.spacing.large};
        }
        
        .contact-item {
            text-align: center;
        }
        
        .contact-label {
            font-size: 14px;
            color: ${STYLE_GUIDE.colors.accentColor};
            text-transform: uppercase;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .contact-value {
            font-size: 16px;
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .footer {
            background: ${STYLE_GUIDE.colors.cardBackground};
            border-top: ${STYLE_GUIDE.effects.border};
            padding: ${STYLE_GUIDE.spacing.large};
            text-align: center;
        }
        
        .footer-text {
            font-size: 14px;
            color: ${STYLE_GUIDE.colors.primaryText};
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
            background: ${STYLE_GUIDE.colors.primaryText};
        }
        
        .grid-vertical {
            width: 1px;
            height: 100%;
            left: 25%;
        }
        
        .grid-vertical-2 {
            width: 1px;
            height: 100%;
            left: 50%;
        }
        
        .grid-vertical-3 {
            width: 1px;
            height: 100%;
            left: 75%;
        }
        
        .grid-horizontal {
            height: 1px;
            width: 100%;
            top: 25%;
        }
        
        .grid-horizontal-2 {
            height: 1px;
            width: 100%;
            top: 50%;
        }
        
        .grid-horizontal-3 {
            height: 1px;
            width: 100%;
            top: 75%;
        }
        
        /* Navigation Controls */
        .navigation {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: ${STYLE_GUIDE.colors.cardBackground};
            border: ${STYLE_GUIDE.effects.border};
            box-shadow: ${STYLE_GUIDE.effects.shadow};
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 1000;
        }
        
        .nav-button {
            background: ${STYLE_GUIDE.colors.accentColor};
            color: ${STYLE_GUIDE.colors.primaryText};
            border: 2px solid ${STYLE_GUIDE.colors.primaryText};
            padding: 8px 16px;
            font-size: 14px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: ${STYLE_GUIDE.fonts.primary};
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
            color: ${STYLE_GUIDE.colors.primaryText};
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
            padding: 0 16px;
            border-left: 2px solid ${STYLE_GUIDE.colors.primaryText};
            border-right: 2px solid ${STYLE_GUIDE.colors.primaryText};
        }
        
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: ${STYLE_GUIDE.colors.accentColor};
            transition: width 0.3s ease;
            z-index: 1001;
        }
        
        /* Keyboard hint */
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
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            
            // Update counter
            document.getElementById('currentSlide').textContent = index + 1;
            
            // Update progress bar
            const progress = ((index + 1) / totalSlides) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // Update button states
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
        
        // Keyboard navigation
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
        
        // Touch/swipe support for mobile
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
                    nextSlide(); // Swipe left = next slide
                } else {
                    previousSlide(); // Swipe right = previous slide
                }
            }
        }
        
        // Initialize
        showSlide(0);
        
        // Auto-hide keyboard hint after 5 seconds
        setTimeout(() => {
            const hint = document.querySelector('.keyboard-hint');
            if (hint) hint.style.opacity = '0.3';
        }, 5000);
    </script>
</body>
</html>
  `.trim()
}