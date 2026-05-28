import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MallaCurricular } from './malla-curricular';

describe('MallaCurricular', () => {
  let component: MallaCurricular;
  let fixture: ComponentFixture<MallaCurricular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaCurricular],
    }).compileComponents();

    fixture = TestBed.createComponent(MallaCurricular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have carrera property initialized', () => {
    expect(component.carrera).toBe('Ingeniería Civil en Computación e Informática');
  });

  it('should have 11 semestres', () => {
    expect(component.semestres.length).toBe(11);
    expect(component.semestres).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it('should have asignaturas data', () => {
    expect(component.asignaturas.length).toBeGreaterThan(0);
  });

  it('should get asignaturas by semestre', () => {
    const semestre1 = component.getAsignaturasBySemestre(1);
    expect(semestre1.length).toBeGreaterThan(0);
    expect(semestre1.every(a => a.semestre === 1)).toBe(true);
  });

  it('should return empty array for non-existent semestre', () => {
    expect(component.getAsignaturasBySemestre(999)).toEqual([]);
  });

  it('should get correct estado class', () => {
    expect(component.getEstadoClass('aprobado')).toBe('asignatura--aprobado');
    expect(component.getEstadoClass('reprobada')).toBe('asignatura--reprobada');
    expect(component.getEstadoClass('nocursada')).toBe('asignatura--nocursada');
    expect(component.getEstadoClass('inscrita')).toBe('asignatura--inscrita');
    expect(component.getEstadoClass('prerrequisito')).toBe('asignatura--prerrequisito');
    expect(component.getEstadoClass('prerreq_sem')).toBe('asignatura--prerreq_sem');
    expect(component.getEstadoClass('tributa')).toBe('asignatura--tributa');
    expect(component.getEstadoClass('seleccionada')).toBe('asignatura--seleccionada');
  });

  it('should calculate total creditos correctly', () => {
    const total = component.getTotalCreditos();
    const calculado = component.asignaturas.reduce((sum, a) => sum + a.creditos, 0);
    expect(total).toBe(calculado);
  });

  it('should count total asignaturas', () => {
    expect(component.getTotalAsignaturas()).toBe(component.asignaturas.length);
  });

  it('should count asignaturas aprobadas', () => {
    const aprobadas = component.getAsignaturasAprobadas();
    const expected = component.asignaturas.filter(a => a.estado === 'aprobado').length;
    expect(aprobadas).toBe(expected);
  });

  it('should count asignaturas reprobadas', () => {
    const reprobadas = component.getAsignaturasReprobadas();
    const expected = component.asignaturas.filter(a => a.estado === 'reprobada').length;
    expect(reprobadas).toBe(expected);
  });

  it('should count asignaturas actuales (cursando e inscrita)', () => {
    const actuales = component.getAsignaturasActuales();
    const expected = component.asignaturas.filter(
      a => a.estado === 'cursando' || a.estado === 'inscrita'
    ).length;
    expect(actuales).toBe(expected);
  });

  it('should calculate creditos aprobados correctly', () => {
    const creditos = component.getCreditosAprobados();
    const expected = component.asignaturas
      .filter(a => a.estado === 'aprobado')
      .reduce((sum, a) => sum + a.creditos, 0);
    expect(creditos).toBe(expected);
  });

  it('should convert semestre number to roman numeral', () => {
    expect(component.getSemestreRomano(1)).toBe('I');
    expect(component.getSemestreRomano(2)).toBe('II');
    expect(component.getSemestreRomano(3)).toBe('III');
    expect(component.getSemestreRomano(4)).toBe('IV');
    expect(component.getSemestreRomano(5)).toBe('V');
    expect(component.getSemestreRomano(6)).toBe('VI');
    expect(component.getSemestreRomano(7)).toBe('VII');
    expect(component.getSemestreRomano(8)).toBe('VIII');
    expect(component.getSemestreRomano(9)).toBe('IX');
    expect(component.getSemestreRomano(10)).toBe('X');
    expect(component.getSemestreRomano(11)).toBe('XI');
  });

  it('should calculate avance percentage correctly', () => {
    const aprobadas = component.getAsignaturasAprobadas();
    const total = component.getTotalAsignaturas();
    const expected = Math.round((aprobadas / total) * 100);
    expect(component.getAvancePercentage()).toBe(expected);
  });

  it('should calculate avance percentage between 0 and 100', () => {
    const avance = component.getAvancePercentage();
    expect(avance).toBeGreaterThanOrEqual(0);
    expect(avance).toBeLessThanOrEqual(100);
  });

  it('should open and close modal correctly', () => {
    const asignatura = component.asignaturas[0];
    component.abrirModal(asignatura);
    expect(component.modalVisible).toBe(true);
    expect(component.selectedAsignatura).toBe(asignatura);

    component.cerrarModal();
    expect(component.modalVisible).toBe(false);
    expect(component.selectedAsignatura).toBeNull();
  });

  it('should have correct estado labels', () => {
    expect(component.estadoLabel['aprobado']).toBe('Aprobada');
    expect(component.estadoLabel['reprobada']).toBe('Reprobada');
    expect(component.estadoLabel['nocursada']).toBe('No Cursada');
    expect(component.estadoLabel['inscrita']).toBe('Inscrita');
    expect(component.estadoLabel['prerrequisito']).toBe('Prerrequisito');
    expect(component.estadoLabel['prerreq_sem']).toBe('Prerreq. Semestre');
    expect(component.estadoLabel['tributa']).toBe('Tributa');
    expect(component.estadoLabel['seleccionada']).toBe('Seleccionada');
  });

  it('should have correct estado colors', () => {
    expect(component.estadoColor['aprobado']).toBe('#4BA3E3');
    expect(component.estadoColor['reprobada']).toBe('#E85B5B');
    expect(component.estadoColor['nocursada']).toBe('#FFFFFF');
    expect(component.estadoColor['inscrita']).toBe('#90D895');
    expect(component.estadoColor['prerrequisito']).toBe('#FFB74D');
    expect(component.estadoColor['prerreq_sem']).toBe('#6C63C0');
    expect(component.estadoColor['tributa']).toBe('#4CAF50');
    expect(component.estadoColor['seleccionada']).toBe('#64B5F6');
  });

  it('should have asignaturas with all required properties', () => {
    component.asignaturas.forEach(asignatura => {
      expect(asignatura.id).toBeDefined();
      expect(asignatura.nombre).toBeDefined();
      expect(asignatura.codigo).toBeDefined();
      expect(asignatura.creditos).toBeDefined();
      expect(asignatura.horas).toBeDefined();
      expect(asignatura.semestre).toBeDefined();
      expect(asignatura.estado).toBeDefined();
    });
  });

  it('should have valid asignatura states', () => {
    const validStates = [
      'aprobado','reprobada','nocursada','inscrita',
      'cursando','prerrequisito','prerreq_sem','tributa','seleccionada'
    ];
    component.asignaturas.forEach(asignatura => {
      expect(validStates).toContain(asignatura.estado);
    });
  });

  it('should have creditos as positive numbers', () => {
    component.asignaturas.forEach(asignatura => {
      expect(typeof asignatura.creditos).toBe('number');
      expect(asignatura.creditos).toBeGreaterThan(0);
    });
  });

  it('should have all semestres represented in asignaturas', () => {
    const semestresConAsignaturas = new Set(component.asignaturas.map(a => a.semestre));
    component.semestres.forEach(semestre => {
      expect(Array.from(semestresConAsignaturas)).toContain(semestre);
    });
  });
});