import type { ApiErrorType } from './normalizeError';

export const request = async <T>(
  promise: Promise<{ data: T }>,
): Promise<{ data: T | null; err: ApiErrorType | null }> => {
  try {
    const res = await promise;
    return { data: res.data, err: null };
  } catch (err) {
    console.log('catch error in request');
    return { data: null, err: err as ApiErrorType };
  }
};
