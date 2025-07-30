import { NextRequest, NextResponse } from 'next/server'
import { getProblems } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const difficulty = searchParams.get('difficulty')
    const topics = searchParams.get('topics')?.split(',')
    const source = searchParams.get('source')

    const filters = {
      ...(courseId && { courseId }),
      ...(difficulty && { difficulty }),
      ...(topics && { topics }),
      ...(source && { source })
    }

    const problems = await getProblems(filters)
    return NextResponse.json(problems)
  } catch (error) {
    console.error('Error fetching problems:', error)
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    )
  }
} 