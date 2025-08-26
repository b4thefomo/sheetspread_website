import Link from 'next/link'

export default function ChangeManagementCTA() {
  return (
    <div className="bg-blue-50 border-2 border-cyan-600 rounded-lg p-6 my-8">
      <h3 className="text-blue-900 text-xl font-semibold mt-0 mb-3">
        📊 Download Industry Insights on Change Management Report
      </h3>
      <p className="text-slate-700 mb-4">
        Get exclusive insights into change order management from a supplier&apos;s perspective. 
        Learn best practices, strategies, and tools to optimize your change order processes.
      </p>
      <Link 
        href="/resources/change-order-management"
        className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-md font-bold hover:bg-cyan-700 transition-colors"
      >
        Access the Full Report →
      </Link>
    </div>
  )
}