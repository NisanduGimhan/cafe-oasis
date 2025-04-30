import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeroComponent } from "../hero/hero.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, RouterOutlet, RouterModule, RouterLink, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images = [
    {
      url: 'https://t3.ftcdn.net/jpg/03/15/40/34/360_F_315403482_MVo1gSOOfvwCwhLZ9hfVSB4MZuQilNrx.jpg',
      title: 'Welcome to Oasis Cafe',
      description: 'Where coffee meets comfort and community.'
    },
    {
      url: 'https://t3.ftcdn.net/jpg/03/06/80/94/240_F_306809419_sOgtjPElK8HXux07VJeMWfsIPpQqcuiK.jpg',
      title: 'Brewed to Perfection',
      description: 'Enjoy your favorite blends made with love.'
    },
    {
      url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
      title: 'Relax & Recharge',
      description: 'Take a moment and savor the rich aroma of life.'
    }
  ];

  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000); // Change image every 4 seconds
  }
}
