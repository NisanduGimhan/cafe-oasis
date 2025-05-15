import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allCustomers: any[] = [];
  filteredCustomers: any[] = [];
  searchEmail: string = '';
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Authentication required. Please login.';
      this.isLoading = false;
      return;
    }

    this.http.get<any[]>('http://localhost:8080/customer/get-all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.allCustomers = data;
        this.onSearchInput(); 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        this.errorMessage = 'Failed to load customers. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onSearchInput() {
    const searchTerm = this.searchEmail.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredCustomers = [...this.allCustomers];
    } else {
      this.filteredCustomers = this.allCustomers.filter(customer =>
        customer.email?.toLowerCase().includes(searchTerm)
      );
    }
  }
}