import axios from 'axios';

export const API_URL = 'http://localhost/4200/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface LoginDto {
  email: string;
  passwrod: string;
}

export const login = async (data: LoginDto) => {
  const res = await apiClient.post('/auth/login', data);
  return res.data;
};
