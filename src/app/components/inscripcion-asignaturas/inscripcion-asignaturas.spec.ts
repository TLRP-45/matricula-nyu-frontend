import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAsignaturas } from './inscripcion-asignaturas';

describe('InscripcionAsignaturas', () => {
  let component: InscripcionAsignaturas;
  let fixture: ComponentFixture<InscripcionAsignaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionAsignaturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionAsignaturas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
