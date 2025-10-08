import { getPostBySlug, getAllPosts } from '../../../lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { renderPostWithCTA } from '@/lib/renderPostWithCTA'

interface PostPageProps {
  params: {
    slug: string
  }
}

// Simple mapping of post slug to image filename
const getPostImage = (slug: string): string => {
  return `/${slug}.jpeg`
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const postImage = getPostImage(params.slug)

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] text-sm font-bold uppercase tracking-wider transition-colors duration-200">
              &lt;&lt; RETURN TO SHEETSPREAD HQ
            </Link>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
              <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
              <span>READING MODE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] overflow-hidden">
          {/* Data Header */}
          <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
            <div className="flex justify-between items-center">
              <span>DATA PROJECT: ACTIVE</span>
              <span className="text-[#FF6600]">DATA SYNC</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-96 w-full border-b-2 border-black">
            <Image
              src={postImage}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#FF6600] text-black px-3 py-2 text-sm uppercase font-bold border-2 border-black">
              DATA SHEET
            </div>
            <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-2 text-xs uppercase tracking-wider border border-white">
              DATA LOADED
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title Section */}
            <div className="mb-8 pb-6 border-b-2 border-black">
              <div className="text-xs uppercase tracking-wider text-[#FF6600] mb-2">
                // DATA DOCUMENT CLASSIFICATION: PUBLIC //
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-4 uppercase tracking-wide leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-xs uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
                  STATUS: ACTIVE
                </span>
                <span>LENGTH: {post.content.length} BYTES</span>
                <span>FORMAT: TEXT</span>
              </div>
            </div>
            
            {/* Content Body */}
            <div className="construction-content max-w-none leading-relaxed">
              <div className="border-l-4 border-[#FF6600] pl-4 mb-6">
                <div className="text-xs uppercase tracking-wider text-[#FF6600] mb-4">
                  DATA ANALYSIS:
                </div>
                {renderPostWithCTA(post.content, params.slug)}
              </div>
            </div>
          </div>

          {/* System Info Footer */}
          <div className="bg-black text-white p-4 text-xs uppercase tracking-wider">
            <div className="flex justify-between items-center">
              <span>END OF DATA PROJECT</span>
              <div className="flex items-center gap-4">
                <span className="text-[#FF6600]">DATA: VERIFIED</span>
                <span>PROJECT SIZE: {post.content.length} BYTES</span>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-black font-bold uppercase tracking-wider transition-colors duration-200 shadow-[4px_4px_0px_0px_#FF6600]"
          >
            RETURN TO SHEETSPREAD HQ &gt;&gt;
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // SHEETSPREAD DATA TERMINAL ACCESS //
            </p>
            <p className="text-black text-xs">
              SHEETSPREAD NETWORK - SECURE CONNECTION ESTABLISHED
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
} 