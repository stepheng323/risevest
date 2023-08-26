export interface UserModel {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}


export interface SignupPayload {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirm_password: string
}


export interface LoginPayload {
  email: string
  password: string
}