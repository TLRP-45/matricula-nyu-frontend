import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Semestre {
  id: number;
  num: number;
  anio: string;
  asignaturas: string[];
}

interface Carrera {
  id: number;
  nombre: string;
  facultad: string;
  duracion: string;
  semestres: Semestre[];
}

interface Toast {
  id: number;
  msg: string;
  type: 'success' | 'danger';
}

@Component({
  selector: 'app-admin-carreras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-carreras.html',
  styleUrls: ['./admin-carreras.css']
})
export class AdminCarrerasComponent {

  carreras: Carrera[] = [
    {
      id: 1, nombre: 'Ingeniería Civil Informática', facultad: 'Ingeniería', duracion: '5',
      semestres: [
        { id: 1, num: 1, anio: '1° año', asignaturas: ['Cálculo I', 'Álgebra Lineal', 'Intro. Programación'] },
        { id: 2, num: 2, anio: '1° año', asignaturas: ['Cálculo II', 'Estructuras de Datos', 'Física I'] }
      ]
    },
    { id: 2, nombre: 'Medicina', facultad: 'Medicina', duracion: '6', semestres: [] },
    { id: 3, nombre: 'Derecho', facultad: 'Derecho', duracion: '5', semestres: [] }
  ];
  private nextId = 10;

  readonly facultades = ['Ingeniería', 'Medicina', 'Cs. Sociales', 'Derecho', 'Economía', 'Arte y Diseño'];
  readonly duraciones = ['3', '4', '5', '6'];
  readonly anios      = ['1° año', '2° año', '3° año', '4° año', '5° año'];

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
      const c = this.carreras.find(x => x.id === this.editingCarreraId)!;
      c.nombre = nombre.trim();
      c.facultad = facultad;
      c.duracion = duracion;
      this.showToast('Carrera actualizada correctamente', 'success');
    } else {
      this.carreras.push({
        id: this.nextId++,
        nombre: nombre.trim(),
        facultad,
        duracion,
        semestres: []
      });
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
      const s = c.semestres.find(x => x.id === this.editingSemestreId)!;
      s.num = num; s.anio = anio; s.asignaturas = [...this.tempAsigs];
      this.showToast('Semestre actualizado correctamente', 'success');
    } else {
      if (c.semestres.find(x => x.num === num)) {
        this.showToast(`El semestre ${num} ya existe en esta carrera`, 'danger');
        return;
      }
      c.semestres.push({ id: this.nextId++, num, anio, asignaturas: [...this.tempAsigs] });
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
      this.carreras = this.carreras.filter(x => x.id !== this.deleteTarget);
      if (this.currentView === 'semestres') this.backToCarreras();
      this.showToast('Carrera eliminada', 'success');
    } else {
      this.currentCarrera!.semestres =
        this.currentCarrera!.semestres.filter(x => x.id !== this.deleteTarget);
      this.showToast('Semestre eliminado', 'success');
    }
    this.showModalConfirm = false;
  }

  showToast(msg: string, type: 'success' | 'danger'): void {
    const id = this.toastSeq++;
    this.toasts.push({ id, msg, type });
    setTimeout(() => this.toasts = this.toasts.filter(t => t.id !== id), 3200);
  }
}