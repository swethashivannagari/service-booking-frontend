export interface AuthUser{
    userId: string;
    role: 'USER' | 'ADMIN' | 'PROVIDER';
    token: string;
}