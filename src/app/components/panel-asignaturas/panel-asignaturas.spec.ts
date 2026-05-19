import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAsignaturas } from './panel-asignaturas';

describe('PanelAsignaturas', () => {
  let component: PanelAsignaturas;
  let fixture: ComponentFixture<PanelAsignaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAsignaturas],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAsignaturas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
