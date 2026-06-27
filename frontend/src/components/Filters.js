import React from 'react';
import { useTodos } from '../context/TodoContext';
import './Filters.css';

export default function Filters() {
  const { filter, setFilter, priorityFilter, setPriorityFilter, removeCompleted, stats } = useTodos();

  return (
    <div className="filters">
      <div className="filter-group">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'active' && stats.active > 0 && <span className="badge">{stats.active}</span>}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-label">Priority:</span>
        {['all', 'low', 'medium', 'high'].map(p => (
          <button
            key={p}
            className={`filter-btn priority-filter priority-filter--${p} ${priorityFilter === p ? 'active' : ''}`}
            onClick={() => setPriorityFilter(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {stats.completed > 0 && (
        <button className="btn-clear" onClick={removeCompleted}>
          Clear {stats.completed} done
        </button>
      )}
    </div>
  );
}
