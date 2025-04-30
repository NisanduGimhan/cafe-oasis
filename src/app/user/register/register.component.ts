import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterOutlet, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  mode: 'login' | 'register' = 'register';

  constructor() {}

  switchMode(selectedMode: 'login' | 'register') {
    this.mode = selectedMode;
    console.log('Switched to:', this.mode);
  }

  onSubmit() {
    console.log('Form submitted successfully!');
    // You can collect the form data and send it to your backend here
  }
}
