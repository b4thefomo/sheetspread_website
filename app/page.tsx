'use client'

import { getAllPosts } from '../lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// Simple mapping of post slug to image filename
const getPostImage = (slug: string): string => {
  return `/${slug}.jpeg`
}

export default function Home() {
  const posts = getAllPosts()
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SailsMaps Blog</h1>
              <p className="text-gray-600 mt-2">AI-Powered Location Intelligence Insights</p>
            </div>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-lg">
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={getPostImage(post.slug)}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                    <p className="text-gray-600 text-sm leading-relaxed space-y-4">
                      {post.excerpt}
                    </p>
                  <div className="mt-4">
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 SailsMaps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 
