import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, signOut, user } from '@angular/fire/auth';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Inject services
  auth = inject(Auth);
  router = inject(Router);

  // User info
  userEmail = '';
  userDisplayName = '';
  userPhotoURL = '';
  userUID = '';
  emailVerified = false;

  // Sample tasks (replace with backend later)
  tasks = [
    { title: 'Sample Task 1', status: 'active' },
    { title: 'Sample Task 2', status: 'done' }
  ];

  constructor() {
    // Subscribe to the current Firebase user
    user(this.auth).subscribe(u => {
      if (u) {
        this.userEmail = u.email ?? '';
        this.userDisplayName = u.displayName ?? '';
        this.userPhotoURL = u.photoURL ?? '';
        this.userUID = u.uid;
        this.emailVerified = u.emailVerified;
      }
    });
  }

  // 🔒 Logout
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    }).catch(err => {
      alert('❌ Logout failed: ' + err.message);
    });
  }

  // ➕ Open Add Task dialog (placeholder for now)
  openAddTaskDialog() {
    alert('📝 Add Task modal will appear here!');
  }

  // 📧 Resend email verification
 sendVerificationEmail() {
  const currentUser = this.auth.currentUser;
  if (currentUser) {
    sendEmailVerification(currentUser)
      .then(() => {
        console.log('✅ Verification email sent.');
      })
      .catch((error) => {
        console.error('❌ Error sending email verification:', error);
      });
  }
}
}
