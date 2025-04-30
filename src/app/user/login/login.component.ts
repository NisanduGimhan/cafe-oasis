import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet, RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login';

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    fullName: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  switchMode(mode: 'login' | 'register') {
    this.mode = mode;
  }

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (user) => {
          //console.log('Logged in user:', user);
          localStorage.setItem('token', user.token);
          console.log(user.token) //lcl strg 
  
          if (user.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (user.role === 'USER') {
            this.router.navigate(['/menu']);
          } else {
            alert('Unknown role. Cannot navigate.');
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed. Please try again.');
        }
      });
  }

  onRegister() {
    this.authService.register(this.registerData)
      .subscribe({
        next: (response) => {
          console.log('Registered successfully', response);
          alert('Registration successful! You can now log in.');
          this.switchMode('login');
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      });
  }

  continueAsGuest() {
    this.router.navigate(['/guest-home']);
  }
}

  