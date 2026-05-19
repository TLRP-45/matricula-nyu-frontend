import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizadoComponent } from './finalizado';

describe('FinalizadoComponent', () => {
  let component: FinalizadoComponent;
  let fixture: ComponentFixture<FinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalizadoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
