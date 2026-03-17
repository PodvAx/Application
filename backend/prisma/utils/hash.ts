import bcrypt from 'bcrypt';

export const getHashedPassword = async (password: string) => {
  const SALT_ROUNDS = 10;

  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const isPasswordValid = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
