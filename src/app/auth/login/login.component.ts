import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Add this line

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ Add RouterModule here
})
export class LoginComponent {
  form: FormGroup;
  error: string = '';
  message: string = '';

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    const { email, password } = this.form.value;

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      if (userCredential.user.emailVerified) {
        this.message = 'Login successful!';
        this.error = '';
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Please verify your email before logging in.';
        this.message = '';
        this.router.navigate(['/verify-email']);
      }
    } catch (err: any) {
      this.message = '';
      this.error = err.message;
    }
  }
}
