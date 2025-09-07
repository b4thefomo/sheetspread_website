'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/resources" className="text-[#FF6600] hover:bg-[#FF6600] hover:text-black px-3 py-2 border-2 border-[#FF6600] text-sm font-bold uppercase tracking-wider transition-colors duration-200 font-mono">
            &lt;&lt; RETURN TO RESOURCES
          </Link>
        </div>
      </header>

      {/* System Status */}
      <div className="mx-4 mt-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
        <div className="flex items-center justify-between text-sm uppercase tracking-wider font-mono">
          <span className="text-black">CALCULATOR MODULE:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6600] border border-black"></div>
              CONSTRUCTION COST ANALYSIS
            </span>
            <span>VERSION: 2.4.1</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mb-8">
          <div className="bg-black text-white p-4 uppercase text-sm tracking-wider font-mono">
            <span>CONSTRUCTION FINANCIAL MODULE</span>
            <span className="float-right text-[#FF6600]">ONLINE</span>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wider font-mono">PROJECT COST PER DAY CALCULATOR</h1>
            <p className="text-black text-sm uppercase tracking-wide font-mono">// REAL-TIME DELAY IMPACT ANALYSIS AND ROI COMPUTATION //</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
            <div className="bg-black text-white p-3 uppercase text-sm tracking-wider font-mono">
              <span>INPUT.001</span>
              <span className="float-right text-[#FF6600]">PROJECT PARAMETERS</span>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-black mb-2 uppercase tracking-wider font-mono">
                  TOTAL PROJECT COST ($)
                </label>
                <input
                  type="number"
                  value={projectCost}
                  onChange={(e) => setProjectCost(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_black] transition-all"
                  placeholder="500000"
                />
                <p className="text-xs text-black mt-1 uppercase font-mono">ENTER TOTAL CONSTRUCTION BUDGET</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 uppercase tracking-wider font-mono">
                  PLANNED DURATION (DAYS)
                </label>
                <input
                  type="number"
                  value={projectDuration}
                  onChange={(e) => setProjectDuration(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_black] transition-all"
                  placeholder="120"
                />
                <p className="text-xs text-black mt-1 uppercase font-mono">WORKING DAYS FROM START TO COMPLETION</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 uppercase tracking-wider font-mono">
                  EXPECTED DELAY IMPACT (%)
                </label>
                <input
                  type="number"
                  value={delayPercentage}
                  onChange={(e) => setDelayPercentage(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_black] transition-all"
                  placeholder="15"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-black mt-1 uppercase font-mono">TYPICAL CONSTRUCTION DELAY PERCENTAGE</p>
              </div>
            </div>

            {/* Industry Benchmarks */}
            <div className="border-t-2 border-black p-4 bg-yellow-50">
              <div className="bg-black text-white px-2 py-1 uppercase text-xs tracking-wider font-mono mb-3">
                INDUSTRY BENCHMARKS
              </div>
              <div className="text-xs text-black space-y-1 font-mono uppercase">
                <p><span className="text-[#FF6600]">■</span> RESIDENTIAL: 10-15% DELAYS TYPICAL</p>
                <p><span className="text-[#FF6600]">■</span> COMMERCIAL: 15-25% DELAYS TYPICAL</p>
                <p><span className="text-[#FF6600]">■</span> INFRASTRUCTURE: 20-35% DELAYS TYPICAL</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            
            {/* Base Calculations */}
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
              <div className="bg-black text-white p-3 uppercase text-sm tracking-wider font-mono">
                <span>OUTPUT.001</span>
                <span className="float-right text-[#FF6600]">COST ANALYSIS</span>
              </div>
              
              {results && (
                <div className="p-6 space-y-4">
                  <div className="border-2 border-black bg-yellow-50 p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black uppercase text-xs tracking-wider font-mono">BASE COST PER DAY</span>
                      <span className="text-xl font-bold text-black font-mono">
                        {formatCurrency(results.baseCostPerDay)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-2 border-black bg-[#FF6600] p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black uppercase text-xs tracking-wider font-mono">COST PER DAY (WITH DELAYS)</span>
                      <span className="text-xl font-bold text-black font-mono">
                        {formatCurrency(results.delayedCostPerDay)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t-2 border-black pt-4 space-y-2 font-mono">
                    <div className="flex justify-between text-xs uppercase">
                      <span className="text-black">ORIGINAL PROJECT COST:</span>
                      <span className="font-bold">{formatCurrency(results.totalProjectCost)}</span>
                    </div>
                    <div className="flex justify-between text-xs uppercase">
                      <span className="text-black">DELAYED DURATION:</span>
                      <span className="font-bold">{formatNumber(parseFloat(projectDuration) * (1 + parseFloat(delayPercentage) / 100))} DAYS</span>
                    </div>
                    <div className="flex justify-between text-xs uppercase">
                      <span className="text-black">DELAYED PROJECT COST:</span>
                      <span className="font-bold">{formatCurrency(results.delayedProjectCost)}</span>
                    </div>
                    <div className="flex justify-between text-xs uppercase border-t-2 border-black pt-2">
                      <span className="text-[#FF6600] font-bold">ADDITIONAL DELAY COST:</span>
                      <span className="text-[#FF6600] font-bold">{formatCurrency(results.additionalCostFromDelays)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Workflow Savings */}
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
              <div className="bg-black text-white p-3 uppercase text-sm tracking-wider font-mono">
                <span>OUTPUT.002</span>
                <span className="float-right text-[#FF6600]">WORKFLOW SAVINGS</span>
              </div>
              
              {results && (
                <div className="p-6 space-y-3">
                  <p className="text-xs uppercase font-mono text-black mb-4">
                    POTENTIAL SAVINGS FROM WORKFLOW OPTIMIZATION:
                  </p>
                  
                  <div className="border-2 border-black p-3 hover:shadow-[4px_4px_0px_0px_black] transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black uppercase text-xs tracking-wider font-mono">SAVE 1 DAY</span>
                      <span className="text-lg font-bold text-black font-mono">
                        {formatCurrency(results.savingsOneDay)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-2 border-black p-3 hover:shadow-[4px_4px_0px_0px_black] transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black uppercase text-xs tracking-wider font-mono">SAVE 2 DAYS</span>
                      <span className="text-lg font-bold text-black font-mono">
                        {formatCurrency(results.savingsTwoDays)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-2 border-black bg-yellow-50 p-3 hover:shadow-[4px_4px_0px_0px_black] transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black uppercase text-xs tracking-wider font-mono">SAVE 10 DAYS</span>
                      <span className="text-lg font-bold text-black font-mono">
                        {formatCurrency(results.savingsTenDays)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-2 border-black bg-[#FF6600] p-3 hover:shadow-[4px_4px_0px_0px_black] transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black uppercase text-xs tracking-wider font-mono">SAVE 2 WEEKS (14 DAYS)</span>
                      <span className="text-xl font-bold text-black font-mono">
                        {formatCurrency(results.savingsTwoWeeks)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border-t-2 border-black p-4 bg-yellow-50">
                <div className="bg-black text-white px-2 py-1 uppercase text-xs tracking-wider font-mono mb-2">
                  ROI ANALYSIS
                </div>
                <p className="text-xs text-black uppercase font-mono">
                  COMPARE SAVINGS AGAINST WORKFLOW IMPROVEMENT COSTS TO DETERMINE RETURN ON INVESTMENT
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-8 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
          <div className="bg-black text-white p-3 uppercase text-sm tracking-wider font-mono">
            <span>ANALYSIS.001</span>
            <span className="float-right text-[#FF6600]">KEY INSIGHTS</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_black] transition-all">
                <div className="bg-black text-white px-2 py-1 uppercase text-xs tracking-wider font-mono mb-3">
                  TIME IMPACT
                </div>
                <p className="text-xs text-black uppercase font-mono">
                  EVERY DAY SAVED DIRECTLY TRANSLATES TO COST SAVINGS BASED ON DAILY PROJECT RATE
                </p>
              </div>
              
              <div className="border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_black] transition-all">
                <div className="bg-black text-white px-2 py-1 uppercase text-xs tracking-wider font-mono mb-3">
                  DELAY FACTOR
                </div>
                <p className="text-xs text-black uppercase font-mono">
                  DELAYS COMPOUND COSTS THROUGH EXTENDED OVERHEAD AND RESOURCE ALLOCATION
                </p>
              </div>
              
              <div className="border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_black] transition-all">
                <div className="bg-black text-white px-2 py-1 uppercase text-xs tracking-wider font-mono mb-3">
                  WORKFLOW ROI
                </div>
                <p className="text-xs text-black uppercase font-mono">
                  SMALL IMPROVEMENTS GENERATE SIGNIFICANT SAVINGS OVER PROJECT DURATION
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
          <div className="bg-black text-white p-3 uppercase text-sm tracking-wider font-mono">
            <span>PROTOCOL.001</span>
            <span className="float-right text-[#FF6600]">RECOMMENDATIONS</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#FF6600] border border-black mt-1 flex-shrink-0"></div>
              <p className="text-xs text-black uppercase font-mono">
                <span className="font-bold">INVEST IN PREVENTION:</span> USE CALCULATIONS TO JUSTIFY PROJECT MANAGEMENT TOOLS AND CHANGE ORDER SYSTEMS
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#FF6600] border border-black mt-1 flex-shrink-0"></div>
              <p className="text-xs text-black uppercase font-mono">
                <span className="font-bold">TRACK DAILY COSTS:</span> MONITOR ACTUAL SPENDING AGAINST PROJECTIONS TO IDENTIFY OVERRUNS EARLY
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#FF6600] border border-black mt-1 flex-shrink-0"></div>
              <p className="text-xs text-black uppercase font-mono">
                <span className="font-bold">QUANTIFY IMPROVEMENTS:</span> MEASURE ROI OF WORKFLOW OPTIMIZATIONS AND PROCESS CHANGES
              </p>
            </div>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-8 bg-white border-2 border-black shadow-[4px_4px_0px_0px_black]">
          <div className="bg-black text-white p-3 uppercase text-sm tracking-wider font-mono">
            <span>RESOURCES.001</span>
            <span className="float-right text-[#FF6600]">RELATED FILES</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/resources/change-order-management" 
                className="block border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <h3 className="font-bold text-[#FF6600] mb-2 uppercase text-xs tracking-wider font-mono">CHANGE ORDER MANAGEMENT</h3>
                <p className="text-xs text-black uppercase font-mono">
                  TOOLS AND TEMPLATES FOR MANAGING PROJECT CHANGES
                </p>
              </Link>
              <div className="block border-2 border-black p-4 opacity-50">
                <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-wider font-mono">PROJECT MANAGEMENT TEMPLATES</h3>
                <p className="text-xs text-black uppercase font-mono">
                  COMING SOON: COMPREHENSIVE TRACKING TEMPLATES
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] mx-4 mb-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-black text-xs uppercase tracking-wider mb-2 font-mono">
              // CONSTRUCTION MANAGEMENT CALCULATOR 2024.12.07 //
            </p>
            <p className="text-black text-xs font-mono">
              CONSTRUCTION HQ DATABASE - FINANCIAL MODULE ACTIVE
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}