import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BusinessTask, TaskFilter } from '../types/tasks';
import { getConfig } from '../config/environment';

interface TaskState {
  tasks: BusinessTask[];
  currentTask: BusinessTask | null;
  filters: TaskFilter;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<BusinessTask, 'id'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<BusinessTask>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setCurrentTask: (task: BusinessTask | null) => void;
  updateFilters: (filters: Partial<TaskFilter>) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      currentTask: null,
      filters: {},
      loading: false,
      error: null,

      loadTasks: async () => {
        const config = getConfig();
        set({ loading: true, error: null });

        try {
          if (config.DEMO_MODE) {
            // Load demo tasks
            const demoTasks = await import('../data/demoTasks.json');
            set({ tasks: demoTasks.default, loading: false });
            return;
          }

          const response = await fetch(`${config.API_URL}/tasks`);
          const tasks = await response.json();
          set({ tasks, loading: false });
        } catch (error) {
          set({ error: 'Failed to load tasks', loading: false });
        }
      },

      addTask: async (task) => {
        const config = getConfig();
        set({ loading: true, error: null });

        try {
          if (config.DEMO_MODE) {
            const newTask = { ...task, id: Date.now() };
            set(state => ({
              tasks: [...state.tasks, newTask],
              loading: false
            }));
            return;
          }

          const response = await fetch(`${config.API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          });
          const newTask = await response.json();
          
          set(state => ({
            tasks: [...state.tasks, newTask],
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to add task', loading: false });
        }
      },

      updateTask: async (id, updates) => {
        const config = getConfig();
        set({ loading: true, error: null });

        try {
          if (config.DEMO_MODE) {
            set(state => ({
              tasks: state.tasks.map(task =>
                task.id === id ? { ...task, ...updates } : task
              ),
              loading: false
            }));
            return;
          }

          const response = await fetch(`${config.API_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
          });
          const updatedTask = await response.json();

          set(state => ({
            tasks: state.tasks.map(task =>
              task.id === id ? updatedTask : task
            ),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to update task', loading: false });
        }
      },

      deleteTask: async (id) => {
        const config = getConfig();
        set({ loading: true, error: null });

        try {
          if (config.DEMO_MODE) {
            set(state => ({
              tasks: state.tasks.filter(task => task.id !== id),
              loading: false
            }));
            return;
          }

          await fetch(`${config.API_URL}/tasks/${id}`, {
            method: 'DELETE',
          });

          set(state => ({
            tasks: state.tasks.filter(task => task.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to delete task', loading: false });
        }
      },

      setCurrentTask: (task) => set({ currentTask: task }),
      
      updateFilters: (filters) => set(state => ({
        filters: { ...state.filters, ...filters }
      })),
    }),
    {
      name: 'task-store',
      partialize: (state) => ({
        tasks: state.tasks,
        filters: state.filters
      }),
    }
  )
);