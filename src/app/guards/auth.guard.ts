import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const login= inject(LoginService)

  return login.isLoggedIn();
};

export const notLogged: CanActivateFn = (route, state) => {
  const login = inject(LoginService)
  return login.isAlreadyLogged();
};