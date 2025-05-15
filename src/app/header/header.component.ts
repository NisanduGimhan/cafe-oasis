import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from '../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [HeroComponent,RouterLink,RouterOutlet, RouterModule,CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
 cartCount = 0;
  constructor(private cartService: CartService) {}
  
     ngOnInit(): void {
    this.cartService.itemCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
   

}
