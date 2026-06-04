import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { MallaService } from '../../services/malla.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';

// Coloca algo para cargar, porque los datos llegan atrasados del backend❕❕


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

  carrera: any;
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
    prerreq_sem:   'Prerreq. Semestre',
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
    prerreq_sem:   '#6C63C0',
    tributa:       '#4CAF50',
    seleccionada:  '#64B5F6',
  };

  asignaturas: Asignatura[] = [];


  constructor(
    private mallaService: MallaService,
    private http: HttpClient,
  ) {}

  async ngOnInit() {
    //cambiar a la logica real
    sessionStorage.setItem('id', JSON.stringify(1));

    if (!this.mallaService.getAsignaturasSnapshot().length) {
      this.mallaService.setAsignaturas(this.asignaturasPlaceholder());
    }
    this.obtenerCarrera().subscribe((aux: any) => {
      this.carrera = aux.nombre;
    });
    this.mallaService.getAsignaturas$().subscribe(list => this.asignaturas = list);
  }

  private asignaturasPlaceholder(): Asignatura[] {
    const lista: Asignatura[] = [];
    for (let s = 1; s <= 11; s++) {
      lista.push({
        id: `S${s}-1`,
        nombre: `Asignatura ${s}`,
        codigo: `C${s}00`,
        creditos: 4,
        horas: '(4,0,0)',
        semestre: s,
        estado: 'nocursada',
        anio: '-'
      });
    }
    return lista;
  }

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

// ENPOINTS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  obtenerCarrera() {
    // Cambiar el nombre a lo que haya
    const estudianteID = sessionStorage.getItem('id');
    return this.http.get(`${environment.apiUrl}/carrera/${estudianteID}`);
  }

  obtenerSemestres(carreraID: number){
    return this.http.get(`${environment.apiUrl}/carrera/${carreraID}/semestres`);
  }

  obtenerAsignaturaPorSemestre(carreraID:number, semestre: number){
    return this.http.get(`${environment.apiUrl}/carrera/${carreraID}/asignaturas/${semestre}`);
  }

  obtenerEstadoAsignatura(asignaturaID: number){
    const estudianteID = localStorage.getItem('id');
    return this.http.get(`${environment.apiUrl}/asignaturas/${asignaturaID}/${estudianteID}/estado`);
  }

// Estas cada vez que se seleccione una asignatura _______________________________________________________

  obtenerPrerrequisitos(asignaturaID:number, carreraID:number){
    return this.http.get(`${environment.apiUrl}/asignaturas/${asignaturaID}/prerrequisitos/${carreraID}`);
  }

  obtenerTributas(asignaturaID:number, carreraID:number){
    return this.http.get(`${environment.apiUrl}/asignaturas/${asignaturaID}/tributas/${carreraID}`);
  }
}