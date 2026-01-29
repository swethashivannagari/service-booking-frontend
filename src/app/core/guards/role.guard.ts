import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = authService.getUserRole();

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    // logged in but not authorized
    router.navigate(['/unauthorized']);
    return false;
  };
};
