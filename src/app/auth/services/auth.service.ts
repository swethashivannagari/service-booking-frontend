import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from '../../shared/models/api-response.model';
import { RegisterRequest } from '../../shared/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:9999/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'auth_role';
  private readonly USER_ID_KEY = 'auth_user_id';


  constructor(private http: HttpClient) { }

  login(request:LoginRequest):Observable<ApiResponse<LoginResponse>>{
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/login`,request);
  }

  register(request: RegisterRequest) {
    return this.http.post<any>(
      `${this.API_URL}/register`,
      request
    );
  }

  storeAuthData(response: LoginResponse): void {
  localStorage.setItem(this.TOKEN_KEY, response.token);
  localStorage.setItem(this.ROLE_KEY, response.role);
  localStorage.setItem(this.USER_ID_KEY, response.userId);
}

getToken(): string | null {
  return localStorage.getItem(this.TOKEN_KEY);
}

getUserRole(): string | null {
  return localStorage.getItem(this.ROLE_KEY)  as
    | 'USER'
    | 'PROVIDER'
    | 'ADMIN'
    | null;
}

getUserId(): string | null {
  return localStorage.getItem(this.USER_ID_KEY);
}

logout():void{
  localStorage.removeItem(this.TOKEN_KEY);
  localStorage.removeItem(this.ROLE_KEY);
  localStorage.removeItem(this.USER_ID_KEY);
}

isLoggedIn():boolean{
  return this.getToken()!=null;
}

  
}
