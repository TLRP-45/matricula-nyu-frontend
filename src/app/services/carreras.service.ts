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
  ID_asignatura: number;
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
    this.obtenerCarreras().subscribe({
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

    this.crearCarrera(payload).subscribe({
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

    this.actualizarCarrera(payload, id).subscribe({
      next: () => this.cargarCarreras(),
      error: (err) => console.error('Error actualizando carrera', err)
    });
  }

  deleteCarrera(id: number): void {
    this.eliminarCarrera(id).subscribe({
      next: () => this.cargarCarreras(),
      error: (err) => console.error('Error eliminando carrera', err)
    });
  }

  obtenerCarreras() {
    return this.http.get(`${environment.apiUrl}/carrera`);
  }

  obtenerSemestres(carreraID: number) {
    return this.http.get(`${environment.apiUrl}/carrera/${carreraID}/semestres`);
  }

  buscarCarreraNombre(busqueda: string) {
    return this.http.get(`${environment.apiUrl}/carrera/buscar/nombre/${busqueda}`);
  }

  buscarCarreraFacultad(busqueda: string) {
    return this.http.get(`${environment.apiUrl}/carrera/buscar/facultad/${busqueda}`);
  }

  crearCarrera(carrera: CreateCarrera) {
    return this.http.post(`${environment.apiUrl}/carrera`, carrera);
  }

  actualizarCarrera(carrera: UpdateCarrera, carreraID: number) {
    return this.http.put(
      `${environment.apiUrl}/carrera/${carreraID}/actualizar`,
      carrera
    );
  }

  eliminarCarrera(carreraID: number) {
    return this.http.delete(`${environment.apiUrl}/carrera/${carreraID}`);
  }

  getAsignaturasPorCarrera(carreraID: number) {
    return this.http.get(`${environment.apiUrl}/carrera/${carreraID}/asignaturas`);
  }

  putPushAsignatura(carreraID: number, asignatura: AsignarAsignatura) {
    return this.http.put(
      `${environment.apiUrl}/carrera/${carreraID}/actualizar/asignatura/push`,
      asignatura
    );
  }

  putRemoveAsignatura(carreraID: number, asignaturaID: number) {
    return this.http.put(
      `${environment.apiUrl}/carrera/${carreraID}/actualizar/asignatura/remove`,
      { ID_asignatura: asignaturaID }
    );
  }

  putRemoveAsignaturasPorSemestre(carreraID: number, semestre: number) {
    return this.http.put(
      `${environment.apiUrl}/carrera/${carreraID}/asignaturas/semestre/remove`,
      { semestre }
    );
  }

  buscarAsignaturasPorNombre(nombre: string) {
    return this.http.get(
      `${environment.apiUrl}/asignaturas/buscar/nombre/${nombre}`
    );
  }

  buscarAsignaturasPorCodigo(codigo: string) {
    return this.http.get(
      `${environment.apiUrl}/asignaturas/buscar/codigo/${codigo}`
    );
  }
}