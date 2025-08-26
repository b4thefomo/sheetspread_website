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
      
      {resources.length === 0 ? (
        <p className="text-gray-600">No resources available yet.</p>
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