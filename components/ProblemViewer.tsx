'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Edit, 
  Ruler, 
  Hand, 
  Volume2, 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Trash2,
  Brain,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Calculator
} from 'lucide-react'
import { Course, Problem } from '@/types'

interface ProblemViewerProps {
  course: Course
  currentProblem: Problem | null
  onProblemSelect: (problem: Problem) => void
  onShowAI: () => void
}

// Sample problems for each course
const sampleProblems: Record<string, Problem[]> = {
  math1: [
    {
      id: '1',
      courseId: 'math1',
      course: {} as Course,
      title: 'Linear Equation Problem',
      content: 'Solve for x: 3x + 7 = 22\nEnter only the numerical value of x.',
      solution: '5',
      difficulty: 'easy',
      topics: ['Linear Equations'],
      source: 'Algebra 1 Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      courseId: 'math1',
      course: {} as Course,
      title: 'System of Equations',
      content: 'Solve the system of equations:\n2x + y = 8\nx - y = 1\nEnter the value of x only.',
      solution: '3',
      difficulty: 'medium',
      topics: ['Systems of Equations'],
      source: 'Algebra 1 Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      courseId: 'math1',
      course: {} as Course,
      title: 'Quadratic Equation',
      content: 'Solve for x: x² - 5x + 6 = 0\nEnter the larger value of x.',
      solution: '3',
      difficulty: 'medium',
      topics: ['Quadratic Functions'],
      source: 'Algebra 1 Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  math2: [
    {
      id: '4',
      courseId: 'math2',
      course: {} as Course,
      title: 'Triangle Properties',
      content: 'In triangle ABC, angle A = 60°, angle B = 45°. What is the measure of angle C in degrees?',
      solution: '75',
      difficulty: 'easy',
      topics: ['Triangles'],
      source: 'Geometry Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      courseId: 'math2',
      course: {} as Course,
      title: 'Circle Properties',
      content: 'A circle has radius 5. What is its circumference? (Use π = 3.14)',
      solution: '31.4',
      difficulty: 'easy',
      topics: ['Circles'],
      source: 'Geometry Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  math3: [
    {
      id: '6',
      courseId: 'math3',
      course: {} as Course,
      title: 'Complex Numbers',
      content: 'Simplify: (3 + 4i)(2 - i)\nEnter the real part only.',
      solution: '10',
      difficulty: 'medium',
      topics: ['Complex Numbers'],
      source: 'Algebra 2 Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '7',
      courseId: 'math3',
      course: {} as Course,
      title: 'Trigonometric Function',
      content: 'Find the exact value of sin(30°).\nEnter as a decimal.',
      solution: '0.5',
      difficulty: 'easy',
      topics: ['Trigonometry'],
      source: 'Algebra 2 Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  precalc: [
    {
      id: '8',
      courseId: 'precalc',
      course: {} as Course,
      title: 'Vector Operations',
      content: 'Find the magnitude of vector v = <3, 4>',
      solution: '5',
      difficulty: 'medium',
      topics: ['Vectors'],
      source: 'Precalculus Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '9',
      courseId: 'precalc',
      course: {} as Course,
      title: 'Matrix Operations',
      content: 'Find the determinant of matrix A = [[2, 3], [1, 4]]',
      solution: '5',
      difficulty: 'medium',
      topics: ['Matrices'],
      source: 'Precalculus Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  calculus: [
    {
      id: '10',
      courseId: 'calculus',
      course: {} as Course,
      title: 'Derivative Problem',
      content: 'Find the derivative of f(x) = x³ + 2x² - 5x + 1 at x = 2',
      solution: '15',
      difficulty: 'medium',
      topics: ['Derivatives'],
      source: 'Calculus Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '11',
      courseId: 'calculus',
      course: {} as Course,
      title: 'Limit Problem',
      content: 'Find the limit: lim(x→2) (x² - 4)/(x - 2)',
      solution: '4',
      difficulty: 'hard',
      topics: ['Limits'],
      source: 'Calculus Final Exam',
      year: 2023,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
}

export default function ProblemViewer({ course, currentProblem, onProblemSelect, onShowAI }: ProblemViewerProps) {
  const [problems, setProblems] = useState<Problem[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [userAnswer, setUserAnswer] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    // Load problems for the selected course
    const courseProblems = sampleProblems[course.name] || []
    setProblems(courseProblems)
    
    // Select first problem by default
    if (courseProblems.length > 0 && !currentProblem) {
      onProblemSelect(courseProblems[0])
    }
  }, [course, currentProblem, onProblemSelect])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (currentProblem && !showSolution) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [currentProblem, showSolution])

  const handleSubmitAnswer = () => {
    if (!currentProblem) return
    
    const correct = userAnswer.trim().toLowerCase() === currentProblem.solution.toLowerCase()
    setIsCorrect(correct)
    setShowSolution(true)
    
    // Award points
    if (correct) {
      const points = currentProblem.difficulty === 'easy' ? 10 : 
                    currentProblem.difficulty === 'medium' ? 20 : 30
      // TODO: Update user points
    }
  }

  const handleNextProblem = () => {
    const currentIndex = problems.findIndex(p => p.id === currentProblem?.id)
    const nextIndex = (currentIndex + 1) % problems.length
    onProblemSelect(problems[nextIndex])
    setUserAnswer('')
    setShowSolution(false)
    setIsCorrect(null)
    setTimeSpent(0)
  }

  const filteredProblems = problems.filter(problem => {
    if (selectedDifficulty !== 'all' && problem.difficulty !== selectedDifficulty) return false
    if (selectedTopics.length > 0 && !selectedTopics.some(topic => problem.topics.includes(topic))) return false
    return true
  })

  return (
    <div className="flex-1 flex flex-col">
      {/* Problem Display */}
      {currentProblem ? (
        <div className="flex-1 flex flex-col">
          {/* Problem Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Ruler className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Hand className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <RotateCw className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-500">Q 100% Q+</span>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Maximize className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Problem Content */}
          <div className="flex-1 p-6 bg-white overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{currentProblem.title}</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    currentProblem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                </div>
              </div>

              <div className="problem-content mb-8">
                <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">{currentProblem.content}</p>
              </div>

              {/* Answer Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer (Numbers Only)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter numerical answer..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg text-gray-900"
                    disabled={showSolution}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim() || showSolution}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-lg"
                  >
                    Submit Answer
                  </button>
                  
                  <button
                    onClick={onShowAI}
                    className="btn-outline flex items-center space-x-2 px-6 py-3 text-lg"
                  >
                    <Brain className="h-5 w-5" />
                    <span>Get AI Help</span>
                  </button>

                  {showSolution && (
                    <button
                      onClick={handleNextProblem}
                      className="btn-secondary px-6 py-3 text-lg"
                    >
                      Next Problem
                    </button>
                  )}
                </div>

                {/* Result Display */}
                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`p-6 rounded-lg ${
                      isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span className={`font-medium text-lg ${
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Your answer:</span>
                        <span className="ml-2 text-lg text-gray-600">{userAnswer}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Correct answer:</span>
                        <span className="ml-2 text-lg text-gray-600">{currentProblem.solution}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // No problem selected
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Problem Selected</h3>
            <p className="text-gray-500">Choose a problem from the list to get started</p>
          </div>
        </div>
      )}
    </div>
  )
} 