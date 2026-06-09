import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/auth/login';

  public postUserData(rut: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { rut, password });
  }

  public editUserData(userId: number, user: Partial<User>): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  public register(userData: any): Observable<any> {
    const registerUrl = 'http://localhost:3000/autenticacion/register';
    return this.http.post<any>(registerUrl, userData);
  }

  public getCarreras(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/carrera');
  }
}