export interface Asignatura {
  codigo: string;

  nombre: string;

  caracter: 'Obligatorio' | 'Electivo';

  creditos: number;

  horasPresenciales: number;

  horasAutonomas: number;

  requisitos: {
    codigo: string;
    nombre: string;
  }[];
}
