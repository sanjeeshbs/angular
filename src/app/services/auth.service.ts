import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginURL = 'https://88.201.64.7:4058/api/Login';
  constructor(private http: HttpClient) { }

  login(credentials: Login) {
    return this.http.post(this.loginURL, credentials)
      .pipe(map(response => {
        if (response) {
          console.log(response);
          localStorage.setItem('token', response.toString());
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  get currentUser(){
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return jwtHelper.decodeToken(token);
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}

