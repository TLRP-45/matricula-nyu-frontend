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
  caracter?: string;
  nota?: string;
  oportunidad?: number;
}

export type EstadoAsignatura =
  | 'aprobado'
  | 'reprobada'
  | 'nocursada'
  | 'inscrita'
  | 'cursando'
  | 'prerrequisito'
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
  hoveredAsignaturaId: string | null = null;

  estadoLabel: Record<EstadoAsignatura, string> = {
    aprobado:      'Aprobada',
    reprobada:     'Reprobada',
    nocursada:     'No Cursada',
    inscrita:      'Inscrita',
    cursando:      'Cursando',
    prerrequisito: 'Prerrequisito',
    tributa:       'Tributa',
    seleccionada:  'Seleccionada',
  };

  estadoColor: Record<EstadoAsignatura, string> = {
    aprobado:      '#4BA3E3',
    reprobada:     '#E85B5B',
    nocursada:     '#FFFFFF',
    inscrita:      '#90D895',
    cursando:      '#90D895',
    prerrequisito: '#FFB74D',
    tributa:       '#E040FB',
    seleccionada:  '#64B5F6',
  };

  asignaturas: Asignatura[] = [
    { id: 'S1-1', nombre: 'Introducción al Cálculo', codigo: 'IC-001', creditos: 6, horas: '(4,2,0)', semestre: 1, estado: 'aprobado', anio: '2023/1', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '6,2', oportunidad: 1 },
    { id: 'S1-2', nombre: 'Introducción al Álgebra', codigo: 'IA-001', creditos: 6, horas: '(4,2,0)', semestre: 1, estado: 'aprobado', anio: '2023/1', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '5,5', oportunidad: 1 },
    { id: 'S1-3', nombre: 'Introducción a Ingeniería Informática', codigo: 'II-001', creditos: 4, horas: '(2,2,0)', semestre: 1, estado: 'aprobado', anio: '2023/1', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '5,8', oportunidad: 1 },
    { id: 'S1-4', nombre: 'Taller de Desarrollo Personal', codigo: 'TD-001', creditos: 4, horas: '(0,4,0)', semestre: 1, estado: 'aprobado', anio: '2023/1', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '6,5', oportunidad: 1 },
    { id: 'S1-5', nombre: 'Taller de Programación I', codigo: 'TP-001', creditos: 6, horas: '(0,6,0)', semestre: 1, estado: 'aprobado', anio: '2023/1', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '5,0', oportunidad: 1 },

    { id: 'S2-1', nombre: 'Cálculo I', codigo: 'CI-002', creditos: 6, horas: '(4,2,0)', semestre: 2, estado: 'aprobado', anio: '2023/2', prerequisitos: ['S1-1'], caracter: 'OBLIGATORIO(1)', nota: '5,1', oportunidad: 1 },
    { id: 'S2-2', nombre: 'Álgebra I', codigo: 'AI-002', creditos: 6, horas: '(4,2,0)', semestre: 2, estado: 'aprobado', anio: '2023/2', prerequisitos: ['S1-2'], caracter: 'OBLIGATORIO(1)', nota: '4,8', oportunidad: 1 },
    { id: 'S2-3', nombre: 'Introducción a la Física', codigo: 'IF-002', creditos: 5, horas: '(4,0,2)', semestre: 2, estado: 'aprobado', anio: '2023/2', prerequisitos: ['S1-1'], caracter: 'OBLIGATORIO(1)', nota: '5,9', oportunidad: 1 },
    { id: 'S2-4', nombre: 'Introducción al Trabajo en Proyectos', codigo: 'IT-002', creditos: 4, horas: '(2,2,0)', semestre: 2, estado: 'aprobado', anio: '2023/2', prerequisitos: ['S1-3', 'S1-5'], caracter: 'OBLIGATORIO(1)', nota: '6,0', oportunidad: 1 },
    { id: 'S2-5', nombre: 'Taller de Programación II', codigo: 'TP-002', creditos: 6, horas: '(0,6,0)', semestre: 2, estado: 'aprobado', anio: '2023/2', prerequisitos: ['S1-5'], caracter: 'OBLIGATORIO(1)', nota: '5,5', oportunidad: 1 },

    { id: 'S3-1', nombre: 'Cálculo II', codigo: 'CII-003', creditos: 6, horas: '(4,2,0)', semestre: 3, estado: 'aprobado', anio: '2024/1', prerequisitos: ['S2-1'], caracter: 'OBLIGATORIO(1)', nota: '4,5', oportunidad: 1 },
    { id: 'S3-2', nombre: 'Álgebra II', codigo: 'AII-003', creditos: 6, horas: '(4,2,0)', semestre: 3, estado: 'aprobado', anio: '2024/1', prerequisitos: ['S2-2'], caracter: 'OBLIGATORIO(1)', nota: '4,6', oportunidad: 1 },
    { id: 'S3-3', nombre: 'Mecánica Clásica', codigo: 'MC-003', creditos: 5, horas: '(4,0,2)', semestre: 3, estado: 'aprobado', anio: '2024/1', prerequisitos: ['S2-1', 'S2-3'], caracter: 'OBLIGATORIO(1)', nota: '5,2', oportunidad: 1 },
    { id: 'S3-4', nombre: 'Programación Orientada a Objetos', codigo: 'PO-003', creditos: 6, horas: '(4,0,2)', semestre: 3, estado: 'aprobado', anio: '2024/1', prerequisitos: ['S2-5'], caracter: 'OBLIGATORIO(1)', nota: '5,0', oportunidad: 1 },
    { id: 'S3-5', nombre: 'Fundamentos de Lenguajes de Programación', codigo: 'FL-003', creditos: 5, horas: '(4,2,0)', semestre: 3, estado: 'aprobado', anio: '2024/1', prerequisitos: ['S2-5'], caracter: 'OBLIGATORIO(1)', nota: '6,4', oportunidad: 1 },

    { id: 'S4-1', nombre: 'Cálculo III', codigo: 'CIII-004', creditos: 6, horas: '(4,2,0)', semestre: 4, estado: 'aprobado', anio: '2024/2', prerequisitos: ['S3-1'], caracter: 'OBLIGATORIO(1)', nota: '4,2', oportunidad: 1 },
    { id: 'S4-2', nombre: 'Ecuaciones Diferenciales', codigo: 'ED-004', creditos: 5, horas: '(4,2,0)', semestre: 4, estado: 'aprobado', anio: '2024/2', prerequisitos: ['S3-1', 'S3-2'], caracter: 'OBLIGATORIO(1)', nota: '4,4', oportunidad: 1 },
    { id: 'S4-3', nombre: 'Electricidad y Sistemas Digitales', codigo: 'ES-004', creditos: 5, horas: '(4,0,2)', semestre: 4, estado: 'aprobado', anio: '2024/2', prerequisitos: ['S3-2', 'S2-3'], caracter: 'OBLIGATORIO(1)', nota: '5,5', oportunidad: 1 },
    { id: 'S4-4', nombre: 'Algoritmos y Estructuras de Datos', codigo: 'AE-004', creditos: 6, horas: '(4,2,0)', semestre: 4, estado: 'aprobado', anio: '2024/2', prerequisitos: ['S3-4'], caracter: 'OBLIGATORIO(1)', nota: '6,0', oportunidad: 1 },
    { id: 'S4-5', nombre: 'Proyecto I', codigo: 'P1-004', creditos: 5, horas: '(0,6,0)', semestre: 4, estado: 'aprobado', anio: '2024/2', prerequisitos: ['S3-4', 'S2-4'], caracter: 'OBLIGATORIO(1)', nota: '6,2', oportunidad: 1 },
    { id: 'S4-6', nombre: 'Taller de Comunicación Oral y Escrita', codigo: 'TC-004', creditos: 4, horas: '(2,2,0)', semestre: 4, estado: 'aprobado', anio: '2024/2', prerequisitos: ['S4-5'], caracter: 'OBLIGATORIO(1)', nota: '5,8', oportunidad: 1 },

    { id: 'S5-1', nombre: 'Electromagnetismo', codigo: 'EL-005', creditos: 5, horas: '(4,0,2)', semestre: 5, estado: 'aprobado', anio: '2025/1', prerequisitos: ['S3-1', 'S3-2', 'S3-3'], caracter: 'OBLIGATORIO(1)', nota: '4,8', oportunidad: 1 },
    { id: 'S5-2', nombre: 'Estadística y Probabilidad', codigo: 'EP-005', creditos: 4, horas: '(3,1,0)', semestre: 5, estado: 'reprobada', anio: '2025/1', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '2,5', oportunidad: 1 },
    { id: 'S5-3', nombre: 'Arquitectura de Computadores', codigo: 'AC-005', creditos: 6, horas: '(4,0,2)', semestre: 5, estado: 'aprobado', anio: '2025/1', prerequisitos: ['S4-3'], caracter: 'OBLIGATORIO(1)', nota: '5,0', oportunidad: 1 },
    { id: 'S5-4', nombre: 'Tecnología de Objetos', codigo: 'TO-005', creditos: 6, horas: '(4,2,0)', semestre: 5, estado: 'aprobado', anio: '2025/1', prerequisitos: ['S4-4', 'S5-3'], caracter: 'OBLIGATORIO(1)', nota: '5,4', oportunidad: 1 },
    { id: 'S5-5', nombre: 'Taller de Técnicas de Programación', codigo: 'TT-005', creditos: 6, horas: '(0,6,0)', semestre: 5, estado: 'aprobado', anio: '2025/1', prerequisitos: ['S4-4'], caracter: 'OBLIGATORIO(1)', nota: '6,2', oportunidad: 1 },
    { id: 'S5-6', nombre: 'Taller de Ética y Resp. Social del Inf.', codigo: 'TE-005', creditos: 4, horas: '(2,2,0)', semestre: 5, estado: 'aprobado', anio: '2025/1', prerequisitos: ['S1-4'], caracter: 'OBLIGATORIO(1)', nota: '6,0', oportunidad: 1 },

    { id: 'S6-1', nombre: 'Tecnologías Web', codigo: 'TW-006', creditos: 6, horas: '(4,0,2)', semestre: 6, estado: 'aprobado', anio: '2025/2', prerequisitos: ['S5-4'], caracter: 'OBLIGATORIO(1)', nota: '5,1', oportunidad: 1 },
    { id: 'S6-2', nombre: 'Gestión de Empresas', codigo: 'GE-006', creditos: 5, horas: '(4,2,0)', semestre: 6, estado: 'aprobado', anio: '2025/2', prerequisitos: ['S5-2'], caracter: 'OBLIGATORIO(1)', nota: '6,0', oportunidad: 1 },
    { id: 'S6-3', nombre: 'Sistemas Operativos', codigo: 'SO-006', creditos: 6, horas: '(4,0,2)', semestre: 6, estado: 'aprobado', anio: '2025/2', prerequisitos: ['S5-3', 'S4-4'], caracter: 'OBLIGATORIO(1)', nota: '4,5', oportunidad: 1 },
    { id: 'S6-4', nombre: 'Bases de Datos', codigo: 'BD-006', creditos: 6, horas: '(4,0,2)', semestre: 6, estado: 'reprobada', anio: '2025/2', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '3,8', oportunidad: 1 },
    { id: 'S6-5', nombre: 'Proyecto II', codigo: 'P2-006', creditos: 5, horas: '(0,6,0)', semestre: 6, estado: 'aprobado', anio: '2025/2', prerequisitos: ['S5-4', 'S5-5', 'S4-5'], caracter: 'OBLIGATORIO(1)', nota: '5,5', oportunidad: 1 },
    { id: 'S6-6', nombre: 'Inglés I', codigo: 'IN-006', creditos: 4, horas: '(2,2,0)', semestre: 6, estado: 'aprobado', anio: '2025/2', prerequisitos: [], caracter: 'OBLIGATORIO(1)', nota: '6,5', oportunidad: 1 },

    { id: 'S7-1', nombre: 'Ingeniería de Software I', codigo: 'IS1-007', creditos: 6, horas: '(4,2,0)', semestre: 7, estado: 'nocursada', anio: '-', prerequisitos: ['S6-4'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S7-2', nombre: 'Taller de Aplicaciones Web', codigo: 'TAW-007', creditos: 6, horas: '(0,6,0)', semestre: 7, estado: 'nocursada', anio: '-', prerequisitos: ['S6-4', 'S6-1'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S7-3', nombre: 'Comunicación de Datos y Redes', codigo: 'CDR-007', creditos: 5, horas: '(4,0,2)', semestre: 7, estado: 'nocursada', anio: '-', prerequisitos: ['S6-3'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S7-4', nombre: 'Sistemas de Información', codigo: 'SI-007', creditos: 5, horas: '(4,2,0)', semestre: 7, estado: 'nocursada', anio: '-', prerequisitos: ['S6-2', 'S6-4'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S7-5', nombre: 'Teoría de la Computación', codigo: 'TC-007', creditos: 5, horas: '(4,2,0)', semestre: 7, estado: 'nocursada', anio: '-', prerequisitos: ['S3-2', 'S4-4'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S7-6', nombre: 'Inglés II', codigo: 'IN-007', creditos: 4, horas: '(2,2,0)', semestre: 7, estado: 'nocursada', anio: '-', prerequisitos: ['S6-6'], caracter: 'OBLIGATORIO(1)' },

    { id: 'S8-1', nombre: 'Ingeniería de Software II', codigo: 'IS2-008', creditos: 6, horas: '(4,2,0)', semestre: 8, estado: 'nocursada', anio: '-', prerequisitos: ['S7-1'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S8-2', nombre: 'Análisis y Diseño de Algoritmos', codigo: 'ADA-008', creditos: 5, horas: '(4,2,0)', semestre: 8, estado: 'nocursada', anio: '-', prerequisitos: ['S5-2', 'S7-5'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S8-3', nombre: 'Sistemas Distribuidos', codigo: 'SD-008', creditos: 6, horas: '(4,0,2)', semestre: 8, estado: 'nocursada', anio: '-', prerequisitos: ['S7-2', 'S7-3'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S8-4', nombre: 'Laboratorio Redes', codigo: 'LR-008', creditos: 4, horas: '(0,0,4)', semestre: 8, estado: 'nocursada', anio: '-', prerequisitos: ['S7-3'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S8-5', nombre: 'Proyecto III', codigo: 'P3-008', creditos: 5, horas: '(0,6,0)', semestre: 8, estado: 'nocursada', anio: '-', prerequisitos: ['S7-4', 'S7-1', 'S6-5'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S8-6', nombre: 'Electivo de Formación Profesional I', codigo: 'EF1-008', creditos: 4, horas: '(4,0,0)', semestre: 8, estado: 'nocursada', anio: '-', prerequisitos: [], caracter: 'ELECTIVO' },
    { id: 'S8-7', nombre: 'Práctica Profesional I', codigo: 'PP1-008', creditos: 0, horas: '(0,0,0)', semestre: 8, estado: 'nocursada', anio: '-', prerequisitos: ['S7-1', 'S7-2', 'S7-4', 'S6-5'], caracter: 'OBLIGATORIO(1)' },

    { id: 'S9-1', nombre: 'Gestión de Procesos de Negocios', codigo: 'GPN-009', creditos: 5, horas: '(4,2,0)', semestre: 9, estado: 'nocursada', anio: '-', prerequisitos: ['S7-4'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S9-2', nombre: 'Inteligencia Artificial', codigo: 'IA-009', creditos: 6, horas: '(4,2,0)', semestre: 9, estado: 'nocursada', anio: '-', prerequisitos: ['S8-2'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S9-3', nombre: 'Aplicaciones Distribuidas', codigo: 'AD-009', creditos: 6, horas: '(4,0,2)', semestre: 9, estado: 'nocursada', anio: '-', prerequisitos: ['S8-3', 'S8-4'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S9-4', nombre: 'Introducción a la Economía', codigo: 'IE-009', creditos: 4, horas: '(4,0,0)', semestre: 9, estado: 'nocursada', anio: '-', prerequisitos: ['S5-2', 'S6-2'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S9-5', nombre: 'Taller de Emprendimiento Tecnológico', codigo: 'TET-009', creditos: 5, horas: '(0,6,0)', semestre: 9, estado: 'nocursada', anio: '-', prerequisitos: ['S8-1'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S9-6', nombre: 'Arquitectura de Software', codigo: 'AS-009', creditos: 5, horas: '(4,2,0)', semestre: 9, estado: 'nocursada', anio: '-', prerequisitos: ['S7-1'], caracter: 'OBLIGATORIO(1)' },

    { id: 'S10-1', nombre: 'Modelos de Optimización', codigo: 'MO-010', creditos: 5, horas: '(4,2,0)', semestre: 10, estado: 'nocursada', anio: '-', prerequisitos: ['S5-2'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S10-2', nombre: 'Inteligencia de Negocios', codigo: 'IN-010', creditos: 6, horas: '(4,2,0)', semestre: 10, estado: 'nocursada', anio: '-', prerequisitos: ['S6-4'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S10-3', nombre: 'Gestión de Seguridad Informática', codigo: 'GSI-010', creditos: 5, horas: '(4,2,0)', semestre: 10, estado: 'nocursada', anio: '-', prerequisitos: ['S9-3'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S10-4', nombre: 'Preparación y Evaluación de Proyectos', codigo: 'PEP-010', creditos: 5, horas: '(4,2,0)', semestre: 10, estado: 'nocursada', anio: '-', prerequisitos: ['S7-1'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S10-5', nombre: 'Proyecto IV', codigo: 'P4-010', creditos: 6, horas: '(0,6,0)', semestre: 10, estado: 'nocursada', anio: '-', prerequisitos: ['S9-3', 'S9-5', 'S8-5'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S10-6', nombre: 'Minería de Datos', codigo: 'MD-010', creditos: 5, horas: '(4,2,0)', semestre: 10, estado: 'nocursada', anio: '-', prerequisitos: ['S9-2'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S10-7', nombre: 'Práctica Profesional II', codigo: 'PP2-010', creditos: 0, horas: '(0,0,0)', semestre: 10, estado: 'nocursada', anio: '-', prerequisitos: ['S9-1', 'S9-3', 'S8-5', 'S8-7'], caracter: 'OBLIGATORIO(1)' },

    { id: 'S11-1', nombre: 'Electivo de Formación Profesional II', codigo: 'EF2-011', creditos: 4, horas: '(4,0,0)', semestre: 11, estado: 'nocursada', anio: '-', prerequisitos: [], caracter: 'ELECTIVO' },
    { id: 'S11-2', nombre: 'Electivo de Formación Profesional III', codigo: 'EF3-011', creditos: 4, horas: '(4,0,0)', semestre: 11, estado: 'nocursada', anio: '-', prerequisitos: [], caracter: 'ELECTIVO' },
    { id: 'S11-3', nombre: 'Electivo de Formación Profesional IV', codigo: 'EF4-011', creditos: 4, horas: '(4,0,0)', semestre: 11, estado: 'nocursada', anio: '-', prerequisitos: [], caracter: 'ELECTIVO' },
    { id: 'S11-4', nombre: 'Taller de Gestión de TIC', codigo: 'TGT-011', creditos: 5, horas: '(2,4,0)', semestre: 11, estado: 'nocursada', anio: '-', prerequisitos: ['S10-2', 'S10-4'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S11-5', nombre: 'Actividad de Titulación', codigo: 'AT-011', creditos: 10, horas: '(0,10,0)', semestre: 11, estado: 'nocursada', anio: '-', prerequisitos: ['S1-1', 'S1-2', 'S2-1', 'S3-2', 'S3-1', 'S4-1', 'S4-2', 'S5-1', 'S5-4', 'S6-1', 'S7-1', 'S8-1', 'S9-1', 'S10-1'], caracter: 'OBLIGATORIO(1)' },
    { id: 'S11-6', nombre: 'Inglés III', codigo: 'IN3-011', creditos: 4, horas: '(2,2,0)', semestre: 11, estado: 'nocursada', anio: '-', prerequisitos: [], caracter: 'OBLIGATORIO(1)' },
  ];

  constructor() {}
  ngOnInit(): void {}

  getAsignaturasBySemestre(semestre: number): Asignatura[] {
    return this.asignaturas.filter(a => a.semestre === semestre);
  }

  getEstadoClass(estado: EstadoAsignatura): string {
    return `asignatura--${estado}`;
  }

  getCardClass(asignatura: Asignatura): string {
    if (this.hoveredAsignaturaId) {
      const hovered = this.asignaturas.find(a => a.id === this.hoveredAsignaturaId);
      if (hovered && hovered.prerequisitos?.includes(asignatura.id)) {
        return 'asignatura--prerrequisito';
      }
      if (asignatura.prerequisitos?.includes(this.hoveredAsignaturaId)) {
        return 'asignatura--tributa';
      }
    }
    return this.getEstadoClass(asignatura.estado);
  }

  onMouseEnter(asignatura: Asignatura): void {
    this.hoveredAsignaturaId = asignatura.id;
  }

  onMouseLeave(): void {
    this.hoveredAsignaturaId = null;
  }

  getSemestreRomano(semestre: number): string {
    const romanos = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
    return romanos[semestre - 1] ?? semestre.toString();
  }

  getPrerequisitosData(ids: string[]): { codigo: string, nombre: string }[] {
    return ids.map(id => {
      const asig = this.asignaturas.find(a => a.id === id);
      return { 
        codigo: asig ? asig.codigo : id, 
        nombre: asig ? asig.nombre : id 
      };
    });
  }

  getTributasData(id: string): { codigo: string, nombre: string }[] {
    return this.asignaturas
      .filter(a => a.prerequisitos?.includes(id))
      .map(a => ({ 
        codigo: a.codigo, 
        nombre: a.nombre 
      }));
  }

  getTotalAsignaturas(): number { return this.asignaturas.length; }

  getTotalCreditos(): number {
    return this.asignaturas.reduce((t, a) => t + a.creditos, 0);
  }

  getAsignaturasAprobadas(): number {
    return this.asignaturas.filter(a => a.estado === 'aprobado').length;
  }

  getCreditosAprobados(): number {
    return this.asignaturas.filter(a => a.estado === 'aprobado').reduce((t, a) => t + a.creditos, 0);
  }

  getAsignaturasReprobadas(): number {
    return this.asignaturas.filter(a => a.estado === 'reprobada').length;
  }

  getAsignaturasActuales(): number {
    return this.asignaturas.filter(a => a.estado === 'cursando' || a.estado === 'inscrita').length;
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