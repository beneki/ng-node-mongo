import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { EndpointConfig } from "././constants/EndpointConfig"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private getEndPoint;

  constructor(private http: HttpClient,private router: Router) {
    this.getEndPoint = EndpointConfig.getEndpointAddress;
  }

  registerUser(user) {
    return this.http.post<any>(this.getEndPoint("register"), user);
  }

  loginUser(user) {
    return this.http.post<any>(this.getEndPoint("login"), user);
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  loggedIn(): boolean {
    let x =!!localStorage.getItem('token')
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
