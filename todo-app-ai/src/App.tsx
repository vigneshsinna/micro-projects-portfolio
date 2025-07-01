import { useState } from 'react';
import { Brain, List } from 'lucide-react';
import { useTodoStore } from './stores/todoStore';
import { TaskInput } from './components/todo/TaskInput';
import { TaskList } from './components/todo/TaskList';
import { CategoryFilter } from './components/todo/CategoryFilter';
import { AIInsights } from './components/ai/AIInsights';

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'insights'>('tasks');
  const { todos, filter } = useTodoStore();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return todo.category === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Todo App</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Intelligent task management powered by AI
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'tasks'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <List className="w-4 h-4" />
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'insights'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Brain className="w-4 h-4" />
              AI Insights
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="space-y-6">
          {activeTab === 'tasks' && (
            <>
              {/* Task Input */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <TaskInput />
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <CategoryFilter />
              </div>

              {/* Task List */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <TaskList todos={filteredTodos} />
              </div>
            </>
          )}

          {activeTab === 'insights' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <AIInsights todos={todos} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
