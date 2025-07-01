import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Lightbulb, BarChart3 } from 'lucide-react';
import { Todo } from '../../types';
import { generateInsights } from '../../services/aiService';

interface AIInsightsProps {
  todos: Todo[];
}

export const AIInsights = ({ todos }: AIInsightsProps) => {
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInsights = async () => {
      if (todos.length === 0) return;
      
      setIsLoading(true);
      try {
        const generatedInsights = await generateInsights(todos);
        setInsights(generatedInsights);
      } catch (error) {
        console.error('Error generating insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInsights();
  }, [todos]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'productivity':
        return <TrendingUp className="w-5 h-5" />;
      case 'pattern':
        return <BarChart3 className="w-5 h-5" />;
      case 'suggestion':
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'productivity':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'pattern':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'suggestion':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-purple-50 border-purple-200 text-purple-800';
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-500 mb-2">No insights yet</h3>
        <p className="text-gray-400">Add some tasks to see AI-powered insights!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">AI Insights</h2>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Analyzing your tasks...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                  <p className="text-sm mb-3">{insight.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">Confidence:</span>
                    <div className="flex-1 bg-white bg-opacity-50 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-current"
                        style={{ width: `${insight.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{Math.round(insight.confidence * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-800">AI-Powered Features</span>
        </div>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li>• Automatic task categorization</li>
          <li>• Productivity pattern analysis</li>
          <li>• Personalized recommendations</li>
          <li>• Natural language task input</li>
        </ul>
      </div>
    </div>
  );
};
