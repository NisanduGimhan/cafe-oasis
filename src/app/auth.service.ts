import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/user'; 

  constructor(private http: HttpClient) { }

  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/${name}/${password}`, {}); 
  }
  
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
