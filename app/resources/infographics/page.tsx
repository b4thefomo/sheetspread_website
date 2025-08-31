import ChangeOrderInfographic from '@/components/ChangeOrderInfographic';
import Link from 'next/link';

export default function InfographicsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/resources" className="text-blue-600 hover:underline">Resources</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Infographics</span>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Change Order Management Infographics
          </h1>
          <p className="text-xl text-gray-600">
            Visual guides for effective change order processes
          </p>
        </div>

        <div className="space-y-16">
          {/* Supplier Infographic */}
          <div id="supplier" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Supplier Perspective</h2>
            <ChangeOrderInfographic perspective="supplier" />
          </div>

          {/* Project Manager Infographic */}
          <div id="project-manager" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Project Manager Perspective</h2>
            <ChangeOrderInfographic perspective="project-manager" />
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Want to save these infographics for your team?
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Download Supplier Guide (PDF)
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Download PM Guide (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}