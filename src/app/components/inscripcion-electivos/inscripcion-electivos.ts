import { Component, Input } from '@angular/core';
import { Asignatura } from '../../models/asignatura';
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
  @Input() electivos: Asignatura[] = [];
  @Input() puedeInscribirsePeriodo!: () => boolean;
  @Input() cumpleRequisitos!: (a: Asignatura) => boolean;
  @Input() getGrupoSeleccionado!: Function;
  @Input() onSelectChange!: Function;
}
