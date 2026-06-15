import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Carrera } from '../models/carrera.model';
import { environment } from '../enviroment';

export interface CreateCarrera {
  nombre: string;
  facultad: string;
  duracion: number;
  cupos: number;
}

export interface UpdateCarrera {
  nombre?: string;
  facultad?: string;
  duracion?: number;
  cupos?: number;
}

export interface AsignarAsignatura {
  semestre: number;
  posicion: number;
}

@Injectable({ providedIn: 'root' })
export class CarrerasService {
  constructor(private http: HttpClient) {}

  private subject = new BehaviorSubject<Carrera[]>([]);

  getCarreras$(): Observable<Carrera[]> {
    return this.subject.asObservable();
  }

  cargarCarreras(): void {
    this.getCarreras().subscribe({
      next: (data: any) => {
        console.log(data)
        const mapped: Carrera[] = data.map((c: any) => ({
          id: c.id_carrera,
          nombre: c.nombre,
          facultad: c.facultad,
          duracion: String(c.duracion),
          cupos: c.cupos ?? 0
        }));

        this.subject.next(mapped);
      },
      error: (err) => console.error('Error cargando carreras', err)
    });
  }

  addCarrera(c: Partial<Carrera>): void {
    const payload: CreateCarrera = {
      nombre: (c.nombre || '').trim(),
      facultad: c.facultad || '',
      duracion: Number(c.duracion) || 0,
      cupos: Number(c.cupos) || 0
    };

    this.postCarrera(payload).subscribe({
      next: () => this.cargarCarreras(),
      error: (err) => console.error('Error creando carrera', err)
    });
  }

  updateCarrera(id: number, patch: Partial<Carrera>): void {
    const payload: UpdateCarrera = {
      nombre: patch.nombre,
      facultad: patch.facultad,
      duracion: Number(patch.duracion) || undefined,
      cupos: Number(patch.cupos) || undefined
    };

    this.putCarrera(payload, id).subscribe({
      next: () => this.cargarCarreras(),
      error: (err) => console.error('Error actualizando carrera', err)
    });
  }

  eliminarCarrera(id: number): void {
    this.deleteCarrera(id).subscribe({
      next: () => this.cargarCarreras(),
      error: (err) => console.error('Error eliminando carrera', err)
    });
  }

  getCarreras() {
    return this.http.get(`${environment.apiUrl}/carrera`);
  }

  getSemestres(carreraID: number) {
    return this.http.get(`${environment.apiUrl}/carrera/${carreraID}/semestres`);
  }

  //_____________________________________--
  buscarCarreraNombre(nombre: string) {
    return this.http.get(
      `${environment.apiUrl}/carrera?nombre=${encodeURIComponent(nombre)}`
    );
  }

  buscarCarreraFacultad(facultad: string) {
    return this.http.get(
      `${environment.apiUrl}/carrera?facultad=${encodeURIComponent(facultad)}`
    );
  }
  //_____________________________________--


  postCarrera(carrera: CreateCarrera) {
    return this.http.post(`${environment.apiUrl}/carrera`, carrera);
  }

  putCarrera(carrera: UpdateCarrera, carreraID: number) {
    return this.http.put(
      `${environment.apiUrl}/carrera/${carreraID}`,
      carrera
    );
  }

  deleteCarrera(carreraID: number) {
    return this.http.delete(`${environment.apiUrl}/carrera/${carreraID}`);
  }

  getAsignaturasPorCarrera(carreraID: number) {
    return this.http.get(`${environment.apiUrl}/carrera/${carreraID}/asignaturas`);
  }

  putAsignaturaCarrera(carreraID: number, asignaturaID: number, asignatura: AsignarAsignatura) {
    return this.http.put(
      `${environment.apiUrl}/carrera/${carreraID}/asignatura/${asignaturaID}`,
      asignatura
    );
  }

  deleteAsignaturaCarrera(carreraID: number, asignaturaID: number) {
    return this.http.delete(
      `${environment.apiUrl}/carrera/${carreraID}/asignatura/${asignaturaID}`
    );
  }

  deleteAsignaturasPorSemestre(carreraID: number, semestre: number) {
    return this.http.delete(
      `${environment.apiUrl}/carrera/${carreraID}/asignaturas/semestre/${semestre}`
    );
  }

  buscarAsignaturaNombre(nombre: string) {
    return this.http.get(
      `${environment.apiUrl}/carrera?nombre=${encodeURIComponent(nombre)}`
    );
  }

  buscarAsignaturaCodigo(codigo: string) {
    return this.http.get(
      `${environment.apiUrl}/carrera?codigo=${encodeURIComponent(codigo)}`
    );
  }
}