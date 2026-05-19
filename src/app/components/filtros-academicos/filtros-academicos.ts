import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { Periodo } from '../../models/periodo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros-academicos',
  imports: [FormsModule],
  templateUrl: './filtros-academicos.html',
  styleUrl: './filtros-academicos.css',
  standalone: true,
})
export class FiltrosAcademicos {
  @Input() carreras: Carrera[] = [];
  @Input() periodos: Periodo[] = [];
  @Output() cambio = new EventEmitter<{
    carrera: string;
    periodo: string;
  }>();

  carreraSeleccionada!: string;
  periodoSeleccionado!: string;

  onChange(): void {
    this.cambio.emit({
      carrera: this.carreraSeleccionada,
      periodo: this.periodoSeleccionado,
    });
  }
}
