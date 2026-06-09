import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OFERTAS } from '../../data/ofertas.data';
import { CARRERAS } from '../../data/carreras.data';
import { PERIODOS } from '../../data/periodos.data';

import { Grupo } from '../../models/grupo';
import { Carrera } from '../../models/carrera';
import { Periodo } from '../../models/periodo';
import { Oferta } from '../../models/oferta';

import { InscripcionElectivos } from '../inscripcion-electivos/inscripcion-electivos';
import { Inscripcion } from '../../services/inscripcion';
import { InscripcionService } from '../../services/inscripcion.service';
import { FiltrosAcademicos } from '../filtros-academicos/filtros-academicos';

@Component({
  selector: 'app-inscripcion-asignaturas',
  standalone: true,
  imports: [CommonModule, FormsModule, InscripcionElectivos, FiltrosAcademicos],
  templateUrl: './inscripcion-asignaturas.html',
  styleUrl: './inscripcion-asignaturas.css',
})
export class InscripcionAsignaturas {
  constructor(
    private inscripcionServ: Inscripcion,
    private inscripcionService: InscripcionService,
  ) {}

  periodoActual = '2026-1';

  ofertas: Oferta[] = OFERTAS;
  carreras: Carrera[] = CARRERAS;
  periodos: Periodo[] = PERIODOS;

  carreraSeleccionada!: string;
  periodoSeleccionado!: string;
  ofertasFiltradas: Oferta[] = [];
  electivosFiltrados: Oferta[] = [];
  asignaturasAprobadas: string[] = ['MAT101'];
  mostrarElectivos = false;

  ngOnInit() {
    this.ofertas.forEach((oferta) => {
      if (oferta.grupos.catedra?.length && !this.getGrupoSeleccionado(oferta.grupos.catedra)) {
        oferta.grupos.catedra[0].seleccionado = true;
      }

      if (oferta.grupos.taller?.length && !this.getGrupoSeleccionado(oferta.grupos.taller)) {
        oferta.grupos.taller[0].seleccionado = true;
      }

      if (
        oferta.grupos.laboratorio?.length &&
        !this.getGrupoSeleccionado(oferta.grupos.laboratorio)
      ) {
        oferta.grupos.laboratorio[0].seleccionado = true;
      }
    });

    if (this.carreras.length) {
      this.carreraSeleccionada = this.carreras[0].codigo;
    }

    if (this.periodos.length) {
      this.periodoSeleccionado = this.periodos[0].codigo;
    }

    this.ofertasFiltradas = this.inscripcionService.filtrarOfertas(
      this.ofertas,
      this.carreraSeleccionada,
      this.periodoSeleccionado,
    );

    this.electivosFiltrados = this.inscripcionService.filtrarElectivos(
      this.ofertas,
      this.carreraSeleccionada,
      this.periodoSeleccionado,
    );

    this.cargarInscripcionGuardada();
  }

  toggleElectivos() {
    this.mostrarElectivos = !this.mostrarElectivos;
  }

  onSelectChange(grupos: Grupo[], event: Event) {
    const grupoId = (event.target as HTMLSelectElement).value;

    const seleccionado = grupos.find((g) => g.id === grupoId);

    if (!seleccionado || seleccionado.cupos === 0) {
      return;
    }

    this.toggleGrupo(grupos, seleccionado);
  }

  toggleGrupo(lista: Grupo[], seleccionado: Grupo) {
    lista.forEach((g) => (g.seleccionado = false));
    seleccionado.seleccionado = true;
  }

  onFiltroChange(event: { carrera: string; periodo: string }): void {
    this.carreraSeleccionada = event.carrera;

    this.periodoSeleccionado = event.periodo;

    this.ofertasFiltradas = this.inscripcionService.filtrarOfertas(
      this.ofertas,
      this.carreraSeleccionada,
      this.periodoSeleccionado,
    );

    this.electivosFiltrados = this.inscripcionService.filtrarElectivos(
      this.ofertas,
      this.carreraSeleccionada,
      this.periodoSeleccionado,
    );

    this.limpiarEstadoInscripcion();

    this.cargarInscripcionGuardada();
  }

  limpiarEstadoInscripcion(): void {
    this.ofertas.forEach((oferta: Oferta) => {
      oferta.inscrita = false;

      oferta.grupos.catedra?.forEach((g: Grupo) => {
        g.seleccionado = false;
      });

      oferta.grupos.taller?.forEach((g: Grupo) => {
        g.seleccionado = false;
      });

      oferta.grupos.laboratorio?.forEach((g: Grupo) => {
        g.seleccionado = false;
      });

      if (oferta.grupos.catedra?.length) {
        oferta.grupos.catedra[0].seleccionado = true;
      }

      if (oferta.grupos.taller?.length) {
        oferta.grupos.taller[0].seleccionado = true;
      }

      if (oferta.grupos.laboratorio?.length) {
        oferta.grupos.laboratorio[0].seleccionado = true;
      }
    });
  }

  cargarInscripcionGuardada(): void {
    if (!this.carreraSeleccionada || !this.periodoSeleccionado) {
      return;
    }

    const key = `inscripcion_${this.carreraSeleccionada}_` + `${this.periodoSeleccionado}`;

    const guardado = localStorage.getItem(key);

    if (!guardado) {
      return;
    }

    const inscripcion = JSON.parse(guardado);

    this.restaurarInscripcion(inscripcion);
  }

  restaurarInscripcion(inscripciones: any[]): void {
    const todas = this.ofertas;

    inscripciones.forEach((i: any) => {
      const oferta = todas.find((o: Oferta) => o.id === i.idOferta);

      if (!oferta) {
        return;
      }

      oferta.inscrita = true;

      i.grupos.forEach((g: any) => {
        let lista: Grupo[] | undefined;

        if (g.tipo === 'catedra') {
          lista = oferta.grupos.catedra;
        }

        if (g.tipo === 'taller') {
          lista = oferta.grupos.taller;
        }

        if (g.tipo === 'laboratorio') {
          lista = oferta.grupos.laboratorio;
        }

        if (!lista) {
          return;
        }

        lista.forEach((grupo: Grupo) => {
          grupo.seleccionado = false;
        });

        const elegido = lista.find((grupo: Grupo) => grupo.id === g.id);

        if (elegido) {
          elegido.seleccionado = true;
        }
      });
    });
  }

  guardar() {
    /* if (!this.validarInscripcion()) return;

    const data = this.obtenerSeleccionFinal();

    this.inscripcionService.guardar(data).subscribe({
      next: () => {
        alert('Inscripción guardada');
      },
      error: () => {
        alert('Error al guardar');
      },
    });*/
  }

  validarInscripcion(): boolean {
    const todas = this.ofertas;

    const inscritas = todas.filter((o: Oferta) => o.inscrita);

    const electivos = inscritas.filter((o: Oferta) => o.asignatura.caracter === 'Electivo');

    if (inscritas.length === 0) {
      alert('Debes seleccionar al menos una asignatura');
      return false;
    }

    if (inscritas.length > 6) {
      alert('Máximo 6 asignaturas permitidas');
      return false;
    }

    if (electivos.length > 2) {
      alert('Máximo 2 electivos permitidos');
      return false;
    }

    const sinCupos = inscritas.some((oferta: Oferta) => {
      const gruposSeleccionados = [
        this.getGrupoSeleccionado(oferta.grupos.catedra),

        this.getGrupoSeleccionado(oferta.grupos.taller),

        this.getGrupoSeleccionado(oferta.grupos.laboratorio),
      ];

      return gruposSeleccionados.some((grupo) => grupo?.cupos === 0);
    });

    if (sinCupos) {
      alert('Hay grupos sin cupos disponibles');
      return false;
    }

    return true;
  }

  obtenerSeleccionFinal() {
    const todas = [...this.ofertasFiltradas, ...this.electivosFiltrados];

    return todas

      .filter((oferta: Oferta) => oferta.inscrita)

      .map((oferta: Oferta) => {
        const construirGrupo = (tipo: string, grupo?: Grupo) =>
          grupo
            ? {
                id: grupo.id,

                tipo,

                letra: grupo.letra,

                profesor: grupo.profesor,
              }
            : null;

        return {
          idOferta: oferta.id,

          codigoAsignatura: oferta.asignatura.codigo,

          nombreAsignatura: oferta.asignatura.nombre,

          tipo: oferta.asignatura.caracter,

          grupos: [
            construirGrupo('catedra', this.getGrupoSeleccionado(oferta.grupos.catedra)),

            construirGrupo('taller', this.getGrupoSeleccionado(oferta.grupos.taller)),

            construirGrupo('laboratorio', this.getGrupoSeleccionado(oferta.grupos.laboratorio)),
          ].filter((g) => g !== null),
        };
      });
  }

  actualizarCupos(idOferta: string, grupo: any, delta: number): void {
    const oferta = this.ofertas.find((o: Oferta) => o.id === idOferta);

    if (!oferta) {
      return;
    }

    let lista: Grupo[] | undefined;

    if (grupo.tipo === 'catedra') {
      lista = oferta.grupos.catedra;
    }

    if (grupo.tipo === 'taller') {
      lista = oferta.grupos.taller;
    }

    if (grupo.tipo === 'laboratorio') {
      lista = oferta.grupos.laboratorio;
    }

    const encontrado = lista?.find((g: Grupo) => g.id === grupo.id);

    if (encontrado) {
      encontrado.cupos += delta;
    }
  }

  getGrupoSeleccionado(grupos?: Grupo[]): Grupo | undefined {
    return grupos?.find((g: Grupo) => g.seleccionado);
  }

  puedeInscribirsePeriodo(): boolean {
    return this.periodoSeleccionado === this.periodoActual;
  }

  cumpleRequisitos(oferta: Oferta): boolean {
    return oferta.asignatura.requisitos.every((r) => this.asignaturasAprobadas.includes(r.codigo));
  }
}
