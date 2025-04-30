import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoffeeProduct } from './models/coffee-product';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, FooterComponent, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  
  
  title = 'cafe-oasis';
  cartItems = [
    { name: 'Latte', description: 'Coffee drink made with espresso and steamed milk.', price: 4.25, quantity: 1 },
    { name: 'Cappuccino', description: 'An espresso-based coffee drink with steamed milk foam.', price: 4.50, quantity: 1 },
    { name: 'Icecoffie', description: 'An espresso-based coffee drink with steamed milk foam.', price: 4.50, quantity: 1 }
  ];

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.10;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
  
}


