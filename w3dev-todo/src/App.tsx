import React from 'react';
import { TaskProvider } from './components/TaskContext/TaskContext'
import TodoList from './components/TodoList/TodoList';
import './App.css'
const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <TodoList />
      </div>
    </TaskProvider>
  );
};

export default App;
