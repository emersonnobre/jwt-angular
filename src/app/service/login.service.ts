import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080'

  private user: User = {
    username: '',
    password: ''
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {username, password}).subscribe((res) => {
      localStorage.setItem('token', res.toString())
    })
  }

}
