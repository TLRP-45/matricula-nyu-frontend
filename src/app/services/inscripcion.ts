import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Inscripcion {
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  guardar(data: any) {
    return this.http.post(`${this.api}/inscripcion`, data);
  }

  obtener(carrera: string, periodo: string) {
    return this.http.get(`${this.api}/inscripcion/${carrera}/${periodo}`);
  }
}
