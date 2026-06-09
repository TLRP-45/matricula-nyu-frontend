import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs';
import { Role } from '../models/roles';

export const authGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);
  return login.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        return false;
      }
      let expectedRole = route.data['role'];
      if (expectedRole === undefined && state.url.includes('/admin')) {
        expectedRole = Role.ADMIN;
      }
      if (expectedRole !== undefined && !login.hasRole(expectedRole)) {
        // Redirect based on actual role to avoid infinite loop
        const user = login.getUser();
        if (user && Number(user.role) === 0) {
          router.navigate(['/admin']);
        } else {
          router.navigate(['/home']);
        }
        return false;
      }
      return true;
    })
  );
};

export const notLogged: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  return login.isAlreadyLogged();
};