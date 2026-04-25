import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

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
  selector: 'app-ma-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ma-principal.html',
  styleUrls: ['./ma-principal.css']
})
export class MaPrincipalComponent implements OnInit {

  nombreEstudiante = '';
  emailEstudiante = '';
  carreraEstudiante = '';

  matriculas: Matricula[] = [];

  estadoMatricula: 'sin' | 'inscrito' | 'renovado' = 'sin';

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    const data = localStorage.getItem('historial_matriculas');

    this.matriculas = data ? JSON.parse(data) : [];

    const student = this.studentService.getStudentData();

    this.nombreEstudiante = student.nombre;
    this.emailEstudiante = student.email;
    this.carreraEstudiante = student.carrera;

    if (this.matriculas.length === 0) {
      this.estadoMatricula = 'sin';
    } else if (this.matriculas.length === 1) {
      this.estadoMatricula = 'inscrito';
    } else {
      this.estadoMatricula = 'renovado';
    }
  }

  irAMatricula() {
    this.router.navigate(['/matricula']);
  }
}