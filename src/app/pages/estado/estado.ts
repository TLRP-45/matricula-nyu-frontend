import { Component, DestroyRef, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { StudentService } from '../../services/student.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [CommonModule, StepperComponent],
  templateUrl: './estado.html',
  styleUrls: ['./estado.css']
})
export class EstadoComponent implements OnInit {

  pasoActual = 3;

  validando = false;
  verificado = false;
  pagado = false;

  montoPago: number | null = null;
  fechaPago: string | null = null;

  mostrarModal = false;
  modalTipo: 'success' | 'error' = 'success';

  carreraEstudiante: string;

  esRenovacion = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private studentService: StudentService,
    private cd: ChangeDetectorRef
  ) {
    this.carreraEstudiante = this.studentService.getStudentCareer();
  }

  ngOnInit() {
    this.esRenovacion = this.studentService.getRenovacion();
  }

  verificarPago() {
    if (this.validando || this.pagado) return;

    this.validando = true;

    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const aprobado = true;

        this.validando = false;
        this.verificado = true;

        if (aprobado) {
          this.pagado = true;
          this.montoPago = 3585000;
          this.fechaPago = new Date().toLocaleString();
          this.modalTipo = 'success';
          this.mostrarModal = true;
        } else {
          this.pagado = false;
          this.modalTipo = 'error';
          this.mostrarModal = true;
        }

        this.cd.detectChanges();
      });
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  continuar() {
    if (this.pagado) {
      this.router.navigate(['/confirmacion']);
    }
  }

  volver() {
    this.router.navigate(['/info']);
  }
}