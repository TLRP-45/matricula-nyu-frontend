import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { Observable, map, of } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService
  ) { }

  public login(r: string, p:string): Observable<{authorized: boolean}>{
  
    return this.clientService.postClientData(r,p).pipe(map((response: any) => {
      if (response.success && response.user) {
        const authorizedUser = response.user;
        const token: string = response.token;
        this.authService.saveUser(authorizedUser);
        this.authService.saveToken(token);
        return { authorized: true };
      } else {
        return { authorized: false };
      }
    }));
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