import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable, map, of, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { Role } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  public login(r: string, p: string, isAdmin: boolean = false): Observable<{ authorized: boolean, user?: any, errorType?: string }> {
    return this.userService.postUserData(r, p).pipe(
      map((response: any) => {
        if (response.token && response.user) {
          const authorizedUser = response.user;

          // Mapear rol string del backend a número del enum frontend
          const rolMap: Record<string, Role> = {
            '0': Role.ADMIN,
            '1': Role.STUDENT,
            'admin': Role.ADMIN,
            'estudiante': Role.STUDENT,
          };
          authorizedUser.role = rolMap[authorizedUser.rol] ?? Role.STUDENT;

          if (isAdmin && authorizedUser.role !== Role.ADMIN) {
            return { authorized: false, errorType: 'NOT_ADMIN' };
          }
          if (!isAdmin && authorizedUser.role === Role.ADMIN) {
            return { authorized: false, errorType: 'NOT_STUDENT' };
          }
          const token: string = response.token;
          this.authService.saveUser(authorizedUser);
          this.authService.saveToken(token);
          return { authorized: true, user: authorizedUser };
        } else {
          return { authorized: false, errorType: 'WRONG_CREDENTIALS' };
        }
      }),
      catchError((error) => {
        return of({ authorized: false, errorType: 'WRONG_CREDENTIALS' });
      })
    );
  }

  public hasRole(role: Role): boolean {
    const user = this.authService.getUser();
    return user && user.role !== undefined && Number(user.role) === Number(role);
  }

  public logOut(): boolean {
    this.authService.logout();
    return true;
  }

  public getUser(): any {
    return this.authService.getUser();
  }

  public isLoggedIn(): Observable<boolean> {
    let token = this.authService.getToken();
    if (token) {
      return of(true);
    }
    this.router.navigateByUrl('login');
    return of(false);
  }

  public isAlreadyLogged(): Observable<boolean> {
    let token = this.authService.getToken();
    if (token) {
      const user = this.authService.getUser();
      if (user && Number(user.role) === 0) {
        this.router.navigateByUrl('admin');
      } else {
        this.router.navigateByUrl('home');
      }
      return of(false);
    }
    return of(true);
  }
}