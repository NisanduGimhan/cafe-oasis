import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CustomerService } from '../../service/customer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var payhere: any;

@Component({
  selector: 'app-add-customer-details',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './add-customer-details.component.html',
  styleUrls: ['./add-customer-details.component.css']
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  completeOrder(): void {
    const orderId = 'ORDER_' + Date.now();
    const amount = this.getTotal().toFixed(2);
    const currency = 'LKR';

    const paymentRequest = {
      order_id: orderId,
      amount: amount,
      currency: currency
    };

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('⚠️ No JWT token found. Please log in.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post<any>('http://localhost:8080/api/payment/hash', paymentRequest, { headers }).subscribe({
      next: (data) => {
        const { hash, merchant_id } = data;

        const payment = {
          sandbox: true,
          merchant_id: merchant_id,
          return_url: 'http://localhost:4200/payment-success',
          cancel_url: 'http://localhost:4200/payment-cancel',
          notify_url: 'http://localhost:8080/api/payment/notify',
          order_id: orderId,
          items: 'Cafe Order',
          amount: amount,
          currency: currency,
          first_name: this.customer.name,
          last_name: '',
          email: this.customer.email,
          phone: this.customer.phone,
          address: this.customer.address,
          city: 'Colombo',
          country: 'Sri Lanka',
          hash: hash
        };

        payhere.startPayment(payment);
      },
      error: (err) => {
        console.error('❌ Failed to generate payment hash:', err);
      }
    });
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
