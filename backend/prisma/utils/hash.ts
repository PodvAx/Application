import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const SALT_ROUNDS = 10;
  if (!password || password.length === 0) {
    throw new Error("Password can't be empty");
  }

  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error(
      `Password hashing failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const isPasswordValid = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
