import { NextRequest, NextResponse } from 'next/server'
import { generateMathExplanation } from '@/lib/ai'
import { createAIRequest } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { problemId, question, userAnswer, userId } = body

    if (!problemId || !question) {
      return NextResponse.json(
        { error: 'Problem ID and question are required' },
        { status: 400 }
      )
    }

    const explanation = await generateMathExplanation({
      problemId,
      question,
      userAnswer
    })

    // Save the AI request to database
    if (userId) {
      await createAIRequest({
        userId,
        problemId,
        question,
        response: explanation.explanation
      })
    }

    return NextResponse.json(explanation)
  } catch (error) {
    console.error('Error generating explanation:', error)
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    )
  }
} 