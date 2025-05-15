import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  editingProduct: any = null;
  showModal = false;
  isEditing = false;

  emptyProduct = {
    id: null,
    itemNo: '',
    itemType: '',
    name: '',
    price: 0,
    imageUrl: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://localhost:8080/api/item/get-all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products', err)
    });
  }

  openAddProduct() {
    this.isEditing = false;
    this.editingProduct = { ...this.emptyProduct };
    this.showModal = true;
  }

  openEditProduct(product: any) {
    this.isEditing = true;
    this.editingProduct = { ...product };
    this.showModal = true;
  }

  saveProduct() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = {
      itemNo: this.editingProduct.itemNo,
      itemType: this.editingProduct.itemType,
      name: this.editingProduct.name,
      price: this.editingProduct.price,
      imageUrl: this.editingProduct.imageUrl
    };

    if (this.isEditing && this.editingProduct.id != null) {
      this.http.put(`http://localhost:8080/api/item/update/${this.editingProduct.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.loadProducts();
          this.showModal = false;
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.http.post('http://localhost:8080/api/item/add', payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.loadProducts();
          this.showModal = false;
        },
        error: (err) => console.error('Create failed', err)
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      const token = localStorage.getItem('token');
      this.http.delete(`http://localhost:8080/api/item/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => this.loadProducts());
    }
  }

  cancelEdit() {
    this.showModal = false;
  }
}
