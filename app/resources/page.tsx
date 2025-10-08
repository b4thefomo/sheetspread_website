import Link from 'next/link'
import Image from 'next/image'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center gap-2 text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] text-sm font-bold uppercase tracking-wider transition-colors duration-200">
            <Image
              src="/logo.png"
              alt="SheetSpread Logo"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span>&lt;&lt; RETURN TO SHEETSPREAD HQ</span>
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
              DATA RESOURCES
            </span>
            <span>STATUS: COMING SOON</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
          <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
            <span>SHEETSPREAD RESOURCES</span>
            <span className="float-right text-[#FF6600]">IN DEVELOPMENT</span>
          </div>
          <div className="p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-black mb-6 uppercase tracking-wider">COMING SOON</h1>
              <p className="text-black text-lg mb-8 uppercase tracking-wide">
                // DATA RESOURCES UNDER CONSTRUCTION //
              </p>
              <div className="bg-yellow-50 border-2 border-black p-6 mb-8">
                <p className="text-black text-sm leading-relaxed">
                  We're building a comprehensive resource library for SheetSpread users. This will include:
                </p>
                <ul className="mt-4 text-black text-sm text-left list-none space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#FF6600] mr-2">&gt;&gt;</span>
                    <span className="uppercase tracking-wide">SOQL QUERY TEMPLATES</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6600] mr-2">&gt;&gt;</span>
                    <span className="uppercase tracking-wide">DASHBOARD EXAMPLES</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6600] mr-2">&gt;&gt;</span>
                    <span className="uppercase tracking-wide">INTEGRATION GUIDES</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6600] mr-2">&gt;&gt;</span>
                    <span className="uppercase tracking-wide">BEST PRACTICES DOCUMENTATION</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6600] mr-2">&gt;&gt;</span>
                    <span className="uppercase tracking-wide">VIDEO TUTORIALS</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/"
                className="inline-block bg-[#FF6600] text-black px-6 py-3 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200"
              >
                RETURN TO BLOG &gt;&gt;
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // SHEETSPREAD DATA TERMINAL 2024.12.07 //
            </p>
            <p className="text-black text-xs">
              SHEETSPREAD NETWORK - ALL DATA SECURED
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
