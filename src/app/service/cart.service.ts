import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private itemCount = new BehaviorSubject<number>(0);

  itemCount$ = this.itemCount.asObservable();

  constructor() {}

  addToCart(item: any) {
    const existingItem = this.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.updateItemCount();
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.updateItemCount();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateItemCount();
    localStorage.removeItem('cart');
  }

   updateItemCount(): void {
    const total = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.itemCount.next(total);
  }
}
