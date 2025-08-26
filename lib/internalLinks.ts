interface LinkMapping {
  keywords: string[]
  slug: string
  title: string
  anchor?: string
}

// Define internal link mappings based on content analysis
export const linkMappings: LinkMapping[] = [
  // Post 8 (Project Managers)
  {
    keywords: ['project manager', 'project management', 'PM perspective', 'project managers'],
    slug: 'post-8',
    title: '7 Tips from Project Managers about Change Orders'
  },
  
  // Post 9 (Suppliers)
  {
    keywords: ['supplier', 'suppliers', 'vendor', 'supplier perspective', 'supplier-centric'],
    slug: 'post-9',
    title: '7 Tips from Suppliers about Change Orders'
  },
  
  // Post 10 (Clients)
  {
    keywords: ['client', 'clients', 'owner', 'client perspective', 'client-side'],
    slug: 'post-10',
    title: '7 Tips from Clients about Change Orders'
  },
  
  // Cross-cutting topics
  {
    keywords: ['change order management', 'change management', 'change control'],
    slug: 'post-8',
    title: 'Change Order Management Best Practices'
  },
  
  {
    keywords: ['pricing change orders', 'cost estimation', 'impact analysis'],
    slug: 'post-9',
    title: 'How to Price Change Orders (Supplier Perspective)'
  },
  
  {
    keywords: ['contract terms', 'contract clauses', 'legal framework'],
    slug: 'post-10',
    title: 'Contract Terms for Change Orders (Client Guide)'
  }
]

// Common terms that should link to related content
export const contextualLinks: { [key: string]: LinkMapping[] } = {
  'post-8': [
    {
      keywords: ['supplier impact', 'vendor perspective', 'supplier considerations'],
      slug: 'post-9',
      title: 'Understanding the Supplier Perspective'
    },
    {
      keywords: ['client expectations', 'owner requirements', 'client approval'],
      slug: 'post-10',
      title: 'Managing Client Expectations'
    }
  ],
  
  'post-9': [
    {
      keywords: ['project manager coordination', 'PM collaboration', 'project management'],
      slug: 'post-8',
      title: 'Project Manager Best Practices'
    },
    {
      keywords: ['client communication', 'customer requirements', 'owner expectations'],
      slug: 'post-10',
      title: 'Client Communication Strategies'
    }
  ],
  
  'post-10': [
    {
      keywords: ['project management', 'PM oversight', 'project manager role'],
      slug: 'post-8',
      title: 'Project Manager Insights'
    },
    {
      keywords: ['supplier management', 'vendor coordination', 'supplier relationship'],
      slug: 'post-9',
      title: 'Working with Suppliers'
    }
  ]
}

export function addInternalLinks(content: string, currentSlug: string): string {
  let processedContent = content
  
  // Get all relevant link mappings for this post
  const allMappings = [
    ...linkMappings,
    ...(contextualLinks[currentSlug] || [])
  ]
  
  // Filter out self-links
  const relevantMappings = allMappings.filter(mapping => mapping.slug !== currentSlug)
  
  // Process each mapping
  relevantMappings.forEach(mapping => {
    mapping.keywords.forEach(keyword => {
      // Create a case-insensitive regex that matches whole words
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi')
      
      // Only link the first occurrence of each keyword to avoid over-linking
      let hasBeenLinked = false
      
      processedContent = processedContent.replace(regex, (match) => {
        if (hasBeenLinked) return match
        
        hasBeenLinked = true
        const href = `/posts/${mapping.slug}${mapping.anchor ? `#${mapping.anchor}` : ''}`
        return `<a href="${href}" class="text-blue-600 hover:text-blue-800 underline font-medium" title="${mapping.title}">${match}</a>`
      })
    })
  })
  
  return processedContent
}

// Helper function to add related posts section
export function getRelatedPosts(currentSlug: string): { slug: string; title: string; description: string }[] {
  const relatedMap: { [key: string]: { slug: string; title: string; description: string }[] } = {
    'post-8': [
      {
        slug: 'post-9',
        title: '7 Tips from Suppliers about Change Orders',
        description: 'Learn how suppliers handle change orders and manage pricing, timelines, and client relationships.'
      },
      {
        slug: 'post-10',
        title: '7 Tips from Clients about Change Orders',
        description: 'Discover client-side strategies for contract terms, approval processes, and cost control.'
      }
    ],
    'post-9': [
      {
        slug: 'post-8',
        title: '7 Tips from Project Managers about Change Orders',
        description: 'Explore project management best practices for change control workflows and impact analysis.'
      },
      {
        slug: 'post-10',
        title: '7 Tips from Clients about Change Orders',
        description: 'Understand client expectations and requirements for change order management.'
      }
    ],
    'post-10': [
      {
        slug: 'post-8',
        title: '7 Tips from Project Managers about Change Orders',
        description: 'See how project managers coordinate changes and manage stakeholder expectations.'
      },
      {
        slug: 'post-9',
        title: '7 Tips from Suppliers about Change Orders',
        description: 'Learn about supplier considerations for pricing, lead times, and production impacts.'
      }
    ]
  }
  
  return relatedMap[currentSlug] || []
}