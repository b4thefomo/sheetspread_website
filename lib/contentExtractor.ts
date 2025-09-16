import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'
import { SlideContent } from '../types/slides'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

export async function extractTakeaways(postContent: string, postTitle: string): Promise<SlideContent[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" })
    
    const prompt = `
You are analyzing construction industry blog content to create slide takeaways. 

TASK: Extract the most important insights from this construction blog post and organize them into 3-5 content slides, with each slide containing exactly 3 key points maximum.

CONTENT TO ANALYZE:
Title: ${postTitle}

${postContent}

REQUIREMENTS:
1. Create 10-15 content slides for a comprehensive presentation
2. Break down the content into detailed, granular sections
3. Each slide should have 2-4 bullet points maximum
4. Each bullet point should be detailed and actionable (20-35 words)
5. Use construction industry terminology and professional language
6. Focus on practical, implementable insights with specific examples
7. Include methodology, implementation steps, best practices, and common pitfalls
8. Create slides for: Introduction, Problem Definition, Solutions, Implementation, Best Practices, Common Mistakes, Tools/Technology, Metrics, Case Studies, and Conclusions
9. Ensure comprehensive coverage of the topic with actionable depth

OUTPUT FORMAT (JSON):
{
  "slides": [
    {
      "type": "content",
      "title": "SLIDE_TITLE_IN_UPPERCASE",
      "points": [
        "First key takeaway point",
        "Second key takeaway point", 
        "Third key takeaway point"
      ]
    }
  ]
}

EXAMPLES OF COMPREHENSIVE SLIDE TITLES:
- "CHANGE ORDER FUNDAMENTALS & SCOPE DEFINITION"
- "ROOT CAUSE ANALYSIS & PREVENTION STRATEGIES" 
- "COST CONTROL METHODOLOGIES & BUDGET PROTECTION"
- "DOCUMENTATION STANDARDS & AUDIT TRAILS"
- "STAKEHOLDER ALIGNMENT & COMMUNICATION PROTOCOLS"
- "IMPLEMENTATION ROADMAP & TIMELINE MANAGEMENT"
- "TECHNOLOGY INTEGRATION & DIGITAL WORKFLOWS"
- "PERFORMANCE METRICS & SUCCESS INDICATORS"
- "COMMON PITFALLS & RISK MITIGATION"
- "VENDOR MANAGEMENT & CONTRACT NEGOTIATIONS"
- "QUALITY ASSURANCE & COMPLIANCE FRAMEWORKS"
- "TEAM TRAINING & CAPABILITY DEVELOPMENT"

Make the content professional, actionable, and valuable for construction professionals.
    `.trim()

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response')
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    return parsed.slides || []
    
  } catch (error) {
    console.error('Error extracting takeaways:', error)
    // Return a comprehensive fallback structure
    return [
      {
        type: 'content' as const,
        title: 'CONSTRUCTION MANAGEMENT OVERVIEW',
        points: [
          'Comprehensive review of construction management principles and best practices',
          'Strategic approach to project planning, execution, and quality control',
          'Integration of technology and traditional methodologies for optimal outcomes'
        ]
      },
      {
        type: 'content' as const,
        title: 'PROBLEM IDENTIFICATION & ANALYSIS',
        points: [
          'Common challenges in construction project management and their root causes',
          'Impact assessment of poor planning on budget, timeline, and quality',
          'Systematic approach to identifying bottlenecks and inefficiencies'
        ]
      },
      {
        type: 'content' as const,
        title: 'STRATEGIC SOLUTIONS & METHODOLOGIES',
        points: [
          'Proven frameworks for addressing construction management challenges',
          'Implementation of systematic processes for consistent project delivery',
          'Best practice methodologies adapted from industry leaders'
        ]
      },
      {
        type: 'content' as const,
        title: 'IMPLEMENTATION ROADMAP',
        points: [
          'Step-by-step approach to implementing new management processes',
          'Timeline and resource allocation for successful process adoption',
          'Change management strategies for team buy-in and adoption'
        ]
      },
      {
        type: 'content' as const,
        title: 'DOCUMENTATION & COMPLIANCE',
        points: [
          'Essential documentation standards for audit trails and compliance',
          'Record-keeping best practices for regulatory and contractual requirements',
          'Digital documentation systems for improved accessibility and accuracy'
        ]
      },
      {
        type: 'content' as const,
        title: 'STAKEHOLDER COMMUNICATION',
        points: [
          'Effective communication protocols with clients, vendors, and team members',
          'Regular reporting structures and performance dashboards',
          'Conflict resolution and stakeholder alignment strategies'
        ]
      },
      {
        type: 'content' as const,
        title: 'TECHNOLOGY INTEGRATION',
        points: [
          'Digital tools and platforms for enhanced project management efficiency',
          'Automation opportunities in reporting, scheduling, and resource allocation',
          'Technology adoption strategies and team training considerations'
        ]
      },
      {
        type: 'content' as const,
        title: 'QUALITY ASSURANCE FRAMEWORKS',
        points: [
          'Systematic quality control processes and inspection protocols',
          'Performance standards and acceptance criteria definition',
          'Continuous improvement methodologies for quality enhancement'
        ]
      },
      {
        type: 'content' as const,
        title: 'RISK MANAGEMENT & MITIGATION',
        points: [
          'Proactive risk identification and assessment methodologies',
          'Contingency planning and risk response strategies',
          'Insurance, bonding, and contractual risk allocation considerations'
        ]
      },
      {
        type: 'content' as const,
        title: 'PERFORMANCE METRICS & KPIs',
        points: [
          'Key performance indicators for construction project success measurement',
          'Data collection and analysis systems for informed decision making',
          'Benchmarking against industry standards and continuous improvement'
        ]
      },
      {
        type: 'content' as const,
        title: 'COMMON PITFALLS & PREVENTION',
        points: [
          'Typical mistakes in construction management and their prevention strategies',
          'Lessons learned from project failures and recovery approaches',
          'Warning signs and early intervention techniques'
        ]
      },
      {
        type: 'content' as const,
        title: 'ACTION ITEMS & NEXT STEPS',
        points: [
          'Immediate action items for implementing discussed strategies',
          'Long-term planning considerations and continuous improvement goals',
          'Resources and references for continued professional development'
        ]
      }
    ]
  }
}

export function sanitizeSlideContent(content: SlideContent[]): SlideContent[] {
  return content.map(slide => ({
    ...slide,
    title: slide.title.replace(/--/g, '-').toUpperCase(),
    points: slide.points?.map(point => 
      point.replace(/--/g, '-')
        .replace(/\s+/g, ' ')
        .trim()
    )
  }))
}

export async function extractAndSaveTakeaways(postSlug: string, postContent: string, postTitle: string): Promise<SlideContent[]> {
  const takeaways = await extractTakeaways(postContent, postTitle)
  const sanitizedTakeaways = sanitizeSlideContent(takeaways)
  
  // Create takeaways directory if it doesn't exist
  const takeawaysDir = path.join(process.cwd(), 'resources', 'slides')
  if (!fs.existsSync(takeawaysDir)) {
    fs.mkdirSync(takeawaysDir, { recursive: true })
  }
  
  // Save takeaways to JSON file
  const takeawaysPath = path.join(takeawaysDir, `${postSlug}-takeaways.json`)
  const takeawaysData = {
    title: postTitle,
    slug: postSlug,
    slides: sanitizedTakeaways,
    generatedAt: new Date().toISOString()
  }
  
  fs.writeFileSync(takeawaysPath, JSON.stringify(takeawaysData, null, 2))
  console.log(`✅ Takeaways saved: ${takeawaysPath}`)
  
  return sanitizedTakeaways
}

export function loadTakeaways(postSlug: string): SlideContent[] | null {
  try {
    const takeawaysPath = path.join(process.cwd(), 'resources', 'slides', `${postSlug}-takeaways.json`)
    if (!fs.existsSync(takeawaysPath)) {
      return null
    }
    
    const takeawaysData = JSON.parse(fs.readFileSync(takeawaysPath, 'utf-8'))
    return takeawaysData.slides || []
  } catch (error) {
    console.error(`Error loading takeaways for ${postSlug}:`, error)
    return null
  }
}