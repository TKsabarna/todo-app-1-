import React from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
import './TodoList.css';

export default function TodoList() {
  const { filteredTodos, loading, error, filter } = useTodos();

  if (loading) {
    return (
      <div className="list-state">
        <div className="spinner" />
        <p>Loading tasks…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-state list-state--error">
        <span className="state-icon">⚠</span>
        <p>{error}</p>
        <p className="state-hint">Make sure your backend is running on port 5000.</p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    const messages = {
      all: { icon: '✦', text: 'No tasks yet', hint: 'Add your first task above.' },
      active: { icon: '🎉', text: 'All caught up!', hint: 'No active tasks.' },
      completed: { icon: '○', text: 'Nothing completed yet', hint: 'Finish some tasks first.' },
    };
    const msg = messages[filter] || messages.all;
    return (
      <div className="list-state">
        <span className="state-icon">{msg.icon}</span>
        <p className="state-text">{msg.text}</p>
        <p className="state-hint">{msg.hint}</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
