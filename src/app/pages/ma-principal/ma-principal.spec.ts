import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaPrincipal } from './ma-principal';

describe('MaPrincipal', () => {
  let component: MaPrincipal;
  let fixture: ComponentFixture<MaPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaPrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(MaPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
