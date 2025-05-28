import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TodoForm({ text, date, onTextChange, onDateChange, onSubmit, editing }) {
  return (
    <form onSubmit={onSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={onTextChange}
        placeholder="Add todo"
        required
      />
      <DatePicker selected={date} onChange={onDateChange} showTimeSelect />
      <button type="submit">{editing ? 'Save' : 'Add'}</button>
    </form>
  );
}
