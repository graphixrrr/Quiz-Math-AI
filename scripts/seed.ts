import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create courses
  const courses = [
    {
      name: 'math1',
      displayName: 'Math 1 (Algebra 1)',
      description: 'Foundational algebra concepts including linear equations, inequalities, and functions.',
      level: 1,
      topics: JSON.stringify(['Linear Equations', 'Inequalities', 'Functions', 'Systems of Equations', 'Polynomials'])
    },
    {
      name: 'math2',
      displayName: 'Math 2 (High School Geometry)',
      description: 'Geometric concepts, proofs, and spatial reasoning.',
      level: 2,
      topics: JSON.stringify(['Triangles', 'Circles', 'Polygons', 'Transformations', 'Proofs'])
    },
    {
      name: 'math3',
      displayName: 'Math 3 (Algebra 2)',
      description: 'Advanced algebra including quadratics, complex numbers, and trigonometry.',
      level: 3,
      topics: JSON.stringify(['Quadratic Functions', 'Complex Numbers', 'Trigonometry', 'Logarithms', 'Sequences'])
    },
    {
      name: 'precalc',
      displayName: 'Precalculus',
      description: 'Preparation for calculus with advanced functions and analytical geometry.',
      level: 4,
      topics: JSON.stringify(['Trigonometric Functions', 'Vectors', 'Matrices', 'Conic Sections', 'Limits'])
    },
    {
      name: 'calculus',
      displayName: 'Calculus',
      description: 'Differential and integral calculus concepts.',
      level: 5,
      topics: JSON.stringify(['Derivatives', 'Integrals', 'Applications', 'Series', 'Multivariable'])
    }
  ]

  const createdCourses = []
  for (const course of courses) {
    const createdCourse = await prisma.course.upsert({
      where: { name: course.name },
      update: course,
      create: course
    })
    createdCourses.push(createdCourse)
  }

  // Create sample problems
  const problems = [
    // Math 1 Problems
    {
      courseId: 'math1',
      title: 'Linear Equation Problem',
      content: 'Solve for x: 3x + 7 = 22',
      solution: 'x = 5',
      difficulty: 'easy',
      topics: JSON.stringify(['Linear Equations']),
      source: 'Algebra 1 Final Exam',
      year: 2023
    },
    {
      courseId: 'math1',
      title: 'System of Equations',
      content: 'Solve the system of equations:\n2x + y = 8\nx - y = 1',
      solution: 'x = 3, y = 2',
      difficulty: 'medium',
      topics: JSON.stringify(['Systems of Equations']),
      source: 'Algebra 1 Final Exam',
      year: 2023
    },
    {
      courseId: 'math1',
      title: 'Quadratic Function',
      content: 'Find the vertex of the parabola y = x² - 4x + 3',
      solution: '(2, -1)',
      difficulty: 'medium',
      topics: JSON.stringify(['Quadratic Functions']),
      source: 'Algebra 1 Final Exam',
      year: 2023
    },

    // Math 2 Problems
    {
      courseId: 'math2',
      title: 'Triangle Properties',
      content: 'In triangle ABC, angle A = 60°, angle B = 45°. What is the measure of angle C?',
      solution: '75°',
      difficulty: 'easy',
      topics: JSON.stringify(['Triangles']),
      source: 'Geometry Final Exam',
      year: 2023
    },
    {
      courseId: 'math2',
      title: 'Circle Properties',
      content: 'A circle has radius 5. What is its circumference?',
      solution: '10π',
      difficulty: 'easy',
      topics: JSON.stringify(['Circles']),
      source: 'Geometry Final Exam',
      year: 2023
    },
    {
      courseId: 'math2',
      title: 'Pythagorean Theorem',
      content: 'In a right triangle, the legs are 3 and 4. What is the length of the hypotenuse?',
      solution: '5',
      difficulty: 'medium',
      topics: JSON.stringify(['Triangles']),
      source: 'Geometry Final Exam',
      year: 2023
    },

    // Math 3 Problems
    {
      courseId: 'math3',
      title: 'Complex Numbers',
      content: 'Simplify: (3 + 4i)(2 - i)',
      solution: '10 + 5i',
      difficulty: 'medium',
      topics: JSON.stringify(['Complex Numbers']),
      source: 'Algebra 2 Final Exam',
      year: 2023
    },
    {
      courseId: 'math3',
      title: 'Trigonometric Function',
      content: 'Find the exact value of sin(30°)',
      solution: '1/2',
      difficulty: 'easy',
      topics: JSON.stringify(['Trigonometry']),
      source: 'Algebra 2 Final Exam',
      year: 2023
    },
    {
      courseId: 'math3',
      title: 'Logarithm Problem',
      content: 'Solve for x: log₂(x) = 3',
      solution: '8',
      difficulty: 'medium',
      topics: JSON.stringify(['Logarithms']),
      source: 'Algebra 2 Final Exam',
      year: 2023
    },

    // Precalculus Problems
    {
      courseId: 'precalc',
      title: 'Trigonometric Identity',
      content: 'Prove that sin²θ + cos²θ = 1',
      solution: 'Using the Pythagorean theorem on the unit circle...',
      difficulty: 'hard',
      topics: JSON.stringify(['Trigonometric Functions']),
      source: 'Precalculus Final Exam',
      year: 2023
    },
    {
      courseId: 'precalc',
      title: 'Vector Operations',
      content: 'Find the magnitude of vector v = <3, 4>',
      solution: '5',
      difficulty: 'medium',
      topics: JSON.stringify(['Vectors']),
      source: 'Precalculus Final Exam',
      year: 2023
    },
    {
      courseId: 'precalc',
      title: 'Matrix Operations',
      content: 'Find the determinant of matrix A = [[2, 3], [1, 4]]',
      solution: '5',
      difficulty: 'medium',
      topics: JSON.stringify(['Matrices']),
      source: 'Precalculus Final Exam',
      year: 2023
    },

    // Calculus Problems
    {
      courseId: 'calculus',
      title: 'Derivative Problem',
      content: 'Find the derivative of f(x) = x³ + 2x² - 5x + 1',
      solution: 'f\'(x) = 3x² + 4x - 5',
      difficulty: 'medium',
      topics: JSON.stringify(['Derivatives']),
      source: 'Calculus Final Exam',
      year: 2023
    },
    {
      courseId: 'calculus',
      title: 'Integral Problem',
      content: 'Evaluate ∫(2x + 1)dx',
      solution: 'x² + x + C',
      difficulty: 'medium',
      topics: JSON.stringify(['Integrals']),
      source: 'Calculus Final Exam',
      year: 2023
    },
    {
      courseId: 'calculus',
      title: 'Limit Problem',
      content: 'Find the limit: lim(x→2) (x² - 4)/(x - 2)',
      solution: '4',
      difficulty: 'hard',
      topics: JSON.stringify(['Limits']),
      source: 'Calculus Final Exam',
      year: 2023
    }
  ]

  for (const problem of problems) {
    const course = createdCourses.find(c => c.name === problem.courseId)
    if (course) {
      await prisma.problem.create({
        data: {
          ...problem,
          courseId: course.id
        }
      })
    }
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 