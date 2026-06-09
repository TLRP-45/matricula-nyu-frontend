import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BLOQUES_HORARIOS } from '../../../data/bloques-horarios.data';
import { ASIGNATURAS } from '../../../data/asignaturas.data';
import { OFERTAS } from '../../../data/ofertas.data';
import { CARRERAS } from '../../../data/carreras.data';
import { PERIODOS } from '../../../data/periodos.data';

import { Oferta } from '../../../models/oferta';
import { Asignatura } from '../../../models/asignatura';
import { Periodo } from '../../../models/periodo';
import { OfertaGrupoVM } from '../../../models/oferta-grupo-vm';

import { ToastService } from '../../../services/toast.service';
import { HorarioService } from '../../../services/horario.service';
import { OfertaAcademicaService } from '../../../services/oferta-academica.service';
import { AsignaturaService } from '../../../services/asignatura.service';

import { Horario } from '../../../components/horario/horario';
import { PanelAsignaturas } from '../../../components/panel-asignaturas/panel-asignaturas';
import { FiltrosAcademicos } from '../../../components/filtros-academicos/filtros-academicos';
import { ToastComponent } from '../../../components/toast/toast.component';
import { FormularioOferta } from '../../../components/formulario-oferta/formulario-oferta';

@Component({
  selector: 'app-oferta-academica',
  standalone: true,
  imports: [
    Horario,
    PanelAsignaturas,
    FiltrosAcademicos,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastComponent,
    FormularioOferta,
  ],
  templateUrl: './oferta-academica.html',
  styleUrl: './oferta-academica.css',
})
export class OfertaAcademica {
  horas = BLOQUES_HORARIOS;
  carreras = CARRERAS;
  periodos = PERIODOS;

  carreraSeleccionada!: string;

  periodoSeleccionado!: string;

  asignaturasDisponibles: Asignatura[] = ASIGNATURAS;

  ofertas: Oferta[] = OFERTAS;

  ofertasDisponibles: OfertaGrupoVM[] = [];

  ofertasEnHorario: OfertaGrupoVM[] = [];

  ofertasFiltradas: OfertaGrupoVM[] = [];

  ofertaGrupoEditando: OfertaGrupoVM | null = null;

  asignaturaSeleccionada: Asignatura | null = null;

  ofertaSeleccionada: OfertaGrupoVM | null = null;

  semestreSeleccionado!: number | null;

  ofertaEnEdicion: Oferta | null = null;

  mostrarFormularioOferta = false;

  mostrarSelectorAsignaturas = false;
  mostrarConfirmacionEliminar = false;

  nombreOfertaEliminar = '';
  grupoOfertaEliminar = '';

  periodoEditando!: Periodo;

  periodoEditandoForm = {
    fechaInicio: '',
    fechaTermino: '',
  };

  constructor(
    private toastService: ToastService,
    private horarioService: HorarioService,
    private ofertaAcademicaService: OfertaAcademicaService,
    private asignaturaService: AsignaturaService,
  ) {}

  onFiltroChange(event: { carrera: string; periodo: string; semestre: number | null }): void {
    this.carreraSeleccionada = event.carrera;

    this.periodoSeleccionado = event.periodo;

    this.semestreSeleccionado = event.semestre;

    this.actualizarVista();

    this.limpiarHorario();
  }

  private limpiarHorario(): void {
    this.ofertasEnHorario = [];
  }

  actualizarVista(): void {
    this.ofertasDisponibles = this.ofertaAcademicaService.obtenerOfertasFiltradas(
      this.ofertas,
      this.carreraSeleccionada,
      this.periodoSeleccionado,
    );
  }

  seleccionarOferta(item: OfertaGrupoVM): void {
    this.ofertaSeleccionada = item;
  }

  get asignaturasFiltradas(): Asignatura[] {
    return this.asignaturaService.obtenerAsignaturasFiltradas(
      this.carreraSeleccionada,
      this.semestreSeleccionado ?? 1,
    );
  }

  abrirNuevaOferta(asignatura: Asignatura): void {
    this.ofertaGrupoEditando = null;
    this.inicializarOferta(asignatura);
    this.mostrarFormularioOferta = true;
  }

  private inicializarOferta(asignatura: Asignatura): void {
    this.asignaturaSeleccionada = asignatura;
    this.mostrarSelectorAsignaturas = false;

    this.ofertaEnEdicion = {
      id: crypto.randomUUID(),
      periodoAcademico: this.periodoSeleccionado,
      carrera: this.carreraSeleccionada,
      asignatura: asignatura,
      grupos: {
        catedra: [],
        taller: [],
        laboratorio: [],
      },
      inscrita: false,
    };
  }

  guardarOferta(oferta: Oferta): void {
    const gruposNuevos = [
      ...oferta.grupos.catedra,
      ...oferta.grupos.taller,
      ...oferta.grupos.laboratorio,
    ];

    const existe = this.ofertas.some((o) => {
      if (
        o.id === oferta.id ||
        o.carrera !== oferta.carrera ||
        o.periodoAcademico !== oferta.periodoAcademico ||
        o.asignatura.codigo !== oferta.asignatura.codigo
      ) {
        return false;
      }

      const gruposExistentes = [...o.grupos.catedra, ...o.grupos.taller, ...o.grupos.laboratorio];

      return gruposNuevos.some((gNuevo) =>
        gruposExistentes.some(
          (gExistente) => gNuevo.tipo === gExistente.tipo && gNuevo.letra === gExistente.letra,
        ),
      );
    });

    if (existe) {
      this.toastService.error('Ya existe un grupo con ese tipo y letra para esta asignatura');
      return;
    }

    if (this.ofertaGrupoEditando) {
      this.actualizarOfertaExistente(oferta);

      this.toastService.show('Oferta actualizada correctamente', 'success');
    } else {
      this.ofertas = [...this.ofertas, oferta];
      const nuevosItems = this.ofertaAcademicaService.construirOfertaGrupoVM([oferta]);

      this.ofertasDisponibles = [...this.ofertasDisponibles, ...nuevosItems];
      this.toastService.show('Oferta creada correctamente', 'success');
    }

    this.cerrarFormularioOferta();
    this.ofertaGrupoEditando = null;
  }

  private actualizarOfertaExistente(ofertaActualizada: Oferta): void {
    const index = this.ofertas.findIndex((o) => o.id === ofertaActualizada.id);

    if (index === -1) {
      return;
    }

    this.ofertas[index] = ofertaActualizada;

    this.ofertas = [...this.ofertas];

    this.actualizarVista();
  }

  agregarAlHorario(item: OfertaGrupoVM): void {
    const resultado = this.horarioService.agregarAlHorario(
      this.ofertasDisponibles,
      this.ofertasEnHorario,
      item,
    );

    if (!resultado) {
      this.toastService.show('El grupo ya está en el horario', 'danger');

      return;
    }

    this.ofertasDisponibles = resultado.disponibles;

    this.ofertasEnHorario = resultado.horario;
  }

  quitarDelHorario(item: OfertaGrupoVM): void {
    const resultado = this.horarioService.quitarDelHorario(
      this.ofertasDisponibles,
      this.ofertasEnHorario,
      item,
    );

    this.ofertasDisponibles = resultado.disponibles;

    this.ofertasEnHorario = resultado.horario;

    if (this.ofertaSeleccionada?.grupo.id === item.grupo.id) {
      this.ofertaSeleccionada = null;
    }
  }

  cerrarFormularioOferta(): void {
    this.mostrarFormularioOferta = false;
  }

  editarOferta(item: OfertaGrupoVM): void {
    this.ofertaGrupoEditando = item;

    this.ofertaEnEdicion = {
      ...item.oferta,
    };

    this.mostrarFormularioOferta = true;
  }

  eliminarOferta(): void {
    const id = this.ofertaEnEdicion?.id;

    this.ofertas = this.ofertas.filter((x) => x.id !== id);

    this.ofertasDisponibles = this.ofertasDisponibles.filter((x) => x.oferta.id !== id);

    this.toastService.show('Oferta eliminada', 'success');
    this.mostrarConfirmacionEliminar = false;
  }

  preguntarEliminar(item: OfertaGrupoVM): void {
    this.ofertaGrupoEditando = item;
    this.ofertaEnEdicion = { ...item.oferta };
    this.nombreOfertaEliminar = this.ofertaEnEdicion.asignatura.nombre;
    this.grupoOfertaEliminar =
      this.ofertaGrupoEditando.grupo.tipo + ' ' + this.ofertaGrupoEditando.grupo.letra;
    this.mostrarConfirmacionEliminar = true;
  }

  publicarOferta() {
    const carreraEncontrada = this.carreras.find((c) => c.codigo === this.carreraSeleccionada);
    const nombreCarrera = carreraEncontrada?.nombre;
    const periodoEncontrado = this.periodos.find((c) => c.codigo === this.periodoSeleccionado);
    const nombrePeriodo = periodoEncontrado?.nombre;

    if (carreraEncontrada && periodoEncontrado) {
      this.toastService.success(
        `Oferta publicada para la carrera ${nombreCarrera} en el periodo ${nombrePeriodo}`,
      );
    }
    return;
  }
}
