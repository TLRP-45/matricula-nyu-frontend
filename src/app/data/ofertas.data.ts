import { Oferta } from '../models/oferta';

export const OFERTAS: Oferta[] = [
  {
    id: 'OF-MAT601-ICCI-2026-1',

    carrera: 'ICCI',
    periodoAcademico: '2026-1',

    asignatura: {
      codigo: 'MAT601',
      nombre: 'Cálculo I',
      caracter: 'Obligatorio',
      creditos: 8,
      horasPresenciales: 96,
      horasAutonomas: 126,
      requisitos: [
        {
          codigo: 'MAT067',
          nombre: 'Introducción al Cálculo',
        },
      ],
    },

    grupos: {
      catedra: [
        {
          id: 'MAT601-CAT-A',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Dr. Pérez',
          cupos: 40,
          horarios: [
            {
              dia: 'Lunes',
              horaInicio: '08:00',
              horaFin: '09:30',
            },
          ],
          seleccionado: false,
        },
      ],
      taller: [],
      laboratorio: [],
    },

    inscrita: false,
  },

  {
    id: 'OF-FIS101-ICCI-2026-1',

    carrera: 'ICCI',
    periodoAcademico: '2026-1',

    asignatura: {
      codigo: 'FIS101',
      nombre: 'Física I',
      caracter: 'Obligatorio',
      creditos: 4,
      horasPresenciales: 72,
      horasAutonomas: 67,
      requisitos: [
        {
          codigo: 'MAT601',
          nombre: 'Cálculo I',
        },
      ],
    },

    grupos: {
      catedra: [
        {
          id: 'FIS101-CAT-A',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Dr. Ramírez',
          cupos: 35,
          horarios: [
            {
              dia: 'Martes',
              horaInicio: '09:40',
              horaFin: '11:10',
            },
          ],
          seleccionado: false,
        },
      ],

      taller: [],

      laboratorio: [
        {
          id: 'FIS101-LAB-A',
          tipo: 'laboratorio',
          letra: 'A',
          profesor: 'María López',
          cupos: 15,
          horarios: [
            {
              dia: 'Jueves',
              horaInicio: '16:20',
              horaFin: '17:50',
            },
          ],
          seleccionado: false,
        },
      ],
    },

    inscrita: false,
  },

  {
    id: 'OF-PROG208-ICCI-2026-1',

    carrera: 'ICCI',
    periodoAcademico: '2026-1',

    asignatura: {
      codigo: 'PROG208',
      nombre: 'Taller de Programación II',
      caracter: 'Obligatorio',
      creditos: 6,
      horasPresenciales: 72,
      horasAutonomas: 82,
      requisitos: [
        {
          codigo: 'PROG199',
          nombre: 'Taller de Programación I',
        },
      ],
    },

    grupos: {
      catedra: [
        {
          id: 'PROG208-CAT-A',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Ing. Torres',
          cupos: 30,
          horarios: [
            {
              dia: 'Miércoles',
              horaInicio: '08:00',
              horaFin: '09:30',
            },
          ],
          seleccionado: false,
        },
      ],

      taller: [
        {
          id: 'PROG208-TAL-A',
          tipo: 'taller',
          letra: 'A',
          profesor: 'Carlos Muñoz',
          cupos: 20,
          horarios: [
            {
              dia: 'Viernes',
              horaInicio: '09:40',
              horaFin: '11:10',
            },
          ],
          seleccionado: false,
        },
      ],

      laboratorio: [],
    },

    inscrita: false,
  },

  {
    id: 'OF-PROG201-ICCI-2026-2',

    carrera: 'ICCI',
    periodoAcademico: '2026-2',

    asignatura: {
      codigo: 'PROG201',
      nombre: 'Estructuras de Datos',
      caracter: 'Obligatorio',
      creditos: 6,
      horasPresenciales: 72,
      horasAutonomas: 96,
      requisitos: [
        {
          codigo: 'PROG208',
          nombre: 'Taller de Programación II',
        },
      ],
    },

    grupos: {
      catedra: [
        {
          id: 'PROG201-CAT-A',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Ana González',
          cupos: 30,
          horarios: [
            {
              dia: 'Lunes',
              horaInicio: '14:45',
              horaFin: '16:15',
            },
          ],
          seleccionado: false,
        },
      ],

      taller: [],

      laboratorio: [
        {
          id: 'PROG201-LAB-A',
          tipo: 'laboratorio',
          letra: 'A',
          profesor: 'Luis Herrera',
          cupos: 20,
          horarios: [
            {
              dia: 'Jueves',
              horaInicio: '14:45',
              horaFin: '16:15',
            },
          ],
          seleccionado: false,
        },
      ],
    },

    inscrita: false,
  },

  {
    id: 'OF-EST101-ICCI-2026-2',

    carrera: 'ICCI',
    periodoAcademico: '2026-2',

    asignatura: {
      codigo: 'EST101',
      nombre: 'Estadística I',
      caracter: 'Obligatorio',
      creditos: 4,
      horasPresenciales: 48,
      horasAutonomas: 63,
      requisitos: [
        {
          codigo: 'MAT601',
          nombre: 'Cálculo I',
        },
      ],
    },

    grupos: {
      catedra: [
        {
          id: 'EST101-CAT-A',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Dra. Morales',
          cupos: 35,
          horarios: [
            {
              dia: 'Martes',
              horaInicio: '17:55',
              horaFin: '19:25',
            },
          ],
          seleccionado: false,
        },
      ],

      taller: [],
      laboratorio: [],
    },

    inscrita: false,
  },

  {
    id: 'OF-ADM110-ICCI-2026-1',

    carrera: 'ICCI',
    periodoAcademico: '2026-1',

    asignatura: {
      codigo: 'ADM110',
      nombre: 'Introducción a la Administración',
      caracter: 'Electivo',
      creditos: 4,
      horasPresenciales: 48,
      horasAutonomas: 63,
      requisitos: [],
    },

    grupos: {
      catedra: [
        {
          id: 'ADM110-CAT-A',
          tipo: 'catedra',
          letra: 'A',
          profesor: 'Patricia Soto',
          cupos: 40,
          horarios: [
            {
              dia: 'Viernes',
              horaInicio: '11:20',
              horaFin: '12:50',
            },
          ],
          seleccionado: false,
        },
      ],

      taller: [],
      laboratorio: [],
    },

    inscrita: false,
  },
];
