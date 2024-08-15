// src/services/authService.ts
import axios from '@/api/axios';
import { TodoData, ListTodosParams, UpdateTodoParams } from '@/lib/types';

const todoService = {
  // eslint-disable-next-line
  async create(todoData: TodoData): Promise<any> {
    const response = await axios.post('todos/', todoData);
    return response.data;
  },

  // eslint-disable-next-line
  async list(params: ListTodosParams = {}): Promise<any> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString());
    });

    const url = `/todos/?${searchParams.toString()}`;
    const response = await axios.get(url);
    return response.data;
  },

  // eslint-disable-next-line
  async details(id: string): Promise<any> {
    if (id === '') throw new Error('Todo Details: No user ID provided');

    const response = await axios.get(`todos/${id}/`);
    return response.data;
  },

  // eslint-disable-next-line
  async updateAll(id: string, params: UpdateTodoParams): Promise<any> {
    if (Object.keys(params).length === 0)
      throw new Error('Todo Update: No update params provided');

    const response = await axios.put(`todos/${id}/`, params);
    return response.data;
  },

  // eslint-disable-next-line
  async updateSome(id: string, params: UpdateTodoParams): Promise<any> {
    if (Object.keys(params).length === 0)
      throw new Error('Todo Update: No update params provided');

    const response = await axios.patch(`todos/${id}/`, params);
    return response.data;
  },

  // eslint-disable-next-line
  async delete(id: string): Promise<any> {
    if (id === '') throw new Error('Todo Details: No user ID provided');

    const response = await axios.delete(`todos/${id}/`);
    return response.data;
  },

  // eslint-disable-next-line
  async stats(): Promise<any> {
    const response = await axios.get(`todos/stats/`);
    return response.data;
  },
};

export default todoService;
