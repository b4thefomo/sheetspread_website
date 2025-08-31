'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResourcesDropdown() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <nav className="relative">
      <div className="relative">
        <button
          onClick={() => setIsResourcesOpen(!isResourcesOpen)}
          onBlur={() => setTimeout(() => setIsResourcesOpen(false), 200)}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          Resources
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isResourcesOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
            <div className="py-1">
              <Link
                href="/resources"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                📚 All Resources
              </Link>
              <Link
                href="/resources/infographics"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                📊 Infographics
              </Link>
              <Link
                href="/change-order-quiz"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                📝 Change Order Quiz
              </Link>
              <Link
                href="/resources/change-order-management"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                🔧 Change Order Guide
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}