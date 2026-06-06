import { Injectable } from '@angular/core';
import { Oferta } from '../models/oferta';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  filtrarOfertas(lista: Oferta[], carrera: String, periodo: String): Oferta[] {
    return lista.filter(
      (oferta) =>
        oferta.carrera === carrera &&
        oferta.periodoAcademico === periodo &&
        oferta.asignatura.caracter === 'Obligatorio',
    );
  }

  filtrarElectivos(lista: Oferta[], carrera: String, periodo: String): Oferta[] {
    return lista.filter(
      (oferta) =>
        oferta.carrera === carrera &&
        oferta.periodoAcademico === periodo &&
        oferta.asignatura.caracter === 'Electivo',
    );
  }
}
