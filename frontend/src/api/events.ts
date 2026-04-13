import type { MyEvent } from '../utils/types';
import { apiClientPublic } from './client';
import { request } from './request';

export const getAllPublicEvents = async () => {
  const res = await request(apiClientPublic.get<MyEvent[]>('/events'));

  return res;
};
