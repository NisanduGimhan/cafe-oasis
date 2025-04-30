import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  addToCart(item: any) {
    // Check if item already exists
    const existingItem = this.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({...item, quantity: 1});
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  clearCart() {
    this.cartItems = [];
  }
}
