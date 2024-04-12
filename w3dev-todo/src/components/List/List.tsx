import React,{useState} from 'react';
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { Task } from '../TaskContext/TaskContext'
import ContentWrapper from '../contentWrapper/ContentWrapper';

interface Props {
  tasks: Task[];
  onEdit: (id: string, newName: string, newDueDate: string) => void;
  onDelete: (id: string) => void;
}

const List: React.FC<Props> = ({ tasks, onEdit, onDelete }) => {

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedDueDate, setEditedDueDate] = useState<string>('');

  const handleEdit = (id: string) => {
    setEditingTaskId(id);
    const taskToEdit = tasks.find(task => task._id === id);
    if (taskToEdit) {
      setEditedName(taskToEdit.name);
      setEditedDueDate(taskToEdit.dueDate);
    }
  };
  const saveEdit = () => {
    if (editingTaskId) {
      onEdit(editingTaskId, editedName, editedDueDate);
      setEditingTaskId(null);
    }
  }

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <ContentWrapper>
    <ul className="list-group pb-3">
      {tasks.map(task => (
        <li key={task._id} className="list-group-item d-flex justify-content-between">
          {editingTaskId === task._id ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
              />
              <input
                type="text"
                value={editedDueDate}
                onChange={e => setEditedDueDate(e.target.value)}
              />
              <button type="button" className="btn btn-success" onClick={saveEdit}>
                Save
              </button>
            </>
          ) : (
            <>
              {task.dueDate} || {task.name}
              <div className='btn-group'>
                <button type="button" className="btn btn-primary" onClick={() => handleEdit(task._id)}>
                  Edit <MdEdit />
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(task._id)}>
                  Delete <AiTwotoneDelete />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  </ContentWrapper>
  );
};

export default List;
