import React from 'react';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <label>
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={() => onToggle(todo)}
        />
        {todo.text}{' '}
        {todo.date && <em>({new Date(todo.date).toLocaleString()})</em>}
      </label>
      <div className="actions">
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
}
