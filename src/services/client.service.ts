import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Client } from '../app/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/autenticacion/login'; 
  
  public postClientData(rut: string, password: string): Observable<any>  {
    return this.http.post<any>(this.apiUrl, { rut, password })
  }
  
  public editClientData(clientId: number, client: Partial<Client>): Observable<any> {
    return this.http.put<Client>(`${this.apiUrl}/${clientId}`, client)
  }
}