import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './TodoItem.css';

const priorityColors = { low: 'var(--low)', medium: 'var(--medium)', high: 'var(--high)' };

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (diffDays < 0) return { label, overdue: true };
  if (diffDays === 0) return { label: 'Today', urgent: true };
  if (diffDays === 1) return { label: 'Tomorrow', urgent: true };
  return { label };
}

export default function TodoItem({ todo }) {
  const { toggleTodo, removeTodo, editTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [deleting, setDeleting] = useState(false);

  const dueInfo = formatDate(todo.dueDate);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    await editTodo(todo._id, { title: editTitle.trim(), description: editDesc.trim(), priority: editPriority });
    setEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await removeTodo(todo._id); }
    catch { setDeleting(false); }
  };

  if (editing) {
    return (
      <div className="todo-item todo-item--editing">
        <input
          className="edit-input"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          autoFocus
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false); }}
        />
        <textarea
          className="edit-desc"
          value={editDesc}
          onChange={e => setEditDesc(e.target.value)}
          rows={2}
          placeholder="Description…"
        />
        <div className="edit-footer">
          <div className="priority-pills-sm">
            {['low', 'medium', 'high'].map(p => (
              <button
                key={p}
                className={`pill-sm pill-sm--${p} ${editPriority === p ? 'active' : ''}`}
                onClick={() => setEditPriority(p)}
              >{p}</button>
            ))}
          </div>
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-discard" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item--done' : ''} ${deleting ? 'todo-item--removing' : ''}`}
      style={{ '--priority-color': priorityColors[todo.priority] }}>
      <div className="todo-priority-bar" />
      <button
        className={`todo-check ${todo.completed ? 'checked' : ''}`}
        onClick={() => toggleTodo(todo._id)}
        aria-label="Toggle complete"
      >
        {todo.completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className="todo-body">
        <p className="todo-title">{todo.title}</p>
        {todo.description && <p className="todo-desc">{todo.description}</p>}
        <div className="todo-meta">
          <span className={`priority-tag priority-tag--${todo.priority}`}>{todo.priority}</span>
          {dueInfo && (
            <span className={`due-tag ${dueInfo.overdue ? 'overdue' : ''} ${dueInfo.urgent ? 'urgent' : ''}`}>
              {dueInfo.overdue ? '⚠ ' : '🗓 '}{dueInfo.label}
            </span>
          )}
          <span className="todo-date">
            {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <button className="action-btn edit-btn" onClick={() => setEditing(true)} title="Edit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button className="action-btn delete-btn" onClick={handleDelete} title="Delete" disabled={deleting}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
