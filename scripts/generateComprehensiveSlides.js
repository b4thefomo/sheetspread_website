const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { GoogleGenerativeAI } = require('@google/generative-ai')

require('dotenv').config()
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY)

class ComprehensiveSlideGenerator {
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

  async extractDetailedTakeaways(postContent, postTitle) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" })
      
      const prompt = `
You are analyzing construction industry blog content to create a comprehensive 12-15 slide presentation.

TASK: Extract detailed insights from this construction blog post and organize them into 12-15 content slides.

CONTENT TO ANALYZE:
Title: ${postTitle}

${postContent}

REQUIREMENTS:
1. Create exactly 12-15 content slides for a comprehensive presentation
2. Break down the content into detailed, granular sections that tell a complete story
3. Each slide should have 2-4 bullet points maximum  
4. Each bullet point should be detailed and actionable (25-40 words)
5. Use construction industry terminology and professional language
6. Focus on practical, implementable insights with specific examples
7. Include methodology, implementation steps, best practices, and common pitfalls
8. Structure should flow logically: Problem → Analysis → Solutions → Implementation → Best Practices → Results

SLIDE STRUCTURE TEMPLATE:
1. Problem/Challenge Definition
2. Impact & Consequences  
3. Root Cause Analysis
4. Strategic Framework/Approach
5. Implementation Methodology
6. Tools & Technology Solutions
7. Documentation & Compliance
8. Stakeholder Management
9. Risk Management & Mitigation
10. Performance Metrics & KPIs
11. Common Pitfalls & Prevention
12. Best Practices & Recommendations
13. Case Studies & Examples
14. Action Items & Implementation
15. Long-term Success Strategies

OUTPUT FORMAT (JSON):
{
  "slides": [
    {
      "type": "content",
      "title": "SLIDE_TITLE_IN_UPPERCASE",
      "points": [
        "First detailed takeaway point with specific actionable guidance and examples",
        "Second detailed takeaway point with implementation steps and considerations", 
        "Third detailed takeaway point with measurable outcomes and success criteria"
      ]
    }
  ]
}

EXAMPLES OF COMPREHENSIVE SLIDE TITLES:
- "CHANGE ORDER IMPACT ASSESSMENT & COST IMPLICATIONS"
- "ROOT CAUSE ANALYSIS: WHY CHANGE ORDERS OCCUR"
- "DOCUMENTATION FRAMEWORKS & AUDIT TRAIL REQUIREMENTS" 
- "STAKEHOLDER ALIGNMENT & COMMUNICATION PROTOCOLS"
- "TECHNOLOGY INTEGRATION FOR CHANGE MANAGEMENT"
- "PERFORMANCE METRICS & SUCCESS MEASUREMENT"
- "RISK MITIGATION STRATEGIES & CONTINGENCY PLANNING"
- "VENDOR NEGOTIATION TACTICS & CONTRACT MANAGEMENT"
- "QUALITY ASSURANCE & COMPLIANCE FRAMEWORKS"
- "TEAM TRAINING & CAPABILITY DEVELOPMENT"

Make each slide comprehensive, actionable, and valuable for construction professionals. Ensure the presentation flows logically and covers all aspects of the topic thoroughly.
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
      console.error('Error extracting comprehensive takeaways:', error)
      return this.getFallbackSlides(postTitle)
    }
  }

  getFallbackSlides(postTitle) {
    const topic = postTitle.toLowerCase()
    const isChangeOrder = topic.includes('change order')
    const isProcurement = topic.includes('procurement')
    const isClient = topic.includes('client')
    
    if (isChangeOrder) {
      return this.getChangeOrderSlides()
    } else if (isProcurement) {
      return this.getProcurementSlides()
    } else if (isClient) {
      return this.getClientSlides()
    } else {
      return this.getGenericConstructionSlides()
    }
  }

  getChangeOrderSlides() {
    return [
      {
        type: 'content',
        title: 'CHANGE ORDER FUNDAMENTALS & SCOPE DEFINITION',
        points: [
          'Change orders represent formal modifications to original contract scope, schedule, or budget requiring documented approval processes',
          'Proper scope definition prevents ambiguous change requests and establishes clear boundaries for project deliverables',
          'Early stakeholder alignment on change criteria reduces disputes and accelerates approval workflows'
        ]
      },
      {
        type: 'content',
        title: 'ROOT CAUSE ANALYSIS: WHY CHANGE ORDERS OCCUR',
        points: [
          'Design gaps, unforeseen site conditions, and regulatory updates account for 70% of construction change orders',
          'Poor initial planning and inadequate site investigation create cascading change requirements throughout project lifecycle',
          'Client scope creep and stakeholder alignment issues drive 25% of discretionary change order requests'
        ]
      },
      {
        type: 'content',
        title: 'FINANCIAL IMPACT ASSESSMENT & COST CONTROL',
        points: [
          'Unmanaged change orders inflate project costs by 15-30% and create budget overrun risks for contractors',
          'Direct costs include materials, labor, and equipment while indirect costs encompass delays, rework, and administrative overhead',
          'Establish not-to-exceed caps and require detailed cost breakdowns for all change order proposals above threshold amounts'
        ]
      },
      {
        type: 'content',
        title: 'DOCUMENTATION STANDARDS & AUDIT TRAILS',
        points: [
          'Comprehensive change documentation includes RFI trails, cost estimates, schedule impacts, and signed approvals with timestamps',
          'Digital documentation systems enable real-time tracking, version control, and audit trail maintenance for compliance purposes',
          'Standardized forms and approval workflows reduce processing time and ensure consistent information capture across projects'
        ]
      },
      {
        type: 'content',
        title: 'STAKEHOLDER COMMUNICATION & APPROVAL WORKFLOWS',
        points: [
          'Clear communication protocols define roles, responsibilities, and decision-making authority for change order approvals',
          'Regular stakeholder meetings and transparent reporting prevent surprises and maintain project alignment throughout execution',
          'Escalation procedures and conflict resolution mechanisms ensure timely decision-making when disputes arise'
        ]
      },
      {
        type: 'content',
        title: 'PRICING METHODOLOGIES & NEGOTIATION STRATEGIES',
        points: [
          'Unit-based pricing provides transparency while lump-sum pricing offers cost certainty for well-defined scope changes',
          'Time-and-materials pricing requires strict controls, daily reporting, and not-to-exceed limits to prevent cost overruns',
          'Competitive bidding for significant changes ensures fair market pricing and maintains vendor relationships'
        ]
      },
      {
        type: 'content',
        title: 'SCHEDULE IMPACT ANALYSIS & TIMELINE MANAGEMENT',
        points: [
          'Critical path analysis identifies which changes affect project completion dates and require schedule adjustments',
          'Float ownership definitions determine whether delays consume project buffer or trigger time extension requests',
          'Resource reallocation and acceleration strategies minimize schedule disruption while controlling additional costs'
        ]
      },
      {
        type: 'content',
        title: 'TECHNOLOGY INTEGRATION & DIGITAL WORKFLOWS',
        points: [
          'Construction management software streamlines change order processing with automated workflows and real-time notifications',
          'Mobile applications enable field teams to submit change requests with photos and GPS coordinates for accurate documentation',
          'Integration with accounting systems provides real-time budget impact analysis and cost tracking capabilities'
        ]
      },
      {
        type: 'content',
        title: 'RISK MANAGEMENT & CONTINGENCY PLANNING',
        points: [
          'Contingency reserves should be allocated based on project complexity, site conditions, and historical change order frequency',
          'Risk registers identify potential change drivers early, enabling proactive mitigation strategies and cost avoidance',
          'Insurance considerations include coverage for design errors, unforeseen conditions, and change-related delays'
        ]
      },
      {
        type: 'content',
        title: 'VENDOR MANAGEMENT & SUBCONTRACTOR COORDINATION',
        points: [
          'Subcontractor change order provisions must align with prime contract terms to avoid pricing discrepancies and disputes',
          'Vendor performance tracking includes change order responsiveness, pricing competitiveness, and quality of proposals',
          'Early contractor involvement in design helps identify potential changes before construction begins'
        ]
      },
      {
        type: 'content',
        title: 'QUALITY ASSURANCE & COMPLIANCE FRAMEWORKS',
        points: [
          'Quality control procedures ensure change order work meets project specifications and maintains warranty coverage',
          'Inspection protocols and acceptance criteria must be clearly defined for all change order work scopes',
          'Regulatory compliance verification prevents rework and ensures all changes meet building code and permit requirements'
        ]
      },
      {
        type: 'content',
        title: 'PERFORMANCE METRICS & SUCCESS MEASUREMENT',
        points: [
          'Key performance indicators include change order frequency, average cost impact, and approval cycle time',
          'Benchmark analysis against industry standards identifies improvement opportunities and validates performance',
          'Trend analysis reveals systemic issues requiring process improvements or additional project controls'
        ]
      },
      {
        type: 'content',
        title: 'COMMON PITFALLS & PREVENTION STRATEGIES',
        points: [
          'Inadequate scope definition and poor communication create change order disputes that damage client relationships',
          'Delayed change order processing increases costs and creates schedule pressure that affects quality and safety',
          'Insufficient documentation leads to payment disputes and potential legal issues that could have been avoided'
        ]
      },
      {
        type: 'content',
        title: 'IMPLEMENTATION ACTION PLAN & NEXT STEPS',
        points: [
          'Establish change order procedures, train project teams, and implement digital tools within 30-60 day timeline',
          'Develop templates, approval matrices, and communication protocols specific to your organization and project types',
          'Monitor performance metrics, gather feedback, and continuously improve processes based on lessons learned'
        ]
      }
    ]
  }

  getProcurementSlides() {
    return [
      {
        type: 'content',
        title: 'PROCUREMENT STRATEGY & CHANGE ORDER INTEGRATION',
        points: [
          'Strategic procurement planning anticipates change requirements and establishes framework agreements with preferred vendors',
          'Contract structures must include change order provisions, pricing methodologies, and performance requirements',
          'Vendor qualification processes evaluate change management capabilities alongside technical and financial qualifications'
        ]
      },
      {
        type: 'content',
        title: 'VENDOR SELECTION & RELATIONSHIP MANAGEMENT',
        points: [
          'Strategic vendor partnerships enable collaborative problem-solving and innovative solutions during project execution',
          'Performance-based contracts incentivize vendors to minimize changes through superior planning and execution',
          'Regular vendor reviews assess change order responsiveness, pricing competitiveness, and solution quality'
        ]
      },
      {
        type: 'content',
        title: 'CONTRACT NEGOTIATION & RISK ALLOCATION',
        points: [
          'Change order clauses define pricing mechanisms, approval processes, and performance requirements for modifications',
          'Risk allocation strategies transfer appropriate risks to parties best positioned to manage and control them',
          'Liability caps and indemnification provisions protect against change-related disputes and cost overruns'
        ]
      },
      {
        type: 'content',
        title: 'PRICING ANALYSIS & COST VALIDATION',
        points: [
          'Independent cost estimates validate vendor pricing and ensure competitive rates for change order work',
          'Market benchmarking provides objective pricing references for negotiations and approval decisions',
          'Total cost of ownership analysis includes direct costs, indirect impacts, and long-term implications'
        ]
      },
      {
        type: 'content',
        title: 'SUPPLY CHAIN COORDINATION & LOGISTICS',
        points: [
          'Supply chain visibility prevents material shortages and delivery delays that typically trigger change orders',
          'Vendor coordination ensures compatible specifications and seamless integration of change order work',
          'Logistics planning minimizes disruption to ongoing work and maintains project schedule integrity'
        ]
      },
      {
        type: 'content',
        title: 'DIGITAL PROCUREMENT PLATFORMS & AUTOMATION',
        points: [
          'E-procurement systems streamline change order processing with automated workflows and vendor notifications',
          'Digital catalogs and pre-negotiated pricing reduce processing time and ensure consistent cost control',
          'Integration with project management systems provides real-time visibility into change impacts and approvals'
        ]
      },
      {
        type: 'content',
        title: 'COMPLIANCE & REGULATORY CONSIDERATIONS',
        points: [
          'Procurement compliance ensures all change orders meet regulatory requirements and organizational policies',
          'Audit trail maintenance provides documentation for internal and external review processes',
          'Ethical procurement practices maintain vendor relationships and organizational reputation'
        ]
      },
      {
        type: 'content',
        title: 'PERFORMANCE MONITORING & VENDOR SCORECARDS',
        points: [
          'Vendor scorecards track change order performance including response time, quality, and cost competitiveness',
          'Performance data informs future procurement decisions and vendor relationship management strategies',
          'Continuous improvement programs help vendors enhance their change management capabilities over time'
        ]
      },
      {
        type: 'content',
        title: 'FINANCIAL CONTROLS & BUDGET MANAGEMENT',
        points: [
          'Budget controls include approval thresholds, spending limits, and financial oversight for change order expenditures',
          'Cash flow management ensures adequate funding for approved changes without disrupting project finances',
          'Cost tracking and reporting provide visibility into change order impacts on overall project profitability'
        ]
      },
      {
        type: 'content',
        title: 'DISPUTE RESOLUTION & CLAIMS MANAGEMENT',
        points: [
          'Dispute resolution procedures provide structured approaches to resolving change order disagreements efficiently',
          'Claims management processes protect organizational interests while maintaining vendor relationships',
          'Alternative dispute resolution methods reduce costs and time compared to traditional litigation approaches'
        ]
      },
      {
        type: 'content',
        title: 'INNOVATION & CONTINUOUS IMPROVEMENT',
        points: [
          'Innovation partnerships with vendors identify opportunities to reduce change orders through better solutions',
          'Lessons learned capture best practices and improvement opportunities for future procurement activities',
          'Process optimization continuously improves change order efficiency and effectiveness over time'
        ]
      },
      {
        type: 'content',
        title: 'IMPLEMENTATION ROADMAP & SUCCESS FACTORS',
        points: [
          'Implementation planning includes system setup, team training, and vendor onboarding within defined timelines',
          'Success factors include executive support, adequate resources, and clear performance expectations',
          'Change management strategies ensure smooth transition to new procurement processes and vendor relationships'
        ]
      }
    ]
  }

  getClientSlides() {
    return [
      {
        type: 'content',
        title: 'CLIENT PERSPECTIVE: CHANGE ORDER FUNDAMENTALS',
        points: [
          'Change orders represent modifications to original project scope requiring client approval and budget adjustments',
          'Understanding change drivers helps clients make informed decisions about scope modifications and cost implications',
          'Proactive change management protects client interests while maintaining project momentum and contractor relationships'
        ]
      },
      {
        type: 'content',
        title: 'CONTRACT FOUNDATION & CHANGE PROVISIONS',
        points: [
          'Strong contract language defines change procedures, pricing mechanisms, and approval authorities before project begins',
          'Pre-negotiated unit rates and markup limitations provide cost predictability for common change scenarios',
          'Clear scope definitions reduce ambiguity and minimize disputes over what constitutes additional work'
        ]
      },
      {
        type: 'content',
        title: 'BUDGET PLANNING & CONTINGENCY MANAGEMENT',
        points: [
          'Contingency reserves should account for project complexity, site conditions, and historical change frequency patterns',
          'Budget controls include approval thresholds, spending limits, and regular financial reporting requirements',
          'Cash flow planning ensures adequate funding availability for approved changes without project delays'
        ]
      },
      {
        type: 'content',
        title: 'CHANGE EVALUATION & APPROVAL PROCESSES',
        points: [
          'Systematic evaluation criteria assess change necessity, cost-benefit analysis, and schedule impact considerations',
          'Approval workflows define decision-making authority and ensure appropriate stakeholder involvement in change decisions',
          'Documentation requirements capture rationale, alternatives considered, and impact analysis for all changes'
        ]
      },
      {
        type: 'content',
        title: 'COST ANALYSIS & PRICING VALIDATION',
        points: [
          'Independent cost verification ensures fair pricing through market comparisons and detailed cost breakdowns',
          'Alternative solution evaluation may identify lower-cost approaches that achieve the same objectives',
          'Total cost of ownership includes immediate costs plus long-term operational and maintenance implications'
        ]
      },
      {
        type: 'content',
        title: 'SCHEDULE IMPACT ASSESSMENT & TIMELINE PROTECTION',
        points: [
          'Critical path analysis identifies which changes affect project completion and require schedule adjustments',
          'Mitigation strategies minimize schedule disruption through resource reallocation and work sequencing optimization',
          'Acceleration options and associated costs provide alternatives when schedule maintenance is critical'
        ]
      },
      {
        type: 'content',
        title: 'QUALITY ASSURANCE & SPECIFICATION COMPLIANCE',
        points: [
          'Quality standards for change work must meet or exceed original project specifications and requirements',
          'Inspection and acceptance procedures ensure change work integrates properly with existing construction',
          'Warranty considerations address coverage for change work and integration with original warranties'
        ]
      },
      {
        type: 'content',
        title: 'STAKEHOLDER COMMUNICATION & TRANSPARENCY',
        points: [
          'Regular communication keeps all stakeholders informed about change status, impacts, and decisions',
          'Transparent reporting includes cost impacts, schedule effects, and cumulative change order summaries',
          'Stakeholder alignment prevents conflicts and ensures coordinated decision-making throughout project execution'
        ]
      },
      {
        type: 'content',
        title: 'RISK MANAGEMENT & MITIGATION STRATEGIES',
        points: [
          'Risk assessment identifies potential change drivers and develops proactive mitigation strategies early',
          'Insurance considerations ensure adequate coverage for change-related risks and potential disputes',
          'Contingency planning addresses scenarios where changes significantly impact budget or schedule'
        ]
      },
      {
        type: 'content',
        title: 'VENDOR COORDINATION & CONTRACTOR MANAGEMENT',
        points: [
          'Contractor performance evaluation includes change management responsiveness and solution quality',
          'Coordination requirements ensure changes integrate smoothly with ongoing work and other trades',
          'Relationship management balances firm control with collaborative problem-solving approaches'
        ]
      },
      {
        type: 'content',
        title: 'DOCUMENTATION & RECORD KEEPING',
        points: [
          'Comprehensive documentation includes change requests, approvals, cost analysis, and performance records',
          'Audit trails provide accountability and support for future reference and potential dispute resolution',
          'Digital record-keeping systems improve accessibility, version control, and information sharing capabilities'
        ]
      },
      {
        type: 'content',
        title: 'LESSONS LEARNED & CONTINUOUS IMPROVEMENT',
        points: [
          'Post-project analysis identifies improvement opportunities for future change management processes',
          'Best practice documentation captures successful strategies and decision-making approaches',
          'Feedback integration improves contract language, procedures, and stakeholder coordination for future projects'
        ]
      }
    ]
  }

  getGenericConstructionSlides() {
    return [
      {
        type: 'content',
        title: 'CONSTRUCTION MANAGEMENT OVERVIEW & FUNDAMENTALS',
        points: [
          'Modern construction management integrates traditional project controls with digital technologies for enhanced efficiency',
          'Systematic approaches to planning, execution, and control ensure consistent project delivery within budget and schedule',
          'Stakeholder coordination and communication form the foundation of successful construction project management'
        ]
      },
      {
        type: 'content',
        title: 'PROJECT PLANNING & SCOPE DEFINITION',
        points: [
          'Comprehensive project planning includes detailed work breakdown structures, resource allocation, and risk assessment',
          'Clear scope definition prevents misunderstandings and provides baseline for measuring project performance',
          'Stakeholder alignment during planning phase reduces changes and conflicts during project execution'
        ]
      },
      {
        type: 'content',
        title: 'SCHEDULE MANAGEMENT & CRITICAL PATH ANALYSIS',
        points: [
          'Critical path method identifies project bottlenecks and enables proactive schedule management and optimization',
          'Resource leveling balances workforce utilization while maintaining schedule integrity and quality standards',
          'Schedule monitoring and variance analysis enable early intervention when delays threaten project completion'
        ]
      },
      {
        type: 'content',
        title: 'COST CONTROL & BUDGET MANAGEMENT',
        points: [
          'Earned value management provides integrated view of schedule and cost performance throughout project lifecycle',
          'Cost tracking systems monitor expenditures against budgets with regular reporting and variance analysis',
          'Change control procedures protect budget integrity while accommodating necessary scope modifications'
        ]
      },
      {
        type: 'content',
        title: 'QUALITY ASSURANCE & CONTROL SYSTEMS',
        points: [
          'Quality management systems ensure work meets specifications through systematic inspection and testing programs',
          'Prevention-focused approaches reduce rework costs and schedule delays through proactive quality measures',
          'Continuous improvement processes capture lessons learned and enhance quality standards over time'
        ]
      },
      {
        type: 'content',
        title: 'RISK MANAGEMENT & MITIGATION STRATEGIES',
        points: [
          'Risk identification and assessment processes enable proactive management of project uncertainties and threats',
          'Mitigation strategies include risk transfer, avoidance, reduction, and acceptance based on impact analysis',
          'Contingency planning prepares response procedures for high-probability risks that could affect project success'
        ]
      },
      {
        type: 'content',
        title: 'STAKEHOLDER COMMUNICATION & COORDINATION',
        points: [
          'Communication plans define information flow, reporting requirements, and meeting schedules for all stakeholders',
          'Coordination procedures ensure smooth integration between different trades, suppliers, and project team members',
          'Conflict resolution mechanisms address disputes quickly to maintain project momentum and relationships'
        ]
      },
      {
        type: 'content',
        title: 'TECHNOLOGY INTEGRATION & DIGITAL TOOLS',
        points: [
          'Construction management software provides integrated platforms for scheduling, cost control, and document management',
          'Mobile technology enables real-time data collection, communication, and decision-making from job sites',
          'Building information modeling enhances coordination, reduces conflicts, and improves project visualization'
        ]
      },
      {
        type: 'content',
        title: 'SAFETY MANAGEMENT & COMPLIANCE',
        points: [
          'Safety management systems protect workers while maintaining productivity through systematic hazard identification and control',
          'Regulatory compliance ensures projects meet all applicable codes, standards, and permit requirements',
          'Safety culture development engages all team members in maintaining safe work environments and practices'
        ]
      },
      {
        type: 'content',
        title: 'PROCUREMENT & SUPPLY CHAIN MANAGEMENT',
        points: [
          'Strategic procurement planning ensures materials and services are available when needed at competitive prices',
          'Vendor management includes qualification, performance monitoring, and relationship development for long-term success',
          'Supply chain coordination minimizes delays and ensures quality standards are maintained throughout delivery'
        ]
      },
      {
        type: 'content',
        title: 'PERFORMANCE MEASUREMENT & REPORTING',
        points: [
          'Key performance indicators track project health across cost, schedule, quality, and safety dimensions',
          'Regular reporting provides stakeholders with timely information for decision-making and corrective action',
          'Benchmark analysis compares performance against industry standards and organizational goals'
        ]
      },
      {
        type: 'content',
        title: 'PROJECT CLOSEOUT & LESSONS LEARNED',
        points: [
          'Systematic closeout procedures ensure all deliverables are complete and properly documented for client handover',
          'Lessons learned capture best practices and improvement opportunities for future project reference',
          'Performance analysis provides data for continuous improvement of processes, procedures, and team capabilities'
        ]
      }
    ]
  }

  async generateComprehensiveSlides(postSlug, postTitle, postContent, forceRegenerate = false) {
    console.log(`🔄 Processing comprehensive slides for ${postSlug}...`)
    
    const postDir = this.ensurePostDir(postSlug)
    
    let slides
    if (process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY) {
      console.log(`🤖 Using AI to extract detailed takeaways from ${postTitle}`)
      slides = await this.extractDetailedTakeaways(postContent, postTitle)
    } else {
      console.log(`📋 Using fallback slides for ${postSlug}`)
      slides = this.getFallbackSlides(postTitle)
    }

    // Generate interactive slide deck
    const slideDeckHtml = this.generateSlideDeckHTML(postTitle, postSlug, slides)
    const slidePath = path.join(postDir, 'slides.html')
    fs.writeFileSync(slidePath, slideDeckHtml)
    
    // Save takeaways for reference
    const takeawaysPath = path.join(process.cwd(), 'resources', 'slides', `${postSlug}-takeaways.json`)
    const takeawaysData = {
      title: postTitle,
      slug: postSlug,
      slides: slides,
      slideCount: slides.length + 2, // +2 for title and end slides
      generatedAt: new Date().toISOString()
    }
    
    const takeawaysDir = path.dirname(takeawaysPath)
    if (!fs.existsSync(takeawaysDir)) {
      fs.mkdirSync(takeawaysDir, { recursive: true })
    }
    fs.writeFileSync(takeawaysPath, JSON.stringify(takeawaysData, null, 2))
    
    console.log(`✅ Generated ${slides.length + 2} slides for ${postSlug}`)
    return [slidePath]
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
            padding: 20px 24px;
            border-bottom: 2px solid black;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header-left {
            font-size: 18px;
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
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .slide-number {
            color: #FFFFFF;
            font-size: 13px;
            font-weight: bold;
            margin-left: 16px;
        }
        
        .main-content {
            flex: 1;
            padding: 40px 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
        }
        
        .title-card, .content-card, .cta-card {
            background: #FFFFFF;
            border: 2px solid black;
            box-shadow: 4px 4px 0px 0px black;
            padding: 50px;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
        }
        
        .title-header, .section-header, .cta-header {
            background: #000000;
            color: #FFFFFF;
            padding: 20px 24px;
            margin: -50px -50px 30px -50px;
            font-size: 15px;
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
            font-size: 42px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.2;
            margin-bottom: 24px;
            text-align: center;
        }
        
        .subtitle, .tagline {
            font-size: 16px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
            text-align: center;
        }
        
        .section-title {
            font-size: 28px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 1.3;
            margin-bottom: 28px;
        }
        
        .points-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .point-item {
            display: flex;
            align-items: flex-start;
            gap: 20px;
        }
        
        .point-marker {
            width: 22px;
            height: 22px;
            background: #FF6600;
            border: 2px solid #000000;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
            color: #000000;
            margin-top: 4px;
        }
        
        .point-text {
            font-size: 18px;
            color: #000000;
            line-height: 1.4;
            font-weight: normal;
        }
        
        .construction-elements {
            position: absolute;
            top: 50%;
            right: 40px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .element {
            width: 50px;
            height: 50px;
            background: #FF6600;
            border: 2px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
        }
        
        .brand-title {
            font-size: 40px;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 1.2;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin: 25px 0;
        }
        
        .cta-button {
            background: #FF6600;
            color: #000000;
            border: 2px solid black;
            padding: 14px 20px;
            font-size: 15px;
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
            margin-top: 25px;
            padding-top: 20px;
            border-top: 2px solid #000000;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .contact-item {
            text-align: center;
        }
        
        .contact-label {
            font-size: 12px;
            color: #FF6600;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 6px;
        }
        
        .contact-value {
            font-size: 14px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .footer {
            background: #FFFFFF;
            border-top: 2px solid black;
            padding: 16px 24px;
            text-align: center;
        }
        
        .footer-text {
            font-size: 12px;
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
            opacity: 0.05;
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
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            background: #FFFFFF;
            border: 2px solid black;
            box-shadow: 4px 4px 0px 0px black;
            padding: 14px 20px;
            display: flex;
            align-items: center;
            gap: 18px;
            z-index: 1000;
        }
        
        .nav-button {
            background: #FF6600;
            color: #000000;
            border: 2px solid #000000;
            padding: 7px 14px;
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: ui-monospace, SFMono-Regular, monospace;
        }
        
        .nav-button:hover:not(:disabled) {
            box-shadow: 3px 3px 0px 0px black;
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
            font-size: 13px;
            padding: 0 14px;
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
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 6px 10px;
            border-radius: 3px;
            font-size: 11px;
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
            .main-title { font-size: 28px; }
            .section-title { font-size: 22px; }
            .point-text { font-size: 16px; }
            .construction-elements { display: none; }
            .main-content { padding: 30px 40px; }
            .title-card, .content-card, .cta-card { padding: 30px; }
            .navigation { bottom: 10px; padding: 10px 14px; }
            .nav-button { padding: 5px 10px; font-size: 11px; }
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
  const slideGenerator = new ComprehensiveSlideGenerator()

  switch (command) {
    case 'generate-all':
      const posts = getAllPosts()
      if (posts.length === 0) {
        console.log('❌ No posts found to process')
        return
      }
      
      console.log(`📚 Found ${posts.length} posts to process`)
      
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i]
        try {
          console.log(`\n📄 Processing post ${i + 1}/${posts.length}: ${post.slug}`)
          await slideGenerator.generateComprehensiveSlides(post.slug, post.title, post.content)
          
          // Add delay to respect API rate limits
          if (i < posts.length - 1) {
            console.log('⏳ Waiting 3 seconds before next post...')
            await new Promise(resolve => setTimeout(resolve, 3000))
          }
        } catch (error) {
          console.error(`❌ Error generating slides for ${post.slug}:`, error)
        }
      }
      
      console.log('\n🎉 Comprehensive slide generation complete!')
      break

    case 'generate-post':
      const postSlug = process.argv[3]
      if (!postSlug) {
        console.log('❌ Please provide a post slug')
        console.log('Usage: node scripts/generateComprehensiveSlides.js generate-post post-15')
        return
      }
      
      const postsForTarget = getAllPosts()
      const targetPost = postsForTarget.find(post => post.slug === postSlug)
      
      if (!targetPost) {
        console.log(`❌ Post not found: ${postSlug}`)
        return
      }
      
      console.log(`🎯 Generating comprehensive slides for: ${postSlug}`)
      await slideGenerator.generateComprehensiveSlides(targetPost.slug, targetPost.title, targetPost.content)
      break

    case 'count':
      const postsForCount = getAllPosts()
      console.log('📊 Comprehensive slide generation status:')
      postsForCount.forEach(post => {
        try {
          const postDir = path.join(process.cwd(), 'public', 'resources', 'slides', post.slug)
          const count = fs.existsSync(postDir) ? 
            fs.readdirSync(postDir).filter(file => file.endsWith('.html')).length : 0
          const status = count > 0 ? '✅' : '❌'
          
          // Try to get slide count from takeaways file
          const takeawaysPath = path.join(process.cwd(), 'resources', 'slides', `${post.slug}-takeaways.json`)
          let totalSlides = count
          if (fs.existsSync(takeawaysPath)) {
            const takeawaysData = JSON.parse(fs.readFileSync(takeawaysPath, 'utf-8'))
            totalSlides = takeawaysData.slideCount || count
          }
          
          console.log(`  ${status} ${post.slug}: ${totalSlides} total slides`)
        } catch (error) {
          console.log(`  ❌ ${post.slug}: Error checking slides`)
        }
      })
      break

    default:
      console.log('Usage:')
      console.log('  node scripts/generateComprehensiveSlides.js generate-all    # Generate 12+ slides for all posts')
      console.log('  node scripts/generateComprehensiveSlides.js generate-post [slug] # Generate slides for specific post')  
      console.log('  node scripts/generateComprehensiveSlides.js count          # Show generation status with slide counts')
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { ComprehensiveSlideGenerator }