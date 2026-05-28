import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';

export interface Asignatura {
  id: string;
  nombre: string;
  codigo: string;
  creditos: number;
  horas: string;
  semestre: number;
  estado: EstadoAsignatura;
  anio: string;
  prerequisitos?: string[];
}

export type EstadoAsignatura =
  | 'aprobado'
  | 'reprobada'
  | 'nocursada'
  | 'inscrita'
  | 'cursando'
  | 'prerrequisito'
  | 'prerreq_sem'
  | 'tributa'
  | 'seleccionada';

@Component({
  selector: 'app-malla-curricular',
  standalone: true,
  imports: [CommonModule, SlicePipe],
  templateUrl: './malla-curricular.html',
  styleUrl: './malla-curricular.css',
})
export class MallaCurricular implements OnInit {
  carrera: string = 'Ingeniería Civil en Computación e Informática';
  semestres: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  selectedAsignatura: Asignatura | null = null;
  modalVisible: boolean = false;

  estadoLabel: Record<EstadoAsignatura, string> = {
    aprobado: 'Aprobada',
    reprobada: 'Reprobada',
    nocursada: 'No Cursada',
    inscrita: 'Inscrita',
    cursando: 'Cursando',
    prerrequisito: 'Prerrequisito',
    prerreq_sem: 'Prerreq. Semestre',
    tributa: 'Tributa',
    seleccionada: 'Seleccionada',
  };

  estadoColor: Record<EstadoAsignatura, string> = {
    aprobado: '#4BA3E3',
    reprobada: '#E85B5B',
    nocursada: '#FFFFFF',
    inscrita: '#90D895',
    cursando: '#90D895',
    prerrequisito: '#FFB74D',
    prerreq_sem: '#6C63C0',
    tributa: '#4CAF50',
    seleccionada: '#64B5F6',
  };

  asignaturas: Asignatura[] = [
    { id: 'MA067', nombre: 'Introducción a la Ingeniería',      codigo: '1 MA067',  creditos: 7, horas: '(8,2,0)', semestre: 1, estado: 'aprobado',    anio: '2023/1', prerequisitos: [] },
    { id: 'MA069', nombre: 'Introducción al Cálculo',            codigo: '2 MA069',  creditos: 7, horas: '(8,2,0)', semestre: 1, estado: 'aprobado',    anio: '2023/1', prerequisitos: [] },
    { id: 'CC198', nombre: 'Introducción a la Computación',      codigo: '3 CC198',  creditos: 4, horas: '(0,4,0)', semestre: 1, estado: 'aprobado',    anio: '2023/1', prerequisitos: [] },
    { id: 'CC210', nombre: 'Taller de Desarrollo Personal',      codigo: '4 CC210',  creditos: 4, horas: '(0,4,0)', semestre: 1, estado: 'aprobado',    anio: '2023/1', prerequisitos: [] },
    { id: 'CC199', nombre: 'Taller de Programación',             codigo: '5 CC199',  creditos: 6, horas: '(0,6,0)', semestre: 1, estado: 'aprobado',    anio: '2023/1', prerequisitos: [] },

    { id: 'MA801', nombre: 'Cálculo I',                          codigo: '6 MA801',  creditos: 8, horas: '(8,2,0)', semestre: 2, estado: 'aprobado',    anio: '2024/1', prerequisitos: ['MA069'] },
    { id: 'MA811', nombre: 'Álgebra I',                          codigo: '7 MA811',  creditos: 8, horas: '(8,2,0)', semestre: 2, estado: 'aprobado',    anio: '2024/1', prerequisitos: ['MA069'] },
    { id: 'FI035', nombre: 'Introducción a la Física',           codigo: '8 FI035',  creditos: 4, horas: '(4,0,2)', semestre: 2, estado: 'aprobado',    anio: '2024/1', prerequisitos: [] },
    { id: 'CC206', nombre: 'Introducción a la Programación',     codigo: '9 CC206',  creditos: 6, horas: '(0,6,0)', semestre: 2, estado: 'aprobado',    anio: '2024/1', prerequisitos: ['CC199'] },
    { id: 'CC208', nombre: 'Taller de Programación II',          codigo: '10 CC208', creditos: 6, horas: '(0,6,0)', semestre: 2, estado: 'aprobado',    anio: '2024/1', prerequisitos: ['CC199'] },

    { id: 'MA802', nombre: 'Cálculo II',                         codigo: '11 MA802', creditos: 8, horas: '(8,2,0)', semestre: 3, estado: 'aprobado',    anio: '2025/1', prerequisitos: ['MA801'] },
    { id: 'MA812', nombre: 'Álgebra II',                         codigo: '12 MA812', creditos: 8, horas: '(8,2,0)', semestre: 3, estado: 'aprobado',    anio: '2025/1', prerequisitos: ['MA811'] },
    { id: 'FI801', nombre: 'Mecánica Clásica',                   codigo: '13 FI801', creditos: 5, horas: '(4,0,2)', semestre: 3, estado: 'aprobado',    anio: '2025/1', prerequisitos: ['FI035', 'MA801'] },
    { id: 'IE078', nombre: 'Electricidad y Magnetismo',          codigo: '14 IE078', creditos: 6, horas: '(4,0,2)', semestre: 3, estado: 'cursando',    anio: '2025/1', prerequisitos: ['FI801'] },
    { id: 'CC209', nombre: 'Programación III',                   codigo: '15 CC209', creditos: 4, horas: '(0,4,0)', semestre: 3, estado: 'aprobado',    anio: '2025/1', prerequisitos: ['CC206'] },
    { id: 'CC211', nombre: 'Fundamentos de Programación',        codigo: '16 CC211', creditos: 4, horas: '(2,0,4)', semestre: 3, estado: 'aprobado',    anio: '2025/1', prerequisitos: ['CC206'] },

    { id: 'MA603', nombre: 'Cálculo III',                        codigo: '17 MA603', creditos: 4, horas: '(4,2,0)', semestre: 4, estado: 'inscrita',    anio: '2025/1', prerequisitos: ['MA802'] },
    { id: 'MA220', nombre: 'Ecuaciones Diferenciales',           codigo: '18 MA220', creditos: 4, horas: '(3,1,0)', semestre: 4, estado: 'inscrita',    anio: '2025/1', prerequisitos: ['MA801', 'MA811'] },
    { id: 'CC222', nombre: 'Algoritmos y Complejidad',           codigo: '19 CC222', creditos: 6, horas: '(4,0,2)', semestre: 4, estado: 'inscrita',    anio: '2025/1', prerequisitos: ['CC209', 'MA811'] },
    { id: 'CC091', nombre: 'Proyecto I',                         codigo: '20 CC091', creditos: 6, horas: '(0,8,0)', semestre: 4, estado: 'inscrita',    anio: '2025/1', prerequisitos: [] },

    { id: 'FI604', nombre: 'Electromagnetismo',                  codigo: '22 FI604', creditos: 5, horas: '(4,0,2)', semestre: 5, estado: 'prerreq_sem',anio: '-',      prerequisitos: ['IE078', 'MA603'] },
    { id: 'MA424', nombre: 'Estadística y Probabilidades',       codigo: '23 MA424', creditos: 4, horas: '(3,1,0)', semestre: 5, estado: 'reprobada',   anio: '2025/2', prerequisitos: ['MA802'] },
    { id: 'CC082', nombre: 'Arquitecturas de Computadores',      codigo: '24 CC082', creditos: 6, horas: '(4,0,2)', semestre: 5, estado: 'prerreq_sem',anio: '-',      prerequisitos: ['CC209'] },
    { id: 'CC212', nombre: 'Tecnología de Desarrollo',           codigo: '25 CC212', creditos: 6, horas: '(4,2,0)', semestre: 5, estado: 'prerreq_sem',anio: '-',      prerequisitos: ['CC222'] },
    { id: 'CC214', nombre: 'Taller de Tecnología',               codigo: '26 CC214', creditos: 6, horas: '(0,6,0)', semestre: 5, estado: 'nocursada',  anio: '-',      prerequisitos: [] },

    { id: 'CC052', nombre: 'Tecnología de Información',          codigo: '28 CC052', creditos: 6, horas: '(2,0,4)', semestre: 6, estado: 'inscrita',    anio: '2025/2', prerequisitos: ['CC082'] },
    { id: 'IN056', nombre: 'Gestión de Empresas',                codigo: '29 IN056', creditos: 4, horas: '(3,1,0)', semestre: 6, estado: 'nocursada',  anio: '-',      prerequisitos: [] },
    { id: 'CC359', nombre: 'Sistemas Operativos',                codigo: '30 CC359', creditos: 6, horas: '(4,0,2)', semestre: 6, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC082'] },
    { id: 'CC416', nombre: 'Bases de Datos',                     codigo: '31 CC416', creditos: 6, horas: '(4,0,2)', semestre: 6, estado: 'reprobada',   anio: '2025/2', prerequisitos: ['CC212'] },
    { id: 'CC216', nombre: 'Proyecto II',                        codigo: '32 CC216', creditos: 5, horas: '(0,6,0)', semestre: 6, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC091'] },

    { id: 'CC218', nombre: 'Ingeniería de Software',             codigo: '34 CC218', creditos: 6, horas: '(2,4,0)', semestre: 7, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC416'] },
    { id: 'CC219', nombre: 'Taller de Aplicaciones',             codigo: '35 CC219', creditos: 5, horas: '(0,6,0)', semestre: 7, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC416'] },
    { id: 'CC093', nombre: 'Comunicaciones',                     codigo: '36 CC093', creditos: 4, horas: '(4,0,2)', semestre: 7, estado: 'nocursada',  anio: '-',      prerequisitos: ['FI604'] },
    { id: 'CC223', nombre: 'Sistemas de Información',            codigo: '37 CC223', creditos: 5, horas: '(2,4,0)', semestre: 7, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC416', 'IN056'] },
    { id: 'CC094', nombre: 'Teoría de la Computación',           codigo: '38 CC094', creditos: 5, horas: '(4,0,0)', semestre: 7, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC222', 'MA424'] },

    { id: 'CC224', nombre: 'Ingeniería de Software II',          codigo: '40 CC224', creditos: 6, horas: '(2,4,0)', semestre: 8, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC218'] },
    { id: 'CC225', nombre: 'Análisis y Diseño',                  codigo: '41 CC225', creditos: 5, horas: '(4,2,0)', semestre: 8, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC218'] },
    { id: 'CC106', nombre: 'Sistemas Distribuidos',              codigo: '42 CC106', creditos: 6, horas: '(4,2,0)', semestre: 8, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC359'] },
    { id: 'CC132', nombre: 'Laboratorio de Sistemas',            codigo: '43 CC132', creditos: 4, horas: '(0,0,4)', semestre: 8, estado: 'nocursada',  anio: '-',      prerequisitos: [] },
    { id: 'CC230P', nombre: 'Proyecto III',                      codigo: '44 CC230', creditos: 5, horas: '(0,6,0)', semestre: 8, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC216'] },

    { id: 'CC227', nombre: 'Gestión de Proyectos',               codigo: '46 CC227', creditos: 5, horas: '(4,2,0)', semestre: 9, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC224'] },
    { id: 'CC228', nombre: 'Inteligencia Artificial',            codigo: '47 CC228', creditos: 6, horas: '(4,2,0)', semestre: 9, estado: 'nocursada',  anio: '-',      prerequisitos: ['MA424', 'CC222'] },
    { id: 'CC229', nombre: 'Aplicaciones Distribuidas',          codigo: '48 CC229', creditos: 6, horas: '(4,0,2)', semestre: 9, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC106'] },
    { id: 'IN053', nombre: 'Introducción a la Innovación',       codigo: '49 IN053', creditos: 4, horas: '(4,0,0)', semestre: 9, estado: 'nocursada',  anio: '-',      prerequisitos: [] },
    { id: 'CC230T', nombre: 'Taller de Emprendimiento',          codigo: '50 CC230', creditos: 5, horas: '(0,6,0)', semestre: 9, estado: 'nocursada',  anio: '-',      prerequisitos: ['CC224'] },

    { id: 'IN115', nombre: 'Modelos de Optimización',            codigo: '52 IN115', creditos: 4, horas: '(3,1,0)', semestre: 10, estado: 'nocursada', anio: '-',      prerequisitos: [] },
    { id: 'CC096', nombre: 'Inteligencia Artificial II',         codigo: '53 CC096', creditos: 6, horas: '(4,2,0)', semestre: 10, estado: 'nocursada', anio: '-',      prerequisitos: ['CC228'] },
    { id: 'CC232', nombre: 'Gestión de Sistemas',                codigo: '54 CC232', creditos: 5, horas: '(4,2,0)', semestre: 10, estado: 'nocursada', anio: '-',      prerequisitos: ['CC106'] },
    { id: 'IN044', nombre: 'Preparación para Proyecto',          codigo: '55 IN044', creditos: 4, horas: '(3,1,0)', semestre: 10, estado: 'nocursada', anio: '-',      prerequisitos: [] },
    { id: 'CC233', nombre: 'Proyecto IV',                        codigo: '56 CC233', creditos: 5, horas: '(0,6,0)', semestre: 10, estado: 'nocursada', anio: '-',      prerequisitos: ['CC230P'] },

    { id: 'YY129', nombre: 'Electivo de Formación I',            codigo: '58 YY129', creditos: 4, horas: '(4,0,0)', semestre: 11, estado: 'nocursada', anio: '-',      prerequisitos: [] },
    { id: 'YY130', nombre: 'Electivo de Formación II',           codigo: '59 YY130', creditos: 4, horas: '(4,0,0)', semestre: 11, estado: 'nocursada', anio: '-',      prerequisitos: [] },
    { id: 'YY131', nombre: 'Electivo de Formación III',          codigo: '60 YY131', creditos: 4, horas: '(4,0,0)', semestre: 11, estado: 'nocursada', anio: '-',      prerequisitos: [] },
    { id: 'CC235', nombre: 'Taller de Gestión',                  codigo: '61 CC235', creditos: 6, horas: '(0,6,0)', semestre: 11, estado: 'nocursada', anio: '-',      prerequisitos: [] },
    { id: 'CC238', nombre: 'Actividad de Titulación',            codigo: '62 CC238', creditos: 9, horas: '(0,8,0)', semestre: 11, estado: 'nocursada', anio: '-',      prerequisitos: ['CC233'] },
  ];

  constructor() {}

  ngOnInit(): void {}

  getAsignaturasBySemestre(semestre: number): Asignatura[] {
    return this.asignaturas.filter(a => a.semestre === semestre);
  }

  getEstadoClass(estado: EstadoAsignatura): string {
    return `asignatura--${estado}`;
  }

  getSemestreRomano(semestre: number): string {
    const romanos = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
    return romanos[semestre - 1] ?? semestre.toString();
  }

  getTotalAsignaturas(): number {
    return this.asignaturas.length;
  }

  getTotalCreditos(): number {
    return this.asignaturas.reduce((t, a) => t + a.creditos, 0);
  }

  getAsignaturasAprobadas(): number {
    return this.asignaturas.filter(a => a.estado === 'aprobado').length;
  }

  getCreditosAprobados(): number {
    return this.asignaturas
      .filter(a => a.estado === 'aprobado')
      .reduce((t, a) => t + a.creditos, 0);
  }

  getAsignaturasReprobadas(): number {
    return this.asignaturas.filter(a => a.estado === 'reprobada').length;
  }

  getAsignaturasActuales(): number {
    return this.asignaturas.filter(
      a => a.estado === 'cursando' || a.estado === 'inscrita'
    ).length;
  }

  getAvancePercentage(): number {
    return Math.round((this.getAsignaturasAprobadas() / this.getTotalAsignaturas()) * 100);
  }

  abrirModal(asignatura: Asignatura): void {
    this.selectedAsignatura = asignatura;
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.selectedAsignatura = null;
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cerrarModal();
    }
  }
}