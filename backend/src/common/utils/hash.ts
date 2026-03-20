import bcrypt from 'bcrypt';

export const getHashedPassword = async (
  password: string,
  saltRounds: number = 10,
) => {
  return bcrypt.hash(password, saltRounds);
};

export const isPasswordCorrect = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const getHashedToken = async (token: string, saltRounds: number = 6) => {
  return bcrypt.hash(token, saltRounds);
};
