import ChangeOrderInfographic from '@/components/ChangeOrderInfographic';
import Link from 'next/link';

export default function InfographicsPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-2 py-1 border border-[#FF6600] text-xs font-bold uppercase tracking-wider transition-colors">
              HQ
            </Link>
            <span className="text-black text-xs uppercase">/</span>
            <Link href="/resources" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-2 py-1 border border-[#FF6600] text-xs font-bold uppercase tracking-wider transition-colors">
              DATABASE
            </Link>
            <span className="text-black text-xs uppercase">/</span>
            <span className="text-black text-xs uppercase font-bold">CONSTRUCTION BLUEPRINTS</span>
          </div>
        </div>
      </header>

      {/* System Status */}
      <div className="mx-4 mt-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
        <div className="flex items-center justify-between text-sm uppercase tracking-wider">
          <span className="text-black">BLUEPRINT SYSTEM:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
              CONSTRUCTION PROTOCOLS
            </span>
            <span>BLUEPRINTS: 02</span>
            <span>STATUS: LOADED</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mb-8">
          <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
            <span>CONSTRUCTION BLUEPRINT DATABASE</span>
            <span className="float-right text-[#FF6600]">CLASSIFIED</span>
          </div>
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wider">
              CONSTRUCTION CHANGE ORDER BLUEPRINTS
            </h1>
            <p className="text-black text-sm uppercase tracking-wide">
              // VISUAL CONSTRUCTION PROTOCOLS FOR PROJECT CHANGE MANAGEMENT //
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Supplier Blueprint */}
          <div id="supplier" className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
            <div className="bg-black text-white p-3 uppercase text-sm tracking-wider">
              <span>BLUEPRINT.001 - SUBCONTRACTOR PROTOCOLS</span>
              <span className="float-right text-[#FF6600]">ACTIVE</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide text-center">
                SUBCONTRACTOR CONSTRUCTION MANAGEMENT
              </h2>
              <ChangeOrderInfographic perspective="supplier" />
            </div>
          </div>

          {/* Project Manager Blueprint */}
          <div id="project-manager" className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
            <div className="bg-black text-white p-3 uppercase text-sm tracking-wider">
              <span>BLUEPRINT.002 - PROJECT MANAGER PROTOCOLS</span>
              <span className="float-right text-[#FF6600]">ACTIVE</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide text-center">
                CONSTRUCTION PROJECT MANAGEMENT
              </h2>
              <ChangeOrderInfographic perspective="project-manager" />
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
          <div className="bg-black text-white p-3 uppercase text-sm tracking-wider">
            <span>BLUEPRINT ARCHIVE</span>
            <span className="float-right text-[#FF6600]">DOWNLOAD</span>
          </div>
          <div className="p-6 text-center">
            <p className="text-black mb-6 text-sm uppercase tracking-wide">
              DOWNLOAD CONSTRUCTION BLUEPRINTS FOR FIELD TEAMS
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-[#FF6600] text-black px-4 py-2 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200">
                DOWNLOAD SUBCONTRACTOR BLUEPRINT
              </button>
              <button className="bg-[#FF6600] text-black px-4 py-2 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200">
                DOWNLOAD PM BLUEPRINT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // CONSTRUCTION BLUEPRINT TERMINAL 2024.12.07 //
            </p>
            <p className="text-black text-xs">
              CONSTRUCTION HQ - ALL BLUEPRINTS DIGITALLY SECURED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}