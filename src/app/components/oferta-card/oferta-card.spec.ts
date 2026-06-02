import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaCard } from './oferta-card';

describe('OfertaCard', () => {
  let component: OfertaCard;
  let fixture: ComponentFixture<OfertaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertaCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OfertaCard);
    component = fixture.componentInstance;
    // provide a minimal `item` input required by the template
    component.item = {
      oferta: { id: '1', periodoAcademico: '2023/1', carrera: 'Test', asignatura: { id: 'A1', nombre: 'X', codigo: 'X1', creditos: 1 }, grupos: { catedra: [], taller: [], laboratorio: [] } },
      grupo: { id: 'G1', tipo: 'catedra', letra: 'A', profesor: '', cupos: 0, horarios: [], seleccionado: false },
      horario: { dia: '', horaInicio: '', horaFin: '' }
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
