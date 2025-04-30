import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, RouterModule, RouterLink,CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  cartItems: any[] = [];

  constructor(private http: HttpClient,private cartService: CartService) {}

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }
    this.http.get<any[]>('http://localhost:8080/api/item/get-all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = [...this.items]; // initially, no filter
      },
      error: (err) => {
        console.error('Error fetching items', err);
      }
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    console.log('Cart Items:', this.cartService.getCartItems());
  }

  filterByCategory(category: string) {
    if (category === 'All') {
      this.filteredItems = [...this.items]; // show all
    } else {
      this.filteredItems = this.items.filter(item => item.item_type === category);
    }
  }
}