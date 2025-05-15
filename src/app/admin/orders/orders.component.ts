import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add FormsModule for ngModel

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No JWT token found');
      return;
    }

    this.http.get<any[]>('http://localhost:8080/order/get-all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.allOrders = data.map(order => ({
          ...order,
          date: new Date() 
        }));
        this.filteredOrders = [...this.allOrders];
      },
      error: (err) => console.error('Error fetching orders', err)
    });
  }

  searchOrders() {
    if (this.searchTerm.trim()) {
      this.filteredOrders = this.allOrders.filter(order =>
        order.orderNo.toString().includes(this.searchTerm.trim())
      );
    } else {
      this.filteredOrders = [...this.allOrders];
    }
  }
}
