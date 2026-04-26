import { Grupo } from './grupo';

export interface Asignatura {
  codigo: string;
  nombre: string;
  tipo: 'obligatoria' | 'electivo';
  catedra?: Grupo[];
  taller?: Grupo[];
  laboratorio?: Grupo[];
  ubicaciones: {
    carrera: string;
    periodo: string;
  }[];
  requisitos: { codigo: string; nombre: string }[];
  inscrita: boolean;
}
