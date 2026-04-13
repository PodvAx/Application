import type z from 'zod';
import type { loginSchema, registerSchema } from '../utils/zod.schemas';
import type { IconType } from 'react-icons';
import { button } from '../components/variants/button';
import type { VariantProps } from 'class-variance-authority';

export type BtnVariantType = VariantProps<typeof button>['variant'];

export interface NavItemProps {
  to: string;
  label: string;
  icon: IconType;
  variant: BtnVariantType;
}

export type UserLoginDataType = z.infer<typeof loginSchema>;
export type UserRegisterDataType = z.infer<typeof registerSchema>;

export type UserActivationDataType = {
  token: string;
};

export type authUserDataType = {
  email: string;
  name: string;
  password: string;
};

export type ResponseRegisterType = {
  message: string;
};

export type ResponseActivateType = {
  accessToken: string;
};

export type ResponseLoginType = {
  accessToken: string;
};

export type ResponseRefreshType = {
  accessToken: string;
};

export type ResponseLogoutType = {
  message: string;
};

export type UserDataType = {
  id?: string;
  email: string;
  name: string;
  isVerifiedEmail?: boolean;
  password?: string;
};

export type MyEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  creatorId: string;
  capacity?: number;
};
