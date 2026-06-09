import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { OfertaGrupoVM } from '../../models/oferta-grupo-vm';
import { Asignatura } from '../../models/asignatura';

import { OfertaCard } from '../oferta-card/oferta-card';

@Component({
  selector: 'app-panel-asignaturas',
  imports: [OfertaCard],
  templateUrl: './panel-asignaturas.html',
  styleUrl: './panel-asignaturas.css',
})
export class PanelAsignaturas {
  @Input() ofertas: OfertaGrupoVM[] = [];

  @Input() ofertaSeleccionada: OfertaGrupoVM | null = null;

  @Output() seleccion = new EventEmitter<OfertaGrupoVM>();
  @Output() nuevaOferta = new EventEmitter<Asignatura>();

  @Output() abrirSelector = new EventEmitter<void>();
  @Output() editar = new EventEmitter<OfertaGrupoVM>();
  @Output() eliminar = new EventEmitter<OfertaGrupoVM>();

  ofertasPanel: OfertaGrupoVM[] = [];

  ngOnChanges(): void {
    this.ofertasPanel = this.groupByGrupo(this.ofertas);
  }

  esSeleccionada(item: OfertaGrupoVM): boolean {
    return this.ofertaSeleccionada?.grupo.id === item.grupo.id;
  }

  seleccionar(item: OfertaGrupoVM): void {
    this.seleccion.emit(item);
  }

  groupByGrupo(vm: OfertaGrupoVM[]): OfertaGrupoVM[] {
    const map = new Map<string, OfertaGrupoVM>();

    for (const item of vm) {
      const key = item.grupo.id;

      if (!map.has(key)) {
        map.set(key, item);
      }
    }

    return Array.from(map.values());
  }

  onEditar(item: OfertaGrupoVM): void {
    this.editar.emit(item);
  }

  onEliminar(item: OfertaGrupoVM): void {
    this.eliminar.emit(item);
  }
}
