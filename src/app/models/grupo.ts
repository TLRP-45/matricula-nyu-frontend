import { HorarioGrupo } from './horario-grupo';
export interface Grupo {
  id: string;

  tipo: 'catedra' | 'taller' | 'laboratorio';

  letra: string;

  profesor: string;

  cupos: number;

  horarios: HorarioGrupo[];

  seleccionado: boolean;
}
