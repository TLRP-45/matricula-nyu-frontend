import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { StepperComponent } from '../../components/stepper/stepper.component';


@Component({
  selector: 'app-finalizado',
  standalone: true,
  imports: [CommonModule, StepperComponent],
  templateUrl: './finalizado.html',
  styleUrls: ['./finalizado.css']
})
export class FinalizadoComponent implements OnInit {

  idMatricula: string = 'MAT-2026-9910';
  fecha!: string;
  nombreEstudiante: string;
  emailEstudiante: string;
  carreraNombre: string;

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {
    const student = this.studentService.getStudentData();
    this.nombreEstudiante = student.nombre;
    this.emailEstudiante = student.email;
    this.carreraNombre = student.carrera;
  }

  ngOnInit(): void {
    this.fecha = new Date().toLocaleDateString();
  }

  irInicio() {
    try {
      const historial = JSON.parse(localStorage.getItem('historial_matriculas') || '[]');

      const nuevaMatricula = {
        nro: historial.length + 1,
        anio: 2026,
        semestre: 1,
        fecha: this.fecha,
        estado: 'ACTIVO',
        datosPersonales: {
          nombre: this.nombreEstudiante,
          email: this.emailEstudiante,
          carrera: this.carreraNombre
        }
      };

      historial.unshift(nuevaMatricula);
      localStorage.setItem('historial_matriculas', JSON.stringify(historial));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    this.router.navigate(['/ma-principal']);
  }

  descargar() {
    alert(`Descargando comprobante de ${this.nombreEstudiante}...`);
  }
}

///localStorage.clear(); en la consola del navegador es para poder verificar la inscripcion de matricula :) (esto era para probar)