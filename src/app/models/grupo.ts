export interface Grupo {
  codigoAsignatura: string;
  tipo: 'catedra' | 'taller' | 'laboratorio';
  letra: string;
  profesor: string;
  cupos: number;
  seleccionado: boolean;
}
