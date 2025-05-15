import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,RouterOutlet, RouterModule,CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];
  constructor(private router: Router, private cartService: CartService) {}

  proceedToCheckout() {
    
    this.router.navigate(['addCustomerdetails']); 
  }

  continueShopping() {
    
    this.router.navigate(['menu']); 
  }



  //---------------------------------------------------------------------------------------------

  
  

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
     this.cartService.updateItemCount();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    this.cartService.updateItemCount();
    }
  }

removeItem(index: number) {
  this.cartService.removeItem(index); 
  this.cartItems = this.cartService.getCartItems(); 
}


  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.02;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
}
