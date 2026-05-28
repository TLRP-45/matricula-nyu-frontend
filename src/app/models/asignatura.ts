export interface Asignatura {
  codigo: string;

  nombre: string;

  tipo: 'obligatoria' | 'electivo';

  ubicaciones: {
    carrera: string;
    periodo: string;
  }[];

  requisitos: {
    codigo: string;
    nombre: string;
  }[];
}
