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

      // Verificamos si la ruta requiere un rol específico
      let expectedRole = route.data['role'];

      // Red de seguridad: si la data de la ruta viene vacía pero estamos en /admin
      if (expectedRole === undefined && state.url.includes('/admin')) {
        expectedRole = Role.ADMIN;
      }

      if (expectedRole !== undefined && !login.hasRole(expectedRole)) {
        // Si no tiene el rol, redirigimos a home o login
        router.navigate(['/login']);
        return false;
      }

      return true;
    })
  );
};

export const notLogged: CanActivateFn = (route, state) => {
  const login = inject(LoginService)
  return login.isAlreadyLogged();
};