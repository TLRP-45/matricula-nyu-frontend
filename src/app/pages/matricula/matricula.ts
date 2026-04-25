import { Component, DestroyRef, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

interface Matricula {
  nro: number;
  anio: number;
  semestre: number;
  fecha: string;
  estado: string;
  datosPersonales: {
    nombre: string;
    email: string;
    carrera: string;
  };
}

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './matricula.html',
  styleUrls: ['./matricula.css']
})
export class MatriculaComponent {

  validando = false;
  bloqueado = false;
  modalVisible = false;
  modalExito = false;

  isRenovacion = false;

  nombreEstudiante = '';
  emailEstudiante = '';
  carreraEstudiante = '';

  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private studentService: StudentService,
    private cd: ChangeDetectorRef
  ) {

    const student = this.studentService.getStudentData();

    this.nombreEstudiante = student.nombre;
    this.emailEstudiante = student.email;
    this.carreraEstudiante = student.carrera;

    const historial: Matricula[] = JSON.parse(localStorage.getItem('historial_matriculas') || '[]');

    this.isRenovacion = historial.length > 0;
  }

  iniciarVerificacion() {
    if (this.bloqueado) return;

    this.validando = true;

    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.validando = false;
        this.modalVisible = true;
        this.modalExito = true;
        this.cd.detectChanges();
      });
  }

  aceptarModal() {
    this.modalVisible = false;

    if (this.modalExito) {
      this.router.navigate(['/info']);
    }
  }
}