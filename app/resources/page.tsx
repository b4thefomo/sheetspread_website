import Link from 'next/link'
import { getAllResources } from '@/lib/resources'

export default function ResourcesPage() {
  const resources = getAllResources()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-8">Resources</h1>
      
      {/* Featured Resource - Infographics */}
      <div className="mb-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 Change Order Infographics</h2>
            <p className="text-gray-700 mb-4">Visual guides for effective change order management from different perspectives</p>
            <Link 
              href="/resources/infographics" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View All Infographics →
            </Link>
          </div>
          <div className="hidden md:block">
            <svg className="w-32 h-32 text-blue-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
      
      {resources.length === 0 ? (
        <p className="text-gray-600">No additional resources available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/resources/${resource.slug}`} className="hover:text-blue-600">
                  {resource.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex flex-col gap-2">
                {resource.fileType && (
                  <span className="text-sm text-gray-500">Type: {resource.fileType}</span>
                )}
                {resource.fileSize && (
                  <span className="text-sm text-gray-500">Size: {resource.fileSize}</span>
                )}
                <Link 
                  href={`/resources/${resource.slug}`} 
                  className="text-blue-600 hover:underline inline-block"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}