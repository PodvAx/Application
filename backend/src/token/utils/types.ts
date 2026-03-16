export enum PayloadEnum {
  email = 'email-verification',
  access = 'access',
  refresh = 'refresh',
}

export interface EmailVerificationPayload {
  sub: string;
  email: string;
  type: PayloadEnum.email;
}

export interface AccessPayload {
  sub: string;
  email: string;
  type: PayloadEnum.access;
}

export interface RefreshPayload {
  sub: string;
  email: string;
  type: PayloadEnum.refresh;
}
