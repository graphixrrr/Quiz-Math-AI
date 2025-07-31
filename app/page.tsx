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
  LogOut,
  Play,
  CheckCircle,
  XCircle
} from 'lucide-react'
import ProblemViewer from '@/components/ProblemViewer'
import AIExplanation from '@/components/AIExplanation'
import PointsPage from '@/components/PointsPage'
import ContactPage from '@/components/ContactPage'
import SettingsPage from '@/components/SettingsPage'
import AssessmentPage from '@/components/AssessmentPage'
import { Course, Problem } from '@/types'
import { generateMath3Problems, generatePrecalcProblems, generateCalculusProblems } from '@/scripts/generate-problems'

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [showAI, setShowAI] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'points' | 'contact' | 'settings' | 'assessment'>('dashboard')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null)
  const [gameState, setGameState] = useState<'course-selection' | 'difficulty-selection' | 'problem-selection' | 'problem-solving' | 'results'>('course-selection')
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showResults, setShowResults] = useState(false)

  // Sample problems for each course with different difficulties
  const sampleProblems: Record<string, Problem[]> = {
    math1: [
      // Easy Problems
      {
        id: '1',
        courseId: 'math1',
        course: {} as Course,
        title: 'Basic Linear Equation',
        content: 'Solve for x: 2x + 5 = 13\nEnter only the numerical value of x.',
        solution: '4',
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
        title: 'Simple Linear Equation',
        content: 'Solve for x: 3x - 7 = 8\nEnter only the numerical value of x.',
        solution: '5',
        difficulty: 'easy',
        topics: ['Linear Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        courseId: 'math1',
        course: {} as Course,
        title: 'Linear Equation with Fractions',
        content: 'Solve for x: (1/2)x + 3 = 7\nEnter only the numerical value of x.',
        solution: '8',
        difficulty: 'easy',
        topics: ['Linear Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        courseId: 'math1',
        course: {} as Course,
        title: 'Linear Equation with Decimals',
        content: 'Solve for x: 0.5x + 2 = 6\nEnter only the numerical value of x.',
        solution: '8',
        difficulty: 'easy',
        topics: ['Linear Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        courseId: 'math1',
        course: {} as Course,
        title: 'Linear Equation with Variables on Both Sides',
        content: 'Solve for x: 2x + 3 = x + 7\nEnter only the numerical value of x.',
        solution: '4',
        difficulty: 'easy',
        topics: ['Linear Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        courseId: 'math1',
        course: {} as Course,
        title: 'Simple Inequality',
        content: 'Solve for x: 2x + 1 > 7\nEnter the smallest integer value of x that satisfies the inequality.',
        solution: '4',
        difficulty: 'easy',
        topics: ['Inequalities'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7',
        courseId: 'math1',
        course: {} as Course,
        title: 'Basic Function Evaluation',
        content: 'If f(x) = 2x + 3, find f(4)\nEnter only the numerical value.',
        solution: '11',
        difficulty: 'easy',
        topics: ['Functions'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '8',
        courseId: 'math1',
        course: {} as Course,
        title: 'Simple Polynomial Addition',
        content: 'Simplify: (2x + 3) + (x + 4)\nEnter the coefficient of x in the simplified form.',
        solution: '3',
        difficulty: 'easy',
        topics: ['Polynomials'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '9',
        courseId: 'math1',
        course: {} as Course,
        title: 'Basic Factoring',
        content: 'Factor: x² + 5x + 6\nEnter the sum of the two factors.',
        solution: '5',
        difficulty: 'easy',
        topics: ['Factoring'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '10',
        courseId: 'math1',
        course: {} as Course,
        title: 'Simple Absolute Value',
        content: 'Solve: |x - 3| = 5\nEnter the larger value of x.',
        solution: '8',
        difficulty: 'easy',
        topics: ['Absolute Value'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Medium Problems
      {
        id: '11',
        courseId: 'math1',
        course: {} as Course,
        title: 'System of Linear Equations',
        content: 'Solve the system:\n2x + y = 8\nx - y = 1\nEnter the value of x.',
        solution: '3',
        difficulty: 'medium',
        topics: ['Systems of Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '12',
        courseId: 'math1',
        course: {} as Course,
        title: 'System with Substitution',
        content: 'Solve the system:\n3x + 2y = 12\nx = 2y\nEnter the value of x.',
        solution: '6',
        difficulty: 'medium',
        topics: ['Systems of Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '13',
        courseId: 'math1',
        course: {} as Course,
        title: 'Quadratic Equation',
        content: 'Solve: x² - 5x + 6 = 0\nEnter the larger root.',
        solution: '3',
        difficulty: 'medium',
        topics: ['Quadratic Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '14',
        courseId: 'math1',
        course: {} as Course,
        title: 'Quadratic by Factoring',
        content: 'Solve: x² + 7x + 12 = 0\nEnter the smaller root.',
        solution: '-4',
        difficulty: 'medium',
        topics: ['Quadratic Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '15',
        courseId: 'math1',
        course: {} as Course,
        title: 'Function Composition',
        content: 'If f(x) = 2x + 1 and g(x) = x - 3, find f(g(5))\nEnter only the numerical value.',
        solution: '5',
        difficulty: 'medium',
        topics: ['Functions'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '16',
        courseId: 'math1',
        course: {} as Course,
        title: 'Polynomial Multiplication',
        content: 'Multiply: (x + 2)(x + 3)\nEnter the coefficient of x in the result.',
        solution: '5',
        difficulty: 'medium',
        topics: ['Polynomials'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '17',
        courseId: 'math1',
        course: {} as Course,
        title: 'Inequality with Fractions',
        content: 'Solve: (1/3)x - 2 > 1\nEnter the smallest integer value of x.',
        solution: '10',
        difficulty: 'medium',
        topics: ['Inequalities'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '18',
        courseId: 'math1',
        course: {} as Course,
        title: 'Absolute Value Inequality',
        content: 'Solve: |2x - 1| < 5\nEnter the largest integer value of x that satisfies the inequality.',
        solution: '2',
        difficulty: 'medium',
        topics: ['Absolute Value'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '19',
        courseId: 'math1',
        course: {} as Course,
        title: 'Linear Function from Points',
        content: 'Find the slope of the line passing through (2, 5) and (4, 9)\nEnter only the numerical value.',
        solution: '2',
        difficulty: 'medium',
        topics: ['Linear Functions'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '20',
        courseId: 'math1',
        course: {} as Course,
        title: 'Word Problem - Age',
        content: 'John is 3 years older than Mary. In 5 years, John will be twice as old as Mary. How old is John now?\nEnter only the numerical value.',
        solution: '7',
        difficulty: 'medium',
        topics: ['Word Problems'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Hard Problems
      {
        id: '21',
        courseId: 'math1',
        course: {} as Course,
        title: 'Complex System of Equations',
        content: 'Solve the system:\n2x + 3y = 12\n4x - y = 7\nEnter the value of x.',
        solution: '3',
        difficulty: 'hard',
        topics: ['Systems of Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '22',
        courseId: 'math1',
        course: {} as Course,
        title: 'Three Variable System',
        content: 'Solve the system:\nx + y + z = 6\nx - y + z = 2\nx + y - z = 4\nEnter the value of x.',
        solution: '3',
        difficulty: 'hard',
        topics: ['Systems of Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '23',
        courseId: 'math1',
        course: {} as Course,
        title: 'Quadratic Formula',
        content: 'Solve: x² - 6x + 8 = 0\nEnter the larger root.',
        solution: '4',
        difficulty: 'hard',
        topics: ['Quadratic Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '24',
        courseId: 'math1',
        course: {} as Course,
        title: 'Complex Quadratic',
        content: 'Solve: 2x² - 5x - 3 = 0\nEnter the larger root.',
        solution: '3',
        difficulty: 'hard',
        topics: ['Quadratic Equations'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '25',
        courseId: 'math1',
        course: {} as Course,
        title: 'Function Domain',
        content: 'Find the domain of f(x) = √(x - 2)\nEnter the smallest integer in the domain.',
        solution: '2',
        difficulty: 'hard',
        topics: ['Functions'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '26',
        courseId: 'math1',
        course: {} as Course,
        title: 'Complex Polynomial',
        content: 'Factor: x³ - 8\nEnter the sum of all coefficients in the factored form.',
        solution: '0',
        difficulty: 'hard',
        topics: ['Polynomials'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '27',
        courseId: 'math1',
        course: {} as Course,
        title: 'Compound Inequality',
        content: 'Solve: -3 < 2x + 1 < 7\nEnter the largest integer value of x.',
        solution: '2',
        difficulty: 'hard',
        topics: ['Inequalities'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '28',
        courseId: 'math1',
        course: {} as Course,
        title: 'Absolute Value Equation',
        content: 'Solve: |2x - 3| = |x + 1|\nEnter the larger value of x.',
        solution: '4',
        difficulty: 'hard',
        topics: ['Absolute Value'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '29',
        courseId: 'math1',
        course: {} as Course,
        title: 'Complex Word Problem',
        content: 'A train travels 300 miles in 5 hours. If it travels at a constant speed, how many miles will it travel in 8 hours?\nEnter only the numerical value.',
        solution: '480',
        difficulty: 'hard',
        topics: ['Word Problems'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '30',
        courseId: 'math1',
        course: {} as Course,
        title: 'Rate Problem',
        content: 'Two pipes can fill a tank in 6 hours and 8 hours respectively. How long will it take both pipes working together?\nEnter the number of hours.',
        solution: '3.43',
        difficulty: 'hard',
        topics: ['Word Problems'],
        source: 'Algebra 1 Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    math2: [
      // Easy Problems
      {
        id: '31',
        courseId: 'math2',
        course: {} as Course,
        title: 'Triangle Angle Sum',
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
        id: '32',
        courseId: 'math2',
        course: {} as Course,
        title: 'Basic Pythagorean Theorem',
        content: 'In a right triangle, if a = 3 and b = 4, what is the length of the hypotenuse c?',
        solution: '5',
        difficulty: 'easy',
        topics: ['Right Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '33',
        courseId: 'math2',
        course: {} as Course,
        title: 'Circle Circumference',
        content: 'A circle has radius 5. What is the circumference? (Use π = 3.14)',
        solution: '31.4',
        difficulty: 'easy',
        topics: ['Circles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '34',
        courseId: 'math2',
        course: {} as Course,
        title: 'Circle Area',
        content: 'A circle has radius 4. What is the area? (Use π = 3.14)',
        solution: '50.24',
        difficulty: 'easy',
        topics: ['Circles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '35',
        courseId: 'math2',
        course: {} as Course,
        title: 'Rectangle Area',
        content: 'A rectangle has length 8 and width 6. What is the area?',
        solution: '48',
        difficulty: 'easy',
        topics: ['Quadrilaterals'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '36',
        courseId: 'math2',
        course: {} as Course,
        title: 'Rectangle Perimeter',
        content: 'A rectangle has length 10 and width 4. What is the perimeter?',
        solution: '28',
        difficulty: 'easy',
        topics: ['Quadrilaterals'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '37',
        courseId: 'math2',
        course: {} as Course,
        title: 'Square Area',
        content: 'A square has side length 7. What is the area?',
        solution: '49',
        difficulty: 'easy',
        topics: ['Quadrilaterals'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '38',
        courseId: 'math2',
        course: {} as Course,
        title: 'Square Perimeter',
        content: 'A square has side length 9. What is the perimeter?',
        solution: '36',
        difficulty: 'easy',
        topics: ['Quadrilaterals'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '39',
        courseId: 'math2',
        course: {} as Course,
        title: 'Triangle Area',
        content: 'A triangle has base 6 and height 8. What is the area?',
        solution: '24',
        difficulty: 'easy',
        topics: ['Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '40',
        courseId: 'math2',
        course: {} as Course,
        title: 'Isosceles Triangle',
        content: 'In an isosceles triangle, two angles are 70° each. What is the measure of the third angle?',
        solution: '40',
        difficulty: 'easy',
        topics: ['Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Medium Problems
      {
        id: '41',
        courseId: 'math2',
        course: {} as Course,
        title: 'Pythagorean Theorem',
        content: 'In a right triangle, if a = 5 and b = 12, what is the length of the hypotenuse c?',
        solution: '13',
        difficulty: 'medium',
        topics: ['Right Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '42',
        courseId: 'math2',
        course: {} as Course,
        title: 'Pythagorean Theorem Reverse',
        content: 'In a right triangle, if a = 8 and c = 17, what is the length of b?',
        solution: '15',
        difficulty: 'medium',
        topics: ['Right Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '43',
        courseId: 'math2',
        course: {} as Course,
        title: 'Circle Properties',
        content: 'A circle has radius 6. What is the area? (Use π = 3.14)',
        solution: '113.04',
        difficulty: 'medium',
        topics: ['Circles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '44',
        courseId: 'math2',
        course: {} as Course,
        title: 'Circle Diameter',
        content: 'A circle has circumference 31.4. What is the diameter? (Use π = 3.14)',
        solution: '10',
        difficulty: 'medium',
        topics: ['Circles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '45',
        courseId: 'math2',
        course: {} as Course,
        title: 'Parallelogram Area',
        content: 'A parallelogram has base 10 and height 7. What is the area?',
        solution: '70',
        difficulty: 'medium',
        topics: ['Quadrilaterals'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '46',
        courseId: 'math2',
        course: {} as Course,
        title: 'Trapezoid Area',
        content: 'A trapezoid has bases 8 and 12, and height 5. What is the area?',
        solution: '50',
        difficulty: 'medium',
        topics: ['Quadrilaterals'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '47',
        courseId: 'math2',
        course: {} as Course,
        title: 'Triangle Inequality',
        content: 'Can a triangle have sides of lengths 3, 4, and 8? Enter 1 for yes, 0 for no.',
        solution: '0',
        difficulty: 'medium',
        topics: ['Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '48',
        courseId: 'math2',
        course: {} as Course,
        title: 'Equilateral Triangle',
        content: 'An equilateral triangle has perimeter 24. What is the length of one side?',
        solution: '8',
        difficulty: 'medium',
        topics: ['Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '49',
        courseId: 'math2',
        course: {} as Course,
        title: 'Similar Triangles',
        content: 'Two similar triangles have corresponding sides in ratio 2:3. If the smaller triangle has area 16, what is the area of the larger triangle?',
        solution: '36',
        difficulty: 'medium',
        topics: ['Similarity'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '50',
        courseId: 'math2',
        course: {} as Course,
        title: 'Volume of Cube',
        content: 'A cube has edge length 5. What is the volume?',
        solution: '125',
        difficulty: 'medium',
        topics: ['Volume'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Hard Problems
      {
        id: '51',
        courseId: 'math2',
        course: {} as Course,
        title: 'Complex Pythagorean',
        content: 'In a right triangle, if one leg is 7 and the hypotenuse is 25, what is the other leg?',
        solution: '24',
        difficulty: 'hard',
        topics: ['Right Triangles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '52',
        courseId: 'math2',
        course: {} as Course,
        title: 'Circle Sector',
        content: 'A circle has radius 10. What is the area of a 90-degree sector? (Use π = 3.14)',
        solution: '78.5',
        difficulty: 'hard',
        topics: ['Circles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '53',
        courseId: 'math2',
        course: {} as Course,
        title: 'Inscribed Angle',
        content: 'In a circle, a central angle measures 60°. What is the measure of an inscribed angle that intercepts the same arc?',
        solution: '30',
        difficulty: 'hard',
        topics: ['Circles'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '54',
        courseId: 'math2',
        course: {} as Course,
        title: 'Volume of Cylinder',
        content: 'A cylinder has radius 4 and height 6. What is the volume? (Use π = 3.14)',
        solution: '301.44',
        difficulty: 'hard',
        topics: ['Volume'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '55',
        courseId: 'math2',
        course: {} as Course,
        title: 'Surface Area of Sphere',
        content: 'A sphere has radius 5. What is the surface area? (Use π = 3.14)',
        solution: '314',
        difficulty: 'hard',
        topics: ['Surface Area'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '56',
        courseId: 'math2',
        course: {} as Course,
        title: 'Volume of Cone',
        content: 'A cone has radius 3 and height 8. What is the volume? (Use π = 3.14)',
        solution: '75.36',
        difficulty: 'hard',
        topics: ['Volume'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '57',
        courseId: 'math2',
        course: {} as Course,
        title: 'Complex Similarity',
        content: 'Two similar triangles have areas 25 and 100. What is the ratio of their corresponding sides?',
        solution: '2',
        difficulty: 'hard',
        topics: ['Similarity'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '58',
        courseId: 'math2',
        course: {} as Course,
        title: 'Coordinate Geometry',
        content: 'Find the distance between points (3, 4) and (7, 8)',
        solution: '5.66',
        difficulty: 'hard',
        topics: ['Coordinate Geometry'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '59',
        courseId: 'math2',
        course: {} as Course,
        title: 'Midpoint Formula',
        content: 'Find the midpoint between points (2, 6) and (8, 10)',
        solution: '5',
        difficulty: 'hard',
        topics: ['Coordinate Geometry'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '60',
        courseId: 'math2',
        course: {} as Course,
        title: 'Slope of Line',
        content: 'Find the slope of the line passing through (1, 3) and (5, 11)',
        solution: '2',
        difficulty: 'hard',
        topics: ['Coordinate Geometry'],
        source: 'Geometry Final Exam',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    math3: generateMath3Problems(),
    precalc: generatePrecalcProblems(),
    calculus: generateCalculusProblems()
  }

  const courses: Course[] = [
    {
      id: 'math1',
      name: 'Math 1',
      displayName: 'Algebra 1',
      description: 'Linear equations, systems, and basic algebra',
      level: 1,
      topics: ['Linear Equations', 'Systems of Equations', 'Inequalities', 'Functions'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'math2',
      name: 'Math 2',
      displayName: 'Geometry',
      description: 'Geometric shapes, theorems, and proofs',
      level: 2,
      topics: ['Triangles', 'Circles', 'Polygons', 'Transformations'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'math3',
      name: 'Math 3',
      displayName: 'Algebra 2',
      description: 'Advanced algebra and functions',
      level: 3,
      topics: ['Quadratic Equations', 'Complex Numbers', 'Logarithms', 'Polynomials'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'precalc',
      name: 'Precalculus',
      displayName: 'Precalculus',
      description: 'Preparation for calculus',
      level: 4,
      topics: ['Trigonometry', 'Vectors', 'Matrices', 'Complex Numbers'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calculus',
      name: 'Calculus',
      displayName: 'Calculus',
      description: 'Limits, derivatives, and integrals',
      level: 5,
      topics: ['Limits', 'Derivatives', 'Integrals', 'Applications'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setGameState('difficulty-selection')
    setCurrentProblem(null)
    setShowAI(false)
    setSelectedDifficulty(null)
    setUserAnswer('')
    setIsCorrect(null)
    setShowResults(false)
  }

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty)
    setGameState('problem-selection')
  }

  const handleProblemSelect = (problem: Problem) => {
    setCurrentProblem(problem)
    setGameState('problem-solving')
    setUserAnswer('')
    setIsCorrect(null)
    setShowResults(false)
  }

  const handleStartProblem = () => {
    if (currentProblem) {
      setGameState('problem-solving')
    }
  }

  const handleSubmitAnswer = () => {
    if (currentProblem && userAnswer.trim()) {
      const isAnswerCorrect = userAnswer.trim() === currentProblem.solution
      setIsCorrect(isAnswerCorrect)
      setShowResults(true)
      
      if (isAnswerCorrect) {
        const pointsEarned = selectedDifficulty === 'easy' ? 10 : selectedDifficulty === 'medium' ? 20 : 30
        setUserPoints(prev => prev + pointsEarned)
      }
    }
  }

  const handleNextProblem = () => {
    setGameState('problem-selection')
    setCurrentProblem(null)
    setUserAnswer('')
    setIsCorrect(null)
    setShowResults(false)
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
    setGameState('course-selection')
    setSelectedDifficulty(null)
    setCurrentProblem(null)
    setShowAI(false)
    setUserAnswer('')
    setIsCorrect(null)
    setShowResults(false)
  }

  const handleBackToDifficulty = () => {
    setGameState('difficulty-selection')
    setCurrentProblem(null)
    setUserAnswer('')
    setIsCorrect(null)
    setShowResults(false)
  }

  const getFilteredProblems = () => {
    if (!selectedCourse || !selectedDifficulty) return []
    return sampleProblems[selectedCourse.id]?.filter(p => p.difficulty === selectedDifficulty) || []
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
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
                onClick={() => {
                  setCurrentPage('dashboard')
                  setGameState('course-selection')
                  setSelectedCourse(null)
                }}
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
                  setGameState('course-selection')
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Practice Problems
              </button>
              <button 
                onClick={() => setCurrentPage('assessment')}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === 'assessment' 
                    ? 'text-primary-600 bg-primary-50 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
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
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentPage === 'points' ? (
            <PointsPage onBack={() => setCurrentPage('dashboard')} />
          ) : currentPage === 'contact' ? (
            <ContactPage onBack={() => setCurrentPage('dashboard')} />
          ) : currentPage === 'settings' ? (
            <SettingsPage onBack={() => setCurrentPage('dashboard')} />
          ) : currentPage === 'assessment' ? (
            <AssessmentPage onBack={() => setCurrentPage('dashboard')} />
          ) : (
            // Main Dashboard Content
            <div className="flex-1 p-8 overflow-y-auto">
              {gameState === 'course-selection' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-6xl mx-auto"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Choose Your Math Course
                    </h2>
                    <p className="text-gray-600">
                      Select a course to start practicing with AI-powered explanations
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => handleCourseSelect(course)}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary-300 p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary-600" />
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {sampleProblems[course.id]?.length || 0} problems
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.displayName}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {course.topics.slice(0, 2).map((topic, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                          {course.topics.length > 2 && (
                            <span className="text-xs text-gray-500">+{course.topics.length - 2} more</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {gameState === 'difficulty-selection' && selectedCourse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-6">
                    <button
                      onClick={handleBackToCourses}
                      className="text-primary-600 hover:text-primary-700 mb-3 flex items-center space-x-2 mx-auto"
                    >
                      <ArrowRight className="h-4 w-4 rotate-180" />
                      <span>Back to Courses</span>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Choose Difficulty Level
                    </h2>
                    <p className="text-gray-600">
                      {selectedCourse.displayName} - Select your challenge level
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(['easy', 'medium', 'hard'] as const).map((difficulty) => {
                      const problemCount = sampleProblems[selectedCourse.id]?.filter(p => p.difficulty === difficulty).length || 0
                      return (
                        <motion.button
                          key={difficulty}
                          onClick={() => handleDifficultySelect(difficulty)}
                          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-300 p-5 text-left h-32 flex flex-col justify-between"
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="text-2xl">{getDifficultyIcon(difficulty)}</div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                {difficulty} Level
                              </h3>
                              <p className="text-sm text-gray-600">
                                {difficulty === 'easy' ? 'Basic concepts' :
                                 difficulty === 'medium' ? 'Intermediate problems' :
                                 'Advanced problems'}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                              {problemCount} problems
                            </div>
                            <div className="text-primary-600">
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {gameState === 'problem-selection' && selectedCourse && selectedDifficulty && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-6xl mx-auto"
                >
                  <div className="text-center mb-6">
                    <button
                      onClick={handleBackToDifficulty}
                      className="text-primary-600 hover:text-primary-700 mb-3 flex items-center space-x-2 mx-auto"
                    >
                      <ArrowRight className="h-4 w-4 rotate-180" />
                      <span>Back to Difficulty</span>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Choose a Problem
                    </h2>
                    <p className="text-gray-600">
                      {selectedCourse.displayName} - {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Level
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
                    {getFilteredProblems().slice(0, 12).map((problem, index) => (
                      <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        onClick={() => handleProblemSelect(problem)}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary-300 p-4 h-48 flex flex-col"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {problem.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-4 flex-1">
                          {problem.content}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-gray-500">
                            {problem.source}
                          </span>
                          <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
                            <Play className="h-3 w-3" />
                            <span className="text-sm">Start</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {getFilteredProblems().length > 12 && (
                    <div className="text-center mt-6">
                      <p className="text-gray-500 text-sm">
                        Showing 12 of {getFilteredProblems().length} problems
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {gameState === 'problem-solving' && currentProblem && (
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <button
                      onClick={handleBackToDifficulty}
                      className="text-primary-600 hover:text-primary-700 flex items-center space-x-2"
                    >
                      <ArrowRight className="h-4 w-4 rotate-180" />
                      <span>Back to Problems</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {currentProblem.title}
                        </h2>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentProblem.difficulty)}`}>
                            {currentProblem.difficulty} Level
                          </span>
                          <span className="text-sm text-gray-500">
                            {currentProblem.source}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          {selectedDifficulty === 'easy' ? 10 : selectedDifficulty === 'medium' ? 20 : 30} points
                        </div>
                        <div className="text-sm text-gray-500">Available</div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem:</h3>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
                          {currentProblem.content}
                        </pre>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Answer (Numbers Only):
                      </label>
                      <input
                        type="number"
                        id="answer"
                        step="any"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter numerical answer..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={!userAnswer.trim()}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>Submit Answer</span>
                      </button>
                      <button
                        onClick={() => setShowAI(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Brain className="h-5 w-5" />
                        <span>Get Help</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showResults && currentProblem && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-6">
                      {isCorrect ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                          <CheckCircle className="h-8 w-8" />
                          <span className="text-xl font-semibold">Correct!</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2 text-red-600 mb-4">
                          <XCircle className="h-8 w-8" />
                          <span className="text-xl font-semibold">Incorrect</span>
                        </div>
                      )}
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Answer:</h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <span className="text-lg font-mono">{userAnswer}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Correct Answer:</h3>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <span className="text-lg font-mono text-green-800">{currentProblem.solution}</span>
                        </div>
                      </div>

                      {isCorrect && (
                        <div className="mb-6">
                          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                            <div className="flex items-center justify-center space-x-2 text-yellow-800">
                              <Trophy className="h-5 w-5" />
                              <span className="font-semibold">
                                +{selectedDifficulty === 'easy' ? 10 : selectedDifficulty === 'medium' ? 20 : 30} points earned!
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-4">
                        <button
                          onClick={handleNextProblem}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                          Next Problem
                        </button>
                        <button
                          onClick={() => setShowAI(true)}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Brain className="h-5 w-5" />
                          <span>Get Explanation</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* AI Explanation Modal */}
      {showAI && currentProblem && (
        <AIExplanation
          problem={currentProblem}
          userAnswer={userAnswer}
          isCorrect={isCorrect}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  )
} 