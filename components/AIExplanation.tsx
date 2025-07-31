'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Brain, 
  Send, 
  Lightbulb, 
  BookOpen, 
  Target,
  Loader2,
  Sparkles
} from 'lucide-react'
import { Problem, AIExplanationResponse } from '@/types'

interface AIExplanationProps {
  problem: Problem
  userAnswer?: string
  isCorrect?: boolean | null
  onClose: () => void
}

export default function AIExplanation({ problem, userAnswer: propUserAnswer, isCorrect, onClose }: AIExplanationProps) {
  const [question, setQuestion] = useState('')
  const [explanation, setExplanation] = useState<AIExplanationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userAnswer, setUserAnswer] = useState(propUserAnswer || '')

  const handleAskQuestion = async () => {
    if (!question.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId: problem.title,
          question: question,
          userAnswer: userAnswer || undefined,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setExplanation(data)
      } else {
        console.error('Failed to get AI explanation')
      }
    } catch (error) {
      console.error('Error getting AI explanation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    "How do I start solving this problem?",
    "What are the key concepts I need to know?",
    "Can you walk me through the solution step by step?",
    "What are common mistakes to avoid?",
    "How can I check if my answer is correct?"
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">AI Math Tutor</h2>
                <p className="text-sm text-gray-600">Get help with: {problem.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex h-[calc(90vh-120px)]">
            {/* Left Panel - Problem and Input */}
            <div className="w-1/2 border-r border-gray-200 flex flex-col">
              {/* Problem Display */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Current Problem</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{problem.content}</p>
                </div>
              </div>

              {/* Your Answer */}
              <div className="p-6 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer (Optional)
                </label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer if you have one..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900"
                />
              </div>

              {/* Question Input */}
              <div className="p-6 flex-1 flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ask the AI Tutor
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask any question about this problem..."
                  className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm resize-none text-gray-900"
                  rows={4}
                />
                
                <div className="mt-4">
                  <button
                    onClick={handleAskQuestion}
                    disabled={!question.trim() || isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span>{isLoading ? 'Getting Answer...' : 'Ask Question'}</span>
                  </button>
                </div>

                {/* Quick Questions */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Questions</h4>
                  <div className="space-y-2">
                    {quickQuestions.map((quickQ, index) => (
                      <button
                        key={index}
                        onClick={() => setQuestion(quickQ)}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {quickQ}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - AI Response */}
            <div className="w-1/2 flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">AI Response</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
                      <p className="text-gray-600">AI is thinking...</p>
                    </div>
                  </div>
                ) : explanation ? (
                  <div className="space-y-6">
                    {/* Main Explanation */}
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Sparkles className="h-5 w-5 text-primary-600" />
                        <h4 className="font-medium text-primary-900">Explanation</h4>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-primary-800 whitespace-pre-line">{explanation.explanation}</p>
                      </div>
                    </div>

                    {/* Step-by-Step Solution */}
                    {explanation.steps.length > 0 && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Target className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium text-blue-900">Step-by-Step Solution</h4>
                        </div>
                        <ol className="list-decimal list-inside space-y-2 text-blue-800">
                          {explanation.steps.map((step, index) => (
                            <li key={index} className="text-sm">{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Hints */}
                    {explanation.hints.length > 0 && (
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Lightbulb className="h-5 w-5 text-yellow-600" />
                          <h4 className="font-medium text-yellow-900">Helpful Hints</h4>
                        </div>
                        <ul className="space-y-2 text-yellow-800">
                          {explanation.hints.map((hint, index) => (
                            <li key={index} className="text-sm flex items-start space-x-2">
                              <span className="text-yellow-600 mt-1">•</span>
                              <span>{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related Concepts */}
                    {explanation.relatedConcepts.length > 0 && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                          <h4 className="font-medium text-purple-900">Related Concepts</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {explanation.relatedConcepts.map((concept, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 h-full flex items-center justify-center">
                    <div>
                      <Brain className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p>Ask a question to get AI-powered help!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 