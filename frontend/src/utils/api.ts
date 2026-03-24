import axios from 'axios';
import { getErrorMessage } from './getErrorMessage';

export const API_URL = 'http://localhost:4200/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface LoginDto {
  email: string;
  password: string;
}

export const login = async (data: LoginDto) => {
  try {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  } catch (err) {
    const message = getErrorMessage(err);
    console.error(message);
  }
};
