import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
 imports: [CommonModule, FormsModule, RouterModule]

})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) {}

  register() {
    this.error = '';
    this.message = '';

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(userCredential => {
        console.log('User registered!', userCredential.user);
        this.message = 'Account created successfully!';
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Registration error:', error);
        this.error = error.message;
      });
  }
}
