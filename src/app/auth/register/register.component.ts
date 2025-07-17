import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {
  form: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  async register() {
    const { name, email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);

      this.message = 'Verification email sent. Please check your inbox.';
      this.router.navigate(['/verify-email']);
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
