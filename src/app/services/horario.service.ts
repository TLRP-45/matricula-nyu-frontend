import { Injectable } from '@angular/core';
import { BloqueHorario } from '../models/bloque-horario';
import { HorarioGrupo } from '../models/horario-grupo';
import { BLOQUES_HORARIOS } from '../data/bloques-horarios.data';
import { OfertaGrupoVM } from '../models/oferta-grupo-vm';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  actualizarBloqueHorario(horario: HorarioGrupo): void {
    const bloque = BLOQUES_HORARIOS.find((b) => b.horaInicio === horario.horaInicio);

    if (!bloque) return;

    horario.horaFin = bloque.horaFin;
  }

  agregarHorario(horarios: HorarioGrupo[], bloques: BloqueHorario[]): HorarioGrupo {
    let bloque = bloques[0];

    if (horarios.length > 0) {
      const ultimo = horarios[horarios.length - 1];

      const index = bloques.findIndex((h) => h.horaInicio === ultimo.horaInicio);

      bloque = bloques[(index + 1) % bloques.length];
    }

    return {
      dia: 'Lunes',
      horaInicio: bloque.horaInicio,
      horaFin: bloque.horaFin,
    };
  }

  calcularFin(inicio: string): string {
    const [h, m] = inicio.split(':').map(Number);

    const date = new Date();
    date.setHours(h, m + 90); // ejemplo 1h30

    return date.toTimeString().slice(0, 5);
  }

  agregarAlHorario(disponibles: OfertaGrupoVM[], horario: OfertaGrupoVM[], item: OfertaGrupoVM) {
    const grupoId = item.grupo.id;

    const yaExiste = horario.some((x) => x.grupo.id === grupoId);

    if (yaExiste) {
      return null;
    }

    const itemsGrupo = disponibles.filter((x) => x.grupo.id === grupoId);

    return {
      disponibles: disponibles.filter((x) => x.grupo.id !== grupoId),

      horario: [...horario, ...itemsGrupo],
    };
  }

  quitarDelHorario(disponibles: OfertaGrupoVM[], horario: OfertaGrupoVM[], item: OfertaGrupoVM) {
    const grupoId = item.grupo.id;

    const itemsGrupo = horario.filter((x) => x.grupo.id === grupoId);

    return {
      disponibles: [...disponibles, ...itemsGrupo],
      horario: horario.filter((x) => x.grupo.id !== grupoId),
    };
  }

  hayHorariosDuplicados(horarios: HorarioGrupo[]): string | null {
    const usados = new Set<string>();

    for (const h of horarios) {
      const key = `${h.dia}-${h.horaInicio}`;

      if (usados.has(key)) {
        return `${h.dia} ${h.horaInicio}`;
      }

      usados.add(key);
    }

    return null;
  }
}
