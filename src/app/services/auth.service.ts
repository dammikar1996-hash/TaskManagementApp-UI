import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  apiUrl = 'https://localhost:7284/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      username,
      password
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}