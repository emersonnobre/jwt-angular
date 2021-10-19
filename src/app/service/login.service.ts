import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {username, password}, { responseType: 'text' as 'json' })
  }

  getUsers(token: any) {
    if(token) {
      return this.http.get<any>(`${this.apiUrl}/api/users`, { headers: { Authorization: "Bearer " + token } })
    } else {
      return throwError('No token provided')
    }
  }

  logout() {
    localStorage.removeItem('token')
    window.location.reload()
  }

}
