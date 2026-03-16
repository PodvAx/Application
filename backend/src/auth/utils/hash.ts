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
