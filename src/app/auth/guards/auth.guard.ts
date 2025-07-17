import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.currentUser;

  if (user && user.emailVerified) {
    return true; // ✅ Allow access to route
  } else {
    router.navigate(['/login']); // ❌ Block and redirect
    return false;
  }
};
