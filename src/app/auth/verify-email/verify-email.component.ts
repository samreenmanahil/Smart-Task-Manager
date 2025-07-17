import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, sendEmailVerification } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  imports: [CommonModule],
})
export class VerifyEmailComponent {
  resendDisabled = false;
  message = '';
  error = '';

  constructor(private router: Router, private auth: Auth) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

async resendVerificationEmail() {
  this.resendDisabled = true;

  try {
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      this.message = 'Verification email sent again. Please check your inbox.';
      this.error = ''; // Clear previous errors
    } else {
      this.error = 'User is already verified or not logged in.';
    }
  } catch (error: any) {
    if (error.code === 'auth/too-many-requests') {
      this.error = 'You’ve made too many requests. Please try again after some time.';
    } else {
      this.error = error.message;
    }
  }

  setTimeout(() => {
    this.resendDisabled = false;
  }, 60000); // Enable again after 1 minute
}
}