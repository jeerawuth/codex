import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

const API_URL = 'http://localhost:3001';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState(null);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError('Cannot fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`${API_URL}/todos/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, date }),
        });
      } else {
        await fetch(`${API_URL}/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, date }),
        });
      }
      setText('');
      setDate(null);
      setEditing(null);
      fetchTodos();
    } catch (err) {
      setError('Save failed');
    }
  };

  const toggleComplete = async (todo) => {
    await fetch(`${API_URL}/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditing(todo);
    setText(todo.text);
    setDate(todo.date ? new Date(todo.date) : null);
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      {error && <div className="error">{error}</div>}
      <TodoForm
        text={text}
        date={date}
        onTextChange={(e) => setText(e.target.value)}
        onDateChange={setDate}
        onSubmit={handleSubmit}
        editing={!!editing}
      />
      <TodoList
        todos={todos}
        onToggle={toggleComplete}
        onEdit={startEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
