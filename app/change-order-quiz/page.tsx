import ChangeOrderQuiz from '@/components/ChangeOrderQuiz'
import Link from 'next/link'

export default function ChangeOrderQuizPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] text-sm font-bold uppercase tracking-wider transition-colors duration-200 mb-4 inline-block">
                &lt;&lt; RETURN TO CONSTRUCTION HQ
              </Link>
              <h1 className="text-2xl font-bold text-black uppercase tracking-wider">CONSTRUCTION CHANGE ORDER ASSESSMENT</h1>
              <p className="text-black mt-2 text-sm uppercase tracking-wide">
                // EVALUATE YOUR CONSTRUCTION MANAGEMENT SYSTEM READINESS //
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* System Status */}
      <div className="mx-4 mt-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
        <div className="flex items-center justify-between text-sm uppercase tracking-wider">
          <span className="text-black">ASSESSMENT SYSTEM:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
              CONSTRUCTION PROTOCOL ANALYSIS
            </span>
            <span>QUESTIONS: 15</span>
            <span>STATUS: READY</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
            <div className="bg-black text-white p-3 uppercase text-sm tracking-wider">
              <span>SYSTEM BRIEFING</span>
              <span className="float-right text-[#FF6600]">CLASSIFIED</span>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wider">CONSTRUCTION MANAGEMENT ASSESSMENT PROTOCOL</h2>
              <p className="text-black mb-4 text-sm">
                THIS 15-QUESTION CONSTRUCTION ASSESSMENT ANALYZES YOUR ORGANIZATION'S READINESS FOR IMPLEMENTING 
                FORMAL CHANGE ORDER MANAGEMENT PROTOCOLS. PROVIDE ACCURATE DATA FOR OPTIMAL SYSTEM RECOMMENDATIONS.
              </p>
              <div className="bg-[#FF6600] border-2 border-black p-3 text-black">
                <div className="text-xs uppercase tracking-wider font-bold">
                  ASSESSMENT PARAMETERS: 5 MINUTES | ACCURACY: CRITICAL | OUTPUT: CONSTRUCTION RECOMMENDATIONS
                </div>
              </div>
            </div>
          </div>
        </div>

        <ChangeOrderQuiz />
      </main>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // CONSTRUCTION ASSESSMENT TERMINAL 2024.12.07 //
            </p>
            <p className="text-black text-xs">
              CONSTRUCTION HQ - SECURE ASSESSMENT PROTOCOLS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}