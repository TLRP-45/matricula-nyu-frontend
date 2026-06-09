import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {
  obtenerFechaMaxima(fechaInicio: string): string {
    const inicio = new Date(fechaInicio);

    inicio.setMonth(inicio.getMonth() + 6);

    return inicio.toISOString().split('T')[0];
  }

  formatearFechaInput(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  parseFecha(fecha: string): Date {
    const [year, month, day] = fecha.split('-').map(Number);

    return new Date(year, month - 1, day);
  }

  validarPeriodo(fechaInicio: Date, fechaTermino: Date): string | null {
    if (fechaTermino <= fechaInicio) {
      return 'La fecha de término debe ser posterior a la fecha de inicio';
    }

    const diferenciaMs = fechaTermino.getTime() - fechaInicio.getTime();

    const maximoMs = 1000 * 60 * 60 * 24 * 31 * 6;

    if (diferenciaMs > maximoMs) {
      return 'El período no puede durar más de 6 meses';
    }

    return null;
  }
}
