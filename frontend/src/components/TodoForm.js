import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './TodoForm.css';

export default function TodoForm() {
  const { addTodo } = useTodos();
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    setSubmitting(true);
    setError('');
    try {
      await addTodo({ title: title.trim(), description: description.trim(), priority, dueDate: dueDate || null });
      setTitle(''); setDescription(''); setPriority('medium'); setDueDate('');
      setExpanded(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-main-row">
          <input
            className="form-title-input"
            type="text"
            placeholder="Add a new task…"
            value={title}
            onChange={e => { setTitle(e.target.value); setError(''); }}
            onFocus={() => setExpanded(true)}
            maxLength={200}
          />
          <button type="submit" className="btn-add" disabled={submitting}>
            {submitting ? '…' : '+ Add'}
          </button>
        </div>

        {expanded && (
          <div className="form-expanded">
            <textarea
              className="form-desc-input"
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              maxLength={500}
            />
            <div className="form-meta-row">
              <div className="form-field">
                <label>Priority</label>
                <div className="priority-pills">
                  {['low', 'medium', 'high'].map(p => (
                    <button
                      key={p}
                      type="button"
                      className={`priority-pill priority-pill--${p} ${priority === p ? 'active' : ''}`}
                      onClick={() => setPriority(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-field">
                <label>Due date</label>
                <input
                  type="date"
                  className="form-date-input"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setExpanded(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}
