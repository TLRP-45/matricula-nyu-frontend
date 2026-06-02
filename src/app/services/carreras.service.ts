import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrera, Semestre } from '../models/carrera.model';

@Injectable({ providedIn: 'root' })
export class CarrerasService {
  private nextId = 10;

  private initial: Carrera[] = [
    {
      id: 1, nombre: 'Ingeniería Civil Informática', facultad: 'Ingeniería', duracion: '5',
      semestres: [
        { id: 1, num: 1, anio: '1° año', asignaturas: ['Cálculo I', 'Álgebra Lineal', 'Intro. Programación'] },
        { id: 2, num: 2, anio: '1° año', asignaturas: ['Cálculo II', 'Estructuras de Datos', 'Física I'] }
      ]
    },
    { id: 2, nombre: 'Medicina', facultad: 'Medicina', duracion: '6', semestres: [] },
    { id: 3, nombre: 'Derecho', facultad: 'Derecho', duracion: '5', semestres: [] }
  ];

  private subject = new BehaviorSubject<Carrera[]>([...this.initial]);

  getCarreras$(): Observable<Carrera[]> {
    return this.subject.asObservable();
  }

  addCarrera(c: Partial<Carrera>): Carrera {
    const newCarr: Carrera = {
      id: this.nextId++,
      nombre: (c.nombre || '').trim(),
      facultad: c.facultad || '',
      duracion: c.duracion || '',
      semestres: c.semestres || []
    };
    this.subject.next([...this.subject.getValue(), newCarr]);
    return newCarr;
  }

  updateCarrera(id: number, patch: Partial<Carrera>): void {
    const arr = this.subject.getValue().map(c => c.id === id ? { ...c, ...patch } : c);
    this.subject.next(arr);
  }

  deleteCarrera(id: number): void {
    const arr = this.subject.getValue().filter(c => c.id !== id);
    this.subject.next(arr);
  }

  addSemestre(carreraId: number, s: Semestre): void {
    const arr = this.subject.getValue().map(c => {
      if (c.id !== carreraId) return c;
      return { ...c, semestres: [...c.semestres, { ...s, id: this.nextId++ }] };
    });
    this.subject.next(arr);
  }

  updateSemestre(carreraId: number, semestreId: number, patch: Partial<Semestre>): void {
    const arr = this.subject.getValue().map(c => {
      if (c.id !== carreraId) return c;
      return {
        ...c,
        semestres: c.semestres.map(s => s.id === semestreId ? { ...s, ...patch } : s)
      };
    });
    this.subject.next(arr);
  }

  deleteSemestre(carreraId: number, semestreId: number): void {
    const arr = this.subject.getValue().map(c => {
      if (c.id !== carreraId) return c;
      return { ...c, semestres: c.semestres.filter(s => s.id !== semestreId) };
    });
    this.subject.next(arr);
  }
}
