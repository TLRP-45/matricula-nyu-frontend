import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Oferta } from '../../models/oferta';
import { OfertaGrupoVM } from '../../models/oferta-grupo-vm';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { OfertaCard } from '../oferta-card/oferta-card';
import { BloqueHorario } from '../../models/bloque-horario';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [DragDropModule, CommonModule, OfertaCard],
  templateUrl: './horario.html',
  styleUrl: './horario.css',
})
export class Horario {
  @Input()
  ofertas: OfertaGrupoVM[] = [];

  @Input() ofertaSeleccionada: OfertaGrupoVM | null = null;

  @Output()
  eliminarOferta = new EventEmitter<OfertaGrupoVM>();

  dropListIds: string[] = [];

  ofertasFiltradas: OfertaGrupoVM[] = [];

  panelAsignaturas: Oferta[] = [];

  carreraSeleccionada!: string;
  periodoSeleccionado!: string;

  celdasHorario: Record<string, OfertaGrupoVM[]> = {};

  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  horas: BloqueHorario[] = [
    {
      id: '08:00',

      horaInicio: '08:00',

      horaFin: '09:30',
    },

    {
      id: '09:40',

      horaInicio: '09:40',

      horaFin: '11:10',
    },
    {
      id: '11:20',

      horaInicio: '11:20',

      horaFin: '12:50',
    },
    {
      id: '13:00',

      horaInicio: '13:00',

      horaFin: '14:30',
    },
    {
      id: '14:45',

      horaInicio: '14:45',

      horaFin: '16:15',
    },
    {
      id: '16:20',

      horaInicio: '16:20',

      horaFin: '17:50',
    },
    {
      id: '17:55',

      horaInicio: '17:55',

      horaFin: '19:25',
    },
    {
      id: '19:30',

      horaInicio: '19:30',

      horaFin: '21:00',
    },
    {
      id: '21:05',

      horaInicio: '21:05',

      horaFin: '22:35',
    },
    {
      id: '22:45',

      horaInicio: '22:45',

      horaFin: '00:15',
    },
  ];

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

    console.log('ANTES', item.horario);

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

    console.log('DESPUÉS', item.horario);

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
