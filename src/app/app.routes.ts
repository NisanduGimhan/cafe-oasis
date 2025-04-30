import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AddCustomerDetailsComponent } from './menu/add-customer-details/add-customer-details.component';
import { CartComponent } from './menu/cart/cart.component';
import { OrderConfirmationComponent } from './menu/order-confirmation/order-confirmation.component';
import { ProductCardComponent } from './menu/product-card/product-card.component';
import { ContatctComponent } from './contatct/contatct.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { UserComponent } from './admin/user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'contact', component: ContatctComponent },
  
  // user
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // menu
  { path: 'addCustomerdetails', component: AddCustomerDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orderconfirmation', component: OrderConfirmationComponent },
  { path: 'product-card', component: ProductCardComponent },

  // admin
  { 
    path: 'admin', 
    component: AdminNavbarComponent, // your admin page with navbar
    children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'product', component: ProductsComponent },
      { path: 'user', component: UserComponent },
      // later you can add more like products, subscribed users etc...
    ]
  },

  // catch-all
  { path: '**', redirectTo: '/home' }
];
