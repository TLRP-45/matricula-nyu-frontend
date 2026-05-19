import { Oferta } from './oferta';
import { Grupo } from './grupo';
import { HorarioGrupo } from './horario-grupo';

export interface OfertaGrupoVM {
  oferta: Oferta;

  grupo: Grupo;

  horario: HorarioGrupo;
}
