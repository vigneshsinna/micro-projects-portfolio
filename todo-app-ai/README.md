# AI-Powered Todo App 🚀

A modern, intelligent todo application that leverages AI for enhanced productivity and user experience.

## Features

- 🤖 **AI Task Categorization**: Automatically categorizes tasks using natural language processing
- 🎯 **Smart Reminders**: AI-generated contextual reminders based on task priority and deadlines
- 💬 **Natural Language Input**: Add tasks using conversational language
- 🎨 **AI-Generated UI Components**: Dynamic UI elements created through AI assistance
- 📊 **Productivity Analytics**: Insights into task completion patterns
- 🔄 **Real-time Sync**: Cloud synchronization across devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: OpenAI API
- **Database**: Local Storage + IndexedDB
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your OpenAI API key to .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_APP_NAME=AI Todo App
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # UI components (buttons, inputs, etc.)
│   ├── todo/           # Todo-specific components
│   └── ai/             # AI-related components
├── hooks/              # Custom React hooks
├── services/           # API services and AI integration
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles and Tailwind config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## AI Features in Detail

### 1. Task Categorization
The app uses OpenAI's GPT model to automatically categorize tasks into:
- Work
- Personal
- Health & Fitness
- Shopping
- Education
- Entertainment

### 2. Smart Reminders
AI analyzes task content and suggests optimal reminder times based on:
- Task urgency and importance
- Historical completion patterns
- Time of day preferences

### 3. Natural Language Processing
Users can add tasks using natural language:
- "Remind me to call mom tomorrow at 3 PM"
- "Buy groceries this weekend"
- "Finish project proposal by Friday"

## API Integration

The app integrates with OpenAI API for:
- Text classification
- Content generation
- Smart suggestions

Example API usage:
```typescript
const categorizeTask = async (taskText: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Categorize the following task into one of these categories: Work, Personal, Health, Shopping, Education, Entertainment"
      },
      {
        role: "user",
        content: taskText
      }
    ]
  });
  return response.choices[0].message.content;
};
```

## Testing

The project includes comprehensive tests:
- Unit tests for components and utilities
- Integration tests for AI services
- End-to-end tests for critical user flows

Run tests:
```bash
npm run test
```

## Deployment

The app is configured for easy deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, please open an issue or reach out at [vigneshsinna@gmail.com].
