import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AddCustomerDetailsComponent } from "../../menu/add-customer-details/add-customer-details.component";
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterOutlet, RouterModule, RouterLink, AddCustomerDetailsComponent, ProductsComponent],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

}
