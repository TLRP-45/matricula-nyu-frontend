import { Component } from '@angular/core';
import { Oferta } from '../../../models/oferta';
import { Grupo } from '../../../models/grupo';
import { Horario } from '../../../components/horario/horario';
import { PanelAsignaturas } from '../../../components/panel-asignaturas/panel-asignaturas';
import { FiltrosAcademicos } from '../../../components/filtros-academicos/filtros-academicos';
import { Carrera } from '../../../models/carrera';
import { Periodo } from '../../../models/periodo';
import { OfertaGrupoVM } from '../../../models/oferta-grupo-vm';
import { Asignatura } from '../../../models/asignatura';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HorarioGrupo } from '../../../models/horario-grupo';
import { BloqueHorario } from '../../../models/bloque-horario';

@Component({
  selector: 'app-oferta-academica',
  standalone: true,
  imports: [Horario, PanelAsignaturas, FiltrosAcademicos, FormsModule, ReactiveFormsModule],
  templateUrl: './oferta-academica.html',
  styleUrl: './oferta-academica.css',
})
export class OfertaAcademica {
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

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
  carreras: Carrera[] = [
    {
      codigo: 'ICCI',
      nombre: 'Ingeniería Civil en Computación',
      facultad: 'Ingeniería',
    },

    {
      codigo: 'IND',
      nombre: 'Ingeniería Industrial',
      facultad: 'Ingeniería',
    },
  ];

  periodos: Periodo[] = [
    {
      codigo: '2026-1',

      nombre: 'Primer Semestre 2026',

      activo: true,

      fechaInicio: new Date('2026-03-01'),

      fechaTermino: new Date('2026-07-15'),
    },

    {
      codigo: '2026-2',

      nombre: 'Segundo Semestre 2026',

      activo: false,

      fechaInicio: new Date('2026-08-01'),

      fechaTermino: new Date('2026-12-15'),
    },
  ];

  ofertasAsignaturas: Oferta[] = [
    {
      id: 'OF-MAT101-ICCI-2026-1',

      carrera: 'ICCI',

      periodoAcademico: '2026-1',

      inscrita: false,

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

            cupos: 35,

            horarios: [
              {
                dia: 'Lunes',
                horaInicio: '08:00',
                horaFin: '09:30',
              },

              {
                dia: 'Miércoles',
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

            cupos: 20,

            horarios: [
              {
                dia: 'Martes',
                horaInicio: '10:00',
                horaFin: '11:30',
              },

              {
                dia: 'Jueves',
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

            cupos: 15,

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
    },

    {
      id: 'OF-FIS201-ICCI-2026-1',

      carrera: 'ICCI',

      periodoAcademico: '2026-1',

      inscrita: false,

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

              {
                dia: 'Miércoles',
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

            cupos: 18,

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
    },

    {
      id: 'OF-INF301-ICCI-2026-2',

      carrera: 'ICCI',

      periodoAcademico: '2026-2',

      inscrita: false,

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

            cupos: 30,

            horarios: [
              {
                dia: 'Martes',
                horaInicio: '09:00',
                horaFin: '10:30',
              },

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

        laboratorio: [
          {
            id: 'INF301-LAB-A',

            tipo: 'laboratorio',

            letra: 'A',

            profesor: 'Carlos Vega',

            cupos: 20,

            horarios: [
              {
                dia: 'Jueves',
                horaInicio: '11:00',
                horaFin: '12:30',
              },
            ],

            seleccionado: false,
          },
        ],
      },
    },
  ];

  ofertasElectivos: Oferta[] = [
    {
      id: 'OF-ELC101-ICCI-2026-1',

      carrera: 'ICCI',

      periodoAcademico: '2026-1',

      inscrita: false,

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

            cupos: 25,

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

            cupos: 18,

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

            cupos: 12,

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
    },

    {
      id: 'OF-ELC202-ICCI-2026-2',

      carrera: 'ICCI',

      periodoAcademico: '2026-2',

      inscrita: false,

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

            cupos: 28,

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

            cupos: 15,

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
    },
  ];

  //ofertas: Oferta[] = [...this.ofertasAsignaturas, ...this.ofertasElectivos];

  ofertas: Oferta[] = [];

  ofertasDisponibles: OfertaGrupoVM[] = [];

  ofertasEnHorario: OfertaGrupoVM[] = [];

  ofertasFiltradas: OfertaGrupoVM[] = [];

  asignaturaSeleccionada: Asignatura | null = null;

  ofertaSeleccionada: OfertaGrupoVM | null = null;

  carreraSeleccionada!: string;

  periodoSeleccionado!: string;

  ofertaEnEdicion: Oferta | null = null;

  mostrarFormularioOferta = false;

  mostrarSelectorAsignaturas = false;

  horariosTemp: HorarioGrupo[] = [];

  //asignaturasDisponibles: Asignatura[] = [];
  ofertaForm!: FormGroup;

  asignaturasDisponibles: Asignatura[] = [
    {
      codigo: 'MAT101',
      nombre: 'Cálculo I',
      tipo: 'obligatoria',
      ubicaciones: [
        { carrera: 'ICCI', periodo: '2026-1' },
        { carrera: 'Ingeniería Informática', periodo: '2026-1' },
      ],
      requisitos: [],
    },
    {
      codigo: 'FIS101',
      nombre: 'Física I',
      tipo: 'obligatoria',
      ubicaciones: [{ carrera: 'ICCI', periodo: '2026-1' }],
      requisitos: [{ codigo: 'MAT101', nombre: 'Cálculo I' }],
    },
    {
      codigo: 'PROG101',
      nombre: 'Programación I',
      tipo: 'obligatoria',
      ubicaciones: [{ carrera: 'ICCI', periodo: '2026-1' }],
      requisitos: [],
    },
    {
      codigo: 'PROG201',
      nombre: 'Estructuras de Datos',
      tipo: 'obligatoria',
      ubicaciones: [{ carrera: 'ICCI', periodo: '2026-2' }],
      requisitos: [{ codigo: 'PROG101', nombre: 'Programación I' }],
    },
    {
      codigo: 'ADM110',
      nombre: 'Introducción a la Administración',
      tipo: 'electivo',
      ubicaciones: [
        { carrera: 'ICCI', periodo: '2026-1' },
        { carrera: 'ICCI', periodo: '2026-1' },
      ],
      requisitos: [],
    },
    {
      codigo: 'QUI101',
      nombre: 'Química General',
      tipo: 'obligatoria',
      ubicaciones: [{ carrera: 'ICCI', periodo: '2026-1' }],
      requisitos: [],
    },
    {
      codigo: 'EST101',
      nombre: 'Estadística I',
      tipo: 'obligatoria',
      ubicaciones: [
        { carrera: 'ICCI', periodo: '2026-1' },
        { carrera: 'ICCI', periodo: '2026-1' },
      ],
      requisitos: [{ codigo: 'MAT101', nombre: 'Cálculo I' }],
    },
    {
      codigo: 'HIS101',
      nombre: 'Historia Contemporánea',
      tipo: 'electivo',
      ubicaciones: [
        { carrera: 'ICCI', periodo: '2026-1' },
        { carrera: 'ICCI', periodo: '2026-1' },
      ],
      requisitos: [],
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log('TODAS:', this.asignaturasDisponibles);
  }

  onFiltroChange(event: { carrera: string; periodo: string }): void {
    this.carreraSeleccionada = event.carrera;

    this.periodoSeleccionado = event.periodo;
    this.actualizarVista();

    this.ofertasEnHorario = [];
  }

  onHoraInicioChangeTemp(index: number, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    const horario = this.horariosTemp[index];

    horario.horaInicio = value;
    horario.horaFin = this.calcularFin(value);
  }

  actualizarVista(): void {
    console.log('OFERTAS EN FILTER:', this.ofertas);
    const ofertasFiltradas = this.ofertas.filter(
      (o: Oferta) =>
        o.carrera === this.carreraSeleccionada && o.periodoAcademico === this.periodoSeleccionado,
    );

    console.log('OFERTAS FILTRADAS:', ofertasFiltradas.length);
    this.ofertasDisponibles = this.construirOfertaGrupoVM(ofertasFiltradas);
    console.log('VM RESULT:', this.construirOfertaGrupoVM(ofertasFiltradas));

    console.log('OFERTAS BASE:', this.ofertas.length);
    console.log('OFERTAS DISPONIBLES:', this.ofertasDisponibles.length);

    console.log('OFERTA CARRERA:', this.ofertas[0]?.carrera);
    console.log('FILTRO CARRERA:', this.carreraSeleccionada);

    console.log('OFERTA PERIODO:', this.ofertas[0]?.periodoAcademico);
    console.log('FILTRO PERIODO:', this.periodoSeleccionado);
    console.log('OFERTAS COMPLETAS:', this.ofertas);
  }

  construirOfertaGrupoVM(ofertas: Oferta[]): OfertaGrupoVM[] {
    const resultado: OfertaGrupoVM[] = [];

    for (const oferta of ofertas) {
      const grupos = [
        ...(oferta.grupos.catedra || []),

        ...(oferta.grupos.taller || []),

        ...(oferta.grupos.laboratorio || []),
      ];

      for (const grupo of grupos) {
        for (const horario of grupo.horarios) {
          resultado.push({
            oferta,

            grupo,

            horario,
          });
        }
      }
    }

    return resultado;
  }

  seleccionarOferta(item: OfertaGrupoVM): void {
    this.ofertaSeleccionada = item;
  }

  get asignaturasFiltradas(): Asignatura[] {
    const result = this.asignaturasDisponibles.filter((a) =>
      a.ubicaciones.some(
        (u) => u.carrera === this.carreraSeleccionada && u.periodo === this.periodoSeleccionado,
      ),
    );

    console.log('FILTRADAS:', result);
    return result;
  }

  abrirSelectorAsignaturas(): void {
    this.mostrarSelectorAsignaturas = true;
  }

  cerrarSelectorAsignaturas() {
    this.mostrarSelectorAsignaturas = false;
  }

  abrirNuevaOferta(asignatura: Asignatura): void {
    this.asignaturaSeleccionada = asignatura;
    this.mostrarSelectorAsignaturas = false;

    this.ofertaEnEdicion = {
      id: crypto.randomUUID(),
      periodoAcademico: this.periodoSeleccionado,
      carrera: this.carreraSeleccionada,
      asignatura,
      grupos: {
        catedra: [],
        taller: [],
        laboratorio: [],
      },
      inscrita: false,
    };

    this.ofertaForm = this.fb.group({
      tipo: ['catedra'],
      letra: ['A'],
      profesor: [''],
      cupos: [0],
      horariosTemp: [],
    });

    this.mostrarFormularioOferta = true;
  }

  agregarHorario(): void {
    this.horariosTemp.push({
      dia: 'Lunes',
      horaInicio: '08:00',
      horaFin: '09:30',
    });
  }

  actualizarDiaTemp(index: number, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.horariosTemp[index].dia = value;
  }

  eliminarHorario(index: number): void {
    this.horariosTemp.splice(index, 1);
  }

  calcularFin(inicio: string): string {
    const [h, m] = inicio.split(':').map(Number);

    const date = new Date();
    date.setHours(h, m + 90); // ejemplo 1h30

    return date.toTimeString().slice(0, 5);
  }

  guardarOferta() {
    if (!this.ofertaEnEdicion || !this.ofertaForm) return;

    const value = this.ofertaForm.value;

    const grupo: Grupo = {
      id: crypto.randomUUID(),
      tipo: value.tipo,
      letra: value.letra,
      profesor: value.profesor,
      cupos: value.cupos,
      horarios: this.horariosTemp.map((h) => ({ ...h })),
      seleccionado: false,
    };

    const nuevaOferta: Oferta = {
      ...this.ofertaEnEdicion,
      grupos: {
        catedra: [],
        taller: [],
        laboratorio: [],
        [value.tipo]: [grupo],
      },
    };

    this.ofertas = [...this.ofertas, nuevaOferta];

    this.actualizarVista();

    this.ofertaEnEdicion = null;
    this.mostrarFormularioOferta = false;
  }

  agregarAlHorario(item: OfertaGrupoVM): void {
    const grupoId = item.grupo.id;

    const yaExiste = this.ofertasEnHorario.some((x) => x.grupo.id === grupoId);

    if (yaExiste) {
      return;
    }

    const itemsGrupo = this.ofertasDisponibles.filter((x) => x.grupo.id === grupoId);

    this.ofertasEnHorario = [...this.ofertasEnHorario, ...itemsGrupo];

    this.ofertasDisponibles = this.ofertasDisponibles.filter((x) => x.grupo.id !== grupoId);
  }

  quitarDelHorario(item: OfertaGrupoVM): void {
    const grupoId = item.grupo.id;

    const itemsGrupo = this.ofertasEnHorario.filter((x) => x.grupo.id === grupoId);

    this.ofertasDisponibles = [...this.ofertasDisponibles, ...itemsGrupo];

    this.ofertasEnHorario = this.ofertasEnHorario.filter((x) => x.grupo.id !== grupoId);

    if (this.ofertaSeleccionada?.grupo.id === grupoId) {
      this.ofertaSeleccionada = null;
    }
  }
}
