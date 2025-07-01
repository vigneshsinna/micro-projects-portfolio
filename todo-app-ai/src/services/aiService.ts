// Mock AI service for demonstration
// In a real application, this would integrate with OpenAI API

export const categorizeTask = async (taskText: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const text = taskText.toLowerCase();
  
  // Simple keyword-based categorization for demo
  if (text.includes('work') || text.includes('project') || text.includes('meeting') || text.includes('deadline')) {
    return 'work';
  }
  if (text.includes('buy') || text.includes('shop') || text.includes('grocery') || text.includes('store')) {
    return 'shopping';
  }
  if (text.includes('exercise') || text.includes('gym') || text.includes('health') || text.includes('doctor')) {
    return 'health';
  }
  if (text.includes('learn') || text.includes('study') || text.includes('read') || text.includes('course')) {
    return 'education';
  }
  if (text.includes('movie') || text.includes('game') || text.includes('music') || text.includes('fun')) {
    return 'entertainment';
  }
  
  return 'personal';
};

export const generateInsights = async (todos: any[]): Promise<any[]> => {
  // Mock insights generation
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const insights: any[] = [];
  
  // Productivity insight
  const completedTasks = todos.filter(t => t.completed).length;
  const totalTasks = todos.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  insights.push({
    type: 'productivity',
    title: 'Task Completion Rate',
    description: `You've completed ${completionRate.toFixed(1)}% of your tasks. ${completionRate > 70 ? 'Great job!' : 'Keep going!'}`,
    confidence: 0.9
  });
  
  // Pattern insight
  const categories = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {});
  
  const topCategory = Object.entries(categories).sort(([,a], [,b]) => (b as number) - (a as number))[0];
  
  if (topCategory) {
    insights.push({
      type: 'pattern',
      title: 'Most Active Category',
      description: `You focus most on ${topCategory[0]} tasks (${topCategory[1]} tasks). Consider balancing other areas.`,
      confidence: 0.8
    });
  }
  
  // Suggestion
  insights.push({
    type: 'suggestion',
    title: 'AI Recommendation',
    description: 'Try breaking large tasks into smaller, actionable steps for better completion rates.',
    confidence: 0.7
  });
  
  return insights;
};
