import React from 'react';
import { useTodos } from '../context/TodoContext';
import './Header.css';

export default function Header() {
  const { stats } = useTodos();
  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-icon">✦</span>
        <h1 className="header-title">Taskflow</h1>
      </div>
      <div className="header-stats">
        <div className="stat">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value active">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value done">{stats.completed}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>
    </header>
  );
}
