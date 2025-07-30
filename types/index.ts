export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  name: string;
  displayName: string;
  description: string;
  level: number;
  topics: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Problem {
  id: string;
  courseId: string;
  course: Course;
  title: string;
  content: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
  source?: string;
  year?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  user: User;
  courseId?: string;
  startTime: Date;
  endTime?: Date;
  score?: number;
  problemsAttempted: number;
  problemsCorrect: number;
}

export interface Submission {
  id: string;
  userId: string;
  user: User;
  problemId: string;
  problem: Problem;
  answer: string;
  isCorrect: boolean;
  timeSpent: number;
  createdAt: Date;
}

export interface AIRequest {
  id: string;
  userId: string;
  user: User;
  problemId?: string;
  problem?: Problem;
  question: string;
  response: string;
  createdAt: Date;
}

export interface CourseSelection {
  course: Course;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ProblemFilters {
  courseId?: string;
  topics?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  source?: string;
}

export interface AIExplanationRequest {
  problemId: string;
  question: string;
  userAnswer?: string;
}

export interface AIExplanationResponse {
  explanation: string;
  steps: string[];
  hints: string[];
  relatedConcepts: string[];
} 