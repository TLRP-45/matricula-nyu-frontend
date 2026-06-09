import { Injectable } from '@angular/core';

import { Asignatura } from '../models/asignatura';
import { Carrera } from '../models/carrera';
import { CARRERAS } from '../data/carreras.data';
import { ASIGNATURAS } from '../data/asignaturas.data';

@Injectable({
  providedIn: 'root',
})
export class AsignaturaService {
  carreras: Carrera[] = CARRERAS;
  asignaturas: Asignatura[] = ASIGNATURAS;

  obtenerAsignaturasFiltradas(carreraCodigo: string, semestreNumero: number): Asignatura[] {
    const carrera = this.carreras.find((c) => c.codigo === carreraCodigo);

    if (!carrera) {
      return [];
    }

    const semestre = carrera.semestres.find((s) => s.num === semestreNumero);

    if (!semestre) {
      return [];
    }

    return this.asignaturas.filter((a) => semestre.asignaturas.includes(a.codigo));
  }
}
