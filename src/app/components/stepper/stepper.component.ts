import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stepper">
      <div [class]="getClasePaso(1)">
        <div class="circle">{{ currentStep > 1 ? '✔' : '1' }}</div>
        <div class="label">
          <strong>Verificación</strong>
          <span>{{ getEstadoTexto(1) }}</span>
        </div>
      </div>

      <div [class]="getClaseLinea(1)"></div>

      <div [class]="getClasePaso(2)">
        <div class="circle">{{ currentStep > 2 ? '✔' : '2' }}</div>
        <div class="label">
          <strong>Inf. de Arancel</strong>
          <span>{{ getEstadoTexto(2) }}</span>
        </div>
      </div>

      <div [class]="getClaseLinea(2)"></div>

      <div [class]="getClasePaso(3)">
        <div class="circle">{{ currentStep > 3 ? '✔' : '3' }}</div>
        <div class="label">
          <strong>Estado de pago</strong>
          <span>{{ getEstadoTexto(3) }}</span>
        </div>
      </div>

      <div [class]="getClaseLinea(3)"></div>

      <div [class]="getClasePaso(4)">
        <div class="circle">{{ currentStep > 4 ? '✔' : '4' }}</div>
        <div class="label">
          <strong>Confirmación</strong>
          <span>{{ getEstadoTexto(4) }}</span>
        </div>
      </div>

      <div [class]="getClaseLinea(4)"></div>

      <div [class]="getClasePaso(5)">
        <div class="circle">{{ currentStep > 5 ? '✔' : '5' }}</div>
        <div class="label">
          <strong>Finalizado</strong>
          <span>{{ getEstadoTexto(5) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StepperComponent {
  @Input() currentStep: number = 1;

  getEstadoTexto(step: number): string {
    if (step < this.currentStep) return 'Completado';
    if (step === this.currentStep) return 'En proceso';
    return 'Pendiente';
  }

  getClasePaso(step: number): string {
    if (step < this.currentStep) return 'step completed';
    if (step === this.currentStep) return 'step active';
    return 'step';
  }

  getClaseLinea(step: number): string {
    return step < this.currentStep ? 'line active' : 'line';
  }
}
