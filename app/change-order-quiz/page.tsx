import ChangeOrderQuiz from '@/components/ChangeOrderQuiz'
import Link from 'next/link'

export default function ChangeOrderQuizPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium mb-2 inline-block">
                ← Back to Blog
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Change Order Readiness Assessment</h1>
              <p className="text-gray-600 mt-2">
                Evaluate your organization's need for a formal change order management system
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">About This Assessment</h2>
            <p className="text-blue-800">
              This 15-question assessment will help you understand your organization's readiness for implementing 
              a formal change order management process. Answer honestly to get the most accurate recommendations 
              for your specific situation.
            </p>
            <p className="text-blue-800 mt-2">
              The assessment takes approximately 5 minutes to complete.
            </p>
          </div>
        </div>

        <ChangeOrderQuiz />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 SailsMaps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}