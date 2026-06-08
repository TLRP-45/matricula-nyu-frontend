export interface Carrera {
  id: number;
  nombre: string;
  facultad: string;
  duracion: number;
  cupos: number;
}

export type ToastType = 'success' | 'danger';

export interface Toast {
  id: number;
  msg: string;
  type: ToastType;
}
