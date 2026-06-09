import { Semestre } from './semestre';

export interface Carrera {
  id: number;
  codigo: string;
  nombre: string;
  facultad: string;
  duracion: string;
  semestres: Semestre[];
}
