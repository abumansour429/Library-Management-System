import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  logout(refreshToken: string) {
    return this.http.post(`${this.api}/logout`, { refreshToken });
  }

  saveTokens(access: string, refresh: string) {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logoutLocal() {
    localStorage.clear();
  }
}

