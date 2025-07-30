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
  Users,
  Target,
  Settings,
  User,
  LogOut
} from 'lucide-react'
import ProblemViewer from '@/components/ProblemViewer'
import AIExplanation from '@/components/AIExplanation'
import PointsPage from '@/components/PointsPage'
import ContactPage from '@/components/ContactPage'
import SettingsPage from '@/components/SettingsPage'
import { Course, Problem } from '@/types'

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [showAI, setShowAI] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [showCourseSelection, setShowCourseSelection] = useState(false)
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'points' | 'contact' | 'settings'>('dashboard')

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
      }
    ],
    math2: [
      {
        id: '3',
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
      }
    ],
    math3: [
      {
        id: '9',
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
      }
    ],
    precalc: [
      {
        id: '5',
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
        id: '6',
        courseId: 'precalc',
        course: {} as Course,
        title: 'Trigonometric Identity',
        content: 'Find the exact value of sin(π/6)',
        solution: '0.5',
        difficulty: 'easy',
        topics: ['Trigonometry'],
        source: 'Precalculus Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7',
        courseId: 'precalc',
        course: {} as Course,
        title: 'Matrix Determinant',
        content: 'Find the determinant of matrix A = [[2, 3], [1, 4]]',
        solution: '5',
        difficulty: 'medium',
        topics: ['Matrices'],
        source: 'Precalculus Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '8',
        courseId: 'precalc',
        course: {} as Course,
        title: 'Complex Number Operations',
        content: 'Simplify: (2 + 3i)(1 - i)\nEnter the real part only.',
        solution: '5',
        difficulty: 'hard',
        topics: ['Complex Numbers'],
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
      }
    ]
  }

  const courses: Course[] = [
    {
      id: 'math1',
      name: 'math1',
      displayName: 'Math 1 (Algebra 1)',
      description: 'Foundational algebra concepts including linear equations, inequalities, and functions.',
      level: 1,
      topics: ['Linear Equations', 'Inequalities', 'Functions', 'Systems of Equations', 'Polynomials'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'math2',
      name: 'math2',
      displayName: 'Math 2 (High School Geometry)',
      description: 'Geometric concepts, proofs, and spatial reasoning.',
      level: 2,
      topics: ['Triangles', 'Circles', 'Polygons', 'Transformations', 'Proofs'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'math3',
      name: 'math3',
      displayName: 'Math 3 (Algebra 2)',
      description: 'Advanced algebra including quadratics, complex numbers, and trigonometry.',
      level: 3,
      topics: ['Quadratic Functions', 'Complex Numbers', 'Trigonometry', 'Logarithms', 'Sequences'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'precalc',
      name: 'precalc',
      displayName: 'Precalculus',
      description: 'Preparation for calculus with advanced functions and analytical geometry.',
      level: 4,
      topics: ['Trigonometric Functions', 'Vectors', 'Matrices', 'Conic Sections', 'Limits'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calculus',
      name: 'calculus',
      displayName: 'Calculus',
      description: 'Differential and integral calculus concepts.',
      level: 5,
      topics: ['Derivatives', 'Integrals', 'Applications', 'Series', 'Multivariable'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setCurrentProblem(null)
    setShowAI(false)
    setShowCourseSelection(false)
  }

  const handleProblemSelect = (problem: Problem) => {
    setCurrentProblem(problem)
    setShowAI(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary-600" />
                <h1 className="text-2xl font-bold text-gray-900">Quiz Math AI</h1>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Beta
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('points')}
                className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full hover:bg-yellow-100 transition-colors cursor-pointer"
              >
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">{userPoints} points</span>
              </button>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Student</h3>
                <p className="text-sm text-gray-500">{userPoints} points</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-primary-600 bg-primary-50 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('dashboard')
                  setShowCourseSelection(true)
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Practice Problems
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Assessments
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Settings</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    currentPage === 'contact' 
                      ? 'text-primary-600 bg-primary-50 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Contact Us
                </button>
                <button 
                  onClick={() => setCurrentPage('settings')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    currentPage === 'settings' 
                      ? 'text-primary-600 bg-primary-50 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {currentPage === 'points' ? (
            <PointsPage onBack={() => setCurrentPage('dashboard')} />
          ) : currentPage === 'contact' ? (
            <ContactPage onBack={() => setCurrentPage('dashboard')} />
          ) : currentPage === 'settings' ? (
            <SettingsPage onBack={() => setCurrentPage('dashboard')} />
          ) : !selectedCourse ? (
            // Course Selection Screen
            <div className="flex-1 p-8">
              {showCourseSelection ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Choose Your Math Course
                    </h2>
                    <p className="text-lg text-gray-600">
                      Select a course to start practicing with AI-powered explanations
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        onClick={() => handleCourseSelect(course)}
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                              <Calculator className="h-6 w-6 text-primary-600" />
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {course.displayName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {course.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {course.topics.slice(0, 3).map((topic) => (
                              <span
                                key={topic}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                            {course.topics.length > 3 && (
                              <span className="text-gray-500 text-xs">+{course.topics.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // Welcome Screen
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-2xl">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="h-12 w-12 text-primary-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Welcome to Quiz Math AI
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Master mathematics with AI-powered explanations and practice problems from final exams.
                    </p>
                    <button
                      onClick={() => setShowCourseSelection(true)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : currentPage === 'dashboard' && selectedCourse ? (
            // Problem Practice Screen - Vertical Layout
            <div className="flex-1 flex flex-col">
              {/* Top Bar */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      ← Back to Courses
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedCourse.displayName}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option>Type: {selectedCourse.displayName}</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option>Topics: All</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option>Difficulty: All</option>
                    </select>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Start
                    </button>
                    <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Answer
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content - Vertical Layout */}
              <div className="flex-1 flex">
                {/* Left Panel - Problem List */}
                <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-4">Practice Problems</h3>
                    <div className="space-y-2">
                      {sampleProblems[selectedCourse.id]?.map((problem) => (
                        <div
                          key={problem.id}
                          onClick={() => handleProblemSelect(problem)}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            currentProblem?.id === problem.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{problem.title}</h4>
                              <p className="text-xs text-gray-500">{problem.source} • {problem.difficulty}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Panel - Problem Display */}
                <div className="flex-1 flex flex-col">
                  <ProblemViewer
                    course={selectedCourse}
                    currentProblem={currentProblem}
                    onProblemSelect={handleProblemSelect}
                    onShowAI={() => setShowAI(true)}
                  />
                </div>

                {/* Right Panel - Working Area */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Working Area</h3>
                    <p className="text-sm text-gray-600">Solve your problem here...</p>
                  </div>
                  <div className="flex-1 p-4">
                    <textarea
                      placeholder="Use this space to work out your solution, take notes, or organize your thoughts..."
                      className="w-full h-full p-4 border-2 border-dashed border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 resize-none working-area text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCourse ? (
            // If course is selected but we're not on dashboard, show course content
            <div className="flex-1 flex flex-col">
              {/* Top Bar */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      ← Back to Courses
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedCourse.displayName}
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* Course Content */}
              <div className="flex-1 p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedCourse.displayName}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {selectedCourse.description}
                  </p>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Practice
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* AI Explanation Modal */}
      {showAI && currentProblem && (
        <AIExplanation
          problem={currentProblem}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  )
} 