import { Check, Trash2, Calendar, Tag } from 'lucide-react';
import { Todo } from '../../types';
import { useTodoStore } from '../../stores/todoStore';

interface TaskListProps {
  todos: Todo[];
}

export const TaskList = ({ todos }: TaskListProps) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'health': return 'bg-green-100 text-green-800';
      case 'shopping': return 'bg-orange-100 text-orange-800';
      case 'education': return 'bg-indigo-100 text-indigo-800';
      case 'entertainment': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-500 mb-2">No tasks yet</h3>
        <p className="text-gray-400">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`border rounded-lg p-4 transition-all ${
            todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {todo.completed && <Check className="w-3 h-3" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.text}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(todo.category)}`}>
                  <Tag className="w-3 h-3 mr-1" />
                  {todo.category}
                </span>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                  {todo.priority} priority
                </span>
                
                {todo.dueDate && (
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
