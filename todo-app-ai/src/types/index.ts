export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
  aiGenerated?: boolean;
}

export type FilterType = 'all' | 'active' | 'completed' | 'work' | 'personal' | 'health' | 'shopping' | 'education' | 'entertainment';

export interface AIInsight {
  type: 'productivity' | 'pattern' | 'suggestion';
  title: string;
  description: string;
  confidence: number;
}
