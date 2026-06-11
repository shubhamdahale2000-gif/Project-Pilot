import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(payload: any) {
  return this.http.post<any>(
    'https://dummyjson.com/auth/login',
    {
      username: payload.email,
      password: payload.password
    }
  );
}

isLoggedIn():boolean {
  return !!localStorage.getItem('accessToken');
}

logout() {
  localStorage.clear();
}
}
