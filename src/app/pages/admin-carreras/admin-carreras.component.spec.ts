import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCarrerasComponent } from './admin-carreras';

describe('AdminCarrerasComponent', () => {
  let component: AdminCarrerasComponent;
  let fixture: ComponentFixture<AdminCarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarrerasComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with 3 carreras de ejemplo', () => {
    expect(component.carreras.length).toBe(3);
  });

  it('should create a new carrera', () => {
    const before = component.carreras.length;
    component.formCarrera = { nombre: 'Test', facultad: 'Ingeniería', duracion: '4' };
    component.saveCarrera();
    expect(component.carreras.length).toBe(before + 1);
    expect(component.carreras[component.carreras.length - 1].nombre).toBe('Test');
  });

  it('should not create carrera with missing fields', () => {
    const before = component.carreras.length;
    component.formCarrera = { nombre: '', facultad: '', duracion: '' };
    component.saveCarrera();
    expect(component.carreras.length).toBe(before);
  });

  it('should update an existing carrera', () => {
    const carrera = component.carreras[0];
    component.openCarreraModal(carrera);
    component.formCarrera.nombre = 'Ingeniería Actualizada';
    component.saveCarrera();
    expect(component.carreras[0].nombre).toBe('Ingeniería Actualizada');
  });

  it('should delete a carrera', () => {
    const before = component.carreras.length;
    component.deleteType = 'carrera';
    component.deleteTarget = component.carreras[0].id;
    component.confirmDelete();
    expect(component.carreras.length).toBe(before - 1);
  });

  it('should navigate to semestres view', () => {
    const c = component.carreras[0];
    component.openSemestresView(c);
    expect(component.currentView).toBe('semestres');
    expect(component.currentCarrera).toBe(c);
  });

  it('should return to carreras view', () => {
    component.currentView = 'semestres';
    component.backToCarreras();
    expect(component.currentView).toBe('carreras');
    expect(component.currentCarrera).toBeNull();
  });

  it('should add a semestre to the current carrera', () => {
    component.openSemestresView(component.carreras[0]);
    component.openSemestreModal();
    component.formSemestre = { num: 3, anio: '2° año' };
    component.tempAsigs = ['Asignatura X'];
    component.saveSemestre();
    expect(component.currentCarrera).not.toBeNull();
    expect(component.currentCarrera?.semestres.some(s => s.num === 3)).toBe(true);
  });
});