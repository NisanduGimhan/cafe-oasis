import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-add-customer-details',
  imports: [RouterLink,RouterOutlet, RouterModule,CommonModule, FormsModule],
  templateUrl: './add-customer-details.component.html',
  styleUrl: './add-customer-details.component.css'
})
export class AddCustomerDetailsComponent {
  
  customer = {
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  };
  cartItems: any[] = [];

  constructor(private router: Router, private cartService: CartService,private customerService: CustomerService) {}


  completeOrder() {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (response) => {
        console.log('Customer saved successfully!', response);
        this.router.navigate(['orderconfirmation']);
      },
      error: (error) => {
        console.error('Error saving customer', error);
      }
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  // completeOrder() {
  //   this.router.navigate(['orderconfirmation']);
  // }

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
