import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  cartItems: any[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string = 'All';  

  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.menuService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = [...this.items];
        this.uniqueCategories = ['All', ...new Set(this.items.map(item => item.itemType))];
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
    this.selectedCategory = category;  
    this.filteredItems = category === 'All'
      ? [...this.items]
      : this.items.filter(item => item.itemType === category);
  }
}
