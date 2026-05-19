import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaPrincipalComponent } from './ma-principal';

describe('MaPrincipalComponent', () => {
  let component: MaPrincipalComponent;
  let fixture: ComponentFixture<MaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaPrincipalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaPrincipalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
