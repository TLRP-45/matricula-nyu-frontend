import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { MallaService } from '../../services/malla.service';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

// Coloca algo para cargar, porque los datos llegan atrasados del backend❕❕


export interface Asignatura {
  ID_asignatura: number;
  nombre: string;
  creditos: number;
  caracter: string;
  hrs_presenciales: number;
  hrs_autonomo: number;

  prerrequisitos?: Asignatura[];
  esPrerequisitoDe?: Asignatura[];

  deletedAt?: Date | null;
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

  carreraNombre: any;
  carrera: any;
  semestres: number[] = [];
  selectedAsignatura: Asignatura | null = null;
  modalVisible: boolean = false;
  hoveredAsignaturaId: number | null = null;
  asignaturasPorSemestre: {
    semestre: number;
    asignaturas: Asignatura[];
  }[] = [];
  estados: Record<number, EstadoAsignatura> = {};

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


  constructor(private mallaService: MallaService) {}

  async ngOnInit() {
    //cambiar a la logica real
    sessionStorage.setItem('id', JSON.stringify(1));

    this.mallaService.obtenerCarrera().subscribe((aux: any) => {
      console.log('carga');
      this.carreraNombre = aux.nombre;
      this.carrera=aux;

      console.log(this.carrera);

      this.mallaService.obtenerSemestres(aux.id_carrera).subscribe(cant => {
        console.log('SEMESTRES RAW:', cant);
        const n = Number(cant);
        this.semestres = Array.from({ length: n }, (_, i) => i + 1);
        console.log('SEMESTRES FINAL:', this.semestres);

        this.semestres.forEach(semestre => {
          this.loadSemestre(aux.id_carrera, semestre);
        });
      });

      console.log('cargó');
    });
  }

  // Carga asignaturas al diccionario que las guarda por semestre
  // Y carga los estados de las asignaturas en el diccionario de estados
  getAsignaturasBySemestre(semestre: number) {
    this.mallaService.obtenerAsignaturaPorSemestre(
      this.carrera.id_carrera,
      semestre
    ).subscribe(asignaturas => {

      console.log('Semestre', semestre, asignaturas);

      this.asignaturasPorSemestre.push({
        semestre,
        asignaturas
      });

      forkJoin(
        asignaturas.map(asig =>
          this.mallaService.obtenerEstadoAsignatura(asig.ID_asignatura)
        )
      ).subscribe(estados => {
        asignaturas.forEach((asig, i) => {
          this.estados[asig.ID_asignatura] =
            estados[i] as EstadoAsignatura;
        });
      });

    });
  }

  loadSemestre(carreraId: number, semestre: number) {
    this.mallaService.obtenerAsignaturaPorSemestre(carreraId, semestre)
      .subscribe(asignaturas => {
        console.log('LOAD:', semestre, asignaturas);

        this.asignaturasPorSemestre.push({
          semestre,
          asignaturas
        });

        forkJoin(
          asignaturas.map(asig =>
            this.mallaService.obtenerEstadoAsignatura(asig.ID_asignatura)
          )
        ).subscribe(estados => {
          asignaturas.forEach((asig, i) => {
            this.estados[asig.ID_asignatura] =
              estados[i] as EstadoAsignatura;
          });
        });
      });
  }

  getAsignaturasDelSemestre(semestre: number): Asignatura[] {
    return this.asignaturasPorSemestre.find(
      s => s.semestre === semestre
    )?.asignaturas ?? [];
  }

  getEstadoClass(estado: EstadoAsignatura): string {
    return `asignatura--${estado}`;
  }

  getCardClass(asignatura: Asignatura): string {
    if (this.hoveredAsignaturaId) {
      const hovered = this.asignaturasPorSemestre
      .flatMap(s => s.asignaturas)
      .find(a => a.ID_asignatura === this.hoveredAsignaturaId);

      if (hovered && hovered.prerrequisitos?.includes(asignatura)) {
        return 'asignatura--prerrequisito';
      }
      if (hovered && asignatura.esPrerequisitoDe?.some(a => a.ID_asignatura === hovered.ID_asignatura)) {
        return 'asignatura--tributa';
      }
    }
    const estado = this.estados[asignatura.ID_asignatura] ?? 'nocursada'
    return this.getEstadoClass(estado);
  }

  onMouseEnter(asignatura: Asignatura): void {
    this.hoveredAsignaturaId = asignatura.ID_asignatura;
  }

  onMouseLeave(): void {
    this.hoveredAsignaturaId = null;
  }

  getSemestreRomano(semestre: number): string {
    const romanos = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVII'];
    return romanos[semestre - 1] ?? semestre.toString();
  }

  getPrerequisitosData(id: number): Observable<{ nombre: string, id: number }[]>{
    return this.mallaService.obtenerPrerrequisitos(
      id,
      this.carrera.id_carrera
    ).pipe(
      map((asignaturas: Asignatura[]) =>
        asignaturas.map(asig => ({
          nombre: asig.nombre,
          id: asig.ID_asignatura
        }))
      )
    );
  }

  getTributasData(id: number): Observable<{ nombre: string, id: number }[]>{
    return this.mallaService.obtenerTributas(
      id,
      this.carrera.id_carrera
    ).pipe(
      map((asignaturas: Asignatura[]) =>
        asignaturas.map(asig => ({
          nombre: asig.nombre,
          id: asig.ID_asignatura
        }))
      )
    );
  }

  getSemestreAsignatura(idAsignatura: number): number | null {
    const bloque = this.asignaturasPorSemestre.find(s =>
      s.asignaturas.some(a => a.ID_asignatura === idAsignatura)
    );

    return bloque?.semestre ?? null;
  }

  getTotalAsignaturas(): number { return this.asignaturasPorSemestre.length; }

  getTotalCreditos(): number {
    return this.asignaturasPorSemestre.flatMap(s=>s.asignaturas).reduce((t, a) => t + a.creditos, 0);
  }

  getAsignaturasAprobadas(): number {
    return Object.values(this.estados).filter(estado => estado === 'aprobado').length;
  }

  getCreditosAprobados(): number {
    return this.asignaturasPorSemestre
      .flatMap(s => s.asignaturas)
      .filter(a => this.estados[a.ID_asignatura] === 'aprobado')
      .reduce((t, a) => t + a.creditos, 0);
  }

  getAsignaturasReprobadas(): number {
    return Object.values(this.estados).filter(estado => estado === 'reprobada').length;
  }

  getAsignaturasActuales(): number {
    return Object.values(this.estados).filter(estado => estado === 'cursando' || estado === 'inscrita').length;
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