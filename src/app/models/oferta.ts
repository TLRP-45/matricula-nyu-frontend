import { Asignatura } from './asignatura';
import { Grupo } from './grupo';
export interface Oferta {
  id: string;

  periodoAcademico: string;

  carrera: string;

  asignatura: Asignatura;

  grupos: {
    catedra: Grupo[];
    taller: Grupo[];
    laboratorio: Grupo[];
  };

  inscrita?: boolean;
}
