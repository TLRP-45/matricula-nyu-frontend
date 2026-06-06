import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

import { DIAS_SEMANA } from '../../data/dias-semana.data';
import { BLOQUES_HORARIOS } from '../../data/bloques-horarios.data';

import { Oferta } from '../../models/oferta';
import { OfertaGrupoVM } from '../../models/oferta-grupo-vm';
import { BloqueHorario } from '../../models/bloque-horario';

import { OfertaCard } from '../oferta-card/oferta-card';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [DragDropModule, CommonModule, OfertaCard],
  templateUrl: './horario.html',
  styleUrl: './horario.css',
})
export class Horario {
  @Input() ofertas: OfertaGrupoVM[] = [];

  @Input() ofertaSeleccionada: OfertaGrupoVM | null = null;

  @Output()
  eliminarOferta = new EventEmitter<OfertaGrupoVM>();

  dropListIds: string[] = [];

  ofertasFiltradas: OfertaGrupoVM[] = [];

  panelAsignaturas: Oferta[] = [];

  celdasHorario: Record<string, OfertaGrupoVM[]> = {};

  dias = DIAS_SEMANA;

  horas: BloqueHorario[] = BLOQUES_HORARIOS;

  ngOnInit(): void {
    this.construirHorario();
    this.dropListIds = [];

    for (const dia of this.dias) {
      for (const hora of this.horas) {
        this.dropListIds.push(`${dia}-${hora.horaInicio}`);
      }
    }
  }

  ngOnChanges(): void {
    this.construirHorario();
  }

  obtenerGruposEnBloque(dia: string, horaInicio: string): OfertaGrupoVM[] {
    return this.ofertas.filter((item: OfertaGrupoVM) =>
      item.grupo.horarios.some((h) => h.dia === dia && h.horaInicio === horaInicio),
    );
  }

  seleccionarOferta(item: OfertaGrupoVM): void {
    this.ofertaSeleccionada = item;
  }

  quitarDelHorario(item: OfertaGrupoVM): void {
    this.eliminarOferta.emit(item);
  }

  onDrop(event: CdkDragDrop<any>): void {
    if (!event.isPointerOverContainer) {
      return;
    }

    const item = event.item.data as OfertaGrupoVM;

    const element = event.container.element.nativeElement;

    const dia = element.dataset['dia'];

    const horaInicio = element.dataset['horaInicio'];

    const horaFin = element.dataset['horaFin'];

    if (!dia || !horaInicio || !horaFin) {
      return;
    }

    item.horario.dia = dia;

    item.horario.horaInicio = horaInicio;

    item.horario.horaFin = horaFin;

    this.construirHorario();
  }

  construirHorario(): void {
    this.celdasHorario = {};

    for (const dia of this.dias) {
      for (const hora of this.horas) {
        const key = `${dia}-${hora.horaInicio}`;

        this.celdasHorario[key] = [];
      }
    }

    for (const item of this.ofertas) {
      const key = `${item.horario.dia}-${item.horario.horaInicio}`;

      if (!this.celdasHorario[key]) {
        this.celdasHorario[key] = [];
      }

      this.celdasHorario[key].push(item);
    }

    this.celdasHorario = {
      ...this.celdasHorario,
    };
  }
}
