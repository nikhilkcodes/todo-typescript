import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Task {
	_id: string;
	name: string;
	dueDate: string;
  }


interface TaskContextType {
  tasks: Task[];
  createTask: (name: string, dueDate: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string, newDueDate: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://localhost:3000/todos');
        setTasks(response.data);
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const createTask = async (name: string, dueDate: string) => {
    try {
      const response = await axios.post<Task>('http://localhost:3000/todos', {
        name,
        dueDate,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.log('Error creating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };


const editTask = async (id: string, newName: string, newDueDate: string) => {
	try {
	  await axios.put(`http://localhost:3000/todos/${id}`, { name: newName, dueDate: newDueDate });
	  setTasks(tasks.map(task => (task._id === id ? { ...task, name: newName, dueDate: newDueDate } : task)));
	} catch (error) {
	  console.log('Error editing task:', error);
	}
  };


  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
