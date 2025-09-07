'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConstructionNavbar() {
  const [isPostsOpen, setIsPostsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)

  return (
    <nav className="flex items-center gap-4">
      {/* Posts Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsPostsOpen(!isPostsOpen)}
          onBlur={() => setTimeout(() => setIsPostsOpen(false), 200)}
          className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors duration-200 text-xs"
        >
          POSTS
          <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
        </button>
        
        {isPostsOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] z-50">
            <div className="bg-black text-white p-2 uppercase text-xs tracking-wider">
              <span>CONSTRUCTION POSTS</span>
              <span className="float-right text-[#FF6600]">ACTIVE</span>
            </div>
            <div className="p-2">
              <Link href="/" className="block px-3 py-2 text-xs text-black hover:bg-[#FF6600] hover:text-black uppercase tracking-wider border-b border-black transition-colors">
                [001] ALL POSTS
              </Link>
              <Link href="/posts/post-8" className="block px-3 py-2 text-xs text-black hover:bg-[#FF6600] hover:text-black uppercase tracking-wider border-b border-black transition-colors">
                [002] PROJECT MANAGER TIPS
              </Link>
              <Link href="/posts/post-9" className="block px-3 py-2 text-xs text-black hover:bg-[#FF6600] hover:text-black uppercase tracking-wider transition-colors">
                [003] SUPPLIER MANAGEMENT
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Resources Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsResourcesOpen(!isResourcesOpen)}
          onBlur={() => setTimeout(() => setIsResourcesOpen(false), 200)}
          className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors duration-200 text-xs"
        >
          RESOURCES
          <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
        </button>
        
        {isResourcesOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] z-50">
            <div className="bg-black text-white p-2 uppercase text-xs tracking-wider">
              <span>CONSTRUCTION RESOURCES</span>
              <span className="float-right text-[#FF6600]">SECURE</span>
            </div>
            <div className="p-2">
              <Link href="/resources" className="block px-3 py-2 text-xs text-black hover:bg-[#FF6600] hover:text-black uppercase tracking-wider border-b border-black transition-colors">
                [001] ALL RESOURCES
              </Link>
              <Link href="/resources/infographics" className="block px-3 py-2 text-xs text-black hover:bg-[#FF6600] hover:text-black uppercase tracking-wider border-b border-black transition-colors">
                [002] CONSTRUCTION BLUEPRINTS
              </Link>
              <Link href="/resources/change-order-management" className="block px-3 py-2 text-xs text-black hover:bg-[#FF6600] hover:text-black uppercase tracking-wider transition-colors">
                [003] CONSTRUCTION MANUAL
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Tools Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsToolsOpen(!isToolsOpen)}
          onBlur={() => setTimeout(() => setIsToolsOpen(false), 200)}
          className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors duration-200 text-xs"
        >
          TOOLS
          <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
        </button>
        
        {isToolsOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] z-50">
            <div className="bg-black text-white p-2 uppercase text-xs tracking-wider">
              <span>CONSTRUCTION TOOLS</span>
              <span className="float-right text-[#FF6600]">READY</span>
            </div>
            <div className="p-2">
              <Link href="/change-order-quiz" className="block px-3 py-2 text-xs text-black hover:bg-[#FF6600] hover:text-black uppercase tracking-wider transition-colors">
                [001] CONSTRUCTION ASSESSMENT
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}