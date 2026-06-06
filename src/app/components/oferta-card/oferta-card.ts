import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertaGrupoVM } from '../../models/oferta-grupo-vm';

@Component({
  selector: 'app-oferta-card',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './oferta-card.html',

  styleUrl: './oferta-card.css',
})
export class OfertaCard {
  @Input() item!: OfertaGrupoVM;

  @Input() seleccionada: boolean = false;

  @Input() modo: 'panel' | 'horario' = 'panel';

  @Output() seleccionar = new EventEmitter<OfertaGrupoVM>();

  @Output() actualizado = new EventEmitter<void>();

  @Output() quitar = new EventEmitter<OfertaGrupoVM>();

  @Output()
  editar = new EventEmitter<OfertaGrupoVM>();

  @Output()
  eliminar = new EventEmitter<OfertaGrupoVM>();

  onSeleccionar(): void {
    this.seleccionar.emit(this.item);
  }

  editarOferta(event: Event): void {
    event.stopPropagation();

    this.editar.emit(this.item);
  }

  eliminarOferta(event: Event): void {
    event.stopPropagation();

    this.eliminar.emit(this.item);
  }
}
