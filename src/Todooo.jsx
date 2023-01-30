import React, { useState, useEffect } from 'react';
import './App.css';

function Todooo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');


  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      task: input,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      selected: false
    };
    setTodos([...todos, newTodo]);
    setInput('');

  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleSelect = (index) => {
    const newTodos = [...todos];
    newTodos[index].selected = !newTodos[index].selected;
    setTodos(newTodos);
  }


  return (
    <div className=''>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <>
          <li key={index} style={{ fontWeight: todo.selected ? '700' : 'normal',
          listStyle:'none'}}>
            <span onClick={() => handleSelect(index)}>{todo.task} ({todo.date} {todo.time})</span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
            </>
        ))}
      </ul>
    </div>
  );
}
export default Todooo;