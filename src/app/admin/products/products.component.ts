import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  imports: [RouterLink,RouterOutlet, RouterModule,CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  editingProduct: any = null;
  showModal: boolean = false;
  isEditing: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    this.http.get<any[]>('http://localhost:8080/api/item/get-all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  openAddProduct() {
    this.isEditing = false;
    this.editingProduct = {
      name: '',
      price: 0,
      description: '',
      type: '',
      available: true,
      featured: false,
      imageUrl: ''
    };
    this.showModal = true;
  }

  openEditProduct(product: any) {
    this.isEditing = true;
    this.editingProduct = { ...product };
    this.showModal = true;
  }

  saveProduct() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    if (this.isEditing) {
      // Update product
      this.http.put(`http://localhost:8080/api/item/update/${this.editingProduct.id}`, this.editingProduct, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        this.loadProducts();
        this.showModal = false;
      });
    } else {
      // Add new product
      this.http.post('http://localhost:8080/api/item/add', this.editingProduct, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        this.loadProducts();
        this.showModal = false;
      });
    }
  }

  deleteProduct(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:8080/api/item/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  cancelEdit() {
    this.showModal = false;
  }
}