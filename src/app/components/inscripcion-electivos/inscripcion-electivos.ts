import { Component, Input } from '@angular/core';
import { Oferta } from '../../models/oferta';
import { Grupo } from '../../models/grupo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscripcion-electivos',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './inscripcion-electivos.html',
  styleUrl: './inscripcion-electivos.css',
})
export class InscripcionElectivos {
  @Input()
  electivos: Oferta[] = [];

  @Input()
  puedeInscribirsePeriodo!: () => boolean;

  @Input()
  cumpleRequisitos!: (oferta: Oferta) => boolean;

  @Input()
  getGrupoSeleccionado!: (grupos?: Grupo[]) => Grupo | undefined;

  @Input()
  onSelectChange!: (grupos: Grupo[], event: Event) => void;
}
