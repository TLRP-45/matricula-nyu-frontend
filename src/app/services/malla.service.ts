import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asignatura } from '../pages/malla-curricular/malla-curricular';
import { environment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class MallaService {
  private subject = new BehaviorSubject<Asignatura[]>([]);

  constructor(private http: HttpClient) {}

  setAsignaturas(list: Asignatura[]): void {
    this.subject.next(list);
  }

  getAsignaturas$(): Observable<Asignatura[]> {
    return this.subject.asObservable();
  }

  getAsignaturasSnapshot(): Asignatura[] {
    return this.subject.getValue();
  }

  obtenerCarrera() {
    const estudianteID = sessionStorage.getItem('id');
    return this.http.get(`${environment.apiUrl}/carrera/${estudianteID}`);
  }

  obtenerSemestres(carreraID: number) {
    return this.http.get<number>(`${environment.apiUrl}/carrera/${carreraID}/semestres`);
  }

  obtenerAsignaturaPorSemestre(carreraID:number, semestre: number) {
    return this.http.get<Asignatura[]>(`${environment.apiUrl}/carrera/${carreraID}/asignaturas/${semestre}`);
  }

  obtenerEstadoAsignatura(asignaturaID: number) {
    const estudianteID = sessionStorage.getItem('id');
    return this.http.get<String>(`${environment.apiUrl}/asignaturas/${asignaturaID}/${estudianteID}/estado`);
  }

  obtenerAsignatura(asignaturaID: number) {
    return this.http.get<Asignatura>(`${environment.apiUrl}/asignaturas/${asignaturaID}`);
  }

  obtenerPrerrequisitos(asignaturaID:number, carreraID:number) {
    return this.http.get<Asignatura[]>(`${environment.apiUrl}/asignaturas/${asignaturaID}/prerrequisitos/${carreraID}`);
  }

  obtenerTributas(asignaturaID:number, carreraID:number) {
    return this.http.get<Asignatura[]>(`${environment.apiUrl}/asignaturas/${asignaturaID}/tributas/${carreraID}`);
  }
}
