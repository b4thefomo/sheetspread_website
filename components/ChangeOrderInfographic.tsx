import React from 'react';

interface InfographicProps {
  perspective: 'supplier' | 'project-manager';
}

const ChangeOrderInfographic: React.FC<InfographicProps> = ({ perspective }) => {
  if (perspective === 'supplier') {
    return <SupplierInfographic />;
  }
  return <ProjectManagerInfographic />;
};

const SupplierInfographic: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Change Order Management</h1>
          <p className="text-lg text-blue-600 font-semibold">Supplier Perspective</p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <svg className="w-16 h-16 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-3xl font-bold text-gray-800">15%</div>
            <div className="text-sm text-gray-600">Average Margin Impact</div>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <svg className="w-16 h-16 mx-auto mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-3xl font-bold text-gray-800">72hr</div>
            <div className="text-sm text-gray-600">Response Time Goal</div>
          </div>
          
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <svg className="w-16 h-16 mx-auto mb-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div className="text-3xl font-bold text-gray-800">3x</div>
            <div className="text-sm text-gray-600">Documentation Required</div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Change Order Workflow</h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white mb-2">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Request Receipt</span>
            </div>
            
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white mb-2">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Cost Analysis</span>
            </div>
            
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Quote Submission</span>
            </div>
            
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white mb-2">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-sm font-medium">Negotiation</span>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Documentation Essentials
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Original scope reference
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Detailed cost breakdown
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Timeline impact analysis
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Material price quotes
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pricing Strategy
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Include all indirect costs
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Factor in risk premium
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Document labor hours
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Apply standard markups
              </li>
            </ul>
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Risk Assessment Matrix</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-700">L</span>
              </div>
              <span className="text-xs text-gray-600">Low Risk</span>
              <p className="text-xs mt-1">Standard markup</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-yellow-700">M</span>
              </div>
              <span className="text-xs text-gray-600">Medium Risk</span>
              <p className="text-xs mt-1">+5-10% premium</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-700">H</span>
              </div>
              <span className="text-xs text-gray-600">High Risk</span>
              <p className="text-xs mt-1">+15%+ premium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectManagerInfographic: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Change Order Management</h1>
          <p className="text-lg text-purple-600 font-semibold">Project Manager Perspective</p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <svg className="w-12 h-12 mx-auto mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-2xl font-bold text-gray-800">5 days</div>
            <div className="text-xs text-gray-600">Avg Approval Time</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <svg className="w-12 h-12 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="text-2xl font-bold text-gray-800">23%</div>
            <div className="text-xs text-gray-600">Budget Impact</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <svg className="w-12 h-12 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <div className="text-2xl font-bold text-gray-800">85%</div>
            <div className="text-xs text-gray-600">Documented</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <svg className="w-12 h-12 mx-auto mb-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-xs text-gray-600">Active Changes</div>
          </div>
        </div>

        {/* RACI Matrix */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">RACI Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-sm">Activity</th>
                  <th className="border border-gray-300 p-2 text-sm">PM</th>
                  <th className="border border-gray-300 p-2 text-sm">Client</th>
                  <th className="border border-gray-300 p-2 text-sm">Contractor</th>
                  <th className="border border-gray-300 p-2 text-sm">QA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-sm">Identify Change</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-blue-600">R</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-green-600">I</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-purple-600">C</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-green-600">I</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 text-sm">Cost Analysis</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-purple-600">C</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-green-600">I</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-blue-600">R</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-purple-600">C</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-sm">Approval</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-blue-600">R</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-orange-600">A</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-purple-600">C</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-green-600">I</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 text-sm">Implementation</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-orange-600">A</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-green-600">I</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-blue-600">R</td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-purple-600">C</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-3 space-x-4 text-xs">
              <span><span className="font-bold text-blue-600">R</span> = Responsible</span>
              <span><span className="font-bold text-orange-600">A</span> = Accountable</span>
              <span><span className="font-bold text-purple-600">C</span> = Consulted</span>
              <span><span className="font-bold text-green-600">I</span> = Informed</span>
            </div>
          </div>
        </div>

        {/* Control Process */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Change Control Process</h2>
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
            
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h4 className="font-semibold text-gray-800">Identification</h4>
                  <p className="text-sm text-gray-600">Log & categorize change request</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">1</div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">2</div>
                <div className="flex-1 text-left pl-8">
                  <h4 className="font-semibold text-gray-800">Assessment</h4>
                  <p className="text-sm text-gray-600">Impact on scope, time, cost</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h4 className="font-semibold text-gray-800">Review</h4>
                  <p className="text-sm text-gray-600">Stakeholder evaluation</p>
                </div>
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">3</div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">4</div>
                <div className="flex-1 text-left pl-8">
                  <h4 className="font-semibold text-gray-800">Decision</h4>
                  <p className="text-sm text-gray-600">Approve, reject, or defer</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h4 className="font-semibold text-gray-800">Execute</h4>
                  <p className="text-sm text-gray-600">Update plans & implement</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">5</div>
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Tree */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Approval Authority Matrix</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-8 h-8 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-sm">Level 1</span>
              </div>
              <p className="text-xs text-gray-600">PM Authority</p>
              <p className="text-sm font-bold text-gray-800">< $10,000</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-8 h-8 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-semibold text-sm">Level 2</span>
              </div>
              <p className="text-xs text-gray-600">Director Approval</p>
              <p className="text-sm font-bold text-gray-800">$10K - $50K</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-8 h-8 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-semibold text-sm">Level 3</span>
              </div>
              <p className="text-xs text-gray-600">Executive Board</p>
              <p className="text-sm font-bold text-gray-800">> $50,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeOrderInfographic;