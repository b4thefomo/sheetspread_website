import { getAllPosts } from '../lib/posts'
import Link from 'next/link'
import Image from 'next/image'

// Simple mapping of post slug to image filename
const getPostImage = (slug: string): string => {
  return `/${slug}.jpeg`
}

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">SailsMaps Blog</h1>
          <p className="text-gray-600 mt-2">AI-Powered Location Intelligence Insights</p>
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
                    <div
                      className="text-gray-600 text-sm leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
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
