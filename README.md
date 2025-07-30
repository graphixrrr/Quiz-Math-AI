# Quiz Math AI - AI-Powered Math Learning Platform

A comprehensive math learning platform that combines AI-powered explanations with real exam problems from various math courses including Algebra 1, Geometry, Algebra 2, Precalculus, and Calculus.

## 🚀 Features

- **Multiple Math Courses**: Math 1 (Algebra 1), Math 2 (Geometry), Math 3 (Algebra 2), Precalculus, and Calculus
- **AI-Powered Learning**: Get instant explanations and step-by-step solutions to any problem
- **Real Exam Problems**: Practice with authentic problems from final exams and competitions
- **Interactive Working Area**: Digital scratchpad for solving problems
- **Progress Tracking**: Earn points and track your learning journey
- **Modern UI**: Beautiful, responsive interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM with SQLite
- **AI**: OpenAI GPT-4 for explanations
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- OpenAI API key

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd math-quiz-ai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   OPENAI_API_KEY="your-openai-api-key-here"
   NEXTAUTH_SECRET="your-nextauth-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   pnpm db:generate
   pnpm db:push
   pnpm db:seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed database with sample data

## 🏗️ Project Structure

```
math-quiz-ai/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ProblemViewer.tsx  # Main problem interface
│   └── AIExplanation.tsx  # AI help modal
├── lib/                   # Utility functions
│   ├── db.ts             # Database operations
│   └── ai.ts             # AI service
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
├── scripts/              # Database scripts
│   └── seed.ts           # Seed data
├── types/                # TypeScript types
│   └── index.ts          # Type definitions
└── package.json          # Dependencies and scripts
```

## 🎯 Course Structure

### Math 1 (Algebra 1)
- Linear Equations
- Inequalities
- Functions
- Systems of Equations
- Polynomials

### Math 2 (High School Geometry)
- Triangles
- Circles
- Polygons
- Transformations
- Proofs

### Math 3 (Algebra 2)
- Quadratic Functions
- Complex Numbers
- Trigonometry
- Logarithms
- Sequences

### Precalculus
- Trigonometric Functions
- Vectors
- Matrices
- Conic Sections
- Limits

### Calculus
- Derivatives
- Integrals
- Applications
- Series
- Multivariable

## 🤖 AI Features

The platform uses OpenAI's GPT-4 to provide:

- **Step-by-step explanations** for any math problem
- **Concept clarification** and learning guidance
- **Common mistake identification** and prevention tips
- **Related concept suggestions** for deeper learning
- **Answer validation** with detailed feedback

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for delightful interactions
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Dark Mode Ready**: Prepared for future dark mode implementation
- **Loading States**: Proper loading indicators and skeleton screens

## 🔧 Customization

### Adding New Courses
1. Update the `prisma/schema.prisma` file
2. Add course data to `scripts/seed.ts`
3. Update the course selection in `app/page.tsx`

### Adding New Problems
1. Add problem data to `scripts/seed.ts`
2. Run `pnpm db:seed` to populate the database

### Customizing AI Prompts
Modify the prompts in `lib/ai.ts` to adjust the AI's behavior and response style.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- The mathematical community for inspiring this project
- All contributors and users of the platform

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Learning! 🧮✨** 