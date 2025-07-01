import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { useTodoStore } from '../../stores/todoStore';
import { categorizeTask } from '../../services/aiService';

export const TaskInput = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    
    try {
      // AI categorization (mock implementation for demo)
      const category = await categorizeTask(input);
      
      addTodo({
        text: input.trim(),
        completed: false,
        category: category || 'personal',
        priority: 'medium',
      });
      
      setInput('');
    } catch (error) {
      console.error('Error adding task:', error);
      // Fallback to manual categorization
      addTodo({
        text: input.trim(),
        completed: false,
        category: 'personal',
        priority: 'medium',
      });
      setInput('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
      </div>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your task in natural language..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isLoading ? 'Processing...' : 'Add Task'}
        </button>
      </div>
      
      <p className="text-sm text-gray-500">
        💡 Try: "Buy groceries tomorrow" or "Finish project by Friday"
      </p>
    </form>
  );
};
