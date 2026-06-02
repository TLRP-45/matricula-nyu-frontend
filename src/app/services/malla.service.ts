import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asignatura } from '../pages/malla-curricular/malla-curricular';

@Injectable({ providedIn: 'root' })
export class MallaService {
  private subject = new BehaviorSubject<Asignatura[]>([]);

  constructor() {
    // leave empty; data can be pushed from fixtures or external API
  }

  setAsignaturas(list: Asignatura[]): void {
    this.subject.next(list);
  }

  getAsignaturas$(): Observable<Asignatura[]> {
    return this.subject.asObservable();
  }

  getAsignaturasSnapshot(): Asignatura[] {
    return this.subject.getValue();
  }
}
