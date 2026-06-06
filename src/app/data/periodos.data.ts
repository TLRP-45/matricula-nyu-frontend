import { Periodo } from '../models/periodo';

export const PERIODOS: Periodo[] = [
  {
    codigo: '2026-1',

    nombre: '2026 Semestre 1',

    activo: true,

    fechaInicio: new Date(2026, 2, 1),
    fechaTermino: new Date(2026, 6, 15),
  },

  {
    codigo: '2026-2',

    nombre: '2026 Semestre 2',

    activo: false,

    fechaInicio: new Date(2026, 7, 1),
    fechaTermino: new Date(2026, 11, 15),
  },
];
