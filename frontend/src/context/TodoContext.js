import React, { createContext, useContext, useReducer, useCallback } from 'react';
import * as api from '../api/todos';

const TodoContext = createContext();

const initialState = {
  todos: [],
  loading: false,
  error: null,
  filter: 'all',
  priorityFilter: 'all',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_TODOS': return { ...state, todos: action.payload, loading: false, error: null };
    case 'ADD_TODO': return { ...state, todos: [action.payload, ...state.todos] };
    case 'UPDATE_TODO':
      return { ...state, todos: state.todos.map(t => t._id === action.payload._id ? action.payload : t) };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(t => t._id !== action.payload) };
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(t => !t.completed) };
    case 'SET_FILTER': return { ...state, filter: action.payload };
    case 'SET_PRIORITY_FILTER': return { ...state, priorityFilter: action.payload };
    default: return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadTodos = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await api.fetchTodos();
      dispatch({ type: 'SET_TODOS', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.response?.data?.message || 'Failed to load todos' });
    }
  }, []);

  const addTodo = useCallback(async (data) => {
    const res = await api.createTodo(data);
    dispatch({ type: 'ADD_TODO', payload: res.data.data });
  }, []);

  const editTodo = useCallback(async (id, data) => {
    const res = await api.updateTodo(id, data);
    dispatch({ type: 'UPDATE_TODO', payload: res.data.data });
  }, []);

  const toggleTodo = useCallback(async (id) => {
    const res = await api.toggleTodo(id);
    dispatch({ type: 'UPDATE_TODO', payload: res.data.data });
  }, []);

  const removeTodo = useCallback(async (id) => {
    await api.deleteTodo(id);
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const removeCompleted = useCallback(async () => {
    await api.clearCompleted();
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });
  const setPriorityFilter = (p) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: p });

  const filteredTodos = state.todos.filter(todo => {
    const statusMatch =
      state.filter === 'all' ? true :
      state.filter === 'active' ? !todo.completed :
      todo.completed;
    const priorityMatch =
      state.priorityFilter === 'all' ? true :
      todo.priority === state.priorityFilter;
    return statusMatch && priorityMatch;
  });

  const stats = {
    total: state.todos.length,
    active: state.todos.filter(t => !t.completed).length,
    completed: state.todos.filter(t => t.completed).length,
  };

  return (
    <TodoContext.Provider value={{
      ...state,
      filteredTodos,
      stats,
      loadTodos,
      addTodo,
      editTodo,
      toggleTodo,
      removeTodo,
      removeCompleted,
      setFilter,
      setPriorityFilter,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos must be used within TodoProvider');
  return ctx;
};
