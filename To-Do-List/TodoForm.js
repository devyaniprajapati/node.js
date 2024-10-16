import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoForm = ({ fetchTodos, currentTodo }) => {
  const [task, setTask] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setTask(currentTodo.task);
    }
  }, [currentTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTodo) {
      await axios.put(`http://localhost:5000/api/todos/${currentTodo.id}`, { task });
    } else {
      await axios.post('http://localhost:5000/api/todos', { task });
    }
    setTask('');
    fetchTodos();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Enter task" 
      />
      <button type="submit">{currentTodo ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TodoForm;
