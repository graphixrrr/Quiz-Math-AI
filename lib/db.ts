import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getCourses() {
  return await prisma.course.findMany({
    orderBy: { level: 'asc' }
  })
}

export async function getCourseById(id: string) {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      problems: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

export async function getProblems(filters?: {
  courseId?: string
  topics?: string[]
  difficulty?: string
  source?: string
}) {
  return await prisma.problem.findMany({
    where: {
      ...(filters?.courseId && { courseId: filters.courseId }),
      ...(filters?.difficulty && { difficulty: filters.difficulty }),
      ...(filters?.source && { source: filters.source }),
      ...(filters?.topics && {
        topics: {
          contains: JSON.stringify(filters.topics)
        }
      })
    },
    include: {
      course: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getProblemById(id: string) {
  return await prisma.problem.findUnique({
    where: { id },
    include: {
      course: true
    }
  })
}

export async function createUser(data: { email: string; name: string }) {
  return await prisma.user.create({
    data
  })
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      sessions: {
        orderBy: { startTime: 'desc' },
        take: 10
      },
      submissions: {
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
          problem: {
            include: { course: true }
          }
        }
      }
    }
  })
}

export async function createSession(data: {
  userId: string
  courseId?: string
}) {
  return await prisma.session.create({
    data
  })
}

export async function updateSession(id: string, data: {
  endTime?: Date
  score?: number
  problemsAttempted?: number
  problemsCorrect?: number
}) {
  return await prisma.session.update({
    where: { id },
    data
  })
}

export async function createSubmission(data: {
  userId: string
  problemId: string
  answer: string
  isCorrect: boolean
  timeSpent: number
}) {
  return await prisma.submission.create({
    data
  })
}

export async function createAIRequest(data: {
  userId: string
  problemId?: string
  question: string
  response: string
}) {
  return await prisma.aIRequest.create({
    data
  })
}

export async function updateUserPoints(userId: string, points: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: { points }
  })
} 