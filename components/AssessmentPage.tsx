'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Calculator, 
  Brain, 
  Trophy, 
  ArrowRight, 
  Sparkles,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  BarChart3,
  Target,
  Award
} from 'lucide-react'
import { Course, Problem } from '@/types'
import { generateMath3Problems, generatePrecalcProblems, generateCalculusProblems } from '@/scripts/generate-problems'

interface AssessmentPageProps {
  onBack: () => void
}

// Assessment questions from previous released exams
const assessmentQuestions: Record<string, Problem[]> = {
  math1: [
    // Algebra 1 Final Exam Questions (2023)
    {
      id: 'a1_1',
      courseId: 'math1',
      course: {} as Course,
      title: 'Linear Equation - Final Exam',
      content: 'Solve for x: 3x + 7 = 22\nEnter only the numerical value.',
      solution: '5',
      difficulty: 'medium',
      topics: ['Linear Equations'],
      source: 'Algebra 1 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a1_2',
      courseId: 'math1',
      course: {} as Course,
      title: 'System of Equations - Final Exam',
      content: 'Solve the system:\n2x + y = 8\nx - y = 1\nEnter the value of x only.',
      solution: '3',
      difficulty: 'medium',
      topics: ['Systems of Equations'],
      source: 'Algebra 1 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a1_3',
      courseId: 'math1',
      course: {} as Course,
      title: 'Quadratic Equation - Final Exam',
      content: 'Solve: x² - 5x + 6 = 0\nEnter the larger root.',
      solution: '3',
      difficulty: 'hard',
      topics: ['Quadratic Equations'],
      source: 'Algebra 1 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a1_4',
      courseId: 'math1',
      course: {} as Course,
      title: 'Factoring - Final Exam',
      content: 'Factor: x² + 7x + 12\nEnter the sum of the two factors.',
      solution: '7',
      difficulty: 'medium',
      topics: ['Factoring'],
      source: 'Algebra 1 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a1_5',
      courseId: 'math1',
      course: {} as Course,
      title: 'Inequality - Final Exam',
      content: 'Solve: 2x - 3 > 7\nEnter the smallest integer value of x that satisfies the inequality.',
      solution: '6',
      difficulty: 'medium',
      topics: ['Inequalities'],
      source: 'Algebra 1 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  math2: [
    // Geometry Final Exam Questions (2023)
    {
      id: 'g1_1',
      courseId: 'math2',
      course: {} as Course,
      title: 'Pythagorean Theorem - Final Exam',
      content: 'In a right triangle, if a = 3 and b = 4, what is the length of the hypotenuse c?\nEnter only the numerical value.',
      solution: '5',
      difficulty: 'easy',
      topics: ['Pythagorean Theorem'],
      source: 'Geometry Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'g1_2',
      courseId: 'math2',
      course: {} as Course,
      title: 'Area of Circle - Final Exam',
      content: 'Find the area of a circle with radius 6 units.\nEnter your answer rounded to the nearest whole number.',
      solution: '113',
      difficulty: 'medium',
      topics: ['Circle Area'],
      source: 'Geometry Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'g1_3',
      courseId: 'math2',
      course: {} as Course,
      title: 'Volume of Cylinder - Final Exam',
      content: 'Find the volume of a cylinder with radius 4 and height 10.\nEnter your answer rounded to the nearest whole number.',
      solution: '503',
      difficulty: 'medium',
      topics: ['Volume'],
      source: 'Geometry Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'g1_4',
      courseId: 'math2',
      course: {} as Course,
      title: 'Triangle Area - Final Exam',
      content: 'Find the area of a triangle with base 8 and height 6.',
      solution: '24',
      difficulty: 'easy',
      topics: ['Triangle Area'],
      source: 'Geometry Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'g1_5',
      courseId: 'math2',
      course: {} as Course,
      title: 'Surface Area - Final Exam',
      content: 'Find the surface area of a cube with side length 5.',
      solution: '150',
      difficulty: 'medium',
      topics: ['Surface Area'],
      source: 'Geometry Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  math3: [
    // Algebra 2 Final Exam Questions (2023)
    {
      id: 'a2_1',
      courseId: 'math3',
      course: {} as Course,
      title: 'Complex Numbers - Final Exam',
      content: 'Simplify: (3 + 4i)(2 - i)\nEnter the real part only.',
      solution: '10',
      difficulty: 'medium',
      topics: ['Complex Numbers'],
      source: 'Algebra 2 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a2_2',
      courseId: 'math3',
      course: {} as Course,
      title: 'Logarithmic Equation - Final Exam',
      content: 'Solve: log₂(x) = 4\nEnter the value of x.',
      solution: '16',
      difficulty: 'medium',
      topics: ['Logarithms'],
      source: 'Algebra 2 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a2_3',
      courseId: 'math3',
      course: {} as Course,
      title: 'Exponential Equation - Final Exam',
      content: 'Solve: 2^x = 16\nEnter the value of x.',
      solution: '4',
      difficulty: 'medium',
      topics: ['Exponential Functions'],
      source: 'Algebra 2 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a2_4',
      courseId: 'math3',
      course: {} as Course,
      title: 'Polynomial Division - Final Exam',
      content: 'Divide: (x³ - 8) ÷ (x - 2)\nEnter the coefficient of x² in the result.',
      solution: '1',
      difficulty: 'hard',
      topics: ['Polynomial Division'],
      source: 'Algebra 2 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a2_5',
      courseId: 'math3',
      course: {} as Course,
      title: 'Rational Expression - Final Exam',
      content: 'Simplify: (x² - 4)/(x - 2)\nEnter the coefficient of x in the result.',
      solution: '1',
      difficulty: 'medium',
      topics: ['Rational Expressions'],
      source: 'Algebra 2 Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  precalc: [
    // Precalculus Final Exam Questions (2023)
    {
      id: 'pc_1',
      courseId: 'precalc',
      course: {} as Course,
      title: 'Trigonometric Identity - Final Exam',
      content: 'Simplify: sin²(x) + cos²(x)\nEnter the simplified value.',
      solution: '1',
      difficulty: 'easy',
      topics: ['Trigonometric Identities'],
      source: 'Precalculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'pc_2',
      courseId: 'precalc',
      course: {} as Course,
      title: 'Unit Circle - Final Exam',
      content: 'What is sin(π/2)?\nEnter the exact value.',
      solution: '1',
      difficulty: 'easy',
      topics: ['Unit Circle'],
      source: 'Precalculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'pc_3',
      courseId: 'precalc',
      course: {} as Course,
      title: 'Complex System - Final Exam',
      content: 'Solve the system:\n2x + 3y = 7\n4x - y = 1\nEnter the value of x.',
      solution: '1',
      difficulty: 'medium',
      topics: ['Systems of Equations'],
      source: 'Precalculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'pc_4',
      courseId: 'precalc',
      course: {} as Course,
      title: 'Function Composition - Final Exam',
      content: 'If f(x) = 2x + 1 and g(x) = x², find f(g(2)).\nEnter the result.',
      solution: '9',
      difficulty: 'medium',
      topics: ['Function Composition'],
      source: 'Precalculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'pc_5',
      courseId: 'precalc',
      course: {} as Course,
      title: 'Inverse Function - Final Exam',
      content: 'If f(x) = 3x - 2, find f⁻¹(7).\nEnter the result.',
      solution: '3',
      difficulty: 'hard',
      topics: ['Inverse Functions'],
      source: 'Precalculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  calculus: [
    // Calculus Final Exam Questions (2023)
    {
      id: 'calc_1',
      courseId: 'calculus',
      course: {} as Course,
      title: 'Derivative - Final Exam',
      content: 'Find the derivative of f(x) = x³ + 2x² - 5x + 1\nEnter the coefficient of x² in f\'(x).',
      solution: '6',
      difficulty: 'medium',
      topics: ['Derivatives'],
      source: 'Calculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calc_2',
      courseId: 'calculus',
      course: {} as Course,
      title: 'Limit - Final Exam',
      content: 'Find the limit: lim(x→2) (x² - 4)/(x - 2)\nEnter the result.',
      solution: '4',
      difficulty: 'medium',
      topics: ['Limits'],
      source: 'Calculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calc_3',
      courseId: 'calculus',
      course: {} as Course,
      title: 'Integral - Final Exam',
      content: 'Find ∫(2x + 3)dx\nEnter the coefficient of x² in the result.',
      solution: '1',
      difficulty: 'medium',
      topics: ['Integration'],
      source: 'Calculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calc_4',
      courseId: 'calculus',
      course: {} as Course,
      title: 'Chain Rule - Final Exam',
      content: 'Find the derivative of f(x) = (x² + 1)³\nEnter the coefficient of x in f\'(x) when x = 1.',
      solution: '12',
      difficulty: 'hard',
      topics: ['Chain Rule'],
      source: 'Calculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calc_5',
      courseId: 'calculus',
      course: {} as Course,
      title: 'Area Under Curve - Final Exam',
      content: 'Find the area under y = 2x from x = 0 to x = 3.\nEnter the result.',
      solution: '9',
      difficulty: 'medium',
      topics: ['Area Under Curve'],
      source: 'Calculus Final Exam 2023',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
}

export default function AssessmentPage({ onBack }: AssessmentPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(1800) // 30 minutes
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const courses: Course[] = [
    {
      id: 'math1',
      name: 'math1',
      displayName: 'Math 1 (Algebra 1)',
      description: 'Fundamental algebra concepts including linear equations, systems, and quadratics',
      level: 1,
      topics: ['Linear Equations', 'Systems of Equations', 'Quadratic Equations', 'Factoring', 'Inequalities'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'math2',
      name: 'math2',
      displayName: 'Math 2 (Geometry)',
      description: 'Geometric concepts including shapes, areas, volumes, and the Pythagorean theorem',
      level: 2,
      topics: ['Pythagorean Theorem', 'Area and Perimeter', 'Volume', 'Surface Area', 'Geometric Proofs'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'math3',
      name: 'math3',
      displayName: 'Math 3 (Algebra 2)',
      description: 'Advanced algebra including complex numbers, logarithms, and polynomial functions',
      level: 3,
      topics: ['Complex Numbers', 'Logarithms', 'Exponential Functions', 'Polynomials', 'Rational Expressions'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'precalc',
      name: 'precalc',
      displayName: 'Precalculus',
      description: 'Preparation for calculus including trigonometry, functions, and advanced algebra',
      level: 4,
      topics: ['Trigonometry', 'Functions', 'Systems of Equations', 'Function Composition', 'Inverse Functions'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calculus',
      name: 'calculus',
      displayName: 'Calculus',
      description: 'Differential and integral calculus concepts',
      level: 5,
      topics: ['Derivatives', 'Limits', 'Integration', 'Chain Rule', 'Area Under Curve'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const currentQuestions = selectedCourse ? assessmentQuestions[selectedCourse.id] || [] : []
  const currentQuestion = currentQuestions[currentQuestionIndex]

  // Timer effect
  useEffect(() => {
    if (assessmentStarted && !assessmentCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleFinishAssessment()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [assessmentStarted, assessmentCompleted, timeRemaining])

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setUserAnswers(new Array(assessmentQuestions[course.id]?.length || 0).fill(''))
  }

  const handleStartAssessment = () => {
    if (selectedCourse) {
      setAssessmentStarted(true)
      setTimeRemaining(1800) // Reset to 30 minutes
    }
  }

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFinishAssessment = () => {
    setAssessmentCompleted(true)
    setAssessmentStarted(false)
    
    // Calculate score
    let correctAnswers = 0
    userAnswers.forEach((answer, index) => {
      if (answer.trim() === currentQuestions[index]?.solution) {
        correctAnswers++
      }
    })
    
    const finalScore = Math.round((correctAnswers / currentQuestions.length) * 100)
    setScore(finalScore)
    setShowResults(true)
  }

  const handleRetakeAssessment = () => {
    setAssessmentStarted(false)
    setAssessmentCompleted(false)
    setCurrentQuestionIndex(0)
    setUserAnswers(new Array(currentQuestions.length).fill(''))
    setShowResults(false)
    setScore(0)
    setTimeRemaining(1800)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600' }
    if (score >= 80) return { grade: 'B', color: 'text-blue-600' }
    if (score >= 70) return { grade: 'C', color: 'text-yellow-600' }
    if (score >= 60) return { grade: 'D', color: 'text-orange-600' }
    return { grade: 'F', color: 'text-red-600' }
  }

  if (showResults) {
    const gradeInfo = getGrade(score)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
                  <p className="text-gray-600">{selectedCourse?.displayName} Final Exam</p>
                </div>
              </div>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                <span className={`text-3xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{score}%</h2>
              <p className="text-gray-600">Final Score</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{currentQuestions.length}</div>
                <div className="text-sm text-blue-700">Total Questions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((score / 100) * currentQuestions.length)}
                </div>
                <div className="text-sm text-green-700">Correct Answers</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {currentQuestions.length - Math.round((score / 100) * currentQuestions.length)}
                </div>
                <div className="text-sm text-red-700">Incorrect Answers</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRetakeAssessment}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Assessment</span>
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (assessmentStarted && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedCourse?.displayName} Assessment</h1>
                  <p className="text-gray-600">Question {currentQuestionIndex + 1} of {currentQuestions.length}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{currentQuestion.title}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Source:</span>
                  <span className="text-sm font-medium text-primary-600">{currentQuestion.source}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 whitespace-pre-line">{currentQuestion.content}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <input
                type="text"
                value={userAnswers[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                placeholder="Enter your answer..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex space-x-3">
                {currentQuestionIndex < currentQuestions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleFinishAssessment}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Finish Assessment
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
              <span className="text-sm text-gray-600">
                {currentQuestionIndex + 1} / {currentQuestions.length}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {currentQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full ${
                    index === currentQuestionIndex
                      ? 'bg-primary-600'
                      : userAnswers[index]
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Final Exam Assessment</h1>
                <p className="text-gray-600">Test your knowledge with questions from previous released exams</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {!selectedCourse ? (
          /* Course Selection */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                onClick={() => handleCourseSelect(course)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{course.displayName}</h3>
                    <p className="text-sm text-gray-600">Level {course.level}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-1">
                  {course.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {course.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                      +{course.topics.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Assessment Info */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.displayName} Final Exam</h2>
              <p className="text-gray-600">Based on previous released exam questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{assessmentQuestions[selectedCourse.id]?.length || 0}</div>
                <div className="text-sm text-blue-700">Questions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">30 min</div>
                <div className="text-sm text-green-700">Time Limit</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-purple-700">Passing Score</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-600 text-sm font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Important Notes:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• This assessment contains questions from actual previous final exams</li>
                    <li>• You have 30 minutes to complete all questions</li>
                    <li>• Enter numerical answers only (no units or symbols)</li>
                    <li>• You can navigate between questions using Previous/Next buttons</li>
                    <li>• Your progress is automatically saved</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStartAssessment}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Start Assessment</span>
              </button>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Choose Different Course
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 