import z from 'zod';

const minPasswordCh = 8;
const minNameCh = 2;
const maxPasswordCh = 100;
const maxNameCh = 50;

const passwordSchema = z
  .string()
  .min(1, { message: 'Password is required' })
  .min(minPasswordCh, {
    message: `Password must be at least ${minPasswordCh} characters`,
  })
  .max(maxPasswordCh, {
    message: `Password must be less than ${maxPasswordCh} characters`,
  })
  .trim();

const emailSchema = z
  .email({ message: 'Invalid email address' })
  .min(1, { message: 'Email is required' })
  .trim();

const nameSchema = z
  .string()
  .min(1, { message: 'Name is required' })
  .min(minNameCh, {
    message: `Name must be at least ${minNameCh} characters`,
  })
  .max(maxNameCh, {
    message: `Name must be less than ${maxNameCh} characters`,
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});
