import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { Observable, map, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Role } from '../models/roles';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService
  ) { }

  public login(r: string, p: string, isAdmin: boolean = false): Observable<{ authorized: boolean, user?: any, errorType?: string }> {

    return this.clientService.postClientData(r, p).pipe(map((response: any) => {
      if (response.success && response.user) {
        const authorizedUser = response.user;
        // Asignamos el rol basandonos estrictamente en lo que viene del backend
        authorizedUser.role = authorizedUser.rol;
        
        // Check roles BEFORE saving the token to storage
        if (isAdmin && Number(authorizedUser.role) !== Number(Role.ADMIN)) {
            return { authorized: false, errorType: 'NOT_ADMIN' };
        }
        if (!isAdmin && Number(authorizedUser.role) === Number(Role.ADMIN)) {
            return { authorized: false, errorType: 'NOT_STUDENT' };
        }

        const token: string = response.token;
        this.authService.saveUser(authorizedUser);
        this.authService.saveToken(token);
        return { authorized: true, user: authorizedUser };
      } else {
        return { authorized: false, errorType: 'WRONG_CREDENTIALS' };
      }
    }));
  }

  public hasRole(role: Role): boolean {
    const user = this.authService.getUser();
    return user && user.role !== undefined && Number(user.role) === Number(role);
  }

  public logOut(): boolean{
    this.authService.logout()
    return true
  }
  
  public getUser(): any {
    return this.authService.getUser();
  }
  
  public isLoggedIn(): Observable<boolean> {
    let token = this.authService.getToken()
    if (token){
      return of (true)
    }
  
    this.router.navigateByUrl('login')
    return of (false)
  }
  
  public isAlreadyLogged(): Observable<boolean>{
    let token = this.authService.getToken() 
    if (token) {
      this.router.navigateByUrl('home');
      return of (false);
    } 
  
    return of (true);
  }
  
}