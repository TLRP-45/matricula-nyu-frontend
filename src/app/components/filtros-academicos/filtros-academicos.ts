import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CARRERAS } from '../../data/carreras.data';
import { PERIODOS } from '../../data/periodos.data';

import { Carrera } from '../../models/carrera';
import { Periodo } from '../../models/periodo';

import { PeriodoService } from '../../services/periodo.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-filtros-academicos',
  imports: [FormsModule, DatePipe],
  templateUrl: './filtros-academicos.html',
  styleUrl: './filtros-academicos.css',
  standalone: true,
})
export class FiltrosAcademicos {
  carreras: Carrera[] = CARRERAS;
  periodos: Periodo[] = PERIODOS;

  carreraSeleccionada!: string;

  periodoSeleccionado!: string;

  semestreSeleccionado: number | null = 1;

  @Input() autorizado!: boolean;
  @Input() semestre!: boolean;

  @Output() cambio = new EventEmitter<{
    carrera: string;
    periodo: string;
    semestre: number | null;
  }>();

  periodoEditando!: Periodo;
  periodoEditandoForm = {
    fechaInicio: '',
    fechaTermino: '',
  };
  mostrarModalPeriodo = false;

  numeros: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  constructor(
    private periodoService: PeriodoService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.inicializarFiltros();
    this.onChange();
  }

  onChange(): void {
    this.cambio.emit({
      carrera: this.carreraSeleccionada,
      periodo: this.periodoSeleccionado,
      semestre: this.semestreSeleccionado,
    });
  }

  private inicializarFiltros(): void {
    const carreraDefault = this.carreras[0];

    const periodoDefault = this.periodos.find((p) => p.activo);

    this.carreraSeleccionada = carreraDefault?.codigo ?? '';

    this.periodoSeleccionado = periodoDefault?.codigo ?? this.periodos[0]?.codigo ?? '';
    this.semestreSeleccionado = 1;
  }

  get periodoActual(): Periodo | undefined {
    return this.periodos.find((p) => p.codigo === this.periodoSeleccionado);
  }

  get fechaMaxima(): string {
    return this.periodoService.obtenerFechaMaxima(this.periodoEditandoForm.fechaInicio);
  }

  abrirEditarPeriodo(): void {
    const periodo = this.periodos.find((p) => p.codigo === this.periodoSeleccionado);

    if (!periodo) return;

    this.periodoEditando = { ...periodo };

    this.periodoEditandoForm = {
      fechaInicio: this.periodoService.formatearFechaInput(periodo.fechaInicio),

      fechaTermino: this.periodoService.formatearFechaInput(periodo.fechaTermino),
    };

    this.mostrarModalPeriodo = true;
  }

  guardarPeriodo(): void {
    this.periodoEditando.fechaInicio = this.periodoService.parseFecha(
      this.periodoEditandoForm.fechaInicio,
    );

    this.periodoEditando.fechaTermino = this.periodoService.parseFecha(
      this.periodoEditandoForm.fechaTermino,
    );

    const error = this.periodoService.validarPeriodo(
      this.periodoEditando.fechaInicio,
      this.periodoEditando.fechaTermino,
    );

    if (error) {
      this.toastService.show(error, 'danger');
      this;

      return;
    }

    const index = this.periodos.findIndex((p) => p.codigo === this.periodoEditando.codigo);

    if (index === -1) return;

    this.periodos[index] = {
      ...this.periodoEditando,
    };

    this.periodos = [...this.periodos];

    this.mostrarModalPeriodo = false;

    this.toastService.show('Período actualizado correctamente', 'success');
  }
}
