import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIExplanationRequest, AIExplanationResponse } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDW1eDtzacM8GoQrgCcKwrlJOR83dL5sgE')

export async function generateMathExplanation(
  request: AIExplanationRequest
): Promise<AIExplanationResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
You are an expert math tutor helping a student understand how to solve a math problem. 
Please provide a clear, step-by-step explanation that is educational and helpful.

Problem: ${request.problemId}
Student's question: ${request.question}
${request.userAnswer ? `Student's answer: ${request.userAnswer}` : ''}

Please provide:
1. A clear explanation of the concept
2. Step-by-step solution process
3. Helpful hints for similar problems
4. Related mathematical concepts to review

Format your response as a structured explanation that breaks down the problem-solving process.
`

    const result = await model.generateContent([
      "You are an expert math tutor. Provide clear, educational explanations with step-by-step solutions. Use mathematical notation when appropriate and explain concepts thoroughly.",
      prompt
    ])

    const response = result.response.text()
    
    // Parse the response into structured format
    const explanation = response
    const steps = response.split('\n').filter(line => line.trim().startsWith('Step') || line.trim().match(/^\d+\./))
    const hints = response.split('\n').filter(line => line.toLowerCase().includes('hint') || line.toLowerCase().includes('tip'))
    const relatedConcepts = response.split('\n').filter(line => line.toLowerCase().includes('concept') || line.toLowerCase().includes('review'))

    return {
      explanation,
      steps,
      hints,
      relatedConcepts
    }
  } catch (error) {
    console.error('Error generating AI explanation:', error)
    return {
      explanation: "I'm sorry, I'm having trouble generating an explanation right now. Please try again later.",
      steps: [],
      hints: [],
      relatedConcepts: []
    }
  }
}

export async function validateMathAnswer(
  problemContent: string,
  userAnswer: string,
  correctAnswer: string
): Promise<{ isCorrect: boolean; feedback: string }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
You are a math teacher grading a student's answer. Please evaluate if the student's answer is correct.

Problem: ${problemContent}
Correct Answer: ${correctAnswer}
Student's Answer: ${userAnswer}

Please determine if the student's answer is correct and provide brief feedback.
Respond with only "CORRECT" or "INCORRECT" followed by a brief explanation.
`

    const result = await model.generateContent([
      "You are a math teacher. Evaluate answers accurately and provide helpful feedback.",
      prompt
    ])

    const response = result.response.text()
    const isCorrect = response.toLowerCase().includes('correct')
    const feedback = response.replace(/^(CORRECT|INCORRECT)\s*/i, '').trim()

    return {
      isCorrect,
      feedback
    }
  } catch (error) {
    console.error('Error validating answer:', error)
    return {
      isCorrect: false,
      feedback: "Unable to validate answer at this time."
    }
  }
} 