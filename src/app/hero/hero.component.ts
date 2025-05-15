import { Component, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [CommonModule,  RouterOutlet, RouterModule, RouterLink, HeroComponent],
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  topMenuItems: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getAllItems().subscribe({
      next: (items) => {
        this.topMenuItems = items.slice(0, 3); 
      },
      error: (err) => {
        console.error('Failed to load menu items', err);
      }
    });
  }
}
