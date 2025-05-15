import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from '../../service/cart.service';
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
    notes: ''
  };
  //,

  cartItems: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

 async completeOrder(): Promise<void> {
  try {
    const orderId = 'ORDER_' + Date.now();
    const amount = this.getTotal().toFixed(2);
    const currency = 'LKR';

    
    const customData = {
      customer: {
        name: this.customer.name,
        email: this.customer.email,
        phone: this.customer.phone || null, 
        address: this.customer.address || null 
      },
      order: {
        orderNo: orderId,
        items: this.cartItems.map(item => ({
          itemName: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: this.getTotal(),
        notes: this.customer.notes || 'No notes'
      }
    };

    
    const hashResponse = await this.http.post<any>(
      'http://localhost:8080/api/payment/hash',
      { order_id: orderId, amount, currency },
      { headers: new HttpHeaders({ 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      })}
    ).toPromise();

    
    const payment = {
      sandbox: true,
      merchant_id: hashResponse.merchant_id,
      return_url: 'http://localhost:4200/payment-success',
      cancel_url: 'http://localhost:4200/payment-cancel',
      notify_url: 'https://24df-2402-4000-23e0-86b-cd3b-785c-9fa-c2bf.ngrok-free.app/api/payment/notify',
      order_id: orderId,
      items: 'Cafe Order',
      amount: amount,
      currency: currency,
      first_name: this.customer.name.split(' ')[0] || 'Customer',
      last_name: this.customer.name.split(' ')[1] || '',
      email: this.customer.email,
      phone: this.customer.phone || '0000000000', 
      address: this.customer.address || 'Not specified',
      city: 'Colombo',
      country: 'Sri Lanka',
      hash: hashResponse.hash,
      custom_1: JSON.stringify(customData) // Single custom_1 field
    };

   
    if (typeof payhere !== 'undefined') {
      payhere.onCompleted = (orderId: string) => {
        this.cartService.clearCart();
        this.router.navigate(['/orderconfirmation'], { 
          queryParams: { orderId },
          state: { customer: this.customer } 
        });
      };

      payhere.onDismissed = () => {
        console.log('Payment dismissed');
        this.router.navigate(['/payment-cancel']);
      };

      payhere.onError = (error: any) => {
        console.error('Payment error:', error);
        this.router.navigate(['/payment-error']);
      };

      payhere.startPayment(payment);
    } else {
      alert('Payment gateway is currently unavailable');
    }
  } catch (error) {
    console.error('Checkout failed:', error);
    alert('Failed to initialize payment. Please try again.');
  }
}

  getTotalItems() { return this.cartItems.reduce((t, i) => t + i.quantity, 0); }
  getSubtotal()  { return this.cartItems.reduce((t, i) => t + i.price * i.quantity, 0); }
  getTax()       { return this.getSubtotal() * 0.2; }
  getTotal()     { return this.getSubtotal() + this.getTax(); }
}
