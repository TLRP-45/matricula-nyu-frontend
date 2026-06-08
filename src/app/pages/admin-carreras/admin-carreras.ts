import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CarrerasService } from '../../services/carreras.service';
import { Carrera } from '../../models/carrera.model';

interface Toast {
  id: number;
  msg: string;
  type: 'success' | 'error';
}
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

@Component({
  selector: 'app-admin-carreras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-carreras.html',
  styleUrls: ['./admin-carreras.css']
})
export class AdminCarrerasComponent implements OnInit, OnDestroy {

  carreras$: Observable<Carrera[]>;
  private sub?: Subscription;
  carreras: Carrera[] = [];

  showModalCarrera = false;
  showModalConfirm = false;

  editingCarreraId: number | null = null;

  formCarrera = {
    nombre: '',
    facultad: '',
    duracion: null as number | null,
    cupos: null as number | null
  };

  deleteType: 'carrera' = 'carrera';
  deleteTarget: number | null = null;
  deleteNombre = '';

  toasts: { id: number; msg: string; type: 'success' | 'error' }[] = [];
  private toastSeq = 0;

  readonly facultades = ['Ingeniería', 'Medicina', 'Cs. Sociales', 'Derecho', 'Economía', 'Arte y Diseño'];
  readonly duraciones = [3, 4, 5, 6];

  constructor(private svc: CarrerasService) {
    this.carreras$ = this.svc.getCarreras$();
  }

  ngOnInit(): void {
    this.svc.cargarCarreras();
    this.sub = this.carreras$.subscribe(list => {
      this.carreras = list;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  openCarreraModal(c?: Carrera): void {
    this.editingCarreraId = c?.id ?? null;

    this.formCarrera = {
      nombre: c?.nombre ?? '',
      facultad: c?.facultad ?? '',
      duracion: c ? Number(c.duracion) : null,
      cupos: c?.cupos ?? null
    };

    this.showModalCarrera = true;
  }

  saveCarrera(): void {
    const { nombre, facultad, duracion, cupos } = this.formCarrera;

    if (!nombre.trim() || !facultad || duracion === null || cupos === null) {
      this.toast('Completa todos los campos', 'error');
      return;
    }

    if (this.editingCarreraId !== null) {

      const data: UpdateCarrera = {
        nombre: nombre.trim(),
        facultad,
        duracion,
        cupos
      };

      this.svc.actualizarCarrera(data, this.editingCarreraId).subscribe({
        next: () => {
          this.svc.cargarCarreras();
          this.toast('Carrera actualizada', 'success');
        },
        error: () => this.toast('Error al actualizar', 'error')
      });

    } else {

      const data: CreateCarrera = {
        nombre: nombre.trim(),
        facultad,
        duracion,
        cupos
      };

      this.svc.crearCarrera(data).subscribe({
        next: () => {
          this.svc.cargarCarreras();
          this.toast('Carrera creada', 'success');
        },
        error: () => this.toast('Error al crear', 'error')
      });
    }

    this.showModalCarrera = false;
  }

  askDelete(id: number, nombre: string): void {
    this.deleteTarget = id;
    this.deleteNombre = nombre;
    this.showModalConfirm = true;
  }

  confirmDelete(): void {
    if (!this.deleteTarget) return;

    this.svc.eliminarCarrera(this.deleteTarget).subscribe({
      next: () => {
        this.svc.cargarCarreras();
        this.toast('Carrera eliminada', 'success');
      },
      error: () => this.toast('Error al eliminar', 'error')
    });

    this.showModalConfirm = false;
  }

  toast(msg: string, type: 'success' | 'error'): void {
    const id = this.toastSeq++;
    this.toasts.push({ id, msg, type });

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 3000);
  }
}