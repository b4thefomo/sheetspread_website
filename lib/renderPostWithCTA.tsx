import ChangeManagementCTA from '@/components/ChangeManagementCTA'
import BlogQuiz from '@/components/BlogQuiz'
import RelatedPosts from '@/components/RelatedPosts'
import { addInternalLinks } from '@/lib/internalLinks'
import React from 'react'

export function renderPostWithCTA(content: string, slug: string) {
  // For posts 8, 9, and 10, add quiz, internal links, CTAs, and related posts
  if (slug === 'post-8' || slug === 'post-9' || slug === 'post-10') {
    // Add internal links to content
    const contentWithLinks = addInternalLinks(content, slug)
    
    // Split content into paragraphs and sections
    const sections = contentWithLinks.split(/(<p><b>.*?<\/b><\/p>)/).filter(Boolean)
    
    // Calculate positions for 2 CTAs distributed evenly (quiz is at the top)
    const totalSections = sections.length
    const ctaPositions = [
      Math.floor(totalSections * 0.4),   // After 40% of content
      Math.floor(totalSections * 0.8)    // After 80% of content
    ]

    const result = []
    
    // Add quiz at the beginning
    result.push(<BlogQuiz key="quiz" />)
    
    let ctaIndex = 0

    for (let i = 0; i < sections.length; i++) {
      // Add the content section
      result.push(
        <div key={`content-${i}`} dangerouslySetInnerHTML={{ __html: sections[i] }} />
      )

      // Add CTA if we're at one of the designated positions
      if (ctaIndex < ctaPositions.length && i === ctaPositions[ctaIndex]) {
        result.push(<ChangeManagementCTA key={`cta-${ctaIndex}`} />)
        ctaIndex++
      }
    }
    
    // Add related posts at the end
    result.push(<RelatedPosts key="related-posts" currentSlug={slug} />)

    return <>{result}</>
  }

  // For all other posts, just render basic content
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}