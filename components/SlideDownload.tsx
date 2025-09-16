'use client'

import React from 'react'
import Link from 'next/link'

interface SlideDownloadProps {
  postSlug: string
  slideCount?: number
  className?: string
}

export default function SlideDownload({ postSlug, slideCount = 0, className = '' }: SlideDownloadProps) {
  if (slideCount === 0) {
    return null
  }

  return (
    <div className={`bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] ${className}`}>
      {/* Header */}
      <div className="bg-black text-white p-3 uppercase text-sm tracking-wider font-mono">
        <span>CONSTRUCTION RESOURCE</span>
        <span className="float-right text-[#FF6600]">SLIDES</span>
      </div>
      
      {/* Content */}
      <div className="p-6 font-mono">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-black mb-2 uppercase tracking-wide">
              DOWNLOADABLE CONSTRUCTION SLIDES
            </h3>
            <p className="text-black text-sm mb-4 uppercase tracking-wide">
              KEY TAKEAWAYS AND ACTION ITEMS FOR CONSTRUCTION TEAMS
            </p>
            
            {/* Slide Stats */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-xs text-black uppercase tracking-wider">
                  SLIDES: {slideCount.toString().padStart(2, '0')}
                </span>
                <span className="text-xs text-black uppercase tracking-wider">
                  FORMAT: PDF
                </span>
                <span className="text-xs text-black uppercase tracking-wider">
                  STATUS: READY
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
                <span className="text-xs text-black uppercase tracking-wider">
                  CONSTRUCTION PROTOCOLS VERIFIED
                </span>
              </div>
            </div>

            {/* Download Button */}
            <Link 
              href={`/resources/slides/${postSlug}/slides.pdf`}
              className="inline-block bg-[#FF6600] text-black px-6 py-3 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[8px_8px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 font-mono text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOWNLOAD SLIDES &gt;&gt;
            </Link>
          </div>
          
          {/* Visual Element */}
          <div className="hidden md:block ml-6">
            <div className="w-20 h-20 bg-[#FF6600] border-2 border-black flex items-center justify-center">
              <span className="text-black font-bold text-xs uppercase text-center leading-tight">
                SLIDE<br/>DECK
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Compact version for inline use
export function SlideDownloadCompact({ postSlug, slideCount = 0, className = '' }: SlideDownloadProps) {
  if (slideCount === 0) {
    return null
  }

  return (
    <div className={`bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] ${className}`}>
      <div className="p-4 font-mono flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-black mb-1 uppercase tracking-wide">
            CONSTRUCTION SLIDES
          </h4>
          <p className="text-xs text-black uppercase tracking-wide opacity-80">
            {slideCount} SLIDES • PDF FORMAT
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
            <span className="text-xs text-black uppercase">READY</span>
          </div>
          <Link 
            href={`/resources/slides/${postSlug}/slides.pdf`}
            className="bg-[#FF6600] text-black px-3 py-2 border border-black font-bold uppercase tracking-wider text-xs hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  )
}

// Widget version for sidebar/resource lists
export function SlideDownloadWidget({ postSlug, slideCount = 0, className = '' }: SlideDownloadProps) {
  if (slideCount === 0) {
    return null
  }

  return (
    <div className={`bg-gradient-to-br from-[#FF6600] to-orange-700 border-2 border-black shadow-[4px_4px_0px_0px_black] ${className}`}>
      <div className="p-4 font-mono text-center">
        <div className="bg-black text-white p-2 mb-3 uppercase text-xs tracking-wider">
          <span>SLIDES AVAILABLE</span>
        </div>
        <h4 className="text-black font-bold text-sm mb-2 uppercase">
          CONSTRUCTION<br/>TAKEAWAYS
        </h4>
        <div className="text-black text-xs mb-3 uppercase">
          {slideCount} SLIDES READY
        </div>
        <Link 
          href={`/resources/slides/${postSlug}/slides.pdf`}
          className="block bg-white text-black px-3 py-2 border-2 border-black font-bold uppercase tracking-wider text-xs hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          ACCESS &gt;&gt;
        </Link>
      </div>
    </div>
  )
}