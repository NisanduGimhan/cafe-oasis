import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'http://localhost:8080/api/item/get-all';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
