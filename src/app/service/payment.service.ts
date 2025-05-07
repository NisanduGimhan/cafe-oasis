import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private paymentUrl = 'http://localhost:8080/api/payment/create';

  constructor(private http: HttpClient) {}

  createPayment(order: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found!');
      return throwError(() => new Error('Unauthorized: No token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.paymentUrl, order, { headers });
  }
}
