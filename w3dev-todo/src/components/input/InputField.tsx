import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useTaskContext } from '../TaskContext/TaskContext'
import ContentWrapper from '../contentWrapper/ContentWrapper';

const InputField: React.FC = () => {
  const { createTask } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [taskText, setTaskText] = useState<string>('');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleCreateTask = () => {
    if (!taskText || !selectedDate) return;
    createTask(taskText, selectedDate.toISOString());
    setTaskText('');
    setSelectedDate(null);
  };

  return (
    <ContentWrapper>
      <h3 className='text-center text-white'>Simple Todo List</h3>
      <p className='text-center text-white'>Made by Nikhil Singh, tech stack - Mern</p>
        <div className="date pb-3">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="btn btn-light text-black"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select Date"
        calendarClassName="datepicker-calendar"
      />
      <div className="input-group pt-3">
        <input
          type="text"
          className="form-control"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-secondary text-white"
          onClick={handleCreateTask}
        >
          Add Task <MdOutlineAddCircleOutline />
        </button>
      </div>
    </div>
    </ContentWrapper>
  );
};

export default InputField;
