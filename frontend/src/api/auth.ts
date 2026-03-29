import {
  type ResponseRegisterType,
  type ResponseLoginType,
  type UserLoginDataType,
  type UserRegisterDataType,
  type UserActivationDataType,
  type ResponseActivateType,
  type ResponseRefreshType,
  type UserDataType,
  type ResponseLogoutType,
} from '../utils/types';
import { apiClientPrivate, apiClientPublic } from './client';
import { request } from './request';

export const loginUser = async (userData: UserLoginDataType) => {
  const res = await request(
    apiClientPublic.post<ResponseLoginType>('/auth/login', userData),
  );

  return res;
};

export const registerUser = async (data: UserRegisterDataType) => {
  const res = await request(
    apiClientPublic.post<ResponseRegisterType>('/auth/register', data),
  );

  return res;
};

export const activateUser = async (data: UserActivationDataType) => {
  const res = await request(
    apiClientPublic.post<ResponseActivateType>('/auth/activate', data),
  );

  return res;
};

export const refresh = async () => {
  const res = await request(
    apiClientPublic.get<ResponseRefreshType>('/auth/refresh'),
  );

  return res;
};

export const getMe = async () => {
  const res = await request(apiClientPrivate.get<UserDataType>('/auth/me'));

  return res;
};

export const logout = async () => {
  const res = await request(
    apiClientPrivate.post<ResponseLogoutType>('/auth/logout'),
  );

  return res;
};
