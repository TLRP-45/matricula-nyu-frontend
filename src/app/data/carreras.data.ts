import { Carrera } from '../models/carrera';

export const CARRERAS: Carrera[] = [
  {
    id: 1,
    codigo: 'ICCI',
    nombre: 'Ingeniería Civil Informática',
    facultad: 'Ingeniería',
    duracion: '5',
    semestres: [
      {
        id: 1,
        num: 1,
        anio: '1° año',
        asignaturas: ['MAT601', 'FIS101', 'PROG208'],
      },
      {
        id: 2,
        num: 2,
        anio: '1° año',
        asignaturas: ['PROG201', 'EST101'],
      },
    ],
  },

  {
    id: 2,
    codigo: 'MED',
    nombre: 'Medicina',
    facultad: 'Medicina',
    duracion: '6',
    semestres: [
      {
        id: 1,
        num: 1,
        anio: '1° año',
        asignaturas: ['BIO101', 'QUI101', 'ANA101'],
      },
      {
        id: 2,
        num: 2,
        anio: '1° año',
        asignaturas: ['FISMED101', 'BIO102'],
      },
    ],
  },

  {
    id: 3,
    codigo: 'DER',
    nombre: 'Derecho',
    facultad: 'Derecho',
    duracion: '5',
    semestres: [
      {
        id: 1,
        num: 1,
        anio: '1° año',
        asignaturas: ['DER101', 'HIS101'],
      },
      {
        id: 2,
        num: 2,
        anio: '1° año',
        asignaturas: ['DER102', 'CIV101'],
      },
    ],
  },
];
