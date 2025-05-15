import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private baseUrl = 'http://localhost:8080/customer'; 

  constructor(private http: HttpClient) { }

  addCustomer(customerData: any): Observable<any> {
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('No token found!');
      return new Observable(); 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/add`, customerData, { headers });
  }
}
