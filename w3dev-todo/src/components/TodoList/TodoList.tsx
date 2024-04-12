import React from 'react';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import InputField from '../input/InputField'
import List from '../List/List'
import { useTaskContext } from '../TaskContext/TaskContext'
import './style.css'

const TodoList: React.FC = () => {
  const { tasks, editTask, deleteTask } = useTaskContext();

  const handleEdit = (id: string, newName: string, newDueDate: string) => {
    editTask(id, newName, newDueDate);
  };

  return (
    <ContentWrapper>
      <div className='todo-body'>
        <InputField />
        <List
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={deleteTask}
        />
      </div>
    </ContentWrapper>
  );
};

export default TodoList;

