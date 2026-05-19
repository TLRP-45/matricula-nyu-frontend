import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { OfertaCard } from '../oferta-card/oferta-card';
import { OfertaGrupoVM } from '../../models/oferta-grupo-vm';
import { Asignatura } from '../../models/asignatura';

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

  ngOnChanges() {
    console.log('PANEL RECIBIÓ:', this.ofertas);
  }

  esSeleccionada(item: OfertaGrupoVM): boolean {
    return this.ofertaSeleccionada?.grupo.id === item.grupo.id;
  }

  seleccionar(item: OfertaGrupoVM): void {
    this.seleccion.emit(item);
  }
}
