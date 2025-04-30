// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, type: 'Coffee', name: 'Espresso', price: 3.5, description: 'A concentrated form of coffee served in small, strong shots.', available: true, featured: true },
    { id: 2, type: 'Coffee', name: 'Cappuccino', price: 4.5, description: 'An espresso-based coffee drink with steamed milk foam.', available: true, featured: true },
    { id: 3, type: 'Food', name: 'Croissant', price: 3.25, description: 'A flaky, buttery pastry of Austrian origin.', available: true, featured: false },
    { id: 4, type: 'Food', name: 'Blueberry Muffin', price: 3.75, description: 'A small, sweet quickbread with fresh blueberries.', available: true, featured: false },
    { id: 5, type: 'Coffee', name: 'Latte', price: 4.25, description: 'Coffee drink made with espresso and steamed milk.', available: true, featured: false },
    { id: 6, type: 'Dessert', name: 'Chocolate Cake', price: 5.5, description: 'Rich, moist chocolate layer cake with chocolate ganache.', available: true, featured: false },
    { id: 7, type: 'Coffee', name: 'Chai Tea', price: 3.75, description: 'Spiced black tea with milk and honey.', available: true, featured: false },
    { id: 8, type: 'Merchandise', name: 'Cafe Mug', price: 12.99, description: 'Ceramic mug with our cafe logo.', available: true, featured: false },
  ];

  getProducts() {
    return [...this.products];
  }

  addProduct(product: Product) {
    this.products.push({ ...product, id: Date.now() });
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
