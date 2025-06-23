import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TasksStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  completeTask: (id: string) => void;
  resetTasks: () => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  completeTask: (id) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: true } : t),
  })),
  resetTasks: () => set({ tasks: [] }),
})); 