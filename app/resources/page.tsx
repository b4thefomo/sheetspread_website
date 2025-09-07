import Link from 'next/link'
import { getAllResources } from '@/lib/resources'

export default function ResourcesPage() {
  const resources = getAllResources()

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] text-sm font-bold uppercase tracking-wider transition-colors duration-200">
            &lt;&lt; RETURN TO CONSTRUCTION HQ
          </Link>
        </div>
      </header>

      {/* System Status */}
      <div className="mx-4 mt-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
        <div className="flex items-center justify-between text-sm uppercase tracking-wider">
          <span className="text-black">RESOURCE DATABASE:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
              CONSTRUCTION PROTOCOLS
            </span>
            <span>FILES: {String(resources.length + 1).padStart(2, '0')}</span>
            <span>ACCESS: AUTHORIZED</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mb-8">
          <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
            <span>CONSTRUCTION RESOURCE DATABASE</span>
            <span className="float-right text-[#FF6600]">ACTIVE</span>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wider">CONSTRUCTION MANAGEMENT RESOURCES</h1>
            <p className="text-black text-sm uppercase tracking-wide">// BLUEPRINTS, PROTOCOLS, AND CONSTRUCTION INTELLIGENCE //</p>
          </div>
        </div>
        
        {/* Featured Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Featured Resource - Cost Calculator */}
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
            <div className="bg-black text-white p-3 uppercase text-sm tracking-wider">
              <span>FEATURED.001</span>
              <span className="float-right text-[#FF6600]">NEW</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black mb-2 uppercase tracking-wide">PROJECT COST CALCULATOR</h2>
                  <p className="text-black mb-4 text-sm">REAL-TIME COST ANALYSIS FOR CONSTRUCTION PROJECT PLANNING AND DELAY IMPACT ASSESSMENT</p>
                  <Link 
                    href="/resources/cost-calculator" 
                    className="inline-block bg-[#FF6600] text-black px-4 py-2 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200"
                  >
                    CALCULATE COSTS &gt;&gt;
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-[#FF6600] border-2 border-black flex items-center justify-center">
                    <span className="text-black font-bold text-xs uppercase">CALC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Resource - Infographics */}
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
            <div className="bg-black text-white p-3 uppercase text-sm tracking-wider">
              <span>FEATURED.002</span>
              <span className="float-right text-[#FF6600]">PRIORITY</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black mb-2 uppercase tracking-wide">CONSTRUCTION CHANGE ORDER BLUEPRINTS</h2>
                  <p className="text-black mb-4 text-sm">VISUAL CONSTRUCTION PROTOCOLS FOR CHANGE ORDER MANAGEMENT ACROSS PROJECT TEAMS</p>
                  <Link 
                    href="/resources/infographics" 
                    className="inline-block bg-[#FF6600] text-black px-4 py-2 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200"
                  >
                    ACCESS BLUEPRINTS &gt;&gt;
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-[#FF6600] border-2 border-black flex items-center justify-center">
                    <span className="text-black font-bold text-xs uppercase">BLUEPRINT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {resources.length === 0 ? (
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-6">
            <div className="text-center">
              <div className="text-[#FF6600] text-xs uppercase tracking-wider mb-2">SYSTEM STATUS</div>
              <p className="text-black uppercase font-bold">NO ADDITIONAL CONSTRUCTION RESOURCES LOADED</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <div key={resource.slug} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] overflow-hidden hover:shadow-[8px_8px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                <div className="bg-black text-white p-2 uppercase text-xs tracking-wider">
                  <span>FILE.{String(index + 2).padStart(3, '0')}</span>
                  <span className="float-right text-[#FF6600]">SECURE</span>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide leading-tight">
                    <Link href={`/resources/${resource.slug}`} className="hover:text-[#FF6600]">
                      {resource.title}
                    </Link>
                  </h2>
                  <p className="text-black text-xs mb-4">{resource.description}</p>
                  <div className="flex flex-col gap-2 mb-4">
                    {resource.fileType && (
                      <span className="text-xs text-black uppercase tracking-wider">FORMAT: {resource.fileType}</span>
                    )}
                    {resource.fileSize && (
                      <span className="text-xs text-black uppercase tracking-wider">SIZE: {resource.fileSize}</span>
                    )}
                  </div>
                  <Link 
                    href={`/resources/${resource.slug}`} 
                    className="text-[#FF6600] text-xs uppercase font-bold tracking-wider hover:bg-[#FF6600] hover:text-black px-2 py-1 border border-[#FF6600] transition-colors"
                  >
                    ACCESS FILE &gt;&gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // CONSTRUCTION MANAGEMENT SYSTEM 2024.12.07 //
            </p>
            <p className="text-black text-xs">
              CONSTRUCTION HQ DATABASE - ALL BLUEPRINTS SECURED
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}