import { Component } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';

// Assuming payhere is a global object provided by an external library
declare const payhere: any;



@Component({
  selector: 'app-payment',
  imports: [],
  template: `
    <p>
      payment works!
    </p>
  `,
  styles: ``
})
export class PaymentComponent {
  order = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    amount: 0,
    items: 'Cafe Bill' // You can dynamically populate this as needed
  };

  constructor(private paymentService: PaymentService, private router: Router) {}

  payNow() {
    this.paymentService.createPayment(this.order).subscribe({
      next: (paymentData) => {
        console.log('Payment data:', paymentData);
        this.initiatePayment(paymentData);
      },
      error: (err) => {
        console.error('Payment Error: ', err);
        alert('Payment failed! Please try again.');
      }
    });
  }

  initiatePayment(paymentData: any) {
    // PayHere setup and payment flow
    const payment = {
      ...paymentData,
      merchant_id: 'y1230343',
      return_url: 'http://your-site.com/payment-success',
      cancel_url: 'http://your-site.com/payment-cancel',
      notify_url: 'http://your-site.com/payment-notify',
    };

    payhere.onCompleted = (orderId: any) => {
      alert(`Payment successful! Order ID: ${orderId}`);
      this.router.navigate(['/menu']);  // Redirect to Menu UI after success
    };

    payhere.onDismissed = () => {
      alert('Payment dismissed!');
    };

    payhere.onError = (error: any) => {
      alert('Payment error: ' + error);
    };

    // Start the payment process
    payhere.startPayment(payment);
  }
}

