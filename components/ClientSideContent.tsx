'use client'

import React, { useEffect, useState } from 'react'
import { sanitizeHtmlForReact } from '@/lib/sanitizeHtml'

interface ClientSideContentProps {
  content: string
}

export default function ClientSideContent({ content }: ClientSideContentProps) {
  const [htmlContent, setHtmlContent] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const sanitizedContent = sanitizeHtmlForReact(content)
    setHtmlContent(sanitizedContent)
  }, [content])

  if (!isClient) {
    return <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
    </div>
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}