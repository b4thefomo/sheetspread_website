import ChangeManagementCTA from '@/components/ChangeManagementCTA'
import React from 'react'

export function renderPostWithCTA(content: string, slug: string) {
  // Only add CTAs to posts 8 and 9
  if (slug !== 'post-8' && slug !== 'post-9') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  // Split content into paragraphs and sections
  const sections = content.split(/(<p><b>.*?<\/b><\/p>)/).filter(Boolean)
  
  // Calculate positions for 3 CTAs distributed evenly
  const totalSections = sections.length
  const ctaPositions = [
    Math.floor(totalSections * 0.25),  // After 25% of content
    Math.floor(totalSections * 0.5),   // After 50% of content
    Math.floor(totalSections * 0.75)   // After 75% of content
  ]

  const result = []
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

  return <>{result}</>
}