import Link from 'next/link'
import { getRelatedPosts } from '@/lib/internalLinks'

interface RelatedPostsProps {
  currentSlug: string
}

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug)
  
  if (relatedPosts.length === 0) return null
  
  return (
    <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Related Articles</h3>
      <div className="space-y-6">
        {relatedPosts.map((post) => (
          <div key={post.slug} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-xl font-semibold mb-2">
              <Link 
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {post.title}
              </Link>
            </h4>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <Link 
              href={`/posts/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}