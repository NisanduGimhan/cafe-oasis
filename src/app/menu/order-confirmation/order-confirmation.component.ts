import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  imports: [RouterLink,RouterOutlet, RouterModule,CommonModule, FormsModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent implements OnInit{
   orderId: string | null = null;
  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
    });
  }

  returnToHome() {
   
    this.router.navigate(['home']);
  }
  
  orderMore() {
    this.router.navigate(['menu']);
  }
  
}
