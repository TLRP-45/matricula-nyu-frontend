# matricula-nyu-frontend

[Backend](https://github.com/TLRP-45/matricula-nyu-backend)

Este repositorio contiene la parte frontend del sistema de matrícula y gestión académica para el ramo de Taller de Aplicaciones Web de la Universidad de Tarapacá.

Utiliza:

- [Angular](https://angular.io/) v21.2.0
- [Bootstrap](https://getbootstrap.com/) v5.3.8
- [Lucide Angular](https://lucide.dev/guide/packages/lucide-angular)
- [Vitest](https://vitest.dev/)

## Funcionalidades y Roadmap

El sistema espera implementar los flujos típicos de un estudiante con respecto a su matrícula y la inscripción de asignaturas. La siguiente lista se irá actualizando a medida que se avance en el proyecto:

- [x] Inicio de sesión
- [x] Inscripción de asignaturas
- [x] Inscripción de matrícula
- [ ] Desinscripción de asignaturas
- [ ] Registro de usuarios
- [ ] Administración de carreras y planes de estudio
- [ ] Administración de oferta académica
- [ ] Acceso a malla curricular
- [ ] Acceso a horario semanal
- [ ] Prevención de choques horarios
- [ ] Autenticación de solicitudes
- [ ] Caching y optimizaciones de rendimiento

## Setup del proyecto

```bash
$ npm install
```

## Compilar y correr

```bash
# levantar servidor de desarrollo
$ npm start

# compilar para producción
$ npm run build

# modo watch
$ npm run watch
```

## Tests

Para ejecutar las pruebas unitarias con el test runner [Vitest](https://vitest.dev/):

```bash
$ npm test
```
