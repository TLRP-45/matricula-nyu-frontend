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

  expandida = false;

  editando = false;

  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  bloquesHorario = [
    {
      inicio: '08:00',
      fin: '09:30',
    },

    {
      inicio: '09:40',
      fin: '11:10',
    },

    {
      inicio: '11:20',
      fin: '12:50',
    },

    {
      inicio: '13:00',
      fin: '14:30',
    },

    {
      inicio: '14:40',
      fin: '16:10',
    },

    {
      inicio: '16:20',
      fin: '17:50',
    },
  ];

  formulario = {
    profesor: '',
    cupos: 0,
    dia: '',
    horaInicio: '',
    horaFin: '',
  };

  toggleExpandir(event: Event): void {
    event.stopPropagation();

    if (!this.expandida) {
      this.cargarFormulario();
    }

    this.expandida = !this.expandida;
  }

  onHoraInicioChange(index: number, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    const bloque = this.bloquesHorario.find((x) => x.inicio === value);

    if (!bloque) return;

    this.item.grupo.horarios[index].horaInicio = bloque.inicio;

    this.item.grupo.horarios[index].horaFin = bloque.fin;

    this.actualizado.emit();
  }

  actualizarProfesor(event: Event): void {
    this.item.grupo.profesor = (event.target as HTMLInputElement).value;
  }

  actualizarCupos(event: Event): void {
    this.item.grupo.cupos = Number((event.target as HTMLInputElement).value);
  }

  actualizarHorario(index: number, campo: 'dia' | 'horaInicio' | 'horaFin', event: Event): void {
    this.item.grupo.horarios[index][campo] = (event.target as HTMLInputElement).value;
  }

  onSeleccionar(): void {
    this.seleccionar.emit(this.item);
  }

  cargarFormulario(): void {
    const horario = this.item.grupo.horarios[0];

    this.formulario = {
      profesor: this.item.grupo.profesor,

      cupos: this.item.grupo.cupos,

      dia: horario.dia,

      horaInicio: horario.horaInicio,

      horaFin: horario.horaFin,
    };
  }
}
