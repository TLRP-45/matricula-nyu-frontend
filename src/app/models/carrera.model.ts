export interface Semestre {
  id: number;
  num: number;
  anio: string;
  asignaturas: string[];
}

export interface Carrera {
  id: number;
  nombre: string;
  facultad: string;
  duracion: string;
  semestres: Semestre[];
}

export type ToastType = 'success' | 'danger';

export interface Toast {
  id: number;
  msg: string;
  type: ToastType;
}
