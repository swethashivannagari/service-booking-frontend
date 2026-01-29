export interface LoginResponse {
 
  token: string;
  userId: string;
  role: 'USER' | 'ADMIN' | 'PROVIDER';
}
