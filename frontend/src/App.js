import React, { useEffect } from 'react';
import { TodoProvider, useTodos } from './context/TodoContext';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import TodoList from './components/TodoList';
import './App.css';

function TodoApp() {
  const { loadTodos } = useTodos();
  useEffect(() => { loadTodos(); }, [loadTodos]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <TodoForm />
          <Filters />
          <TodoList />
        </div>
      </main>
      <footer className="footer">
        <span>Taskflow · MERN Stack App</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}
