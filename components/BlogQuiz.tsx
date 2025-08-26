'use client'

import { useState } from 'react'
import quizData from '@/data/change-order-quiz.json'

interface QuizAnswer {
  text: string
  score: number
}

interface QuizQuestion {
  id: number
  category: string
  question: string
  answers: QuizAnswer[]
}

interface QuizLevel {
  maxScore: number
  level: string
  title: string
  description: string
  recommendations: string[]
}

interface QuizResults {
  totalScore: number
  maxScore: number
  level: string
  title: string
  description: string
  recommendations: string[]
}

function calculateResults(answers: number[]): QuizResults {
  const totalScore = answers.reduce((sum, score) => sum + score, 0)
  const maxScore = quizData.questions.length * 3

  const level = quizData.scoring.levels.find(
    (l: QuizLevel) => totalScore <= l.maxScore
  ) || quizData.scoring.levels[quizData.scoring.levels.length - 1]

  return {
    totalScore,
    maxScore,
    level: level.level,
    title: level.title,
    description: level.description,
    recommendations: level.recommendations
  }
}

export default function BlogQuiz() {
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<QuizResults | null>(null)

  const questions: QuizQuestion[] = quizData.questions

  const handleStart = () => {
    setIsStarted(true)
  }

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const quizResults = calculateResults(newAnswers)
      setResults(quizResults)
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setResults(null)
    setIsStarted(false)
  }

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100
  }

  const getResultColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'moderate': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  if (!isStarted) {
    return (
      <div className="my-8 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">{quizData.title}</h3>
          <p className="text-gray-700 mb-6">{quizData.description}</p>
          <div className="bg-white/80 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              This assessment contains {questions.length} questions and takes approximately 5 minutes to complete.
            </p>
          </div>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Start Assessment
          </button>
        </div>
      </div>
    )
  }

  if (showResults && results) {
    return (
      <div className="my-8 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Assessment Results</h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium">Overall Score</span>
            <span className="text-xl font-bold">{results.totalScore} / {results.maxScore}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${getResultColor(results.level)} transition-all duration-500`}
              style={{ width: `${(results.totalScore / results.maxScore) * 100}%` }}
            />
          </div>
        </div>

        <div className={`p-5 rounded-lg mb-6 ${getResultColor(results.level)} bg-opacity-10 border-2 border-current`}>
          <h4 className={`text-xl font-bold mb-2 ${getResultColor(results.level).replace('bg-', 'text-')}`}>
            {results.title}
          </h4>
          <p className="text-gray-700">{results.description}</p>
        </div>

        <div className="mb-6">
          <h5 className="text-lg font-bold mb-3 text-gray-900">Recommended Actions:</h5>
          <ul className="space-y-2">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700 text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retake Assessment
        </button>
      </div>
    )
  }

  return (
    <div className="my-8 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Change Order Assessment</h3>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-blue-600 font-medium mb-2">
          {questions[currentQuestion].category}
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {questions[currentQuestion].question}
        </h4>
        
        <div className="space-y-2">
          {questions[currentQuestion].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer.score)}
              className="w-full text-left p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <span className="text-gray-800 text-sm">{answer.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}