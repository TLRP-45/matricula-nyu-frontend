import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosAcademicos } from './filtros-academicos';

describe('FiltrosAcademicos', () => {
  let component: FiltrosAcademicos;
  let fixture: ComponentFixture<FiltrosAcademicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosAcademicos],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosAcademicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
