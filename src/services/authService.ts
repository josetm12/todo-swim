// src/services/authService.ts
import axios from '@/api/axios';
import { LoginCredentials, UserData } from '@/lib/types';

const authService = {
  async getCSRFToken(): Promise<void> {
    await axios.get('users/get-csrf-token/');
  },

  // eslint-disable-next-line
  async register(userData: UserData): Promise<any> {
    const response = await axios.post('users/register/', userData);
    return response.data;
  },

  // eslint-disable-next-line
  async login(credentials: LoginCredentials): Promise<any> {
    const response = await axios.post('users/login/', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await axios.post('users/logout/');
  },

  // eslint-disable-next-line
  async updateUser(userData: Partial<UserData>): Promise<any> {
    const response = await axios.put('users/update/', userData);
    return response.data;
  },

  // eslint-disable-next-line
  async checkAuth(): Promise<any> {
    const response = await axios.get('users/check-auth/');
    return response.data;
  },
};

export default authService;
