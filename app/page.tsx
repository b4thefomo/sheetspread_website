import { getAllPosts } from '../lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import ConstructionNavbar from '@/components/ResourcesDropdown'

// Simple mapping of post slug to image filename
const getPostImage = (slug: string): string => {
  return `/${slug}.jpeg`
}

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black uppercase tracking-wider">LOWEDA CONSTRUCTION BLOG</h1>
              <p className="text-black mt-2 uppercase text-sm tracking-wide">// CONSTRUCTION MANAGEMENT INTELLIGENCE SYSTEM</p>
            </div>
            <ConstructionNavbar />
          </div>
        </div>
      </header>

      {/* System Status Banner */}
      <div className="mx-4 mt-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
        <div className="flex items-center justify-between text-sm uppercase tracking-wider">
          <span className="text-black">SYSTEM STATUS:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
              CONSTRUCTION PROTOCOLS
            </span>
            <span>POSTS: {String(posts.length).padStart(2, '0')}</span>
            <span>MODE: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group"
            >
              <article className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] overflow-hidden transition-all duration-200 hover:shadow-[8px_8px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                {/* Data Header */}
                <div className="bg-black text-white p-2 uppercase text-xs tracking-wider">
                  <span>{String(index + 1).padStart(3, '0')}</span>
                  <span className="float-right text-[#FF6600]">TYPE: POST</span>
                </div>
                
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full border-b-2 border-black">
                  <Image
                    src={getPostImage(post.slug)}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#FF6600] text-black px-2 py-1 text-xs uppercase font-bold border border-black">
                    {Math.ceil(post.content.length / 1000)} MIN READ
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-black mb-3 uppercase tracking-wide leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-black text-xs leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#FF6600] text-xs uppercase font-bold tracking-wider group-hover:bg-[#FF6600] group-hover:text-black px-2 py-1 border border-[#FF6600]">
                      ACCESS POST &gt;&gt;
                    </span>
                    <div className="text-xs uppercase tracking-wider text-black">
                      {post.content.length} BYTES
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // CONSTRUCTION HQ TERMINAL 2024.12.07 //
            </p>
            <p className="text-black text-xs">
              COPYRIGHT CONSTRUCTION HQ NETWORK - ALL BLUEPRINTS SECURED
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
