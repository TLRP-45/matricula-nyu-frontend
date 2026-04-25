import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { StudentService } from '../../services/student.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, FormsModule, StepperComponent],
  templateUrl: './confirmacion.html',
  styleUrls: ['./confirmacion.css']
})
export class ConfirmacionComponent {

  pasoActual = 4;

  nombre: string;
  email: string;
  carrera: string;
  total = 3585000;

  aceptaTerminos = false;

  confirmando = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {
    const student = this.studentService.getStudentData();
    this.nombre = student.nombre;
    this.email = student.email;
    this.carrera = student.carrera;
  }

  confirmarMatricula() {
    if (!this.aceptaTerminos || this.confirmando) return;

    this.confirmando = true;

    timer(1500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['/finalizado']);
      });
  }

  volver() {
    this.router.navigate(['/estado']);
  }
}