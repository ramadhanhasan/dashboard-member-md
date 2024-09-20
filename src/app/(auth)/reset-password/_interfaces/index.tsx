export interface IResetPassword {
  id: string
  forgotten_code: string
  password: string;
  confirmPassword?: string;
}