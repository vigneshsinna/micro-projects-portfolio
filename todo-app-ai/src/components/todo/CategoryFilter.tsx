import { Filter } from 'lucide-react';
import { useTodoStore } from '../../stores/todoStore';
import { FilterType } from '../../types';

const filterOptions: { value: FilterType; label: string; color: string }[] = [
  { value: 'all', label: 'All Tasks', color: 'bg-gray-100 text-gray-800' },
  { value: 'active', label: 'Active', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'work', label: 'Work', color: 'bg-blue-100 text-blue-800' },
  { value: 'personal', label: 'Personal', color: 'bg-purple-100 text-purple-800' },
  { value: 'health', label: 'Health', color: 'bg-green-100 text-green-800' },
  { value: 'shopping', label: 'Shopping', color: 'bg-orange-100 text-orange-800' },
  { value: 'education', label: 'Education', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'entertainment', label: 'Entertainment', color: 'bg-pink-100 text-pink-800' },
];

export const CategoryFilter = () => {
  const { filter, setFilter } = useTodoStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Filter Tasks</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === option.value
                ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                : `${option.color} hover:shadow-md`
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
