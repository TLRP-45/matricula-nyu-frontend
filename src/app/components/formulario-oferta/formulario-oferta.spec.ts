import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOferta } from './formulario-oferta';

describe('FormularioOferta', () => {
  let component: FormularioOferta;
  let fixture: ComponentFixture<FormularioOferta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioOferta],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioOferta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
