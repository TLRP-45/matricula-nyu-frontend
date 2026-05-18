import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grupo } from '../../models/grupo';
import { Asignatura } from '../../models/asignatura';
import { Carrera } from '../../models/carrera';
import { Periodo } from '../../models/periodo';
import { InscripcionElectivos } from '../inscripcion-electivos/inscripcion-electivos';
import { Inscripcion } from '../../services/inscripcion';
import { Oferta } from '../../models/oferta';

@Component({
  selector: 'app-inscripcion-asignaturas',
  standalone: true,
  imports: [CommonModule, FormsModule, InscripcionElectivos],
  templateUrl: './inscripcion-asignaturas.html',
  styleUrl: './inscripcion-asignaturas.css',
})
/*export class InscripcionAsignaturas {
  constructor(private inscripcionService: Inscripcion) {}

  periodoActual = '2026-1';

  asignaturas: Oferta[] = [
    {
      codigo: 'MAT101',
      nombre: 'Matemáticas I',
      tipo: 'obligatoria',

      ubicaciones: [
        { carrera: 'ICCI', periodo: '2026-1' },
        { carrera: 'IND', periodo: '2026-2' },
      ],

      catedra: [
        {
          codigoAsignatura: 'MAT101',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Dr. Pérez',
          cupos: 0,
          seleccionado: false,
        },
        {
          codigoAsignatura: 'MAT101',
          tipo: 'catedra',
          letra: 'B',
          profesor: 'Dra. Gómez',
          cupos: 25,
          seleccionado: false,
        },
      ],

      taller: [
        {
          codigoAsignatura: 'MAT101',
          tipo: 'taller',
          letra: 'A',
          profesor: 'Juan Soto',
          cupos: 20,
          seleccionado: false,
        },
      ],
      requisitos: [],
      inscrita: false,
    },

    {
      codigo: 'FIS201',
      nombre: 'Física I',
      tipo: 'obligatoria',

      ubicaciones: [
        { carrera: 'ICCI', periodo: '2026-1' },
        { carrera: 'IND', periodo: '2026-1' },
      ],

      catedra: [
        {
          codigoAsignatura: 'FIS201',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Dr. Ramírez',
          cupos: 40,
          seleccionado: false,
        },
      ],

      laboratorio: [
        {
          codigoAsignatura: 'FIS201',
          tipo: 'laboratorio',
          letra: 'A',
          profesor: 'María López',
          cupos: 15,
          seleccionado: false,
        },
      ],
      requisitos: [],
      inscrita: false,
    },

    {
      codigo: 'INF301',
      nombre: 'Programación',
      tipo: 'obligatoria',

      ubicaciones: [{ carrera: 'ICCI', periodo: '2026-2' }],

      catedra: [
        {
          codigoAsignatura: 'INF301',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Ing. Torres',
          cupos: 35,
          seleccionado: false,
        },
      ],
      requisitos: [],
      inscrita: false,
    },
  ];

  electivos: Oferta[] = [
    {
      codigo: 'ELC101',
      nombre: 'Introducción a IA',
      tipo: 'electivo',

      ubicaciones: [{ carrera: 'ICCI', periodo: '2026-1' }],

      requisitos: [
        {
          codigo: 'MAT101',
          nombre: 'Matemáticas I',
        },
      ],

      catedra: [
        {
          codigoAsignatura: 'ELC101',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Dr. IA',
          cupos: 20,
          seleccionado: false,
        },
        {
          codigoAsignatura: 'ELC101',
          tipo: 'catedra',
          letra: 'B',
          profesor: 'Dra. Neural',
          cupos: 15,
          seleccionado: false,
        },
      ],

      taller: [
        {
          codigoAsignatura: 'ELC101',
          tipo: 'taller',
          letra: 'A',
          profesor: 'Asistente IA',
          cupos: 10,
          seleccionado: false,
        },
      ],

      inscrita: false,
    },

    {
      codigo: 'ELC202',
      nombre: 'Desarrollo Web',
      tipo: 'electivo',

      ubicaciones: [{ carrera: 'ICCI', periodo: '2026-2' }],

      requisitos: [
        {
          codigo: 'INF101',
          nombre: 'Programación I',
        },
        {
          codigo: 'INF201',
          nombre: 'Estructuras de Datos',
        },
      ],

      catedra: [
        {
          codigoAsignatura: 'ELC202',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Ing. Web',
          cupos: 25,
          seleccionado: false,
        },
      ],

      laboratorio: [
        {
          codigoAsignatura: 'ELC202',
          tipo: 'laboratorio',
          letra: 'A',
          profesor: 'Lab Web',
          cupos: 12,
          seleccionado: false,
        },
      ],

      inscrita: false,
    },
  ];

  carreras: Carrera[] = [
    {
      codigo: 'ICCI',
      nombre: 'Ingeniería Civil en Computación',
      facultad: 'Facultad de Informática',
      seleccionado: false,
    },
    {
      codigo: 'IND',
      nombre: 'Ingeniería Industrial',
      facultad: 'Facultad de Ingeniería',
      seleccionado: false,
    },
  ];

  periodos: Periodo[] = [
    { codigo: '2026-1', nombre: '2026 Semestre 1', seleccionado: false },
    { codigo: '2026-2', nombre: '2026 Semestre 2', seleccionado: false },
  ];

  carreraSeleccionada?: Carrera;
  periodoSeleccionado?: Periodo;
  asignaturasFiltradas: Oferta[] = [];
  electivosFiltrados: Oferta[] = [];
  asignaturasAprobadas: string[] = ['MAT101'];
  mostrarElectivos = false;

  ngOnInit() {
    const todas = [...this.asignaturas, ...this.electivos];

    todas.forEach((a) => {
      if (a.catedra?.length && !this.getGrupoSeleccionado(a.catedra)) {
        a.catedra[0].seleccionado = true;
      }

      if (a.taller?.length && !this.getGrupoSeleccionado(a.taller)) {
        a.taller[0].seleccionado = true;
      }

      if (a.laboratorio?.length && !this.getGrupoSeleccionado(a.laboratorio)) {
        a.laboratorio[0].seleccionado = true;
      }
    });

    if (this.carreras.length) {
      this.carreraSeleccionada = this.carreras[0];
    }

    if (this.periodos.length) {
      this.periodoSeleccionado = this.periodos[0];
    }

    this.asignaturasFiltradas = this.filtrarAsignaturas(this.asignaturas);
    this.electivosFiltrados = this.filtrarAsignaturas(this.electivos);
    console.log(this.electivosFiltrados);
    this.cargarInscripcionGuardada();
  }

  toggleElectivos() {
    this.mostrarElectivos = !this.mostrarElectivos;
  }

  onSelectChange(grupos: Grupo[], event: Event) {
    const letra = (event.target as HTMLSelectElement).value;
    const seleccionado = grupos.find((g) => g.letra === letra);

    if (seleccionado?.cupos === 0) {
      return;
    }

    if (seleccionado) {
      this.toggleGrupo(grupos, seleccionado);
    }
  }

  toggleGrupo(lista: Grupo[], seleccionado: Grupo) {
    lista.forEach((g) => (g.seleccionado = false));
    seleccionado.seleccionado = true;
  }

  onCarreraChange(carreras: Carrera[], event: Event) {
    const codigo = (event.target as HTMLSelectElement).value;

    const encontrada = carreras.find((c) => c.codigo === codigo);

    if (encontrada) {
      this.carreraSeleccionada = encontrada;

      this.asignaturasFiltradas = this.filtrarAsignaturas(this.asignaturas);
      this.electivosFiltrados = this.filtrarAsignaturas(this.electivos);
      this.limpiarEstadoInscripcion();

      this.cargarInscripcionGuardada();
    }
  }

  toggleCarrera(lista: Carrera[], seleccionado: Carrera) {
    lista.forEach((c) => (c.seleccionado = false));
    seleccionado.seleccionado = true;
  }

  onPeriodoChange(periodos: Periodo[], event: Event) {
    const codigo = (event.target as HTMLSelectElement).value;

    const encontrado = periodos.find((p) => p.codigo === codigo);

    if (encontrado) {
      this.periodoSeleccionado = encontrado;

      this.asignaturasFiltradas = this.filtrarAsignaturas(this.asignaturas);
      this.electivosFiltrados = this.filtrarAsignaturas(this.electivos);
      this.limpiarEstadoInscripcion();

      this.cargarInscripcionGuardada();
    }
    console.log(this.electivosFiltrados);
  }

  togglePeriodo(lista: Periodo[], seleccionado: Periodo) {
    lista.forEach((p) => (p.seleccionado = false));
    seleccionado.seleccionado = true;
  }

  filtrarAsignaturas(lista: Asignatura[]) {
    return lista.filter((a) =>
      a.ubicaciones.some(
        (u) =>
          u.carrera === this.carreraSeleccionada?.codigo &&
          u.periodo === this.periodoSeleccionado?.codigo,
      ),
    );
  }

  limpiarEstadoInscripcion() {
    const todas = [...this.asignaturas, ...this.electivos];
    todas.forEach((a) => {
      a.inscrita = false;

      a.catedra?.forEach((g) => (g.seleccionado = false));

      a.taller?.forEach((g) => (g.seleccionado = false));

      a.laboratorio?.forEach((g) => (g.seleccionado = false));

      if (a.catedra?.length) {
        a.catedra[0].seleccionado = true;
      }

      if (a.taller?.length) {
        a.taller[0].seleccionado = true;
      }

      if (a.laboratorio?.length) {
        a.laboratorio[0].seleccionado = true;
      }
    });
  }

  cargarInscripcionGuardada() {
    const key = `inscripcion_${this.carreraSeleccionada?.codigo}_${this.periodoSeleccionado?.codigo}`;

    const guardado = localStorage.getItem(key);

    if (guardado) {
      this.restaurarInscripcion(JSON.parse(guardado));
    }
  }

  restaurarInscripcion(inscripciones: any[]) {
    const todas = [...this.asignaturas, ...this.electivos];
    inscripciones.forEach((i) => {
      const asignatura = this.asignaturas.find((a) => a.codigo === i.codigoAsignatura);

      if (!asignatura) return;

      asignatura.inscrita = true;

      // restaurar grupos
      i.grupos.forEach((g: any) => {
        let lista;

        if (g.tipo === 'catedra') {
          lista = asignatura.catedra;
        }

        if (g.tipo === 'taller') {
          lista = asignatura.taller;
        }

        if (g.tipo === 'laboratorio') {
          lista = asignatura.laboratorio;
        }

        if (lista) {
          lista.forEach((x) => (x.seleccionado = false));

          const elegido = lista.find((x) => x.letra === g.letra);

          if (elegido) {
            elegido.seleccionado = true;
          }
        }
      });
    });
  }

  guardar() {
    if (!this.validarInscripcion()) return;

    const data = this.obtenerSeleccionFinal();

    this.inscripcionService.guardar(data).subscribe({
      next: () => {
        alert('Inscripción guardada');
      },
      error: () => {
        alert('Error al guardar');
      },
    });
  }

  validarInscripcion(): boolean {
    const todas = [...this.asignaturas, ...this.electivos];

    const inscritas = todas.filter((a) => a.inscrita);

    const electivos = inscritas.filter((a) => a.tipo === 'electivo');

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

    const sinCupos = inscritas.some((a) =>
      ['catedra', 'taller', 'laboratorio'].some((tipo) => {
        const grupo = this.getGrupoSeleccionado(a[tipo as keyof Asignatura] as Grupo[]);
        return grupo?.cupos === 0;
      }),
    );

    if (sinCupos) {
      alert('Hay grupos sin cupos disponibles');
      return false;
    }

    return true;
  }

  obtenerSeleccionFinal() {
    const todas = [...this.asignaturasFiltradas, ...this.electivosFiltrados];
    return todas

      .filter((a) => a.inscrita)

      .map((a) => {
        const construirGrupo = (tipo: string, grupo?: Grupo) =>
          grupo
            ? {
                tipo,
                letra: grupo.letra,
                profesor: grupo.profesor,
              }
            : null;

        return {
          codigoAsignatura: a.codigo,
          nombreAsignatura: a.nombre,
          tipo: a.tipo,

          grupos: [
            construirGrupo('catedra', this.getGrupoSeleccionado(a.catedra)),

            construirGrupo('taller', this.getGrupoSeleccionado(a.taller)),

            construirGrupo('laboratorio', this.getGrupoSeleccionado(a.laboratorio)),
          ].filter((g) => g !== null),
        };
      });
  }

  actualizarCupos(codigo: string, grupo: any, delta: number) {
    const asignatura = [...this.asignaturas, ...this.electivos].find((a) => a.codigo === codigo);

    let lista;

    if (grupo.tipo === 'catedra') lista = asignatura?.catedra;
    if (grupo.tipo === 'taller') lista = asignatura?.taller;
    if (grupo.tipo === 'laboratorio') lista = asignatura?.laboratorio;

    const g = lista?.find((x) => x.letra === grupo.letra);

    if (g) {
      g.cupos += delta;
    }
  }

  getGrupoSeleccionado(grupos?: Grupo[]) {
    return grupos?.find((g) => g.seleccionado);
  }

  puedeInscribirsePeriodo(): boolean {
    console.log('Periodo seleccionado:', this.periodoSeleccionado?.codigo);
    console.log('Periodo actual:', this.periodoActual);
    console.log(this.periodoSeleccionado?.codigo === this.periodoActual);
    return this.periodoSeleccionado?.codigo === this.periodoActual;
  }

  cumpleRequisitos(a: Asignatura): boolean {
    return a.requisitos.every((r) => this.asignaturasAprobadas.includes(r.codigo));
  }
}*/

//------
export class InscripcionAsignaturas {
  constructor(private inscripcionService: Inscripcion) {}

  periodoActual = '2026-1';

  ofertasAsignaturas: Oferta[] = [
    {
      id: 'OF-MAT101-ICCI-2026-1',

      carrera: 'ICCI',

      periodoAcademico: '2026-1',

      asignatura: {
        codigo: 'MAT101',

        nombre: 'Matemáticas I',

        tipo: 'obligatoria',
        ubicaciones: [
          {
            carrera: 'ICCI',
            periodo: '2026-1',
          },
          {
            carrera: 'IND',
            periodo: '2026-1',
          },
        ],

        requisitos: [],
      },

      grupos: {
        catedra: [
          {
            id: 'MAT101-CAT-A',

            tipo: 'catedra',

            letra: 'A',

            profesor: 'Dr. Pérez',

            cupos: 0,

            horarios: [
              {
                dia: 'Lunes',
                horaInicio: '08:00',
                horaFin: '09:30',
              },
            ],

            seleccionado: false,
          },

          {
            id: 'MAT101-CAT-B',

            tipo: 'catedra',

            letra: 'B',

            profesor: 'Dra. Gómez',

            cupos: 25,

            horarios: [
              {
                dia: 'Martes',
                horaInicio: '10:00',
                horaFin: '11:30',
              },
            ],

            seleccionado: false,
          },
        ],

        taller: [
          {
            id: 'MAT101-TAL-A',

            tipo: 'taller',

            letra: 'A',

            profesor: 'Juan Soto',

            cupos: 20,

            horarios: [
              {
                dia: 'Miércoles',
                horaInicio: '12:00',
                horaFin: '13:30',
              },
            ],

            seleccionado: false,
          },
        ],
        laboratorio: [],
      },

      inscrita: false,
    },

    {
      id: 'OF-FIS201-ICCI-2026-1',

      carrera: 'ICCI',

      periodoAcademico: '2026-1',

      asignatura: {
        codigo: 'FIS201',

        nombre: 'Física I',

        tipo: 'obligatoria',
        ubicaciones: [
          {
            carrera: 'ICCI',
            periodo: '2026-1',
          },

          {
            carrera: 'IND',
            periodo: '2026-1',
          },
        ],

        requisitos: [],
      },

      grupos: {
        catedra: [
          {
            id: 'FIS201-CAT-A',

            tipo: 'catedra',

            letra: 'A',

            profesor: 'Dr. Ramírez',

            cupos: 40,

            horarios: [
              {
                dia: 'Lunes',
                horaInicio: '14:00',
                horaFin: '15:30',
              },
            ],

            seleccionado: false,
          },
        ],

        taller: [],
        laboratorio: [
          {
            id: 'FIS201-LAB-A',

            tipo: 'laboratorio',

            letra: 'A',

            profesor: 'María López',

            cupos: 15,

            horarios: [
              {
                dia: 'Jueves',
                horaInicio: '16:00',
                horaFin: '17:30',
              },
            ],

            seleccionado: false,
          },
        ],
      },

      inscrita: false,
    },

    {
      id: 'OF-INF301-ICCI-2026-2',

      carrera: 'ICCI',

      periodoAcademico: '2026-2',

      asignatura: {
        codigo: 'INF301',

        nombre: 'Programación',

        tipo: 'obligatoria',
        ubicaciones: [
          {
            carrera: 'ICCI',
            periodo: '2026-2',
          },
        ],

        requisitos: [],
      },

      grupos: {
        catedra: [
          {
            id: 'INF301-CAT-A',

            tipo: 'catedra',

            letra: 'A',

            profesor: 'Ing. Torres',

            cupos: 35,

            horarios: [
              {
                dia: 'Viernes',
                horaInicio: '09:00',
                horaFin: '10:30',
              },
            ],

            seleccionado: false,
          },
        ],
        taller: [],
        laboratorio: [],
      },

      inscrita: false,
    },
  ];

  ofertasElectivos: Oferta[] = [
    {
      id: 'OF-ELC101-ICCI-2026-1',

      carrera: 'ICCI',

      periodoAcademico: '2026-1',

      asignatura: {
        codigo: 'ELC101',

        nombre: 'Introducción a IA',

        tipo: 'electivo',

        ubicaciones: [
          {
            carrera: 'ICCI',
            periodo: '2026-1',
          },

          {
            carrera: 'IND',
            periodo: '2026-1',
          },
        ],

        requisitos: [
          {
            codigo: 'MAT101',
            nombre: 'Matemáticas I',
          },
        ],
      },

      grupos: {
        catedra: [
          {
            id: 'ELC101-CAT-A',

            tipo: 'catedra',

            letra: 'A',

            profesor: 'Dr. IA',

            cupos: 20,

            horarios: [
              {
                dia: 'Martes',
                horaInicio: '08:00',
                horaFin: '09:30',
              },
            ],

            seleccionado: false,
          },

          {
            id: 'ELC101-CAT-B',

            tipo: 'catedra',

            letra: 'B',

            profesor: 'Dra. Neural',

            cupos: 15,

            horarios: [
              {
                dia: 'Miércoles',
                horaInicio: '10:00',
                horaFin: '11:30',
              },
            ],

            seleccionado: false,
          },
        ],

        taller: [
          {
            id: 'ELC101-TAL-A',

            tipo: 'taller',

            letra: 'A',

            profesor: 'Asistente IA',

            cupos: 10,

            horarios: [
              {
                dia: 'Viernes',
                horaInicio: '12:00',
                horaFin: '13:30',
              },
            ],

            seleccionado: false,
          },
        ],
        laboratorio: [],
      },

      inscrita: false,
    },

    {
      id: 'OF-ELC202-ICCI-2026-2',

      carrera: 'ICCI',

      periodoAcademico: '2026-2',

      asignatura: {
        codigo: 'ELC202',

        nombre: 'Desarrollo Web',

        tipo: 'electivo',
        ubicaciones: [
          {
            carrera: 'ICCI',
            periodo: '2026-2',
          },
        ],

        requisitos: [
          {
            codigo: 'INF101',
            nombre: 'Programación I',
          },

          {
            codigo: 'INF201',
            nombre: 'Estructuras de Datos',
          },
        ],
      },

      grupos: {
        catedra: [
          {
            id: 'ELC202-CAT-A',

            tipo: 'catedra',

            letra: 'A',

            profesor: 'Ing. Web',

            cupos: 25,

            horarios: [
              {
                dia: 'Lunes',
                horaInicio: '18:00',
                horaFin: '19:30',
              },
            ],

            seleccionado: false,
          },
        ],

        taller: [],
        laboratorio: [
          {
            id: 'ELC202-LAB-A',

            tipo: 'laboratorio',

            letra: 'A',

            profesor: 'Lab Web',

            cupos: 12,

            horarios: [
              {
                dia: 'Jueves',
                horaInicio: '18:00',
                horaFin: '19:30',
              },
            ],

            seleccionado: false,
          },
        ],
      },

      inscrita: false,
    },
  ];

  carreras: Carrera[] = [
    {
      codigo: 'ICCI',
      nombre: 'Ingeniería Civil en Computación',
      facultad: 'Facultad de Informática',
    },
    {
      codigo: 'IND',
      nombre: 'Ingeniería Industrial',
      facultad: 'Facultad de Ingeniería',
    },
  ];

  periodos: Periodo[] = [
    {
      codigo: '2026-1',
      nombre: '2026 Semestre 1',
      activo: true,
      fechaInicio: new Date('2026-03-01'),
      fechaTermino: new Date('2026-03-15'),
    },
    {
      codigo: '2026-2',
      nombre: '2026 Semestre 2',
      activo: false,
      fechaInicio: new Date('2026-08-01'),
      fechaTermino: new Date('2026-08-15'),
    },
  ];

  carreraSeleccionada?: Carrera;
  periodoSeleccionado?: Periodo;
  asignaturasFiltradas: Oferta[] = [];
  electivosFiltrados: Oferta[] = [];
  asignaturasAprobadas: string[] = ['MAT101'];
  mostrarElectivos = false;

  ngOnInit() {
    const todas = [...this.ofertasAsignaturas, ...this.ofertasElectivos];

    todas.forEach((oferta) => {
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
      this.carreraSeleccionada = this.carreras[0];
    }

    if (this.periodos.length) {
      this.periodoSeleccionado = this.periodos[0];
    }

    this.asignaturasFiltradas = this.filtrarOfertas(this.ofertasAsignaturas);

    this.electivosFiltrados = this.filtrarOfertas(this.ofertasElectivos);

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

  onCarreraChange(carreras: Carrera[], event: Event): void {
    const codigo = (event.target as HTMLSelectElement).value;

    const encontrada = carreras.find((c) => c.codigo === codigo);

    if (!encontrada) {
      return;
    }

    this.carreraSeleccionada = encontrada;

    this.asignaturasFiltradas = this.filtrarOfertas(this.ofertasAsignaturas);

    this.electivosFiltrados = this.filtrarOfertas(this.ofertasElectivos);

    this.limpiarEstadoInscripcion();

    this.cargarInscripcionGuardada();
  }

  onPeriodoChange(periodos: Periodo[], event: Event): void {
    const codigo = (event.target as HTMLSelectElement).value;

    const encontrado = periodos.find((p) => p.codigo === codigo);

    if (!encontrado) {
      return;
    }

    this.periodoSeleccionado = encontrado;

    this.asignaturasFiltradas = this.filtrarOfertas(this.ofertasAsignaturas);

    this.electivosFiltrados = this.filtrarOfertas(this.ofertasElectivos);

    this.limpiarEstadoInscripcion();

    this.cargarInscripcionGuardada();

    console.log(this.electivosFiltrados);
  }

  filtrarOfertas(lista: Oferta[]): Oferta[] {
    return lista.filter(
      (oferta) =>
        oferta.carrera === this.carreraSeleccionada?.codigo &&
        oferta.periodoAcademico === this.periodoSeleccionado?.codigo,
    );
  }

  limpiarEstadoInscripcion(): void {
    const todas = [...this.ofertasAsignaturas, ...this.ofertasElectivos];

    todas.forEach((oferta: Oferta) => {
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

    const key =
      `inscripcion_${this.carreraSeleccionada.codigo}_` + `${this.periodoSeleccionado.codigo}`;

    const guardado = localStorage.getItem(key);

    if (!guardado) {
      return;
    }

    const inscripcion = JSON.parse(guardado);

    this.restaurarInscripcion(inscripcion);
  }

  restaurarInscripcion(inscripciones: any[]): void {
    const todas = [...this.ofertasAsignaturas, ...this.ofertasElectivos];

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
    if (!this.validarInscripcion()) return;

    const data = this.obtenerSeleccionFinal();

    this.inscripcionService.guardar(data).subscribe({
      next: () => {
        alert('Inscripción guardada');
      },
      error: () => {
        alert('Error al guardar');
      },
    });
  }

  validarInscripcion(): boolean {
    const todas = [...this.ofertasAsignaturas, ...this.ofertasElectivos];

    const inscritas = todas.filter((o: Oferta) => o.inscrita);

    const electivos = inscritas.filter((o: Oferta) => o.asignatura.tipo === 'electivo');

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
    const todas = [...this.asignaturasFiltradas, ...this.electivosFiltrados];

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

          tipo: oferta.asignatura.tipo,

          grupos: [
            construirGrupo('catedra', this.getGrupoSeleccionado(oferta.grupos.catedra)),

            construirGrupo('taller', this.getGrupoSeleccionado(oferta.grupos.taller)),

            construirGrupo('laboratorio', this.getGrupoSeleccionado(oferta.grupos.laboratorio)),
          ].filter((g) => g !== null),
        };
      });
  }

  actualizarCupos(idOferta: string, grupo: any, delta: number): void {
    const oferta = [...this.ofertasAsignaturas, ...this.ofertasElectivos].find(
      (o: Oferta) => o.id === idOferta,
    );

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
    return this.periodoSeleccionado?.codigo === this.periodoActual;
  }

  cumpleRequisitos(oferta: Oferta): boolean {
    return oferta.asignatura.requisitos.every((r) => this.asignaturasAprobadas.includes(r.codigo));
  }
}
