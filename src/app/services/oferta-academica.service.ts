import { Injectable } from '@angular/core';
import { OfertaGrupoVM } from '../models/oferta-grupo-vm';
import { Oferta } from '../models/oferta';
import { Grupo } from '../models/grupo';
import { HorarioGrupo } from '../models/horario-grupo';

@Injectable({
  providedIn: 'root',
})
export class OfertaAcademicaService {
  obtenerOfertasFiltradas(ofertas: Oferta[], carrera: string, periodo: string): OfertaGrupoVM[] {
    const ofertasFiltradas = ofertas.filter(
      (o) => o.carrera === carrera && o.periodoAcademico === periodo,
    );

    return this.construirOfertaGrupoVM(ofertasFiltradas);
  }

  construirOfertaGrupoVM(ofertas: Oferta[]): OfertaGrupoVM[] {
    const resultado: OfertaGrupoVM[] = [];

    for (const oferta of ofertas) {
      const grupos = [
        ...(oferta.grupos.catedra || []),
        ...(oferta.grupos.taller || []),
        ...(oferta.grupos.laboratorio || []),
      ];

      for (const grupo of grupos) {
        for (const horario of grupo.horarios) {
          resultado.push({
            oferta,
            grupo,
            horario,
          });
        }
      }
    }

    return resultado;
  }

  crearGrupo(value: any, horarios: HorarioGrupo[]): Grupo {
    return {
      id: crypto.randomUUID(),
      tipo: value.tipo,
      letra: value.letra,
      profesor: value.profesor,
      cupos: value.cupos,
      horarios: horarios.map((h) => ({ ...h })),
      seleccionado: false,
    };
  }

  crearOferta(ofertaBase: Oferta, grupo: Grupo, tipo: string): Oferta {
    return {
      ...ofertaBase,
      grupos: {
        catedra: [],
        taller: [],
        laboratorio: [],
        [tipo]: [grupo],
      },
    };
  }
}
