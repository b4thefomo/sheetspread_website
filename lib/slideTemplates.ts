import { StyleGuide } from '../types/slides'

export const STYLE_GUIDE: StyleGuide = {
  colors: {
    background: '#FEFCE8', // bg-yellow-50
    cardBackground: '#FFFFFF',
    primaryText: '#000000',
    accentColor: '#FF6600',
    borderColor: '#000000'
  },
  fonts: {
    primary: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    weight: {
      normal: '400',
      bold: '700'
    }
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px'
  },
  effects: {
    shadow: '4px 4px 0px 0px black',
    border: '2px solid black'
  }
}

export interface SlideContent {
  type: 'title' | 'content' | 'end'
  title: string
  subtitle?: string
  points?: string[]
  footer?: string
}

export const generateTitleSlide = (title: string, postSlug: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Construction HQ</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${STYLE_GUIDE.fonts.primary};
            background: ${STYLE_GUIDE.colors.background};
            width: 1920px;
            height: 1080px;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }
        
        .slide-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
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
            font-size: 24px;
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
            width: 12px;
            height: 12px;
            background: ${STYLE_GUIDE.colors.accentColor};
            border: 1px solid ${STYLE_GUIDE.colors.cardBackground};
        }
        
        .status-text {
            color: ${STYLE_GUIDE.colors.accentColor};
            font-size: 16px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: ${STYLE_GUIDE.spacing.xlarge};
            position: relative;
        }
        
        .title-card {
            background: ${STYLE_GUIDE.colors.cardBackground};
            border: ${STYLE_GUIDE.effects.border};
            box-shadow: ${STYLE_GUIDE.effects.shadow};
            padding: 80px;
            text-align: center;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .title-header {
            background: ${STYLE_GUIDE.colors.primaryText};
            color: ${STYLE_GUIDE.colors.cardBackground};
            padding: ${STYLE_GUIDE.spacing.large};
            margin: -80px -80px ${STYLE_GUIDE.spacing.xlarge} -80px;
            text-transform: uppercase;
            font-size: 18px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            letter-spacing: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .post-type {
            color: ${STYLE_GUIDE.colors.accentColor};
        }
        
        .main-title {
            font-size: 72px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 1.2;
            margin-bottom: ${STYLE_GUIDE.spacing.large};
        }
        
        .subtitle {
            font-size: 24px;
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
        }
        
        .footer {
            background: ${STYLE_GUIDE.colors.cardBackground};
            border-top: ${STYLE_GUIDE.effects.border};
            padding: ${STYLE_GUIDE.spacing.large};
            text-align: center;
        }
        
        .footer-text {
            font-size: 16px;
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .construction-elements {
            position: absolute;
            top: 50%;
            right: 100px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: ${STYLE_GUIDE.spacing.medium};
        }
        
        .element {
            width: 80px;
            height: 80px;
            background: ${STYLE_GUIDE.colors.accentColor};
            border: ${STYLE_GUIDE.effects.border};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
        }
        
        @media print {
            body { margin: 0; }
        }
    </style>
</head>
<body>
    <div class="slide-container">
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
</body>
</html>
  `.trim()
}

export const generateContentSlide = (content: SlideContent, slideNumber: number): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title} - Construction HQ</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${STYLE_GUIDE.fonts.primary};
            background: ${STYLE_GUIDE.colors.background};
            width: 1920px;
            height: 1080px;
            display: flex;
            flex-direction: column;
        }
        
        .slide-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
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
            padding: 80px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .content-card {
            background: ${STYLE_GUIDE.colors.cardBackground};
            border: ${STYLE_GUIDE.effects.border};
            box-shadow: ${STYLE_GUIDE.effects.shadow};
            padding: 60px;
            max-width: 1600px;
            margin: 0 auto;
            width: 100%;
        }
        
        .section-header {
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
        
        .section-title {
            font-size: 48px;
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
            font-size: 32px;
            color: ${STYLE_GUIDE.colors.primaryText};
            line-height: 1.4;
            font-weight: ${STYLE_GUIDE.fonts.weight.normal};
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
        
        @media print {
            body { margin: 0; }
        }
    </style>
</head>
<body>
    <div class="slide-container">
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
</body>
</html>
  `.trim()
}

export const generateEndSlide = (postSlug: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Construction HQ - End Slide</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${STYLE_GUIDE.fonts.primary};
            background: ${STYLE_GUIDE.colors.background};
            width: 1920px;
            height: 1080px;
            display: flex;
            flex-direction: column;
        }
        
        .slide-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
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
        
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 80px;
            position: relative;
        }
        
        .cta-card {
            background: ${STYLE_GUIDE.colors.cardBackground};
            border: ${STYLE_GUIDE.effects.border};
            box-shadow: ${STYLE_GUIDE.effects.shadow};
            padding: 80px;
            text-align: center;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .cta-header {
            background: ${STYLE_GUIDE.colors.primaryText};
            color: ${STYLE_GUIDE.colors.cardBackground};
            padding: ${STYLE_GUIDE.spacing.large};
            margin: -80px -80px ${STYLE_GUIDE.spacing.xlarge} -80px;
            text-transform: uppercase;
            font-size: 18px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            letter-spacing: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .brand-title {
            font-size: 64px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 1.2;
            margin-bottom: ${STYLE_GUIDE.spacing.large};
        }
        
        .tagline {
            font-size: 28px;
            color: ${STYLE_GUIDE.colors.primaryText};
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: ${STYLE_GUIDE.spacing.xlarge};
            opacity: 0.8;
        }
        
        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: ${STYLE_GUIDE.spacing.large};
            flex-wrap: wrap;
        }
        
        .cta-button {
            background: ${STYLE_GUIDE.colors.accentColor};
            color: ${STYLE_GUIDE.colors.primaryText};
            border: ${STYLE_GUIDE.effects.border};
            padding: ${STYLE_GUIDE.spacing.large} ${STYLE_GUIDE.spacing.xlarge};
            font-size: 20px;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.2s;
        }
        
        .cta-button:hover {
            box-shadow: 8px 8px 0px 0px black;
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
            font-size: 16px;
            color: ${STYLE_GUIDE.colors.accentColor};
            text-transform: uppercase;
            font-weight: ${STYLE_GUIDE.fonts.weight.bold};
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .contact-value {
            font-size: 18px;
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
        
        @media print {
            body { margin: 0; }
        }
    </style>
</head>
<body>
    <div class="slide-container">
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
                    <a href="https://sailsmaps.com" class="cta-button">VISIT CONSTRUCTION HQ &gt;&gt;</a>
                    <a href="https://sailsmaps.com/resources" class="cta-button">ACCESS RESOURCES &gt;&gt;</a>
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
</body>
</html>
  `.trim()
}