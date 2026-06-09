import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAsignaturas } from './gestion-asignaturas';

describe('GestionAsignaturas', () => {
  let component: GestionAsignaturas;
  let fixture: ComponentFixture<GestionAsignaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAsignaturas],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionAsignaturas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
