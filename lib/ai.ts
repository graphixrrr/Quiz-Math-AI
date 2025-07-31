import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIExplanationRequest, AIExplanationResponse } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDW1eDtzacM8GoQrgCcKwrlJOR83dL5sgE')

// Fallback explanations for different problem types
const getFallbackExplanation = (problemTitle: string, question: string): AIExplanationResponse => {
  console.log('Fallback triggered for:', { problemTitle, question })
  
  const lowerTitle = problemTitle.toLowerCase()
  const lowerQuestion = question.toLowerCase()

  // Linear Equations
  if (lowerTitle.includes('linear') || lowerTitle.includes('equation')) {
    return {
      explanation: `Linear Equation Problem Explanation:

Linear equations are equations where the variable (usually x) is raised only to the first power. To solve linear equations:

1. **Isolate the variable**: Get x by itself on one side of the equation
2. **Use inverse operations**: 
   - If x is added to a number, subtract that number from both sides
   - If x is multiplied by a number, divide both sides by that number
3. **Check your answer**: Plug your solution back into the original equation

For this problem, focus on getting the variable alone on one side of the equation.`,
      steps: [
        "1. Identify the variable you need to solve for",
        "2. Use inverse operations to isolate the variable",
        "3. Perform the same operation on both sides of the equation",
        "4. Simplify and solve for the variable",
        "5. Check your answer by substituting it back into the original equation"
      ],
      hints: [
        "Remember to perform the same operation on both sides of the equation",
        "If there are fractions, you can multiply both sides by the denominator",
        "If there are decimals, you can multiply both sides by a power of 10",
        "Always check your answer by plugging it back into the original equation"
      ],
      relatedConcepts: ["Basic arithmetic operations", "Order of operations", "Properties of equality", "Solving equations"]
    }
  }

  // Quadratic Equations
  if (lowerTitle.includes('quadratic') || lowerTitle.includes('x²')) {
    return {
      explanation: `Quadratic Equation Problem Explanation:

Quadratic equations have the form ax² + bx + c = 0, where a ≠ 0. There are several methods to solve them:

1. **Factoring**: If the quadratic can be factored, set each factor equal to zero
2. **Quadratic Formula**: x = (-b ± √(b² - 4ac)) / (2a)
3. **Completing the Square**: Rewrite the equation in the form (x + h)² = k
4. **Square Root Method**: If b = 0, you can take the square root of both sides

For this problem, try factoring first, then use the quadratic formula if needed.`,
      steps: [
        "1. Write the equation in standard form: ax² + bx + c = 0",
        "2. Try to factor the quadratic expression",
        "3. If factoring doesn't work, use the quadratic formula",
        "4. Simplify your answer",
        "5. Check your answer by substituting it back into the original equation"
      ],
      hints: [
        "Look for common factors first",
        "If a = 1, look for factors of c that add to b",
        "The quadratic formula always works, but factoring is faster when possible",
        "Remember that quadratic equations can have 0, 1, or 2 real solutions"
      ],
      relatedConcepts: ["Factoring polynomials", "Square roots", "Complex numbers", "Parabolic functions"]
    }
  }

  // Complex Numbers
  if (lowerTitle.includes('complex') || lowerTitle.includes('imaginary') || lowerTitle.includes('i')) {
    return {
      explanation: `Complex Numbers Problem Explanation:

Complex numbers have the form a + bi, where a and b are real numbers and i = √(-1). To work with complex numbers:

1. **Addition/Subtraction**: Add/subtract real and imaginary parts separately
2. **Multiplication**: Use FOIL method and remember i² = -1
3. **Division**: Multiply numerator and denominator by the conjugate of the denominator

For this problem, focus on the specific operation being performed.`,
      steps: [
        "1. Identify the complex numbers involved",
        "2. Apply the appropriate operation (add, subtract, multiply, divide)",
        "3. For multiplication, use FOIL and simplify i² = -1",
        "4. For division, multiply by the conjugate",
        "5. Separate real and imaginary parts in your answer"
      ],
      hints: [
        "Remember that i² = -1",
        "For multiplication, use the FOIL method",
        "For division, multiply by the conjugate of the denominator",
        "Always separate real and imaginary parts in your final answer"
      ],
      relatedConcepts: ["Complex arithmetic", "Imaginary numbers", "Conjugates", "FOIL method"]
    }
  }

  // Logarithms
  if (lowerTitle.includes('log') || lowerTitle.includes('logarithm')) {
    return {
      explanation: `Logarithm Problem Explanation:

Logarithms are the inverse of exponential functions. Key properties:

1. **Definition**: log_b(x) = y means b^y = x
2. **Properties**: 
   - log_b(xy) = log_b(x) + log_b(y)
   - log_b(x/y) = log_b(x) - log_b(y)
   - log_b(x^n) = n·log_b(x)
3. **Change of base**: log_b(x) = log_a(x)/log_a(b)

For this problem, use the definition and properties of logarithms.`,
      steps: [
        "1. Identify the base of the logarithm",
        "2. Use the definition: log_b(x) = y means b^y = x",
        "3. Apply logarithm properties if needed",
        "4. Solve for the unknown variable",
        "5. Check your answer by substituting back"
      ],
      hints: [
        "Remember that logarithms and exponentials are inverse functions",
        "Use the definition: log_b(x) = y means b^y = x",
        "Apply logarithm properties to simplify expressions",
        "Check your answer by converting back to exponential form"
      ],
      relatedConcepts: ["Exponential functions", "Logarithm properties", "Inverse functions", "Exponential equations"]
    }
  }

  // Exponential Functions
  if (lowerTitle.includes('exponential') || lowerTitle.includes('2^x') || lowerTitle.includes('e^x')) {
    return {
      explanation: `Exponential Function Problem Explanation:

Exponential functions have the form f(x) = a^x, where a > 0 and a ≠ 1. Key properties:

1. **Growth/Decay**: If a > 1, the function grows; if 0 < a < 1, it decays
2. **Properties**: 
   - a^(x+y) = a^x · a^y
   - a^(x-y) = a^x / a^y
   - (a^x)^y = a^(xy)
3. **Solving equations**: Use logarithms to solve a^x = b

For this problem, use exponential properties and logarithms if needed.`,
      steps: [
        "1. Identify the base of the exponential function",
        "2. Use exponential properties to simplify if needed",
        "3. If solving an equation, take the logarithm of both sides",
        "4. Use logarithm properties to solve for the variable",
        "5. Check your answer by substituting back"
      ],
      hints: [
        "Remember exponential properties: a^(x+y) = a^x · a^y",
        "To solve a^x = b, take log_a of both sides",
        "Use the change of base formula if needed",
        "Check your answer by substituting it back into the original equation"
      ],
      relatedConcepts: ["Exponential growth", "Logarithms", "Exponential properties", "Solving exponential equations"]
    }
  }

  // Polynomials
  if (lowerTitle.includes('polynomial') || lowerTitle.includes('degree')) {
    return {
      explanation: `Polynomial Problem Explanation:

Polynomials are expressions with terms of the form ax^n, where a is a coefficient and n is a non-negative integer. Key concepts:

1. **Degree**: The highest power of x in the polynomial
2. **Leading coefficient**: The coefficient of the highest degree term
3. **Factoring**: Breaking down into simpler polynomials
4. **Roots**: Values of x that make the polynomial equal to zero

For this problem, focus on the specific polynomial concept being tested.`,
      steps: [
        "1. Identify the polynomial and its terms",
        "2. For degree problems, find the highest power of x",
        "3. For factoring, look for common factors and patterns",
        "4. For roots, set the polynomial equal to zero and solve",
        "5. Check your work by expanding or substituting"
      ],
      hints: [
        "The degree is the highest power of x",
        "Look for common factors first when factoring",
        "Use the factor theorem: if (x-a) is a factor, then a is a root",
        "Remember that the sum of the degrees of factors equals the original degree"
      ],
      relatedConcepts: ["Polynomial arithmetic", "Factoring", "Roots of polynomials", "Factor theorem"]
    }
  }

  // Rational Expressions
  if (lowerTitle.includes('rational') || lowerTitle.includes('fraction')) {
    return {
      explanation: `Rational Expression Problem Explanation:

Rational expressions are fractions with polynomials in the numerator and denominator. To work with them:

1. **Simplifying**: Factor numerator and denominator, then cancel common factors
2. **Multiplication**: Multiply numerators and denominators, then simplify
3. **Division**: Multiply by the reciprocal of the divisor
4. **Addition/Subtraction**: Find a common denominator, then add/subtract numerators

For this problem, focus on simplifying or performing operations with rational expressions.`,
      steps: [
        "1. Factor the numerator and denominator completely",
        "2. Cancel any common factors",
        "3. For operations, find common denominators if needed",
        "4. Perform the required operation",
        "5. Simplify the result"
      ],
      hints: [
        "Always factor completely before canceling",
        "Remember that you can only cancel factors, not terms",
        "For addition/subtraction, find the least common denominator",
        "Check that your final answer is in simplest form"
      ],
      relatedConcepts: ["Factoring polynomials", "Common denominators", "Simplifying fractions", "Polynomial division"]
    }
  }

  // Systems of Equations
  if (lowerTitle.includes('system') || lowerTitle.includes('equations')) {
    return {
      explanation: `System of Equations Problem Explanation:

A system of equations is a set of two or more equations with the same variables. To solve a system:

1. **Substitution Method**: Solve one equation for a variable, then substitute into the other equation
2. **Elimination Method**: Add or subtract equations to eliminate one variable
3. **Graphing Method**: Graph both equations and find the intersection point

For this problem, try the substitution method first, then elimination if needed.`,
      steps: [
        "1. Choose one equation and solve for one variable",
        "2. Substitute this expression into the other equation",
        "3. Solve the resulting equation for the remaining variable",
        "4. Substitute this value back to find the other variable",
        "5. Check your answer by substituting both values into both original equations"
      ],
      hints: [
        "Choose the equation that's easiest to solve for one variable",
        "If one equation is already solved for a variable, use substitution",
        "If the coefficients of one variable are opposites, use elimination",
        "Always check your answer in both original equations"
      ],
      relatedConcepts: ["Linear equations", "Substitution", "Elimination", "Coordinate geometry"]
    }
  }

  // Geometry Problems
  if (lowerTitle.includes('triangle') || lowerTitle.includes('circle') || lowerTitle.includes('area') || lowerTitle.includes('volume')) {
    return {
      explanation: `Geometry Problem Explanation:

Geometry problems involve shapes, sizes, positions, and properties of space. Common formulas include:

**Triangles**: Area = (1/2) × base × height
**Circles**: Area = πr², Circumference = 2πr
**Rectangles**: Area = length × width, Perimeter = 2(l + w)
**Pythagorean Theorem**: a² + b² = c² (for right triangles)

For this problem, identify the shape and use the appropriate formula.`,
      steps: [
        "1. Identify the geometric shape involved",
        "2. Write down the relevant formula",
        "3. Substitute the given values into the formula",
        "4. Solve for the unknown value",
        "5. Check that your answer makes sense (positive values, reasonable size)"
      ],
      hints: [
        "Draw a diagram to visualize the problem",
        "Make sure all measurements are in the same units",
        "For area problems, remember to square the units",
        "For volume problems, remember to cube the units"
      ],
      relatedConcepts: ["Area formulas", "Perimeter formulas", "Volume formulas", "Geometric properties"]
    }
  }

  // Calculus Problems
  if (lowerTitle.includes('derivative') || lowerTitle.includes('integral') || lowerTitle.includes('limit')) {
    return {
      explanation: `Calculus Problem Explanation:

Calculus involves the study of continuous change. Key concepts include:

**Derivatives**: Rate of change, slope of tangent line
**Integrals**: Area under a curve, accumulation of change
**Limits**: Behavior of functions as they approach certain values

For this problem, identify whether it's a derivative, integral, or limit problem and use the appropriate techniques.`,
      steps: [
        "1. Identify the type of calculus problem (derivative, integral, limit)",
        "2. Apply the appropriate rules and formulas",
        "3. Simplify your expression",
        "4. Evaluate at the given point if necessary",
        "5. Check your answer by differentiating or integrating back"
      ],
      hints: [
        "For derivatives, remember the power rule, product rule, and chain rule",
        "For integrals, try substitution or integration by parts",
        "For limits, try factoring, rationalizing, or L'Hôpital's rule",
        "Always check your work by taking the derivative of your answer"
      ],
      relatedConcepts: ["Derivative rules", "Integration techniques", "Limit properties", "Function behavior"]
    }
  }

  // Default fallback
  return {
    explanation: `Math Problem Solving Strategy:

When approaching any math problem, follow these general steps:

1. **Read carefully**: Understand what the problem is asking
2. **Identify key information**: What values are given? What are you asked to find?
3. **Choose a strategy**: What mathematical concepts apply here?
4. **Work step by step**: Show your work clearly
5. **Check your answer**: Does it make sense? Can you verify it?

For this specific problem, try breaking it down into smaller, manageable parts.`,
    steps: [
      "1. Read the problem statement carefully",
      "2. Identify what you know and what you need to find",
      "3. Choose an appropriate mathematical approach",
      "4. Work through the problem step by step",
      "5. Verify your answer makes sense"
    ],
    hints: [
      "Start with what you know",
      "Look for patterns or familiar formulas",
      "Don't rush - take your time to understand each step",
      "If you get stuck, try working backwards from the answer"
    ],
    relatedConcepts: ["Problem-solving strategies", "Mathematical reasoning", "Critical thinking", "Logical deduction"]
  }
}

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
    
    // Get the problem title from the request to provide better fallback
    const problemTitle = request.problemId || "Math Problem"
    
    // Check for various types of AI service errors
    const errorMessage = error?.toString() || ''
    const isServiceUnavailable = 
      (error && typeof error === 'object' && 'status' in error && error.status === 503) ||
      errorMessage.includes('503') ||
      errorMessage.includes('Service Unavailable') ||
      errorMessage.includes('overloaded') ||
      errorMessage.includes('GoogleGenerativeAI')
    
    // Always provide a helpful fallback, regardless of error type
    return getFallbackExplanation(problemTitle, request.question)
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
    
    // Simple validation fallback
    const isCorrect = userAnswer.trim() === correctAnswer.trim()
    
    // Check for various types of AI service errors
    const errorMessage = error?.toString() || ''
    const isServiceUnavailable = 
      (error && typeof error === 'object' && 'status' in error && error.status === 503) ||
      errorMessage.includes('503') ||
      errorMessage.includes('Service Unavailable') ||
      errorMessage.includes('overloaded') ||
      errorMessage.includes('GoogleGenerativeAI')
    
    // Always provide helpful feedback, regardless of error type
    return {
      isCorrect,
      feedback: isCorrect 
        ? "Correct! Your answer matches the expected solution."
        : `Incorrect. The correct answer is ${correctAnswer}. Review the problem and try again.`
    }
  }
} 