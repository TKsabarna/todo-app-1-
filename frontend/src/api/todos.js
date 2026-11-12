import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || ''}/api/todos`,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchTodos = (params = {}) => api.get('/', { params });
export const createTodo = (data) => api.post('/', data);
export const updateTodo = (id, data) => api.put(`/${id}`, data);
export const toggleTodo = (id) => api.patch(`/${id}/toggle`);
export const deleteTodo = (id) => api.delete(`/${id}`);
export const clearCompleted = () => api.delete('/bulk/completed');

export default api;
