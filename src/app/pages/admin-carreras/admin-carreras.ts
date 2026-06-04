import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasService } from '../../services/carreras.service';
import { Carrera, Semestre, Toast } from '../../models/carrera.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';

export interface CreateCarrera{
  nombre: string;
  facultad: string;
  duracion: number;
  cupos: number;
}

export interface UpdateCarrera{
  nombre?: string;
  facultad?: string;
  duracion?: number;
  cupos?: number;
}

export interface AsignarAsignatura{
    ID_asignatura: number;
    semestre: number;
    posicion: number;
}

@Component({
  selector: 'app-admin-carreras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-carreras.html',
  styleUrls: ['./admin-carreras.css']
})
export class AdminCarrerasComponent implements OnInit {

  carreras: Carrera[] = [];

  readonly facultades = ['Ingeniería', 'Medicina', 'Cs. Sociales', 'Derecho', 'Economía', 'Arte y Diseño'];
  readonly duraciones = ['3', '4', '5', '6'];
  readonly anios      = ['1° año', '2° año', '3° año', '4° año', '5° año'];
  constructor(
    private carrerasService: CarrerasService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.carrerasService.getCarreras$().subscribe(list => {
      this.carreras = list;
      if (this.currentCarrera) {
        // refresh reference to the up-to-date carrera object
        this.currentCarrera = this.carreras.find(c => c.id === this.currentCarrera!.id) || null;
      }
    });
  }

  currentView: 'carreras' | 'semestres' = 'carreras';
  currentCarrera: Carrera | null = null;

  showModalCarrera  = false;
  showModalSemestre = false;
  showModalConfirm  = false;

  editingCarreraId: number | null = null;
  formCarrera = { nombre: '', facultad: '', duracion: '' };

  editingSemestreId: number | null = null;
  formSemestre = { num: null as number | null, anio: '1° año' };
  tempAsigs: string[]  = [];
  newAsigInput = '';

  deleteType: 'carrera' | 'semestre' | null = null;
  deleteTarget: number | null = null;
  deleteNombre = '';

  toasts: Toast[] = [];
  private toastSeq = 0;

  totalAsigs(c: Carrera): number {
    return c.semestres.reduce((s, sem) => s + sem.asignaturas.length, 0);
  }

  sortedSemestres(c: Carrera): Semestre[] {
    return [...c.semestres].sort((a, b) => a.num - b.num);
  }

  openSemestresView(c: Carrera): void {
    this.currentCarrera = c;
    this.currentView = 'semestres';
  }

  backToCarreras(): void {
    this.currentView = 'carreras';
    this.currentCarrera = null;
  }

  openCarreraModal(c?: Carrera): void {
    this.editingCarreraId = c?.id ?? null;
    this.formCarrera = {
      nombre:   c?.nombre   ?? '',
      facultad: c?.facultad ?? '',
      duracion: c?.duracion ?? ''
    };
    this.showModalCarrera = true;
  }

  saveCarrera(): void {
    const { nombre, facultad, duracion } = this.formCarrera;
    if (!nombre.trim() || !facultad || !duracion) {
      this.showToast('Completa todos los campos', 'danger');
      return;
    }
    if (this.editingCarreraId !== null) {
      this.carrerasService.updateCarrera(this.editingCarreraId, {
        nombre: nombre.trim(), facultad, duracion
      });
      this.showToast('Carrera actualizada correctamente', 'success');
    } else {
      this.carrerasService.addCarrera({ nombre: nombre.trim(), facultad, duracion, semestres: [] });
      this.showToast('Carrera creada correctamente', 'success');
    }
    this.showModalCarrera = false;
  }

  openSemestreModal(s?: Semestre): void {
    this.editingSemestreId = s?.id ?? null;
    this.formSemestre = { num: s?.num ?? null, anio: s?.anio ?? '1° año' };
    this.tempAsigs = s ? [...s.asignaturas] : [];
    this.newAsigInput = '';
    this.showModalSemestre = true;
  }

  addTempAsig(): void {
    const v = this.newAsigInput.trim();
    if (!v) return;
    if (this.tempAsigs.includes(v)) {
      this.showToast('Asignatura ya agregada', 'danger');
      return;
    }
    this.tempAsigs.push(v);
    this.newAsigInput = '';
  }

  removeTempAsig(i: number): void {
    this.tempAsigs.splice(i, 1);
  }

  saveSemestre(): void {
    const { num, anio } = this.formSemestre;
    if (!num || num < 1) {
      this.showToast('Ingresa un número de semestre válido', 'danger');
      return;
    }
    if (!this.tempAsigs.length) {
      this.showToast('Agrega al menos una asignatura', 'danger');
      return;
    }
    const c = this.currentCarrera!;
    if (this.editingSemestreId !== null) {
      this.carrerasService.updateSemestre(c.id, this.editingSemestreId, { num, anio, asignaturas: [...this.tempAsigs] });
      this.showToast('Semestre actualizado correctamente', 'success');
    } else {
      if (c.semestres.find(x => x.num === num)) {
        this.showToast(`El semestre ${num} ya existe en esta carrera`, 'danger');
        return;
      }
      this.carrerasService.addSemestre(c.id, { id: 0, num, anio, asignaturas: [...this.tempAsigs] });
      this.showToast('Semestre agregado correctamente', 'success');
    }
    this.showModalSemestre = false;
  }

  askDelete(type: 'carrera' | 'semestre', id: number, nombre: string): void {
    this.deleteType   = type;
    this.deleteTarget = id;
    this.deleteNombre = nombre;
    this.showModalConfirm = true;
  }

  confirmDelete(): void {
    if (this.deleteType === 'carrera') {
      this.carrerasService.deleteCarrera(this.deleteTarget!);
      if (this.currentView === 'semestres') this.backToCarreras();
      this.showToast('Carrera eliminada', 'success');
    } else {
      this.carrerasService.deleteSemestre(this.currentCarrera!.id, this.deleteTarget!);
      this.showToast('Semestre eliminado', 'success');
    }
    this.showModalConfirm = false;
  }

  showToast(msg: string, type: 'success' | 'danger'): void {
    const id = this.toastSeq++;
    this.toasts.push({ id, msg, type });
    setTimeout(() => this.toasts = this.toasts.filter(t => t.id !== id), 3200);
  }

// ENPOINTS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  obtenerCarreras(){
    return this.http.get(`${environment.apiUrl}/carrera`);
  }

  obtenerSemestres(carreraID: number){
    return this.http.get(`${environment.apiUrl}/carrera/${carreraID}/semestres`);
  }

  // Por si haces buscador____________________________________________________________
  buscarCarreraNombre(busqueda: string){
    return this.http.get(`${environment.apiUrl}/carrera/buscar/nombre/${busqueda}`);
  }

  buscarCarreraFacultad(busqueda: string){
    return this.http.get(`${environment.apiUrl}/carrera/buscar/facultad/${busqueda}`);
  }

  // POST_____________________________________________________________________________
  crearCarrera(carrera: CreateCarrera) {
    return this.http.post(`${environment}/carrera`, carrera);
  }

  // PUT_______________________________________________________________________
  actualizarCarrera(carrera: UpdateCarrera, carreraID: number) {
    return this.http.put(`${environment}/carrera/${carreraID}/actualizar`, carrera);
  }

  //DELETE_____________________________________________________________________
  eliminarCarrera(carreraID: number) {
    return this.http.delete(`${environment}/carrera/${carreraID}`);
  }

  //Asignaturas________________________________________________________________ (para seleccionar y después agregar o eliminar)
  getAsignaturasPorCarrera(carreraID:number){
    return this.http.get(`${environment}/carrera/${carreraID}/asignaturas`);
  }

  //PUSH........................................................................................................................
  putPushAsignatura(carreraID: number, asignatura: AsignarAsignatura) {
    return this.http.put(`${environment}/carrera/${carreraID}/actualizar/asignatura/remove`, asignatura);
  }

  //REMOVE......................................................................................................................
  putRemoveAsignatura(carreraID: number, asignaturaID: number) {
    return this.http.put(`${environment}/carrera/${carreraID}/actualizar/asignatura/remove`, {ID_asignatura: asignaturaID});
  }
}