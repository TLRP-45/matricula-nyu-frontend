import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionElectivos } from './inscripcion-electivos';

describe('InscripcionElectivos', () => {
  let component: InscripcionElectivos;
  let fixture: ComponentFixture<InscripcionElectivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionElectivos],
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionElectivos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
