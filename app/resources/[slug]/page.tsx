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
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/resources" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-2 py-1 border border-[#FF6600] text-xs font-bold uppercase tracking-wider transition-colors">
              DATABASE
            </Link>
            <span className="text-black text-xs uppercase">/</span>
            <Link href="/" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-2 py-1 border border-[#FF6600] text-xs font-bold uppercase tracking-wider transition-colors">
              CONSTRUCTION HQ
            </Link>
          </div>
        </div>
      </header>

      {/* System Status */}
      <div className="mx-4 mt-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
        <div className="flex items-center justify-between text-sm uppercase tracking-wider">
          <span className="text-black">RESOURCE FILE:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
              CONSTRUCTION RESOURCE
            </span>
            <span>ACCESS: AUTHORIZED</span>
            <span>STATUS: LOADED</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
          {/* Resource Header */}
          <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
            <span>CONSTRUCTION RESOURCE FILE</span>
            <span className="float-right text-[#FF6600]">SECURE</span>
          </div>

          {/* Title Section */}
          <div className="p-8 border-b-2 border-black">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wider">{resource.title}</h1>
            <div className="text-xs uppercase tracking-wider text-[#FF6600] mb-2">
              // CONSTRUCTION RESOURCE CLASSIFICATION //
            </div>
          </div>
          
          {/* Resource Info */}
          <div className="bg-[#FF6600] border-b-2 border-black p-6">
            <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wider">CONSTRUCTION FILE SPECIFICATIONS</h2>
            <p className="text-black mb-4 text-sm">{resource.description}</p>
            
            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-wider">
              {resource.fileType && (
                <div className="bg-black text-white px-3 py-1 border border-black">
                  FORMAT: {resource.fileType}
                </div>
              )}
              {resource.fileSize && (
                <div className="bg-black text-white px-3 py-1 border border-black">
                  SIZE: {resource.fileSize}
                </div>
              )}
            </div>
            
            {resource.downloadUrl && (
              <div className="mt-6">
                <a 
                  href={resource.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-4 py-2 border-2 border-black font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  DOWNLOAD CONSTRUCTION FILE &gt;&gt;
                </a>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="border-l-4 border-[#FF6600] pl-6">
              <div className="text-xs uppercase tracking-wider text-[#FF6600] mb-4">
                CONSTRUCTION RESOURCE CONTENT:
              </div>
              <div className="prose prose-sm max-w-none text-black">
                <div dangerouslySetInnerHTML={{ __html: formatContent(resource.content) }} />
              </div>
            </div>
          </div>

          {/* System Footer */}
          <div className="bg-black text-white p-4 text-xs uppercase tracking-wider">
            <div className="flex justify-between items-center">
              <span>END OF CONSTRUCTION RESOURCE</span>
              <div className="flex items-center gap-4">
                <span className="text-[#FF6600]">CHECKSUM: VERIFIED</span>
                <span>CLASSIFICATION: CONSTRUCTION</span>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // CONSTRUCTION RESOURCE TERMINAL 2024.12.07 //
            </p>
            <p className="text-black text-xs">
              CONSTRUCTION HQ - SECURE RESOURCE ACCESS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function formatContent(content: string): string {
  return content
    .split('\n\n')
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('\n')
}