export enum PayloadEnum {
  email = 'email-verification',
  access = 'access',
  refresh = 'refresh',
  reset = 'reset-password',
}

interface BaseTokenPayload {
  sub: string;
  email: string;
}

export interface EmailVerificationPayload extends BaseTokenPayload {
  type: PayloadEnum.email;
}

export interface AccessPayload extends BaseTokenPayload {
  type: PayloadEnum.access;
}

export interface RefreshPayload extends BaseTokenPayload {
  type: PayloadEnum.refresh;
}

export interface ResetPayload extends BaseTokenPayload {
  type: PayloadEnum.reset;
}

export type TokenPayload =
  | EmailVerificationPayload
  | AccessPayload
  | RefreshPayload
  | ResetPayload;
