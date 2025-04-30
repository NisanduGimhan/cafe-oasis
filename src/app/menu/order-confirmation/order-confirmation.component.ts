import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  imports: [RouterLink,RouterOutlet, RouterModule,CommonModule, FormsModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {

  constructor(private router: Router) {}

  returnToHome() {
   
    // Navigate to home page
    this.router.navigate(['home']);
  }
  
  orderMore() {
    this.router.navigate(['menu']);
  }
  
}
