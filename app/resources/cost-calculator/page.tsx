'use client'

import { useState, useEffect } from 'react'

interface CalculationResults {
  baseCostPerDay: number
  delayedCostPerDay: number
  totalProjectCost: number
  delayedProjectCost: number
  additionalCostFromDelays: number
  savingsOneDay: number
  savingsTwoDays: number
  savingsTenDays: number
  savingsTwoWeeks: number
}

export default function CostCalculatorPage() {
  const [projectCost, setProjectCost] = useState<string>('500000')
  const [projectDuration, setProjectDuration] = useState<string>('120')
  const [delayPercentage, setDelayPercentage] = useState<string>('15')
  const [results, setResults] = useState<CalculationResults | null>(null)

  const calculateResults = () => {
    const cost = parseFloat(projectCost) || 0
    const duration = parseFloat(projectDuration) || 1
    const delayPct = parseFloat(delayPercentage) || 0

    // Base calculations
    const baseCostPerDay = cost / duration
    const delayMultiplier = 1 + (delayPct / 100)
    const delayedDuration = duration * delayMultiplier
    const delayedProjectCost = cost * delayMultiplier
    const delayedCostPerDay = delayedProjectCost / delayedDuration
    const additionalCostFromDelays = delayedProjectCost - cost

    // Workflow savings calculations (using delayed cost per day as the baseline)
    const savingsOneDay = delayedCostPerDay * 1
    const savingsTwoDays = delayedCostPerDay * 2
    const savingsTenDays = delayedCostPerDay * 10
    const savingsTwoWeeks = delayedCostPerDay * 14

    setResults({
      baseCostPerDay,
      delayedCostPerDay,
      totalProjectCost: cost,
      delayedProjectCost,
      additionalCostFromDelays,
      savingsOneDay,
      savingsTwoDays,
      savingsTenDays,
      savingsTwoWeeks
    })
  }

  useEffect(() => {
    calculateResults()
  }, [projectCost, projectDuration, delayPercentage])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Project Cost Per Day Calculator</h1>
          <p className="text-xl opacity-90">
            Calculate daily project costs, understand delay impacts, and quantify workflow improvement savings
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Parameters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Project Cost ($)
                </label>
                <input
                  type="number"
                  value={projectCost}
                  onChange={(e) => setProjectCost(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500000"
                />
                <p className="text-sm text-gray-500 mt-1">Enter the total budget for your project</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Planned Duration (days)
                </label>
                <input
                  type="number"
                  value={projectDuration}
                  onChange={(e) => setProjectDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="120"
                />
                <p className="text-sm text-gray-500 mt-1">Working days from start to completion</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Delay Impact (%)
                </label>
                <input
                  type="number"
                  value={delayPercentage}
                  onChange={(e) => setDelayPercentage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15"
                  min="0"
                  max="100"
                />
                <p className="text-sm text-gray-500 mt-1">Typical construction delays range from 10-25%</p>
              </div>
            </div>

            {/* Industry Benchmarks */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Industry Benchmarks</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Residential:</strong> 10-15% delays typical</p>
                <p><strong>Commercial:</strong> 15-25% delays typical</p>
                <p><strong>Infrastructure:</strong> 20-35% delays typical</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            
            {/* Base Calculations */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Cost Analysis</h2>
              
              {results && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Base Cost Per Day</span>
                    <span className="text-xl font-bold text-green-900">
                      {formatCurrency(results.baseCostPerDay)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-yellow-800">Cost Per Day (with delays)</span>
                    <span className="text-xl font-bold text-yellow-900">
                      {formatCurrency(results.delayedCostPerDay)}
                    </span>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Project Cost:</span>
                      <span className="font-semibold">{formatCurrency(results.totalProjectCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delayed Project Duration:</span>
                      <span className="font-semibold">{formatNumber(parseFloat(projectDuration) * (1 + parseFloat(delayPercentage) / 100))} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delayed Project Cost:</span>
                      <span className="font-semibold">{formatCurrency(results.delayedProjectCost)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 font-bold border-t pt-2">
                      <span>Additional Cost from Delays:</span>
                      <span>{formatCurrency(results.additionalCostFromDelays)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Workflow Savings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Workflow Improvement Savings</h2>
              <p className="text-gray-600 mb-4">
                Potential savings from implementing workflow improvements that reduce project duration:
              </p>
              
              {results && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">Save 1 Day</span>
                    <span className="text-lg font-bold text-blue-900">
                      {formatCurrency(results.savingsOneDay)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">Save 2 Days</span>
                    <span className="text-lg font-bold text-blue-900">
                      {formatCurrency(results.savingsTwoDays)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-purple-800">Save 10 Days</span>
                    <span className="text-lg font-bold text-purple-900">
                      {formatCurrency(results.savingsTenDays)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="font-medium text-green-800">Save 2 Weeks (14 days)</span>
                    <span className="text-xl font-bold text-green-900">
                      {formatCurrency(results.savingsTwoWeeks)}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">ROI Analysis</h3>
                <p className="text-sm text-gray-700">
                  Compare these savings against the cost of implementing workflow improvements, 
                  project management software, or process optimization to determine your return on investment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">⏱️</div>
              <h3 className="font-semibold text-blue-900 mb-1">Time is Money</h3>
              <p className="text-sm text-blue-800">
                Every day saved directly translates to cost savings based on your daily project rate
              </p>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-2">📈</div>
              <h3 className="font-semibold text-yellow-900 mb-1">Delay Impact</h3>
              <p className="text-sm text-yellow-800">
                Delays don't just extend timelines - they compound costs through extended overhead
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">💰</div>
              <h3 className="font-semibold text-green-900 mb-1">Workflow ROI</h3>
              <p className="text-sm text-green-800">
                Small workflow improvements can generate significant cost savings over project duration
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Invest in Prevention:</strong> Use these calculations to justify investments in project management tools, 
                change order systems, and process improvements that prevent delays.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Track Daily Costs:</strong> Monitor your actual daily spending against these projections to 
                identify cost overruns early.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Quantify Improvements:</strong> Use these savings calculations to measure the ROI of workflow 
                optimizations and process changes.
              </p>
            </div>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="/resources/change-order-management" 
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-blue-600 mb-2">Change Order Management</h3>
              <p className="text-sm text-gray-600">
                Tools and templates for managing project changes that can impact costs and timelines
              </p>
            </a>
            <div className="block p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Project Management Templates</h3>
              <p className="text-sm text-gray-600">
                Coming soon: Comprehensive templates for tracking costs and schedules
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}