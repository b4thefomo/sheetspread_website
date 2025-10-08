import Link from 'next/link'
import Image from 'next/image'
import ConstructionNavbar from '@/components/ResourcesDropdown'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-2 sm:mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-4">
              <Image
                src="/logo.png"
                alt="SheetSpread Logo"
                width={48}
                height={48}
                className="w-8 h-8 sm:w-12 sm:h-12"
              />
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black uppercase tracking-wider leading-tight">SHEETSPREAD</h1>
                <p className="text-black mt-1 sm:mt-2 uppercase text-xs sm:text-sm tracking-wide">// DATA AUTOMATION PLATFORM</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ConstructionNavbar />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-2 sm:mx-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] overflow-hidden">
            <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
              <span>SYSTEM STATUS</span>
              <span className="float-right text-[#FF6600]">ONLINE</span>
            </div>
            <div className="p-8 sm:p-12 lg:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black uppercase tracking-wider mb-6 leading-tight">
                Transform Google Sheets Into Your Data Command Center
              </h2>
              <p className="text-black text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Automate Salesforce reporting, schedule intelligent emails, and generate AI-powered insights - all without writing a single line of code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="#features"
                  className="inline-block bg-[#FF6600] text-black px-8 py-4 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[8px_8px_0px_0px_black] transition-all duration-200 text-sm sm:text-base"
                >
                  EXPLORE FEATURES &gt;&gt;
                </Link>
                <Link
                  href="/blog"
                  className="inline-block bg-white text-[#FF6600] px-8 py-4 border-2 border-[#FF6600] font-bold uppercase tracking-wider hover:bg-[#FF6600] hover:text-black transition-all duration-200 text-sm sm:text-base"
                >
                  READ THE BLOG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-2 sm:mx-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mb-8">
            <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
              <span>CORE CAPABILITIES</span>
              <span className="float-right text-[#FF6600]">v1.0</span>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-yellow-50 border-2 border-black p-6">
                  <div className="w-16 h-16 bg-[#FF6600] border-2 border-black flex items-center justify-center mb-4">
                    <span className="text-black font-bold text-2xl">SF</span>
                  </div>
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                    Salesforce Integration
                  </h3>
                  <p className="text-black text-sm leading-relaxed mb-4">
                    Connect to Salesforce in minutes with secure OAuth2. Pull data with SOQL queries, sync Analytics reports, and schedule automatic updates.
                  </p>
                  <div className="text-xs uppercase tracking-wider text-[#FF6600]">
                    &gt;&gt; NO CODING REQUIRED
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-yellow-50 border-2 border-black p-6">
                  <div className="w-16 h-16 bg-[#FF6600] border-2 border-black flex items-center justify-center mb-4">
                    <span className="text-black font-bold text-2xl">AI</span>
                  </div>
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                    AI-Powered Insights
                  </h3>
                  <p className="text-black text-sm leading-relaxed mb-4">
                    Let Google Gemini analyze your data automatically. Generate executive summaries, identify trends, and create narrative reports from raw numbers.
                  </p>
                  <div className="text-xs uppercase tracking-wider text-[#FF6600]">
                    &gt;&gt; INSTANT INTELLIGENCE
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-yellow-50 border-2 border-black p-6">
                  <div className="w-16 h-16 bg-[#FF6600] border-2 border-black flex items-center justify-center mb-4">
                    <span className="text-black font-bold text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                    Automated Reporting
                  </h3>
                  <p className="text-black text-sm leading-relaxed mb-4">
                    Schedule email reports hourly, daily, weekly, or monthly. Set it once and let SheetSpread deliver fresh data to your team automatically.
                  </p>
                  <div className="text-xs uppercase tracking-wider text-[#FF6600]">
                    &gt;&gt; SET AND FORGET
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-2 sm:mx-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
            <div className="bg-black text-white p-4 uppercase text-sm tracking-wider">
              <span>OPERATION PROTOCOL</span>
              <span className="float-right text-[#FF6600]">SIMPLE</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider mb-8 text-center">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-3">
                    Connect Salesforce
                  </h3>
                  <p className="text-black text-sm leading-relaxed">
                    Authorize SheetSpread with OAuth2. Your credentials stay secure - we never see your password.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-3">
                    Build Your Query
                  </h3>
                  <p className="text-black text-sm leading-relaxed">
                    Use our query builder or templates to pull the exact data you need. Save queries for instant reuse.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-3">
                    Automate Everything
                  </h3>
                  <p className="text-black text-sm leading-relaxed">
                    Schedule reports, enable AI insights, and let SheetSpread handle the rest while you focus on decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-2 sm:mx-4 mt-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#FF6600] border-2 border-black shadow-[4px_4px_0px_0px_black] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider mb-4">
              Ready to Transform Your Data Workflow?
            </h2>
            <p className="text-black text-lg mb-6 max-w-2xl mx-auto">
              Join teams already using SheetSpread to automate Salesforce reporting and unlock AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-block bg-black text-white px-8 py-4 border-2 border-black font-bold uppercase tracking-wider hover:shadow-[8px_8px_0px_0px_black] transition-all duration-200"
              >
                LEARN MORE IN BLOG &gt;&gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-2 sm:mx-4 mb-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2">
              // SHEETSPREAD DATA TERMINAL 2024.12.07 //
            </p>
            <p className="text-black text-xs leading-relaxed">
              COPYRIGHT SHEETSPREAD NETWORK - ALL DATA SECURED
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
