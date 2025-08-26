import Link from 'next/link'
import { getResourceBySlug, getAllResources } from '@/lib/resources'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const resources = getAllResources()
  return resources.map((resource) => ({
    slug: resource.slug,
  }))
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = getResourceBySlug(params.slug)

  if (!resource) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <Link href="/resources" className="text-blue-600 hover:underline">← Back to Resources</Link>
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
      </div>
      
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
        
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">Resource Information</h2>
          <p className="text-gray-700 mb-4">{resource.description}</p>
          
          <div className="flex flex-wrap gap-4">
            {resource.fileType && (
              <div>
                <span className="font-semibold">Type:</span> {resource.fileType}
              </div>
            )}
            {resource.fileSize && (
              <div>
                <span className="font-semibold">Size:</span> {resource.fileSize}
              </div>
            )}
          </div>
          
          {resource.downloadUrl && (
            <div className="mt-6">
              <a 
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Resource
              </a>
            </div>
          )}
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: formatContent(resource.content) }} />
        </div>
      </article>
    </main>
  )
}

function formatContent(content: string): string {
  return content
    .split('\n\n')
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('\n')
}